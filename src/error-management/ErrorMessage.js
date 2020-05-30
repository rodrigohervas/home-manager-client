import React from 'react';
import './../styles/errorMessage.css';

/**
 * ErrorMessage component
 * is called in many components to render an error in a compnent div
 * @param {object} props 
 */
function ErrorMessage(props) {
  /**
   * message gets the error from props.message. If empty, message sets a custom error.
   */  
  const { message } = props.message || 'Something happened, try again later';

  /**
   * showError either returns a div with the error or nothing (<></>)
   */
  const showError =  message 
                        ? <div className="errorContainer"> 
                            <h3>{ message }</h3>
                          </div>
                        : <></>;
    
    return showError;
}

export default ErrorMessage;