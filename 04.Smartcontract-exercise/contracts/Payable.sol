// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;

contract Payable

{
    //owner of SMART_CONTRACT
    address payable public owner;
    
    constructor() payable
    {
        owner= payable(msg.sender);
    }
    
    
    //function to deposit from Owner to SMART_CONTRACT
    function deposit () public payable
    {
        
    }
    
    //function to check balance in SMART_CONTRACT
    function getBalanceSmartContract () public view returns(uint)
    {
        return address(this).balance;
    }
    
    //Functon to widthraw all balance from SMART_CONTRACT back to Owner
    function widthraw () public 
    {
        uint amount= address(this).balance;
            
        (bool success,) =owner.call{value: amount}("");
        require(success,"failed widthraw to owner");
        
    }
    
    //Function to Transfer from SMART_CONTRACT to destination
    function transfer (address payable _to, uint _amount) public
    {
        
        (bool success,) =_to.call{value: _amount}("");
        require(success,"failed transfer from SMART_CONTRACT to destination");
    }
    
        //function transfer from selected account to SMART_CONTRACT;
    
    function transferFromActiveAccount(address _from, uint _amount) public payable
    {
        //ini berhasil 
        address _sender = msg.sender;
        
        (bool success,) =_sender.call{value: _amount}("");
        require(success,"failed transfer from active account to SMART_CONTRACT");
    }

    
}