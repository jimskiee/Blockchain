// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.6;

//>=0.4.22 < ^0.8.0;
//import "@nomiclabs/buidler/console.sol";

contract Transfer
{
    
    address owner;
    
    constructor()
    {
        owner=msg.sender;
    }
    
    function cancat(string memory a, string memory b) public view returns(string memory){
        return(string(abi.encodePacked(a,"/",b)));
    }


    function sendEther (address payable _recipient) public  
    {
//        console.log("owner="+owner);
//        console.log("_recipient"+_recipient);
        _recipient.transfer(1 ether);
        
    }
    function ownerOfAddress() external view returns(address)
    {
        return address(this);
        //return "##"+address(this)+ "=======#"+address(this).balance+"#";
        
    }
     function ownerOfBalance() external view returns(uint)
    {
        return address(this).balance;
        //return "##"+address(this)+ "=======#"+address(this).balance+"#";
        
    }
    
}