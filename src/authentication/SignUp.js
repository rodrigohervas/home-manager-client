import React, { useState, useEffect } from 'react';
// import './../style/signin.css';
import { NavLink, useHistory } from 'react-router-dom';
import FormErrorMessage from './../error-management/FormErrorMessage';
import ErrorMessage from './../error-management/ErrorMessage';
import config from './../config';

/**
 * Authentication SignUp component
 * @param {object} props 
 */
function SignUp(props) {

    //variable declaration
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [password, setPassword] = useState(localStorage.getItem('password') || '');

    const [UsernameError, setUsernameError] = useState(false);
    const [PasswordError, setPasswordError] = useState(false);
    
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    
    const history = useHistory();

    /** 
     * useEffect hook: clears localStorage if there's no username/password in localStorage
     */
    useEffect(() => {
        if(username !== '' && password !== '') {
            localStorage.clear();
        }
    }, [username, password])

    /**
     * event manager to set state to the changes in inputs
     * @param {event} e 
     */
    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value);
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }
    }

    /**
     * event handler to set errors changes in inputs onBlur
     * @param {event} e 
     */
    const validateInput = (e) => {
        const inputName = e.target.name;

        if(inputName === 'username') {
            if (!username.includes('@') || !username) {
                setUsernameError(true);
            }
            else { 
                setUsernameError(false);
            }
        }
        
        if(inputName === 'password') {
            if (!password || password.length < 3) {
                setPasswordError(true);
            }
            else { 
                setPasswordError(false);
            }
        }
    }

    /**
     * validator to check if username or password have an error.
     * Called from submit handler
     */
    const isValid = () => {
        if(UsernameError || PasswordError) {
            return false;
        }

        return true;
    }

    /**
     * function to clear errors after sign-in is done
     */
    const clearErrors = () => {
        setUsernameError(false);
        setPasswordError(false);
        setError(false);
    }

    /**
     * static information username and password creation and validation manager
     * @param {object} user 
     */
    const manageUser = (user) => {
        if(user.username === "michael@jones.com" && user.password === "michael") {
            localStorage.setItem('user_id', user.user_id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('password', user.password);
            
            history.push('/expensesdashboard');
            
            clearErrors();
        }
        else {
            setError({ message: 'Oops, there was a problem creating the user. Please try again.'});
            setShowError(true);
        }
    }

    /**
     * onSubmit event handler for the sign-up form
     * calls manageUser() 
     * @param {event} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isValid()) {
            const user = {
                user_id: 1,
                username: username, 
                password: password
            };

            manageUser(user);
        }
    }

    /**
     * render prop to update sign-in state in App.js
     */ 
    ////////////////////////////////////////// const { isLogged } = props

    return (
        <section className="form-container">
            <form className="signin-form" onSubmit={e => handleSubmit(e)} >
                <div className="form-group">
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input type="text" name="username" id="username" placeholder="john@doe.com" 
                           required 
                           onBlur={e => validateInput(e)}
                           onChange={e => handleChange(e)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" name="password" id="password" placeholder="your password" 
                           required 
                           onBlur={e => validateInput(e)}
                           onChange={e => handleChange(e)} />
                </div>

                <div className="form-group">
                    <input className="submit" type="submit" value="Sign Up" />
                </div>

                <div className="form-group">
                    <NavLink to="/signin" >Sign In</NavLink>
                </div>

                { UsernameError && <FormErrorMessage message={'invalid username'}/> }
                { PasswordError && <FormErrorMessage message={'invalid password'}/> }
                { showError && <ErrorMessage message={error} /> }

                <div>
                    <br /><br />
                    <p><b>Test user:</b> michael@jones.com</p>
                    <p><b>Test password:</b> michael</p>
                </div>

            </form>
        </section>
    )
}

export default SignUp