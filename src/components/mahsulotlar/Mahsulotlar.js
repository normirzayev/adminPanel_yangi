import React, {useContext,useState} from "react";
import { DataContext } from "../context/Context";
import { faEdit, faPlusCircle, faSearch, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"
import "./mahsulot.css";
import Pagenation from "../../layout/pagenation/Pagenation";
import axios from "axios";
import Loader from "../loader/Loader";
export default function Mahsulotlar(){
  const path = useNavigate();  
  const {currentPosts, dataMaxsulot, load,setLoad, setEditData, dark} = useContext(DataContext);
  const [searchTeam, setSerachTeam] = useState("");
  const [search, setSearch] = useState(true);
  const handleSerach = () => {
    setSearch(!search);
    setSerachTeam("")
  }
  
  // o'chirish
  const del = (item) => { 
    setLoad(true)
    axios({
      method:"delete",
      url:`https://v2warehouseproject.pythonanywhere.com/products/${item.sana.slice(0, 4)}/${item.sana.slice(5, 7)}/${item.sana.slice(8, 10)}/${item.id}`
    })
    .then((res) => {
      dataMaxsulot()
    })
    .catch(() => {
      console.log("xato")
      setLoad(false)
    })
  }

  // edit
  const editDatafun = (item) => {
    setEditData(item)
    path("/mahsulottahrirlash")
  }
  
  return(
    <>
      <div className="mahsulotlar">
        <div className="header-flex">
          <h1>Mahsulotlar</h1>
          <button onClick={()=> path("/mahsulotqoshish")}> <FontAwesomeIcon icon={faPlusCircle} /> mahsulot qo'shish</button>
        </div>
        <div className="mahsulot_table">
          <table>
            <thead>
              <tr>
                <th>t/r</th>
                <th>
                  nomi
                  <div className={search ? "searchTeam" : "searchTeam searchActive"}>
                    <FontAwesomeIcon icon={faSearch} className="searchIcon" onClick={handleSerach}/>
                    <input type="text" 
                      placeholder="search..."
                      className={search ? "searchInput" : "searchInput searchActive"}
                      value={searchTeam}
                      onChange={(e) => {
                        setSerachTeam(e.target.value)
                      }}
                    />
                    {
                      searchTeam.length ? <span className="tozala" onClick={() => setSerachTeam("")} >x</span> : ""
                    }
                  </div>
                </th>
                <th>soni</th>
                <th>kompania</th> 
                <th>narxi</th>
                <th>rasmi</th>
                <th>operatsiya</th>
              </tr>
            </thead>
            <tbody>
              {
                currentPosts.filter((val) => {
                  if(searchTeam === "") {
                    return val
                  }
                  else if (val.nom.toLowerCase().includes(searchTeam.toLowerCase())){
                    return val
                  }
                }).map(item => (
                  <tr key={item.id} className={dark ? "tbody_tr" : "tbody_tr dark_tr"}>
                    <th>t/r</th>
                    <td>{item.nom}</td>
                    <td>{item.son}</td>
                    <td>{item.kompania}</td>
                    <td>{item.narx}$ </td>
                    <td><div className="mahsulot_rasmi"><img src={item.rasm} alt="mahsulot rasmi" /></div></td>
                    <td>
                      <button className="edit"> <FontAwesomeIcon icon={faEdit} onClick={() => editDatafun(item) } /> </button>
                      <button className="delete" onClick={() => del(item)} > <FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
              <Pagenation />
        </div>
      </div>
      {
        load ? <Loader /> : ""
      }
    </>
  )
}