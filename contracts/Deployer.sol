// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import {ISpokePool} from "./interfaces/ISpokePool.sol";
import {IAcrossMessageHandler} from "./interfaces/IAcrossMessageHandler.sol";
import {IRegistry} from "./interfaces/IRegistry.sol";
import {IERC20} from "./interfaces/IERC20.sol";
import {Registry} from "./Registry.sol";

contract Deployer {
    // This contract gets deployed onto every across supported chain
    // Deployer processes user requests to deploy a contract on any other supported chain, only needing gas on the origin chain
    // Deployer receives across messages on destination chain and processes contract deployment

    Registry registry;
    bytes4 deploySignatureHash;

    address deployingUser;

    address public TEST_INSTANCE_ADDRESS;

    uint256 currentChainId;

    constructor(uint256 chainId) {
        deploySignatureHash = bytes4(
            keccak256("deployNewContract(bytes memory bytecode)")
        );
        registry = new Registry();
        deployingUser = msg.sender;
        currentChainId = chainId;
    }

    function viewRegistryAddress() public view returns (address) {
        return address(registry);
    }

    // ORIGIN FUNCTIONS
    function deployToChain(
        uint256 destinationChainId,
        string memory contractName,
        bytes memory bytecode,
        bytes memory constructorArgEncode
    ) external {
        uint256 transferAmount = 2000000000000000;

        address acrossSpokePool = registry.chainIdToSpokePoolAddress(
            currentChainId
        );

        address connectedDeployer = registry.chainIdToConnectedDeployer(
            destinationChainId
        );

        address wethAddress = registry.getWethAddress(currentChainId);

        require(acrossSpokePool != address(0), "SpokePool invalid");
        require(connectedDeployer != address(0), "ConnectedDeployer invalid");
        require(wethAddress != address(0), "wethAddress Invalid");

        (
            bytes memory acrossMessage,
            address computedAddress
        ) = createDeployMessage(
                bytecode,
                constructorArgEncode,
                contractName,
                destinationChainId
            );

        registry.addContractDeployed(
            contractName,
            destinationChainId,
            address(0),
            computedAddress
        );

        uint256 senderWethBalance = IERC20(wethAddress).balanceOf(msg.sender);
        require(
            senderWethBalance >= transferAmount,
            "Sender has insufficient asset balance"
        );

        IERC20(wethAddress).transferFrom(
            msg.sender,
            address(this),
            transferAmount
        );

        // TEST-CEI REORDER IN PRODUCTION***********************
        uint256 wethBalance = IERC20(wethAddress).balanceOf(address(this));
        require(
            wethBalance >= transferAmount,
            "Deployer has insufficient asset balance"
        );
        //*************************************** */
        IERC20(wethAddress).approve(acrossSpokePool, transferAmount);

        // The amount bridged is protocol fee
        // ISpokePool(acrossSpokePool).deposit(
        //     connectedDeployer,
        //     wethAddress,
        //     transferAmount,
        //     destinationChainId,
        //     400000000000000000,
        //     uint32(block.timestamp),
        //     acrossMessage,
        //     (2 ** 256 - 1)
        // );
    }

    function createDeployMessage(
        bytes memory creationBytecode,
        bytes memory argsBytes,
        string memory contractName,
        uint256 destinationChainId
    ) internal view returns (bytes memory, address) {
        // add constructor args to runtimeBytecode bytecode
        // the creationBytecode is created from the constructor bytes, runtime bytecode, AND THEN the bytes of the argument data
        // abi.encodePacked(creationBytecode, abi.encode(msg.sender));
        bytes memory argsBytecode = abi.encodePacked(
            creationBytecode,
            argsBytes
        );

        bytes32 salt = keccak256(abi.encode(block.number, address(this)));

        bytes memory message = abi.encode(
            deploySignatureHash,
            contractName,
            salt,
            argsBytecode
        );

        address computedAddress = computeDestinationAddress(
            salt,
            argsBytecode,
            destinationChainId
        );

        require(computedAddress != address(0), "Address generation returned 0");

        return (message, computedAddress);
    }

    //DESTINATION FUNCTIONS
    function handleAcrossMessage(
        address tokenSent,
        uint256 amount,
        bool fillCompleted,
        address relayer,
        bytes memory message
    ) public {
        // Parses message for method and bytecode
        (
            bytes4 method,
            string memory contractName,
            bytes32 salt,
            bytes memory data
        ) = extractMessageComponents(message);
        if (method == deploySignatureHash) {
            // Must extract bytes32 salt from data
            // Calls create() functionality
            deployNewContract(contractName, salt, data);
        }
    }

    function deployNewContract(
        string memory contractName,
        bytes32 salt,
        bytes memory bytecode
    ) public returns (address) {
        address instance;
        assembly {
            instance := create2(0, add(bytecode, 32), mload(bytecode), salt)
            if iszero(extcodesize(instance)) {
                revert(0, 0)
            }
        }
        // IMPORTANT - replace address(0) with the sender who initiated deposit() call on other chain
        registry.addContractDeployed(
            contractName,
            currentChainId,
            address(0),
            instance
        );

        return instance;
    }

    function extractMessageComponents(
        bytes memory message
    ) internal view returns (bytes4, string memory, bytes32, bytes memory) {
        // This function separates the method to execute on the destination contract from the data
        (
            bytes4 method,
            string memory contractName,
            bytes32 salt,
            bytes memory data
        ) = abi.decode(message, (bytes4, string, bytes32, bytes));
        // data is abi.encode bytes that have different decode types depending on the method
        return (method, contractName, salt, data);
    }

    //REGISTRY FUNCTIONS
    function addConnectedDeployer(
        uint256 chainId,
        address deployerConnection
    ) public {
        // Will this be manual? Since the deployer contracts need to be manually deployed/connected - and then users can deploy contract across chains
        // Should this also be internal? Callback after deploying on other chain could auto add deployer? NO - no callback functionality
        require(
            msg.sender == deployingUser,
            "Only the user who deployed this contract originally may add a deployer connection."
        );

        registry.addConnectedDeployer(chainId, deployerConnection);
    }

    function computeDestinationAddress(
        bytes32 salt,
        bytes memory bytecode,
        uint256 destinationChainId
    ) public view returns (address) {
        bytes32 bytecodeHash = keccak256(bytecode);

        address sender = registry.chainIdToConnectedDeployer(
            destinationChainId
        );
        bytes32 _data = keccak256(
            abi.encodePacked(bytes1(0xff), sender, salt, bytecodeHash)
        );
        return address(bytes20(_data << 96));
    }
}
