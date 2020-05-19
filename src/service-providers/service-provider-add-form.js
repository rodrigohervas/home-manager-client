import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import './../styles/service-providers-forms.css';
import config from './../config';
import FormErrorMessage from './../error-management/FormErrorMessage';
import ErrorMessage from './../error-management/ErrorMessage';


function ServiceProviderAddForm(props) {

    //Variable declarations
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    
    //form fields errors
    const [typeError, setTypeError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [telephoneError, setTelephoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    //add operation error
    const [operationError, setOperationError] = useState(null);
    const [showOperationError, setShowOperationError] = useState(false);

    const history = useHistory();

    /**
     * Event handler to manage the changes in state for the form fields
     * @param {Event} e 
     */
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        if(name === "service-provider-type") {
            setType(value);
        }

        if(name === "service-provider-name") {
            setName(value);
        }

        if(name === "service-provider-description") {
            setDescription(value);
        }

        if(name === "service-provider-telephone") {
            setTelephone(value);
        }

        if(name === "service-provider-email") {
            setEmail(value);
        }

        if(name === "service-provider-address-street" ) {
            setStreet(value);
        }

        if(name === "service-provider-address-city" ) {
            setCity(value);
        }

        if(name === "service-provider-address-state" ) {
            setState(value);
        }

        if(name === "service-provider-address-zipcode" ) {
            setZipcode(value);
        }        
    };

    /**
     * Event handler to validate and set form field errors if there is any invalid state
     */
    const validateFormField = (e) => {
        const fieldName = e.target.name;
        
        if (fieldName === "service-provider-type") {
            if (!type || type === "") {
                setTypeError(true);
            }
            else { 
                setTypeError(false);
            }
        }

        if (fieldName === "service-provider-name") {
            if(!name || name ==="") {
                setNameError(true);
            }
            else{
                setNameError(false);
            }
        }
        
        if (fieldName === "service-provider-description") {
            if(!description || description === "") {
                setDescriptionError(true);
            }
            else {
                setDescriptionError(false);
            }
        }

        if (fieldName === "service-provider-telephone") {
            if (!telephone || telephone === "") {
                setTelephoneError(true);
            } 
            else {
                setTelephoneError(false);
            }
        }

        if (fieldName === "service-provider-email") {
            if(!email || email === "" || !email.includes('@')) {
                setEmailError(true);
            }
            else{
                setEmailError(false);
            }
        }

        if (fieldName === "service-provider-address-street") {
            if(!street || street === "") {
                setAddressError(true);
            }
            else{
                setAddressError(false);
            }
        }

        if (fieldName === "service-provider-address-city") {
            if(!city || city === "") {
                setAddressError(true);
            }
            else{
                setAddressError(false);
            }
        }

        if (fieldName === "service-provider-address-state") {
            if(!state || state === "") {
                setAddressError(true);
            }
            else{
                setAddressError(false);
            }
        }

        if (fieldName === "service-provider-address-zipcode") {
            if(!zipcode || zipcode === "" || !parseInt(zipcode)) {
                setAddressError(true);
            }
            else{
                setAddressError(false);
            }
        }
    };

    /**
     * validates if there are any form fields with errors
     */
    const isValid = () => {
        if( typeError || 
            nameError || 
            descriptionError || 
            telephoneError || 
            emailError || 
            addressError) {

            return false;
        }
        return true;
    };

    /**
     * Clears all errors from the form fields. 
     * Called from handleSubmit()
     */
    const clearErrors = () => {
        setTypeError(false);
        setNameError(false);
        setDescriptionError(false);
        setTelephoneError(false);
        setEmailError(false);
        setAddressError(false);
    };

    /**
     * Event handler for form submit action:
     *  1. Adds service-provider to the system
     *  2. Calls to update App.js state for service-providers
     *  3. Redirects to service-providers-dashboard
     *  4. Clears errors if they were set before
     * 
     * @param {Event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isValid()) {
            try{
                const serviceProvider = {
                    user_id: localStorage.getItem('user_id'), 
                    type_id: type, 
                    name: name, 
                    description: description, 
                    telephone: telephone, 
                    email: email, 
                    address: {
                        street: street, 
                        city: city, 
                        state: state, 
                        zipcode: zipcode
                    }
                };

                const url = `${config.REACT_APP_API_URL_SERVICE_PROVIDERS}`
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                        'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                    },
                    body: JSON.stringify(serviceProvider)
                };

                fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Oops! something went wrong: couldn\'t create service provider');
                    }
                    return res.json();
                })
                .then(data => {
                    //call to update App.js state for service-providers
                    props.addServiceProvider(data);

                    //clear all errors
                    clearErrors();

                    //redirect to expenses-dashboard
                    history.push('serviceprovidersdashboard');
                })
                .catch(error => {
                    setOperationError(error)
                    setShowOperationError(true)
                })
            }
            catch (error) {
                setOperationError(error);
                setShowOperationError(true);
            }
        }
    };

    /**
     * Generates a list of option HTML elements for the expenses-type Select
     * @param {Array} options 
     */
    const generateTypeOptions = (types) => {
        return types.map(type => { 
            return <option key={type.id} value={type.id}>{type.name}</option>
        });
    };

    /**
     * Event handler for the cancel button
     */
    const handleCancel = () => {
        history.push('/serviceprovidersdashboard');
    };


    //get types from props
    const types = props.types;

    //generate options for the expense types Select HTML element
    const options = generateTypeOptions(types);

    return (
        <div className="service-providers-main">
            <div className="main-header">
                <h1>Add Service Provider:</h1>
            </div>

            <form onSubmit={ (e) => handleSubmit(e) }>

                <div className="form-group">
                    <label htmlFor="service-provider-type">
                        Type:
                    </label>
                    <select id="service-provider-type" name="service-provider-type"
                                              onChange={ e => handleChange(e) } 
                                              onBlur={ (e) => validateFormField(e) } >
                        <option value="">Select Type</option>
                        {options}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="service-provider-name">
                        Name:
                    </label>
                    <input type="text" name="service-provider-name" 
                                       id="service-provider-name" 
                                       placeholder="Plumbing Co." 
                                       onChange={ e => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } /> 
                </div>

                <div className="form-group">
                    <label htmlFor="service-provider-description">
                        Description:
                    </label>
                    <textarea id="service-provider-description" 
                              name="service-provider-description" 
                              placeholder="Service Provider description here" 
                              rows="7" 
                              cols="50" 
                              onChange={ e => handleChange(e) } 
                              onBlur={ (e) => validateFormField(e) } ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="service-provider-telephone">
                        Telephone:
                    </label>
                    <input type="text" name="service-provider-telephone" 
                                       id="service-provider-telephone" 
                                       placeholder="123-123-1234"
                                       onChange={ e => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } />
                </div>

                <div className="form-group">
                    <label htmlFor="service-provider-email">
                        Email:
                    </label>
                    <input type="text" name="service-provider-email" 
                                       id="service-provider-email" 
                                       placeholder="john@doe.com" 
                                       onChange={ (e) => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } /> 
                </div>

                <div className="form-group">
                    <label htmlFor="service-provider-address">
                        Address:
                    </label>
                    <input type="text" name="service-provider-address-street" 
                                       id="service-provider-address-street" 
                                       placeholder="123 Main Street" 
                                       onChange={ (e) => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } /> 
                    <input type="text" name="service-provider-address-city" 
                                       id="service-provider-address-city" 
                                       placeholder="Springfield" 
                                       onChange={ (e) => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } /> 
                                       
                    <input type="text" name="service-provider-address-state" 
                                       id="service-provider-address-state" 
                                       placeholder="MD" 
                                       onChange={ (e) => handleChange(e) } 
                                       onBlur={ (e) => validateFormField(e) } /> 
                    <input type="text" name="service-provider-address-zipcode" 
                                        id="service-provider-address-zipcode" 
                                        placeholder="21212" 
                                        onChange={ (e) => handleChange(e) } 
                                        onBlur={ (e) => validateFormField(e) } /> 
                </div>


                <div className="form-group buttons-container">
                    <input type="submit" value="Cancel" onClick={ () => handleCancel() } />
                    <input type="submit" value="Add" />
                </div>

                { typeError && <FormErrorMessage message={'The Service Provider Type is mandatory and must be valid'} /> }
                { nameError && <FormErrorMessage message={'The Name is mandatory and must be valid'} /> }
                { descriptionError && <FormErrorMessage message={'The Description is mandatory and must be valid'} /> }
                { telephoneError && <FormErrorMessage message={'The Telephone is mandatory and must be valid'} /> }
                { emailError && <FormErrorMessage message={'The Email is mandatory and must be valid'} /> }
                { addressError && <FormErrorMessage message={'The Address is mandatory and must be valid'} /> }

                { showOperationError && <ErrorMessage message={operationError} /> }

            </form>

        </div>
    )
}

export default ServiceProviderAddForm;