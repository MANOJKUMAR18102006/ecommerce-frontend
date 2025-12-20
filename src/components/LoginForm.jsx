import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
    const [username, setusername] = useState('');
    const [role, setrole] = useState('');
    const passwordRef = useRef('');
    const navigate = useNavigate()

    const handleNameChange = (e) => {
        setusername(e.target.value);
    }

    const handleRole = (e) => {
        setrole(e.target.value)
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        console.log(username, passwordRef.current.value, role)
        try {
            const { data } = await axios.post("https://ecommerce-backend-f0eb.onrender.com/auth/login", {
                email: username,
                password: passwordRef.current.value,
                role: role
            })
            console.log("response=>", data);
            toast.success(data.message);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('isLogged', true)
            sessionStorage.setItem('role', role);
            if (role === 'admin') {
                navigate('/admin');
                return;
            }
            else {
                navigate('/')
                return;
            }
        } catch (err) {
            toast.warning("Invalid user")
        }
    }



    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className="w-[70%] h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage:"url('https://static.vecteezy.com/system/resources/previews/004/604/661/non_2x/concept-of-online-shopping-on-website-and-mobile-application-3d-smartphone-in-form-of-mini-shop-with-shopping-bag-vector.jpg')"}} >
                </div>
                <div className=" w-[30%] flex flex-col text-white justify-center items-center p-2 bg-slate-800 h-screen shadow-lg">
                    <h1 className="font-bold text-2xl mb-10 pt-5">Login</h1>
                    <input type="text" placeholder="Email" className="border p-3 text-white rounded-[5px] w-[80%] mb-10"
                        value={username} onChange={handleNameChange} />
                    <input type="password" placeholder="Password" className="border p-3 rounded-[5px]  w-[80%] mb-10"
                        ref={passwordRef} />
                    <input type="text" placeholder="role" className="border p-3 rounded-[5px] w-[80%] mb-5"
                        value={role} onChange={handleRole} />
                    <button className="bg-gradient-to-r from-slate-600 to-blue-500 text-white text-lg px-3 py-1 rounded-lg mb-4 mt-4 transition transform-transition duration-300 hover:scale-110 cursor-pointer mb-5" onClick={handleSumbit}>Login</button>
                    <h1>Don't have an account ? <Link to="/signup" className="underline hover:text-blue-800 text-purple-600">register</Link></h1>
                </div>

            </div>

        </>
    )
}

export default LoginForm;