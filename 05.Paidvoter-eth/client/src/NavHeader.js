import React from 'react';
//Ethereum voter Event - Vote your Favourite Player to win

const NavHeader =props =>
{
    console.log('Unvote :'+props);
    return (
        <div style={{textAlign:'center',fontSize:'2.2em',padding:'1%'}}>
            Ethereum E-voter election - Vote your Favourite Pet to win 
        </div>
    );

}
export default NavHeader;