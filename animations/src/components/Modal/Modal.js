import React from 'react';
import CSSTransition from "react-transition-group/CSSTransition";
// import Transition from "react-transition-group/Transition";
import './Modal.css';


const animationTiming={
    enter:400,
    exit:1000
  };

  const modal = props => {
    return (
    //     <Transition 
    //     mountOnEnter 
    //     unmountOnExit 
    //     in={props.show} 
    //     timeout={animationTiming}>
    //     {state => {
    //     const cssClasses = [
    //       "Modal",
    //       state === "entering"
    //         ? "ModalOpen"
    //         : state === "exiting" ? "ModalClosed" : null
    //     ];
    //             return (
    //                 <div className={cssClasses.join(" ")}>
    //                 <h1>A Modal</h1>
    //                 <button className="Button" onClick={props.closed}>
    //                   Dismiss
    //                 </button>
    //               </div>
    //             );
    //         }
    //       }

    // </Transition >
    <CSSTransition 
        mountOnEnter 
        unmountOnExit 
        in={props.show} 
        timeout={animationTiming}
        classNames="fade-slide">
        {/* fade-slide-enter-active */}
        
        <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>
            Dismiss
        </button>
        </div>
               
          

    </CSSTransition >
    ) ;
    
};

export default modal;