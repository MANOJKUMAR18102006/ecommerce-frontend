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
                <div className="w-full bg-slate-700 flex flex-col sm:flex-row justify-between items-center px-3 py-2">
                    <h1 className="text-xl sm:text-2xl lg:text-[30px] text-white font-bold mb-2 sm:mb-0">MobiStore</h1>
                    <nav className="flex flex-wrap justify-center gap-3 sm:gap-5 text-white font-semibold text-sm sm:text-base">
                        <Link to="/" className="hover:text-red-400">Home</Link>
                        <Link to="/products" className="hover:text-red-400">Product</Link>
                        <Link to="/cart" className="hover:text-red-400">Cart</Link>
                        <Link to="/orders" className="hover:text-red-400">Orders</Link>
                        <Link to="/about" className="hover:text-red-400">About</Link>
                    </nav>
                    <div className="text-white flex gap-2 mt-2 sm:mt-0">
                        <button className="bg-stone-900 px-3 py-2 rounded-[30px] hover:bg-white hover:text-stone-900 text-xs sm:text-sm" onClick={handleLogin}>Login</button>
                        <button className="bg-violet-600 px-3 py-2 rounded-[30px] hover:bg-white hover:text-stone-900 text-xs sm:text-sm" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
                :(
                 <div className="w-full bg-slate-700 flex flex-col sm:flex-row justify-between items-center px-3 py-2">
                    <h1 className="text-xl sm:text-2xl lg:text-[30px] text-white font-bold mb-2 sm:mb-0">MobiStore</h1>
                    <nav className="flex flex-wrap justify-center gap-3 sm:gap-5 text-white font-semibold text-sm sm:text-base">
                        <Link to="/" className="hover:text-red-400">Home</Link>
                        <Link to="/products" className="hover:text-red-400">Product</Link>
                        <Link to="/cart" className="hover:text-red-400">Cart</Link>
                        <Link to="/orders" className="hover:text-red-400">Orders</Link>
                        <Link to="/about" className="hover:text-red-400">About</Link>
                        <Link to="/profile" className="hover:text-red-400">Profile</Link>
                    </nav>
                    <div className="text-white mt-2 sm:mt-0">
                        <button className="bg-stone-900 px-3 py-2 rounded-[30px] hover:bg-white hover:text-stone-900 text-xs sm:text-sm" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                 )
}
            </div>
        </>
    );
}

export default Navigation;