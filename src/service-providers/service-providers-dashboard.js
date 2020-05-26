import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ServiceProvider from './service-provider';
import './../styles/service-providers-dashboard.css';


function ServiceProvidersDashBoard(props) {

    //variable declaration
    const [sortCriteria, setSortCriteria] = useState('All');
    
    const history = useHistory();

    /**
     * Generates the service-provider components for the serviceProvidersList passed as param
     * @param {Array} serviceProvidersList 
     */
    const generateServiceProviderComponents = (serviceProvidersList) => {
        return serviceProvidersList.map(serviceProvider => {
            return <ServiceProvider key={serviceProvider.id} 
                                    serviceProvider={serviceProvider} 
                                    deleteServiceProvider={deleteServiceProvider} 
                                    serviceProviderType={types[serviceProvider.type_id - 1]} />
          });
    };

    /**
     * Sorts through the serviceProviders to return an array containing the types of serviceProviders for sorting select
     * @param {Array} serviceProviders 
     */
    const getSortOptions = (serviceProviders) => {
        const allOptions = [];
        serviceProviders.map(serviceProvider => {
            if(!allOptions.includes(serviceProvider.type_id)) {
                allOptions.push(serviceProvider.type_id);
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
        if(options) {
            let id = 0;
            return options.map(option => { 
                id++;
                return <option key={id} value={option}>{getTypeName(option)}</option>
            });
        }
        return <option key="0" value="0">No data available</option>
    };    

    /**
     * Get the type.name for the type.id passed in as param
     * @param {String} id 
     */
    const getTypeName = (id) => { 
        if(types.length > 0) {
            return types[parseInt(id) - 1].name;
        }
        return 'no data';
    };

    /**
     * Sorts the serviceProviders array by the type passed in the type param
     * @param {Array} serviceProviders 
     * @param {String} type 
     */
    const sortByType = (serviceProviders, sortCriteria) => {
        if(sortCriteria === 'All'){
            return serviceProviders;
        }
        return serviceProviders.filter(serviceProvider => serviceProvider.type_id === parseInt(sortCriteria));
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
    const { serviceProviders, deleteServiceProvider, types } = props;

    // Sort serviceProviders by sortCriteria: by default sortCriteria is 'All'
    const sortedServiceProviders = sortByType(serviceProviders, sortCriteria);
        
    // Generate list of serviceProviders react components to load
    const serviceProvidersList = generateServiceProviderComponents(sortedServiceProviders);


    // Types Select: Get the list of types for sort-service-providers-select Select 
    const sortTypesList = getSortOptions(serviceProviders);
        
    // Types Select: Get a list of option HTML elements for the sort-service-providers-select Select 
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
                <input type="button" id="add-service-provider" className="add-service-provider-button add-button" onClick={() => handleAddServiceProvider() } value="Add Provider" />
            </div>

            <div className="service-providers-list-container">
            
                {/* All Service Providers */}
                {serviceProvidersList} 

                {/* No Service Providers available */}
                { serviceProvidersList.length <= 0 && 
                                            <div className="service-provider-container">
                                                <label>No Service Providers available </label>
                                            </div> }
            </div>
        </div>
    )
}

export default ServiceProvidersDashBoard;