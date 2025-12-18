import { Navigate } from "react-router";

const PrivateRoute=({children})=>{
    const isLogged=sessionStorage.getItem('isLogged')==='true';
    const role=sessionStorage.getItem('role');
    return(
        isLogged && role==='admin' ? children : <Navigate to="/login"/>
    )
}

export default PrivateRoute;