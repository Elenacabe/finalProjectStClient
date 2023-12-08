import { createContext, useEffect, useState } from "react"
import authService from "../services/auth.services"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [loggedUser, setLoggedUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(null)

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {

            authService
                .verify(token)
                .then(({ data }) => {
                    setLoggedUser(data.loggedUser)
                    if (data.loggedUser.role == 'ADMIN') {
                        setIsAdmin(true)
                    } else { setIsAdmin(false) }
                    setIsLoading(false)
                })
                .catch(err => logOut())
        } else {
            logOut()
        }
    }

    const logOut = () => {
        localStorage.removeItem('authToken')
        setLoggedUser(null)
        setIsLoading(false)
    }

    useEffect(() => {
        authenticateUser()

    }, [])


    return (
        <AuthContext.Provider value={{ loggedUser, authenticateUser, logOut, isLoading, isAdmin }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }