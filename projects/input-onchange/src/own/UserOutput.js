import React from 'react';

const userOutput=(props)=>{
  return(
    <div>
      <p style={props.style}>{props.username}</p>
    </div>
  );
};

export default userOutput;
