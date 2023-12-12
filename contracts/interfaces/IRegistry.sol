pragma solidity ^0.8.9;

/**
 * @notice Interface for Registry contract.
 */

interface IRegistry {
    function poolEnabled(address) external returns (bool);

    function addPoolEnabled(address) external;

    function disablePool(address) external;

    function chainIdToBridgeConnection(uint256) external view returns (address);

    function acrossAddress() external view returns (address);

    function getWethAddress(uint256) external view returns (address);

    function chainIdToSpokePoolAddress(uint256) external view returns (address);
}
