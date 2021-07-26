// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

contract Helloworld {
    
    string public message;  
    address public owner;
    constructor(string memory _message){
        message=_message;
        owner= msg.sender;
    }

    function hello() public view  returns (string memory) {
        return message;
    }
    function setMessage(string memory _message) public {
        //require(msg.value>1 ether,"must pay more than 1 ether");
        require(msg.sender==owner);
        message=_message;
    }
}