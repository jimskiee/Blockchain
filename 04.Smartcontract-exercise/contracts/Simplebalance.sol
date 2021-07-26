
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9;

contract Simplebalance {
    
    mapping(address=>uint) private balances;
    
    function deposit () public payable {
        //require greater than 0
        require((balances[msg.sender]+msg.value)>=balances[msg.sender]);
        balances[msg.sender]+=msg.value;
        
    }
    
    function widthraw (uint widthrawAmount) public returns(uint) {
        require(widthrawAmount<=balances[msg.sender]);
        msg.sender.call{value: widthrawAmount}("");
        balances[msg.sender]-=widthrawAmount;
        return balances[msg.sender];
    }
    
    function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }
    
    function getAddress_msg_sender() public view returns(address){
        return msg.sender;
    }
}