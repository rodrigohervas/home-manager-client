import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ServiceProvider from './service-provider';
import Types from './../static-data/types';
import './../styles/service-providers-dashboard.css';


function ServiceProvidersDashBoard(props) {

    //variable declaration
    const [sortCriteria, setSortCriteria] = useState('All');
    //const [month, setMonth] = useState(new Date().getMonth() + 1);
    
    const history = useHistory();

    /**
     * Generates the service-provider components for the serviceProvidersList passed as param
     * @param {Array} serviceProvidersList 
     */
    const generateServiceProviderComponents = (serviceProvidersList) => {
        return serviceProvidersList.map(serviceProvider => {
            return <ServiceProvider key={serviceProvider.id} serviceProvider={serviceProvider} deleteServiceProvider={deleteServiceProvider} />
          })
    };

    /**
     * Sorts through the serviceProviders to return an array containing the types of serviceProviders for sorting select
     * @param {Array} serviceProviders 
     */
    const getSortOptions = (serviceProviders) => {
        const allOptions = [];
        serviceProviders.map(serviceProvider => {
            if(!allOptions.includes(serviceProvider.type)) {
                allOptions.push(serviceProvider.type);
            }
            return null;
        });        
        return allOptions;
    };

    /**
     * Generates a list of option HTML element for the sort-serviceProviders-select Select
     * @param {Array} options 
     */
    const generateSortOptions = (options) => {
        let id = 0;
        return options.map(option => { 
            id++;
            return <option key={id} value={option}>{getTypeDescription(option)}</option>
        });
    };    

    /**
     * Get the type.description for the type.value passed in as param
     * @param {String} value 
     */
    const getTypeDescription = (value) => { 
        return Types[parseInt(value) - 1].description;
    };

    /**
     * Sorts the serviceProviders array by the type passed in the type param
     * @param {Array} serviceProviders 
     * @param {String} type 
     */
    const sortByType = (serviceProviders, type) => {
        if(type === 'All'){
            return serviceProviders;
        }
        return serviceProviders.filter(serviceProvider => serviceProvider.type === type);
    };

    /**
     * Event handler for the sort-serviceProviders-select onChange event
     * @param {Event} e 
     */
    const handleSort = (e) => {
        const sortCriteria = e.target.value;
        setSortCriteria(sortCriteria);
    };

    /**
     * Event handler for the onClick event to redirect to the Add Expense page
     */
    const handleAddServiceProvider = () => {
        history.push('/addserviceprovider');
    };


    // Get serviceProviders from props
    const { serviceProviders, deleteServiceProvider } = props;

    // Get serviceProviders sorted by sortCriteria: by default sortCriteria is 'All'
    const sortedServiceProviders = sortByType(serviceProviders, sortCriteria);
    
    //Generate list of serviceProviders react components to load
    const serviceProvidersList = generateServiceProviderComponents(sortedServiceProviders);

    //Get the list of types for sort-service-providers-select Select 
    const sortTypesList = getSortOptions(serviceProviders);
    
    //Get a list of option HTML elements for the sort-service-providers-select Select 
    const optionList = generateSortOptions(sortTypesList);
        

    return (
        <div className="serviceProvidersList">
            <div className="main-header">
                <h1>Service Providers Dashboard:</h1>
            </div>

            <div className="sort-service-providers-select">
                <label htmlFor="type">
                    Sort by Type:
                </label>
                <select id="type" name="type" onChange={(e) => handleSort(e)}>
                    <option id="select-option0" value="All"> All </option>
                    {optionList}
                </select>
                <button id="add-service-provider" className="add-service-provider-button" onClick={() => handleAddServiceProvider() }> Add Provider </button>
            </div>
            
            {/* All Service Providers */}
            {serviceProvidersList} 

            {/* No Service Providers available */}
            { serviceProvidersList.length <= 0 && 
                                           <div className="service-provider-container">
                                               <label>No expenses available </label>
                                           </div> }
        </div>
    )
}

export default ServiceProvidersDashBoard;