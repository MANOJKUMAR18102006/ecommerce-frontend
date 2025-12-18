import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {toast} from "react-toastify";

const LoginForm = () => {
    const [username, setusername] = useState('');
    const [role,setrole]=useState('');
    const passwordRef = useRef('');
    const navigate = useNavigate()

    const handleNameChange = (e) => {
        setusername(e.target.value);
    }
    
    const handleRole= (e) => {
        setrole(e.target.value)
    }

    const handleSumbit = async(e) => {
        e.preventDefault();
        console.log(username, passwordRef.current.value,role)
        try{
        const {data}=await axios.post("https://ecommerce-backend-f0eb.onrender.com/auth/login",{
            email:username,
            password:passwordRef.current.value,
            role:role
        })
        console.log("response=>",data);
        toast.success(data.message);
        sessionStorage.setItem('token',data.token);
        sessionStorage.setItem('isLogged',true)
        sessionStorage.setItem('role',role);
        if(role==='admin'){
            navigate('/admin');
            return;
        }
        else{
            navigate('/')
            return;
        }
    }catch(err){
        toast.warning("Invalid user")
    }
    }



    return (
        <>
        <div className="h-screen flex justify-center items-center">
            <div className=" w-[400px] flex flex-col justify-center items-center mx-auto p-2 bg-gradient-to-r from-orange-200 via-red-400 to-orange-700 shadow-lg rounded-xl">
                <h1 className="font-bold text-2xl mb-5 pt-5">Login</h1>
                <input type="text" placeholder="Username" className="border p-2 rounded-[5px] w-[80%]"
                    value={username} onChange={handleNameChange} />
                <input type="password" placeholder="Password" className="border p-2 rounded-[5px] my-5 w-[80%]"
                    ref={passwordRef} />
                <input type="text" placeholder="role" className="border p-2 rounded-[5px] w-[80%]"
                    value={role} onChange={handleRole} />
                <button className="bg-gradient-to-r from-slate-600 to-blue-500 text-white text-lg px-3 py-1 rounded-lg mb-4 mt-4 transition transform-transition duration-300 hover:scale-110 cursor-pointer" onClick={handleSumbit}>Login</button>
            </div>
            </div>

        </>
    )
}

export default LoginForm;