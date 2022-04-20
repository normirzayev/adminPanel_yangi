import React, { useContext } from "react"
import { faBarcode, faImage, faPlusCircle, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { DataContext } from "../context/Context";
import Loader from "../loader/Loader";
import "./qoshish.css";
import { useNavigate } from "react-router-dom"
export default function Qoshish() {
  const path = useNavigate();
  
  const { creatData, setCreate, dataMaxsulot, load, setLoad } = useContext(DataContext);

  // malumot qo'shish
  const dataChange = (e) => {
    setCreate({ ...creatData, [e.target.name]: e.target.value })
  }
  //img_upload
  const img_upload = (e) => {
    setCreate({ ...creatData, rasm: e.target.files[0] })
  }
  const dataSubmit = (e) => {
    setLoad(true)
    e.preventDefault();
    console.log(creatData);
    let formData = new FormData();
    formData.append("nom", creatData.nom);
    formData.append("tur", creatData.tur);
    formData.append("rang", creatData.rang);
    formData.append("narx", creatData.narx);
    formData.append("son", creatData.son);
    formData.append("kompania", creatData.kompania);
    formData.append("mudat", creatData.mudat);
    formData.append("kg", creatData.kg);
    formData.append("izoh", creatData.izoh);
    formData.append("sana", creatData.sana);
    formData.append("qr_code", creatData.qr_code);
    formData.append("barcode", creatData.barcode);
    formData.append("rasm", creatData.rasm);
    axios({
      method: "post",
      url: "https://v2warehouseproject.pythonanywhere.com/products/",
      data: formData
    })
      .then((res) => {
        console.log(res)
        dataMaxsulot()
        setLoad(false)
        path("/");
      })
      .catch(() => {
        console.log("xatolik bo'ldi")
        setLoad(false)
        alert("mahsulot to'ldirilmagan")
      })
  }
  return (
    <>
      <div className="qoshish">
        <form onSubmit={dataSubmit} >
          <div className="header-flex">
            <h1>Mahsulot qo'shish</h1>
            <button type="submit"> <FontAwesomeIcon icon={faPlusCircle} /> mahsulotni qo'shish</button>
          </div>
          <div className="mahsulot_kirit">
            <div>
              <div className="mahsulot_img">
                <label htmlFor="rasm">
                  <FontAwesomeIcon icon={faImage} />
                </label>
                <input type="file" id="rasm" onChange={img_upload} />
              </div>
            </div>
            <div className="mahsulot_kiritish">
              <div className="mahsulot_view">
                <div>
                  <p>QR kodi:</p>
                  <label htmlFor="QR"> <FontAwesomeIcon icon={faQrcode} /> </label>
                  <input type="file" id="QR" onChange={img_upload} />
                </div>
                <div>
                  <p>barcode:</p>
                  <label htmlFor="shtrix"> <FontAwesomeIcon icon={faBarcode} /> </label>
                  <input type="file" id="shtrix" onChange={img_upload} />
                </div>
              </div>
              <div className="yuzi_toliq">
                <label>Nomi</label>
                <input type="text" placeholder="mahsulot nomini kiriting"
                  name="nom" value={creatData.nom} onChange={dataChange}
                />
              </div>
              <div className="mahuslot_input">
                <div>
                  <label>soni</label>
                  <input type="number" placeholder="soni..."
                    name="son" value={creatData.son} onChange={dataChange}
                  />
                </div>
                <div>
                  <label>narxi:</label>
                  <input type="text"
                    name="narx" value={creatData.narx} onChange={dataChange}
                  />
                </div>
                <div>
                  <label>rang:</label>
                  <input type="text" placeholder="rangi"
                    name="rang" value={creatData.rang} onChange={dataChange}
                  />
                </div>
                <div>
                  <label>kompania:</label>
                  <input type="text" placeholder="kompania nomi"
                    name="kompania" value={creatData.kompania} onChange={dataChange}
                  />
                </div>
                <div>
                  <label>vazni:</label>
                  <input type="number" placeholder="raqam kiriting"
                    name="kg" value={creatData.kg} onChange={dataChange}
                  />
                </div>
                <div>
                  <label>tur:</label>
                  <input type="text" placeholder="mahsulot turi"
                    name="tur" value={creatData.tur} onChange={dataChange}
                  />
                </div>
                <div>
                  <label>Omborga kiritilgan sanasi:</label>
                  <input type="date"
                    name="sana" value={creatData.sana} onChange={dataChange}
                  />
                </div>
                <div>
                  <label>Yaroqlilik Muddati:</label>
                  <input type="text"
                    name="mudat" value={creatData.mudat} onChange={dataChange}
                  />
                </div>
              </div>
              <div className="yuzi_toliq">
                <label>Qo'shimcha izoh:</label>
                <textarea id="textarea"
                  value={creatData.izoh}
                  onChange={dataChange}
                  name="izoh"
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
      {
        load ? <Loader /> : ""
      }
    </>
  )
}