import React,{useState} from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import { login } from '../../store/authSlice'
import {Button, Input, Logo} from ',/index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function SignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const signup = async (data) => {
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const user = await authService.getCurrentUser()
                if(user){
                    dispatch(login(user));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>
      <div>
      <span>
         <Logo width="100px" />
      </span>
      </div>
    
    <form onSubmit={handleSubmit(SignUp)}>
        <div className='space-y-5'>
            <Input 
            label= "Fullname"
            placeholder='Enter your name'
            type="text"
            {...register("fullname", {
                required:true,
            })}
            />
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
  )
}

export default SignUp
