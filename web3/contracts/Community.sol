// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IArtBlock {
    function isEligible() external view returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function burnFrom(address account, uint256 amount) external;
}

interface ICommunityToken {
    function createCommunityToken(
        string memory name,
        string memory symbol,
        address comCreator
    ) external;

    function getOwnerOfaToken(address _tokenAddr)
        external
        view
        returns (address);

    function getTokenAddress(string calldata name, string calldata symbol)
        external
        view
        returns (address);
}

contract CommunityContract {
    Community[] public communityList;

    address private communityTokenContractAddress;
    // Address of the ArtBlock contract
    address private artBlockContractAddress;

    constructor(
        address _communityTokenContractAddress,
        address _artBlockContractAddress
    ) {
        communityTokenContractAddress = _communityTokenContractAddress;
        artBlockContractAddress = _artBlockContractAddress;
    }

    struct Community {
        string title;
        string description;
        IERC20 nativeToken;
        address creator;
        address[] members;
    }

    mapping(address => Community[]) communities;
    mapping(address => Community) tokenInfo;
    mapping(bytes32 => address) codeWithToken;
    mapping(address => address[]) membersCommunity;

    function createCommunity(
        string calldata _title,
        string calldata _description,
        string calldata _name,
        string calldata _symbol
    ) external {
        Community memory newCommunity; // Use 'memory' to create a new instance
        newCommunity.title = _title;
        newCommunity.description = _description;
        _createToken(_name, _symbol, msg.sender);
        address nativeTokenAddress = _getTokenAddr(_name, _symbol);
        newCommunity.nativeToken = IERC20(nativeTokenAddress);
        newCommunity.creator = msg.sender;
        //////////////////////
        address[] memory members = new address[](1);
        members[0] = msg.sender;
        newCommunity.members = members;
        communities[msg.sender].push(newCommunity);
        communityList.push(newCommunity);
        tokenInfo[nativeTokenAddress] = newCommunity;
        codeWithToken[getCommmunityCode(_name, _symbol)] = nativeTokenAddress;
    }

    function getAllCommunitiesOfUser()
        external
        view
        returns (Community[] memory)
    {
        return communities[msg.sender];
    }

    //notworking

    function exChangeWithABX(
        string calldata _name,
        string calldata _symbol,
        uint _quantity
    ) external {
        IArtBlock artBlock = IArtBlock(artBlockContractAddress);
        uint tempTotalBal = artBlock.balanceOf(msg.sender);
        require(_quantity <= tempTotalBal, "Not enough Balance");

        artBlock.burnFrom(msg.sender, _quantity);

        // address creator = tokenInfo[_getTokenAddr(_name, _symbol)].creator;s
        // tokenInfo[_getTokenAddr(_name, _symbol)].nativeToken.approve(address(this),tokenInfo[_getTokenAddr(_name, _symbol)].nativeToken.balanceOf(creator));
        tokenInfo[_getTokenAddr(_name, _symbol)].nativeToken.transferFrom(
            address(this),
            msg.sender,
            _quantity
        );
        // tokenInfo[_getTokenAddr(_name, _symbol)].nativeToken.mint(msg.sender,_quantity);
    }

    function addToCommunitiy(string calldata name, string calldata symbol)
        public
    {
        membersCommunity[_getTokenAddr(name, symbol)].push(msg.sender);
    }

    function _createToken(
        string memory name,
        string memory symbol,
        address comCreator
    ) internal {
        ICommunityToken tokenContract = ICommunityToken(
            communityTokenContractAddress
        );
        tokenContract.createCommunityToken(name, symbol, comCreator);
    }

    function _getTokenAddr(string calldata name, string calldata symbol)
        internal
        view
        returns (address)
    {
        ICommunityToken tokenContract = ICommunityToken(
            communityTokenContractAddress
        );
        return tokenContract.getTokenAddress(name, symbol);
    }

    function balanceOfCommunityToken(
        string calldata name,
        string calldata symbol
    ) public view returns (uint) {
        address creator = tokenInfo[_getTokenAddr(name, symbol)].creator;
        return
            tokenInfo[_getTokenAddr(name, symbol)].nativeToken.balanceOf(
                creator
            );
    }

    //     return communities[_addr].nativeToken.balanceOf(_addr);
    // }

    function getCommmunityCode(string calldata name, string calldata symbol)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(name, symbol));
    }
}
