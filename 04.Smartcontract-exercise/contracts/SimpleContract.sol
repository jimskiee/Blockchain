// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract CoolNumberContract {
    uint public coolNumber = 10;
    
    function setCoolNumber(uint _coolNumber) public {
        coolNumber = _coolNumber;
    }
}