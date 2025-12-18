import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const SignupForm = () => {
    const [name, setname] = useState('');
    const [role, setrole] = useState('');
    const [email, setemail] = useState('');
    const passwordRef = useRef('');
    const navigate = useNavigate()

    const handleNameChange = (e) => {
        setname(e.target.value);
    }

    const handleRole = (e) => {
        setrole(e.target.value)
    }

    const handleEmail=(e)=>{
        setemail(e.target.value)
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        console.log(name,email, passwordRef.current.value, role)
        const {data}=await axios.post("https://ecommerce-backend-f0eb.onrender.com/auth/register",{
            name:name,
            email:email,
            password:passwordRef.current.value,
            role:role
        });
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
        
    }



    return (
        <>
            <div className="h-screen flex justify-center items-center">
                <div className=" w-[400px] flex flex-col justify-center items-center mx-auto p-2 bg-gradient-to-r from-orange-200 via-red-400 to-orange-700 shadow-lg rounded-xl">
                    <h1 className="font-bold text-2xl mb-5 pt-5">SignUp</h1>
                    <input type="text" placeholder="name" className="border p-2 mb-5 rounded-[5px] w-[80%]"
                        value={name} onChange={handleNameChange} />
                    <input type="text" placeholder="email" className="border p-2 rounded-[5px] mb-5 w-[80%]"
                        value={email} onChange={handleEmail} />
                    <input type="password" placeholder="Password" className="border p-2 rounded-[5px] mb-5 w-[80%]"
                        ref={passwordRef} />
                    <input type="text" placeholder="role" className="border p-2 rounded-[5px] mb-5 w-[80%]"
                        value={role} onChange={handleRole} />
                    <button className="bg-gradient-to-r from-slate-600 to-blue-500 text-white text-lg px-3 py-1 rounded-lg mb-4 mt-4 transition transform-transition duration-300 hover:scale-110 cursor-pointer" onClick={handleSumbit}>Register</button>
                </div>
            </div>

        </>
    )
}

export default SignupForm;