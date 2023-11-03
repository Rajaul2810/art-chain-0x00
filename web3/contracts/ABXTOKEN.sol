// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title ABXTOKEN Contract
/// @dev This contract represents the ABXTOKEN ERC20 token with additional functionality.
contract ABXTOKEN is ERC20, ERC20Burnable {
    address public immutable owner;

    /// @dev Constructor to initialize the contract.
    constructor() ERC20("ArtBlock", "ABX") {
        owner = msg.sender;
    }

    /// @notice Allows users to buy ABX tokens by sending ETH where 1ETH = 1 ABX token.
    /// @param _avxquantity The quantity of ABX to purchase.
    function buyABX(uint _avxquantity) external payable {
        require(msg.sender != address(0), "User is not valid");
        require(msg.sender != owner, "Owner can't buy ABX from himself!!");
        uint etherQuan = 0.001 ether * _avxquantity;
        require(
            etherQuan == msg.value,
            "Please select the specified amount of ether"
        );
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "The transfer is not successful");
        _mint(msg.sender, etherQuan);
    }

    /// @notice Checks if the caller is eligible to create communities.
    /// @return true if the caller's balance is greater than or equal to 10000.
    function isEligible() external view returns (bool) {
        if (balanceOf(tx.origin) >= 100) {
            return true;
        }
        return false;
    }
}
