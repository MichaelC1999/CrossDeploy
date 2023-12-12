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
        uint256 chainId,
        bytes memory bytecode,
        bytes memory constructorArgEncode
    ) external {
        uint256 transferAmount = 10000000000000000;

        address acrossSpokePool = registry.chainIdToSpokePoolAddress(
            currentChainId
        );

        require(acrossSpokePool != address(0), "SpokePool invalid");

        address connectedDeployer = registry.chainIdToConnectedDeployer(
            chainId
        );

        require(connectedDeployer != address(0), "ConnectedDeployer invalid");

        address wethAddress = registry.getWethAddress(currentChainId);

        require(wethAddress != address(0), "wethAddress Invalid");

        int64 relayerFeePct = 0; // SHOULD I SET THIS TO BE HARDCODED OR INPUT?

        bytes memory acrossMessage = createDeployMessage(
            bytecode,
            constructorArgEncode
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
        ISpokePool(acrossSpokePool).deposit(
            connectedDeployer,
            wethAddress,
            transferAmount,
            chainId,
            250000000000000000,
            uint32(block.timestamp),
            acrossMessage,
            (2 ** 256 - 1)
        );
    }

    function createDeployMessage(
        bytes memory creationBytecode,
        bytes memory argsBytes
    ) internal view returns (bytes memory) {
        // add constructor args to runtimeBytecode bytecode
        // the creationBytecode is created from the constructor bytes, runtime bytecode, AND THEN the bytes of the argument data
        // abi.encodePacked(creationBytecode, abi.encode(msg.sender));
        bytes memory argsBytecode = abi.encodePacked(
            creationBytecode,
            argsBytes
        );

        bytes memory message = abi.encode(deploySignatureHash, argsBytecode);

        return message;
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
        (bytes4 method, bytes memory data) = extractMessageComponents(message);
        if (method == deploySignatureHash) {
            // No need to extract bytecode from data, remaining data bytes is bytecode
            // Calls create() functionality
            deployNewContract(data);
        }
    }

    function deployNewContract(bytes memory bytecode) public returns (address) {
        address instance;
        assembly {
            instance := create(0, add(bytecode, 0x20), mload(bytecode))
            if iszero(extcodesize(instance)) {
                revert(0, 0)
            }
        }
        TEST_INSTANCE_ADDRESS = instance;
        return instance;
    }

    function extractMessageComponents(
        bytes memory message
    ) internal view returns (bytes4, bytes memory) {
        // This function separates the method to execute on the destination contract from the data
        (bytes4 method, bytes memory data) = abi.decode(
            message,
            (bytes4, bytes)
        );
        // data is abi.encode bytes that have different decode types depending on the method
        return (method, data);
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
}
