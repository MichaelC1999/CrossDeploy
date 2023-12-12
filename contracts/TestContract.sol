// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ISpokePool} from "./interfaces/ISpokePool.sol";
import "hardhat/console.sol";

contract TestContract {
    // This contract is for testing cross chain deployment

    uint256 public number = 1;

    constructor(uint numberArg, string memory testStr) {
        number = numberArg;
        if (
            keccak256(abi.encode(testStr)) ==
            keccak256(abi.encode("STRINGTEST"))
        ) {
            number = numberArg + 11;
        }
    }
}
