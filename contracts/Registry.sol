// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ISpokePool} from "./interfaces/ISpokePool.sol";
import "hardhat/console.sol";

contract Registry {
    // Stores and manages addresses
    // Manages CrossDeploy addresses across chains
    // Saves addresses pertaining to a protocol that deploys its contracts with CrossDeploy

    constructor() {
        deployerAddress = msg.sender;

        //Hardcode Across Spoke Pool Addresses on each chain

        chainIdToSpokePoolAddress[1] = address(
            0x5c7BCd6E7De5423a257D81B442095A1a6ced35C5
        );
        chainIdToSpokePoolAddress[10] = address(
            0x6f26Bf09B1C792e3228e5467807a900A503c0281
        );
        chainIdToSpokePoolAddress[137] = address(
            0x9295ee1d8C5b022Be115A2AD3c30C72E34e7F096
        );
        chainIdToSpokePoolAddress[324] = address(
            0xE0B015E54d54fc84a6cB9B666099c46adE9335FF
        );
        chainIdToSpokePoolAddress[8453] = address(
            0x09aea4b2242abC8bb4BB78D537A67a245A7bEC64
        );
        chainIdToSpokePoolAddress[42161] = address(
            0xe35e9842fceaCA96570B734083f4a58e8F7C5f2A
        );

        // TESTNET ADDRESSES
        chainIdToSpokePoolAddress[5] = address(
            0x063fFa6C9748e3f0b9bA8ee3bbbCEe98d92651f7
        ); // Can bridge 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6 to 421613
        chainIdToSpokePoolAddress[80001] = address(
            0x4589Fbf26C6a456f075b5628178AF68abE03C5fF
        );
        chainIdToSpokePoolAddress[421613] = address(
            0xd08baaE74D6d2eAb1F3320B2E1a53eeb391ce8e5
        );

        chainIdToSpokePoolAddress[11155111] = address(
            0x3baD7AD0728f9917d1Bf08af5782dCbD516cDd96
        ); // Can bridge 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9 to 421613
    }

    address public deployerAddress;

    mapping(uint256 => address) public chainIdToSpokePoolAddress;

    mapping(address => bool) public poolEnabled;

    mapping(uint256 => address) public chainIdToConnectedDeployer;

    mapping(bytes32 => mapping(uint256 => address)) private contractsDeployed;

    function addContractDeployed(
        string memory contractName,
        uint256 chainId,
        address deployingUser,
        address contractAddress
    ) public {
        require(
            msg.sender == deployerAddress,
            "Only the Deployer may add contracts deployed to registry"
        );
        bytes32 nameHash = keccak256(abi.encode(deployingUser, contractName));
        contractsDeployed[nameHash][chainId] = contractAddress;
    }

    function getContractAddressByName(
        string memory contractName,
        address deployingUser,
        uint256 chainId
    ) public view returns (address) {
        bytes32 nameHash = keccak256(abi.encode(deployingUser, contractName));
        return contractsDeployed[nameHash][chainId];
    }

    function addConnectedDeployer(uint256 chainId, address deployer) external {
        require(
            msg.sender == deployerAddress,
            "Only the deploying contract may add a deployer"
        );
        chainIdToConnectedDeployer[chainId] = deployer;
    }

    function addPoolEnabled(address poolAddress) external {
        poolEnabled[poolAddress] = true;
    }

    function disablePool(address poolAddress) public {
        poolEnabled[poolAddress] = false;
    }

    function getWethAddress(uint256 chainId) external view returns (address) {
        address spokePool = chainIdToSpokePoolAddress[chainId];
        return ISpokePool(spokePool).wrappedNativeToken();
    }
}
