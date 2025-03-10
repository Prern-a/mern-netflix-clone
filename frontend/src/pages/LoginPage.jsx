import {Link,useNavigate} from 'react-router-dom';
import {useState} from "react";
import { useAuthStore } from '../store/authUser';

const LoginPage = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const{login}=useAuthStore();
  const navigate=useNavigate();
 const handleLogin=async (e)=>{
    e.preventDefault();
    
   const success=await login({email,password});

   if(success){
    window.location.reload();
    useNavigate("/");
   }
 }
  return( 
    <div className="h-screen w-full hero-bg">
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
            <Link to={"/"}>
            <img src="/netflix-logo.png" alt="logo" className='w-52'/>
            </Link>
        </header>
        <div className='max-w-6xl mx-auto flex items-center justify-center'>
            <div className='w-full max-w-md p-8 space-y-6 bg-black bg-opacity-80 rounder-lg shadow-md'>
                <h1 className='text-2xl font-semibold text-white text-center'>Sign In</h1>
                <form className='mt-4 space-y-4' onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className='block text-gray-300 text-sm font-medium'>Email</label>
                        <input type="email" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring" placeholder='youexample@gmail.com' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>

                    
                    <div>
                        <label htmlFor="password" className='block text-gray-300 text-sm font-medium'>Password</label>
                        <input type="password" className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring" placeholder='********' id='password' value={password} onChange={(e)=>setPassword(e.target.value) }/>
                    </div>


                    <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>Sign In</button>
                </form>
                <div className='text-center text-gray-400'>Don't have an account?  
                    <Link to={'/signup'} className='text-red-500 hover:underline'> Sign Up</Link>
                    
            </div>
        </div>
    </div>
    </div>
    );
};

export default LoginPage;
