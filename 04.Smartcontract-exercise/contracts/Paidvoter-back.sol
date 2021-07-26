// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;
contract Paidvoter {

    //string public name;
    address payable public owner;
    int32 public voteCountCandidate1 = 0;
    int32 public voteCountCandidate2 = 0;
    mapping(int8 => Candidate) public candidates;

    struct Candidate {
        int8 id;
        string name;
        int32 votenumber;
    }

    event VoteCandidate(
        int8 id,
        string name,
        int32 votenumber,
        address votepaidbyaddress,
        uint votedate

    );
    //address payable owner

    enum CandidateVoting{
        CAT , DOG
    }

    constructor()
     {
        //owner= payable(msg.sender);
        //The account of Ballot Committee
        owner=payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
        candidates[0] = Candidate(0, "CAT", 0);
        candidates[1]= Candidate(0, "DOG", 1);   
     }

    function purchaseVoteCandidate(int8 _id,address _voter) payable public{

        // Require that the voter  is not the maker
        require(_voter != owner,"voter account should not same as Committee account");


        if (_id==0) //CandidateVoting.CAT
        {
            voteCountCandidate1++;
            candidates[_id]=Candidate(_id,"CAT",voteCountCandidate1);
        } else
        {
            voteCountCandidate2++;
            candidates[_id]=Candidate(_id,"DOG",voteCountCandidate2);
        }

        // Transfer to SMART_CONTRACT
        (bool success,) =owner.call{value: 1000}("ERROR");
        require(success,"failed transfer from Voter to Commitee (smart contract)");
        
        // Trigger an event for web3js information
        emit VoteCandidate(_id,candidates[_id].name,candidates[_id].votenumber,_voter,block.timestamp);

    }

         //Helper function for local testing in remix//
         //function to check balance in SMART_CONTRACT
         function getBalanceSmartContract () public view returns(uint)
         {
            return address(this).balance;
         }
         //function to deposit to SMART_CONTRACT
         function deposit () public payable {
            //require greater than 0
            require(msg.value>0,"error - must send value > 0");
        }
        //function widthraw back from SMART_CONTRACT to owner
        function widthraw (uint widthrawAmount) public {
            owner.call{value: widthrawAmount}("");
        }

}
