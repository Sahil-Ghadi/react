import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// protection mechanism
export default function AuthLayout({children, authentication=true}) {
  const navigate= useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state=> state.auth.status)

  useEffect(() => {
    //true && false!=true
   if(authentication && authStatus !== authentication){
    navigate("/login")
   }
   //false && true!=true
   else if(!authentication && authentication !== authStatus){
    navigate("/")
   }
   setLoader(false)
  }, [authStatus,navigate,authentication])
  
    return (
   loader? <h1>Loading....</h1> : <>{children}</>
  )
}
