import {createContext, useContext, useEffect, useMemo, useState} from "react";
import Transport from "../../transport";

const authContext = createContext(null);

export function ProvideAuth({children}) {

    const api = new Transport();

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setLoading(true)
            api.apiGetUserByToken(token).then(user => {
                setUser(user)
                setToken(token)
            }).finally(() => setLoading(false))
        }
    }, [])

    function remember (token) {
        localStorage.setItem('token', token);
    }

    function signIn(credentials, cb, errorCb) {
        setLoading(true)
        api.apiLogin(credentials)
            .then(({token, user}) => {
                setUser(user)
                setToken(token)
                if(cb && typeof cb === 'function') {
                    cb()
                }
                if(credentials.remember) {
                    remember(token)
                }
            })
            .catch(err => {
                if(err.response.status === 422) {
                    errorCb(err.response.data)
                }
            })
            .finally(() => setLoading(false))
    }

    function logOut(cb) {
        setUser(null)
        setToken(null)
        if(cb && typeof cb === 'function') {
            cb()
        }
        localStorage.removeItem('token');
    }

    const logged = useMemo(() => !!user, [user]);

    return <authContext.Provider value={{user, signIn, logOut, logged, token, loading}}>
        {children}
    </authContext.Provider>
}

export function useAuth() {
    return useContext(authContext)
}