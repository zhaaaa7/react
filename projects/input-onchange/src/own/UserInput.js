import React from 'react';

const userInput=(props)=>{
  return(
    <div>
    <input type="text" name="input" onChange={props.changed} value={props.username}/>
   </div>
  );
};

export default userInput;
