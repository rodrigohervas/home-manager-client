import React from 'react';
// import './../style/formErrorMessage.css'

/**
 * FormErrorMessage component
 * is called in all form components to render an error from any form input
 * @param {object} props 
 */
function FormErrorMessage(props) {
    
    /**
     * message gets the error from props
     */
    const { message } = props;
    
    /**
     * errorMessage either loads a div with the error or nothing (<></>)
     */
    const errorMessage = message ? <div className="error"> {message} </div> : <></>;

    return (
        errorMessage
    )
}

export default FormErrorMessage;