// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CommunityToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address comCreator
    ) ERC20(name, symbol) {
        _mint(comCreator, totalSupply);
    }
}

contract TokenFactory {
    mapping(address => address) communityTokens;
    mapping(address => address) creatorOfToken;
    mapping(bytes32 => address) communityCode;

    function createCommunityToken(
        string calldata name,
        string calldata symbol,
        address comCreator
    ) external {
        require(
            creatorOfToken[comCreator] == address(0),
            "One can create only one community"
        );
        CommunityToken newToken = new CommunityToken(
            name,
            symbol,
            10000,
            comCreator
        );
        communityTokens[comCreator] = address(newToken);
        creatorOfToken[address(newToken)] = comCreator;
        communityCode[getCommmunityCode(name, symbol)] = address(newToken);
    }

    function getOwnerOfaToken(address _tokenAddr)
        external
        view
        returns (address)
    {
        return creatorOfToken[_tokenAddr];
    }

    function getTokenAddress(string calldata name, string calldata symbol)
        external
        view
        returns (address)
    {
        return communityCode[getCommmunityCode(name, symbol)];
    }

    function getCommmunityCode(string calldata name, string calldata symbol)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(name, symbol));
    }
}
