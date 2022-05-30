import {useAuth} from "../context/authContext";
import {Navigate, useLocation} from "react-router-dom";

export default function UdPrivateRoute({children}) {
    const auth = useAuth()
    const location = useLocation()
    if(auth.logged) {
        return children
    }
    return <Navigate
        to='/login'
        state={{ from: location }}
        replace
    />
}