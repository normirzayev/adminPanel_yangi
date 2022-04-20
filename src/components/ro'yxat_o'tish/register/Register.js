import React, { useState, useContext } from "react";
import "./register.css";
import hidden from "../../../img/hidden.png";
import shows from "../../../img/show.png";
import axios from "axios";
import { DataContext } from "../../context/Context";
export default function Register(){
  const {handleLink, setLoad} = useContext(DataContext)
  const [show, setShow] = useState(true);
  const handleShow = () => {
    setShow(!show)
  }

  const [register, setRegister] = useState({
    username : "",
    password1 : "",
    password2 : "",
    email:""
  })

  const dataChange = (e) => {
    setRegister({...register, [e.target.name] : e.target.value})
  }

  const registerSubmit = (e) => {
    setLoad(true)
    e.preventDefault();
    let formData = new FormData();
    formData.append("username", register.username);
    formData.append("email", register.email);
    formData.append("password1", register.password1);
    formData.append("password2", register.password2);
    
    axios({
      method:"post",
      url:"https://v2warehouseproject.pythonanywhere.com/dj-rest-auth/registration/",
      data: formData
    })
    .then((res)=>{
      if(res.data.key){
        handleLink()
        localStorage.setItem("token", JSON.stringify(res.data))
        localStorage.setItem("user", JSON.stringify(register))
        setLoad(false)
      }
    })
    .catch(() => {
      console.log("xatolik bor")
      alert("to'ldirmadigiz yoki bu account ro'yxatdan o'tgan")
      setLoad(false)
    })
  }

  return(
    <div className="register">
      <form action="#" onSubmit={registerSubmit}>
        <div>
          <input type="text" 
            placeholder="username" 
            name="username"
            value={register.username}
            onChange={dataChange}
          />
        </div>
        <div>
          <input type="text"   name="email"
            value={register.email}
            onChange={dataChange} placeholder="email" />
        </div>
        <div className="password">
          <input type={show ? "password" : "text"} 
            placeholder="password" 
            name="password1"
            value={register.password1}
            onChange={dataChange}  
          />
          {
            show ? <span><img src={hidden} onClick={() => handleShow()} alt="img" /></span>
            :  <span><img src={shows} onClick={() => handleShow()} alt="img" /></span>
          }
        </div>
        <div className="password" >
          <input type={show ? "password" : "text"} 
            placeholder="Repassword" 
            name="password2"
            onChange={dataChange}
            value={register.password2}
          />
          {
            show ? <span><img src={hidden} onClick={() => handleShow()} alt="img" /></span>
            :  <span><img src={shows} onClick={() => handleShow()} alt="img" /></span>
          }
        </div>
        <div className="send">
          <button> send </button>
        </div>
        <div className="linkPath">
            <a href="#1" onClick={() => handleLink()}>
              login
            </a>
          </div>
      </form>
    </div>
  )
}