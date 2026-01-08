import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Navigation = () => {

    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    useEffect(() => {
        const logged = sessionStorage.getItem("isLogged");
        setIsLogged(logged === "true");
    }, []);

    const handleLogout = () => {
        sessionStorage.clear(); 
        setIsLogged(false);
        toast.success("Logged out successfully");
        navigate("/");
    };

    const handleSignup=()=>{
        navigate('/signup')
    }

    return (
        <>
            <div className="w-full">
                {!isLogged?
                <div className="w-full bg-slate-700 flex justify-between items-center">
                    <h1 className="text-[30px] text-white font-bold ml-3">MobiStore</h1>
                    <nav className="space-x-5 text-white font-semibold ">
                        <Link to="/" className="hover:text-red-400">Home</Link>
                        <Link to="/products" className="hover:text-red-400">Product</Link>
                        <Link to="/cart" className="hover:text-red-400">Cart</Link>
                        <Link to="/orders" className="hover:text-red-400">Orders</Link>
                        <Link to="/about" className="hover:text-red-400">About</Link>
                    </nav>
                    <div className="text-white space-x-3 mr-3">
                        <button className="bg-stone-900 p-2 pl-3 pr-3 rounded-[30px] m-3 hover:bg-white hover:text-stone-900" onClick={handleLogin}>Login</button>
                        <button className="bg-violet-600 p-2 pl-3 pr-3 rounded-[30px] m-3 hover:bg-white hover:text-stone-900" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
                :(
                 <div className="w-full bg-slate-700 flex justify-between items-center">
                    <h1 className="text-[30px] text-white font-bold ml-3">MobiStore</h1>
                    <nav className="space-x-5 text-white font-semibold">
                        <Link to="/" className="hover:text-red-400">Home</Link>
                        <Link to="/products" className="hover:text-red-400">Product</Link>
                        <Link to="/cart" className="hover:text-red-400">Cart</Link>
                        <Link to="/orders" className="hover:text-red-400">Orders</Link>
                        <Link to="/about" className="hover:text-red-400">About</Link>
                        <Link to="/profile" className="hover:text-red-400">Profile</Link>
                    </nav>
                    <div className="text-white space-x-3 mr-3">
                        <button className="bg-stone-900 p-2 pl-3 pr-3 rounded-[30px] m-3 hover:bg-white hover:text-stone-900" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                 )
}
            </div>
        </>
    );
}

export default Navigation;