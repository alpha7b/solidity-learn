// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.5.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20WL is ERC20{
    mapping(address => bool) private whitelist;
    address immutable caller;

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_){
        caller = msg.sender;
    }
    
    modifier onlyCaller(){
        require(msg.sender == caller, "Only caller can call this.");
        _;
    }

    function setWhitelist(address s) public onlyCaller returns (bool){
        whitelist[s] = true;
        return true;
    }

    function isWhitelist(address s) public view returns (bool){
        return whitelist[s];
    }

    function mint(address receiver, uint256 mount) public{
        require((msg.sender == caller)||(isWhitelist(msg.sender)), "either caller or spender can mint token");
        super._mint(receiver,mount);
    }
}
