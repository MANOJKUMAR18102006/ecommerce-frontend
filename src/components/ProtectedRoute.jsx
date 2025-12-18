import { Navigate } from "react-router";

const ProtectedRoute = ({children}) => {
    const isLogged=sessionStorage.getItem('isLogged')==='true';
    return(
        isLogged ? children : <Navigate to="/login"/>
    )
}

export default ProtectedRoute;