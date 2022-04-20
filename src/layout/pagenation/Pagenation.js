import React, {useContext, useState} from "react";
import "./pagenation.css";
import { DataContext } from "../../components/context/Context";
import Select from "../selecet/Select";
export default function Pagenation(){
  const {postsPerPage, totalPosts, pagenate, } = useContext(DataContext);
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i);
  }
  const [activPag, setActivPag] = useState(0)
  const activ = (post,i) =>{
    pagenate(post)
    setActivPag(i)
  }
  return(
    <div className="pagenation">
      <ul>
        {
          pageNumbers.map((item, i) => (
            <li key={item} >
              <a className={i===activPag ? "activv" : ""} onClick={() => activ(item,i)} href="#1">
                {item}
              </a>
            </li>
          ))
        }
        <Select />
      </ul>
    </div>
  )
}