import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button,Logo,Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState("")

    const login = async (data) => {
        console.log(data);
        
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div
    className='flex item-center justify-center w-full'>
      <div>
         <div>
            <span>
                <Logo width="100px" />
            </span>
         </div>
         <h2>Sign in to your account</h2>
         <p>

         </p>
         {error && <p>{error}</p>}

         {/* //form */}
         {/* handleSubmit is a method where we give our method to submit */}
         <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: " 
                placeholder="Enter your Email"
                type="email"
                {...register("email", {
                    required: true,
                    validate:{
                        matchPattern: (value) => /fw/.
                        test(value) ||
                        "Email address must be valid",
                    }
                })}
                />
                <Input
                label="Password"
                type="password"
                placeholder="Enter your Password"
                {...register("password", {
                    required:true,
                })}
                />
                <Button 
                type="submit" 
                className='w-full'>Sign In</Button>
            </div>

         </form>
      </div>
    </div>
  )
}

export default Login
