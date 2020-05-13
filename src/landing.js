import React from 'react';

/**
 * Landing Page component
 */
function Landing() {

    return(
        <div className="landing">
            <section className="landing-header">
                <h1>Manage your home expenses</h1>
                <h2>Home Manager helps you manage your home expenses and service provider contacts in a cloud-based centralized place for ease of mind.</h2>
            </section>
            
            <section className="landing-howitworks">
                <h2>How it works:</h2>
            </section>

            <section className="landing-howitworks-cards">
                <div className="landing-card">
                    <h3>Add Expenses</h3>
                    <p>Add home expenses in a simple way and manage them in an easy accessible Dashboard.</p>
                </div>
                <div className="landing-card">
                    <h3>Add Service Providers</h3>
                    <p>Add service providers contacts and manage them in an easy accessible Dashboard.</p>
                </div>
                <div className="landing-card">
                    <h3>Protect your information</h3>
                    <p>Home manager protects access to your information.</p>
                </div>
            </section>

            <section className="image-left">
                <h3>Expenses Dashboard </h3>
                <p>[Page Holder to Expenses Dashboard]</p>
                <p>Home Manager lets you add and track all your home expenses in one easily accesible place.</p>
            </section>

            <section className="image-right">
                <h3>Service Providers Dashboard </h3>
                <p>Home Manager lets you add and track all your home expenses in one easily accesible place.</p>
                <p>[Page Holder to Expenses Dashboard]</p>
            </section>
        </div>
    );

}

export default Landing;