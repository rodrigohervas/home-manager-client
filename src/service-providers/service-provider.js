import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './../styles/service-provider.css';
import { showHide } from './../helpers/helpers';
import config from './../config';
import ErrorMessage from './../error-management/ErrorMessage';

function ServiceProvider(props) {

    //Declaration of variables
    const [operationError, setOperationError] = useState(null);
    const [showOperationError, setShowOperationError] = useState(false);
    
    const history = useHistory();    

    /**
     * update event handler to redirect to service-provider-update-form passing the service-provider.id and route
     * @param {Numeric} id 
     */
    const handleUpdateServiceProvider = (id) => {
        history.push({
            pathname:`/updateserviceprovider/${id}`, 
            id: id
        });
    };

    /**
     * delete event handler to delete a service-provider:
     *  1. deletes a service-provider in the data storage, 
     *  2. calls deleteServiceProvider to update service-providers state in App.js
     * @param {Numeric} id 
     */
    const handleDeleteServiceProvider = (id) => {

        try {
            const url = `${config.REACT_APP_API_URL_SERVICE_PROVIDERS}/${id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json', 
                    'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
                },
                body: JSON.stringify({ user_id: user_id })
            }

            fetch(url, options)
                .then(res => {
                    if(!res.ok) {
                        throw Error('Oops! something went wrong: couldn\'t delete service provider');
                    }
                    return res.json();
                })
                .then(data => {
                    //delete service-provider state in App.js
                    props.deleteServiceProvider(id);
                })
                .catch(error => {
                    setOperationError(error);
                    setShowOperationError(true);
                })
        }
        catch(error) {
            setOperationError(error)
            setShowOperationError(true)
        }

        
    }

    const { id, user_id, name, description, address, telephone, email } = props.serviceProvider;
    const type = props.serviceProviderType;

    return (
        <div className="service-provider-container">
            <div className="service-provider-basic-info">
                
                <label className="type"> 
                    {type.name}
                </label>
                
                <label className="name">
                    {name}
                </label>

                <label className="description">
                    {description}
                </label>

                <label className="telehone">
                    {telephone}
                </label>

                <label className="email">
                    {email}
                </label>

                <label className="show-hide center" onClick={() => showHide(id)}>
                    +
                </label>
            </div>

            <div id={id} className="service-provider-address" display="none" >
                                    
                <label className="address-street">{address.street}</label>
                <label className="address-city-state-zipcode">{address.city}, {address.state}</label>
                <label className="address-zipcode">{address.zipcode}</label>
            </div>
            
            <div className="buttons-container">
                <input type="button" id="edit" value="Edit" onClick={() => handleUpdateServiceProvider(id)} />
                <input type="button" id="delete" value="Delete" onClick={() => handleDeleteServiceProvider(id)} />
            </div>

            { showOperationError && <ErrorMessage message={operationError} /> }
            
        </div>
    )
}

export default ServiceProvider;