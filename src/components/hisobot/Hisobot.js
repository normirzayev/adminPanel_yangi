import React, {useContext, useState} from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagenation from "../../layout/pagenation/Pagenation";
import { DataContext } from "../context/Context";
import "./hisobot.css";
export default function Hisobot(){
  const {currentPosts, dark} = useContext(DataContext);
  const [searchTeam, setSerachTeam] = useState("");
  const [search, setSearch] = useState(true);
  const handleSerach = () => {
    setSearch(!search);
    setSerachTeam("")
  }
  return(
    <div className="hisobot">
      <div className="header-flex">
        <h1>hisobot</h1>
        <div className="saralash">
          <input type="date" />
          dan
          <input type="date" />
          gacha
          <button>Saralash</button>
        </div>
      </div>
      <div className="mahsulot_table">
        <table>
          <thead>
            <tr>
              <th>t/r</th>
              <th>
                nomi
                <div className={search ? "searchTeam" : "searchTeam searchActive"} >
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
              <th>rangi</th>
              <th>vazn</th>
              <th>mudat</th>
              <th>rasmi</th>
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
                  <td>{item.rang}</td>
                  <td>{item.kg}</td>
                  <td>{item.mudat}</td>
                  <td><div className="mahsulot_rasmi"><img src={item.rasm} alt="mahsulot rasmi" /></div></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Pagenation /> 
      </div>
    </div>
  )
}