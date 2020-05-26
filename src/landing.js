import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles/landing.css';
import expensesImg from './img/expenses.png';
import serviceProvidersImg from './img/service-providers.png';
import signinImg from './img/signin.png';
import expensesDashboardImg from './img/expenses-dashboard.png';
import serviceProvidersDashboardImg from './img/service-providers-dashboard.png';

/**
 * Landing Page component
 */
function Landing() {

    const history = useHistory();

    return(
        <div className="landing">

            <div className="landing-top">
                <section className="landing-header">
                    <h1>Manage your home expenses</h1>
                    <h2>Home Manager helps you manage your home expenses and service provider contacts in a cloud-based centralized place for ease of mind</h2>
                    <input type="button" className="call-to-action-button" onClick={() => history.push('/signin')} value="Sign in!" />
                </section>
                
                <section className="landing-howitworks">
                    <h2>How it works:</h2>
                </section>
                
                <section className="landing-howitworks-cards">
                    <div className="landing-card">
                        <img src={expensesImg} className="card-img" alt="Expenses Dashboard" />
                        <h3>Add Expenses</h3>
                        <p>Add home expenses in a simple way and manage them in an easy accessible Dashboard.</p>
                    </div>
                    <div className="landing-card">
                        <img src={serviceProvidersImg} className="card-img" alt="Service Providers Dashboard" />
                        <h3>Add Service Providers</h3>
                        <p>Add service providers contacts and manage them in an easy accessible Dashboard.</p>
                    </div>
                    <div className="landing-card">
                        <img src={signinImg} className="card-img" alt="Data security" />
                        <h3>Protect your information</h3>
                        <p>Home manager protects access to your information and secure cloud-storage.</p>
                    </div>
                </section>
            </div>

            <section className="image-left">
                <h3>Expenses Dashboard </h3>
                <div className="image-left-bottom">
                    <img src={expensesDashboardImg} className="card-img" alt="Expenses Dashboard" />
                    <p>Home Manager lets you add and track all your home expenses in one easily accesible place.</p>
                </div>
            </section>

            <section className="image-right">
                <h3>Service Providers Dashboard </h3>
                <div className="image-right-bottom">
                    <p>Home Manager lets you add and track all your home expenses in one easily accesible place.</p>
                    <img src={serviceProvidersDashboardImg} className="card-img" alt="Service Providers Dashboard" />
                </div>
            </section>
        </div>
    );

}

export default Landing;