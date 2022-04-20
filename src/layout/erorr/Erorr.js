import React from "react"
import { useNavigate } from "react-router-dom"
import "./erorr.css";
export default function Erorr(){
  const err = useNavigate();
  return(
    <div className="erorr" title="bosh sahifaga qayting">
      <div className="bosh">
        <span></span>
        <span></span>
        <span id="ogiz"></span>
      </div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <h3>The page doesn't exist or is unavailable</h3>
      <button onClick={() => err("/")} >Bosh sahifa</button>
    </div>
  )
}