// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Counter {
    
    uint count;
    
//    constructor () public {
//        count=0;
//    }
    
    struct Book{
        string title;
        string author;
    }
    function getCount() public view returns (uint) {
        return count;
    }
    
    function incrementCount() public {
        count++;
    }
    
// mapping
    mapping (uint=>Book) public books;
    mapping (address=> mapping(uint=>Book)) public myBooks;
    
    function addBooks (uint _id, string memory _title, string memory _author)  public 
    {
        books[_id]=Book(_title,_author);
    }
    function addMyBooks (uint _id, string memory _title, string memory _author)  public 
    {
        myBooks[msg.sender][_id]=Book(_title,_author);
    }
    
    
    
}