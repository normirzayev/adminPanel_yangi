import React, { useContext } from "react";
import show from "../../../img/show.png";
import hidden from "../../../img/hidden.png";
import "./login.css";
import { useState } from "react";
import { DataContext } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";
export default function Login () {
  const path = useNavigate();
  const [shown, setSHown] = useState(true);
  const handleShow = () =>{
    setSHown(!shown);
  }
  const {captcha, handleLink, load, setLoad, setCaptcha} = useContext(DataContext)
  const [login, setLogin] = useState({
    username: "",
    email: "",
    password: ""
  })
  
  const changeLogin = (e) => {
    setLogin({...login, [e.target.name] : e.target.value})
  }
  const loginSubmit = (e) => {
    setLoad(true)
    e.preventDefault();
    console.log(login);
    let loginData = new FormData();
    loginData.append("username", login.username);
    loginData.append("email", login.email);
    loginData.append("password", login.password);
    axios({
      method:"post",
      url:"https://v2warehouseproject.pythonanywhere.com/dj-rest-auth/login/",
      data:loginData
    })
    .then((res) => {
      console.log(res);
      if(captcha !== loginCaptcha.captcha){
        setLoad(false)
        alert("robot emasligingizni tasdiqlang")
        setCaptcha(btoa(parseInt(Math.random() * 1000)))
        setLogin({
          username: "",
          email: "",
          password: ""
        })
      }
      else if(res.data.key && (captcha === loginCaptcha.captcha)){
        localStorage.setItem("token", JSON.stringify(res.data))
        localStorage.setItem("user", JSON.stringify(login))
        path("/");
        setLoad(false)
        setCaptcha(btoa(parseInt(Math.random() * 1000)))
        setLogin({
          username: "",
          email: "",
          password: ""
        })
      }
    })
    .catch(() => {
      console.log("login xatolik bor");
      setLoad(false)
      alert("to'ldirmadigiz yoki bu account ro'yxatdan o'tmagan")
      setCaptcha(btoa(parseInt(Math.random() * 1000)))
      setLogin({
        username: "",
        email: "",
        password: ""
      })
    })
  }

  const [loginCaptcha, setLoginCaptcha] = useState({
    captcha: ""
  })
  function handleChange(e) {
    setLoginCaptcha({...loginCaptcha, [e.target.name] : e.target.value})
  }
  return (
    <div className="login_oyna">
      <div className="login">
        <form onSubmit={loginSubmit}>
          <div className="forma_input">
            <dir className="form">
                <input type="text" placeholder=" " id="username" className="form_input" value={login.username} name="username" onChange={changeLogin} />
                <label className="form_label">username</label>
            </dir>
            <dir className="form_email form">
                <input type="text" placeholder=" " id="email" className="email_input" name="email" value={login.email} onChange={changeLogin} />
                <label className="email_label">email</label>
            </dir>
            <dir className="parol">
                <input type={shown ? "password" : "text"} placeholder=" " autoComplete=""  id="parol" name="password" value={login.password} onChange={changeLogin} className="parol_input" />
                {
                  shown ? <span className="show" onClick={() => handleShow()} ><img src={hidden} alt="show" /> </span> 
                  : <span className="hidden" onClick={() => handleShow()} ><img src={show} alt="hiden" /> </span>
                }
                <label className="parol_label">Parol</label>
            </dir>
          </div>
          <a href="#1" >Parolni unutdingizmi?</a>
          <div className="captcha">
            <p>{captcha}</p>
            <input type="text" 
              placeholder="Kaptchani kiriting" 
              name="captcha" 
              onChange={handleChange} 
              value={loginCaptcha.captcha} 
            />
            {
              loginCaptcha.captcha.length ? <span id="loginTozala" onClick={() => setLoginCaptcha({captcha : ""})}>x</span> : ""
            }
          </div>
          <button> Kirish </button>
          <div className="linkPath">
            <a href="#1" onClick={() => handleLink()}>
              Register
            </a>
          </div>
        </form>
      </div>
      {
        load ? <Loader /> : ""
      }
    </div>
  )
}