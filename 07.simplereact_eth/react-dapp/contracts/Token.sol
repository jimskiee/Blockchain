//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Token
{
  string public name ="Jimski Token";
  string public symbol="ABT";
  uint public totalSupplyToken=1000000;
  address public owner;
  mapping(address=>uint) balances;

  constructor ()
  {
      balances[msg.sender]=totalSupplyToken;
      owner=msg.sender;
  }

  function transfer (address _to, uint _amount) external {
  require(balances[msg.sender]>=_amount,"Tokens not enough to Transfer");
    balances[msg.sender]-=_amount;
    balances[_to]+=_amount;
  }

  function balanceOfAccount (address _account) external view returns(uint)
    {
        return balances[_account];
    }

}