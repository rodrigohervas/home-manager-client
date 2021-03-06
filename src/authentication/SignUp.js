import React, { useState, useEffect } from 'react';
import './../styles/signin.css';
import { NavLink, useHistory } from 'react-router-dom';
import config from './../config';
import { showHide } from './../helpers/helpers';
import FormErrorMessage from './../error-management/FormErrorMessage';
import ErrorMessage from './../error-management/ErrorMessage';


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

        if(inputName === 'repeatPassword') {
            if (password !== e.target.value) {
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
     * fetch that posts the user to the API and stores it in localStorage
     * @param {object} user 
     */
    const manageUser = (user) => {
        const url = config.REACT_APP_API_URL_USERS
        const authorization = `Bearer ${config.REACT_APP_API_KEY}`

        const options = { 
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
                'Authorization': authorization
            },
            body: JSON.stringify(user)
        };

        //Add loader while fetching
        showHide('loader');

        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw Error( 'Oops, something went wrong...')
            }
            return res.json()
        })
        .then(userDB => {
            if(userDB) {
                localStorage.setItem('user_id', userDB.id);
                localStorage.setItem('username', userDB.username);
                localStorage.setItem('password', userDB.password);
                localStorage.setItem('isSignedIn', true);
                
                clearErrors();

                //Hide loader
                showHide('loader');
                
                history.push('/expensesdashboard');
            }
        })
        .catch(error => {
            //setError({ message: 'Oops, there was a problem creating the user. Please try again.'});
            setError(error)
            setShowError(true)

            //Hide loader
            showHide('loader');
        })
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
                    <label htmlFor="repeatPassword">
                        Repeat Password:
                    </label>
                    <input type="password" name="repeatPassword" id="repeatPassword" placeholder="repeat your password" 
                           required 
                           onBlur={e => validateInput(e)}
                           onChange={e => handleChange(e)} />
                </div>

                <div className="form-group">
                    <input className="signin-submit" type="submit" value="Sign Up" />
                </div>

                <div className="form-group">
                    <NavLink className="link" to="/signin" >Sign In</NavLink>
                </div>

                <div id="loader" className="loader"></div>

                <div>
                    <br /><br />
                    <p><b>Test user:</b> michael@jones.com</p>
                    <p><b>Test password:</b> michael</p>
                </div>

                { UsernameError && <FormErrorMessage message={'invalid username'}/> }
                { PasswordError && <FormErrorMessage message={'invalid password'}/> }
                { showError && <ErrorMessage message={error} /> }

            </form>
        </section>
    )
}

export default SignUp