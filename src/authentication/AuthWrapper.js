import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'

/**
 * Authorization Component to validate if user can access sections based on sign-in
 * @param {object} props 
 */
function AuthWrapper(props) {

    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [password, setPassword] = useState(localStorage.getItem('password') || '')
    const history = useHistory()

    /**
     * useEffect hook that validates is there user is signed-in, 
     * then redirects:
     * a. if user is signed in: to the children component (defined in App.js)
     * b. if user is not signed in: to SignIn component
     */
    useEffect(() => {
        if (username === '' || password === '') {
            history.push('/signin')
        }
    }, [])

    return(
        <div>
            {props.children}
        </div>
    )

}

export default AuthWrapper