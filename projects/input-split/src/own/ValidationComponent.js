import React from 'react';

const validationComponent=(props)=>{
  let style={color:'red'};
  let validation="Text too short";
  if(props.textLength>=5){
    validation="Text long enough";
    style=null;
  }
  return (
    <p style={style}>{validation}</p>
  );
};

export default validationComponent;
