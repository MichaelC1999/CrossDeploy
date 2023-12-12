// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.9;

/**
 * @notice Interface for receving Across message transactions
 */
interface IAcrossMessageHandler {
    function handleAcrossMessage(
        address tokenSent,
        uint256 amount,
        bool fillCompleted,
        address relayer,
        bytes memory message
    ) external;
}
