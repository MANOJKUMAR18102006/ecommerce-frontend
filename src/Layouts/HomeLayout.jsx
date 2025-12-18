import { Outlet } from "react-router"
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const HomeLayout = () =>{
    return(
        <>
        <div className="bg-slate-900 h-screen">
        <Navigation/> 
        <Outlet/> 
        {/* <Footer/> */}
        </div>
        </>
    )
}

export default HomeLayout;