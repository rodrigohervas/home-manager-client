import React from 'react';
import { useHistory } from 'react-router-dom';
import './../styles/service-provider.css';
import { showHide } from './../helpers/helpers';
import Types from './../static-data/types';

function ServiceProvider(props) {

    //Declaration of variables
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

        //TODO: DELETE IN DATA STORAGE
        // 1. create http url and options
        // 2. call fetch

        //delete service-provider state in App.js
        props.deleteServiceProvider(id);
    }

    //get the type.description for the type.value passed in as param
    const getTypeDescription = (value) => { 
        return Types[parseInt(value) - 1].description;
    };

    const { id, user_id, type, name, description, address, telephone, email } = props.serviceProvider;

    return (
        <div className="service-provider-container">
            <div className="service-provider-basic-info">
                
                <label className="type"> 
                    { getTypeDescription(type) }
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
            
        </div>
    )
}

export default ServiceProvider;