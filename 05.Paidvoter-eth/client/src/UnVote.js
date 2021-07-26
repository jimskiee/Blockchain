import React from 'react';

const UnVote =props =>
{
    console.log('Unvote :'+props);
    return (
        <div style={{height:'80px'}}>
        <button style={{backgroundColor:'royalblue'}}>Unvote</button>
        </div>
    );

}
export default UnVote;