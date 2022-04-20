import React, {useContext} from "react"
import { DataContext } from "../context/Context"
import Login from "./login/Login"
import Register from "./register/Register"
export default function Royxat(){

  const {loginBolleam} = useContext(DataContext)
  return(
    
    <>
      {
        loginBolleam ? <Login /> : <Register /> 
      }
    </>
      
  ) 
}