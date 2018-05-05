import React from 'react';
const wrapClass=(WrappedComponent,className)=>{
    return(props)=>(
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    )
};

export default wrapClass;