import React, { useEffect, useState } from "react";
import axios from "axios";
export const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  // login (register)

  // malumot boshlang'ich ( Read )
  const [data, setData] = useState([]);
  const dataMaxsulot = () =>{
    setLoad(true)
    axios({
      method: "GET",
      url:"https://v2warehouseproject.pythonanywhere.com/products/?format=json"
    })
      .then((res) => {
        setData(res.data)
        setLoad(false)
      })
      .catch(() => {
        setLoad(false)
        console.log("xatolik boldi")
      })
  }

  useEffect(() => {
    dataMaxsulot()
  }, [])

  // malumot qo'shish (state)
  const [creatData, setCreate] = useState({
    tur: "",
    nom: "",
    rang: "",
    narx: "",
    son: "",
    kompania: "",
    mudat: "",
    kg: "",
    izoh: "",
    sana: "",
    qr_code: "",
    barcode: "",
    rasm: ""
  })

  // malumotni tahrirlash qilish (edit)
  const [editData, setEditData] = useState({
    tur: "",
    nom: "",
    rang: "",
    narx: "",
    son: "",
    kompania: "",
    mudat: "",
    kg: "",
    izoh: "",
    sana: "",
    qr_code: "",
    barcode: "",
    rasm: ""
  })
  
  // captcha 
  const [captcha, setCaptcha] = useState(btoa(parseInt(Math.random() * 1000)));

  // pagenation qilish
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const index0LastPost = currentPage * postsPerPage;
  const index0FirstPost = index0LastPost - postsPerPage;
  const currentPosts = data.slice(index0FirstPost, index0LastPost);
  let totalPosts = data.length;
  const pagenate = (pageNumbers) => {
    setCurrentPage(pageNumbers)
  }

  // select 
  const [select, setSelect] = useState({
    select: null
  })

  // loader
  const [load, setLoad] = useState(false);
  // register va login true false
  const [loginBolleam, setLoginBolleam] = useState(false);
  const handleLink = () => {
    setLoginBolleam(!loginBolleam);
  }

  // darkMode 
  const [dark, setDark] = useState(true);
  const handleDark = () => {
    setDark(!dark);
  }
  return (
    <DataContext.Provider value={{ 
        currentPosts, setData, captcha, totalPosts, postsPerPage, pagenate, select, setSelect, 
        creatData, setCreate, editData, setEditData, dataMaxsulot, load, setLoad, loginBolleam,setLoginBolleam, handleLink, setCaptcha, dark, handleDark
    }}>
      {children}
    </DataContext.Provider>
  )
}
export default DataContextProvider;