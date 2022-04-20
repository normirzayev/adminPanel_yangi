import React, { useContext } from "react"
import { faBarcode, faImage, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataContext } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
export default function EditData() {
  const path = useNavigate();
  const { editData, setEditData, load,setLoad, dataMaxsulot } = useContext(DataContext)
  const changeEditData = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }
  function submitdata(e) {
    setLoad(true)
    e.preventDefault();
    let formEditData = new FormData();
    formEditData.append("nom", editData.nom);
    formEditData.append("tur", editData.tur);
    formEditData.append("rang", editData.rang);
    formEditData.append("narx", editData.narx);
    formEditData.append("son", editData.son);
    formEditData.append("kompania", editData.kompania);
    formEditData.append("mudat", editData.mudat);
    formEditData.append("kg", editData.kg);
    formEditData.append("izoh", editData.izoh);
    formEditData.append("sana", editData.sana);
    axios({
      method: "put",
      url: `https://v2warehouseproject.pythonanywhere.com/products/${editData.sana.slice(0, 4)}/${editData.sana.slice(5, 7)}/${editData.sana.slice(8, 10)}/${editData.id}`,
      data: formEditData
    })
    .then((res) => {
      dataMaxsulot()
      path("/")
      setLoad(false)
    })
    .catch(() => {
      console.log("edit qilishda xatolik bo'ldi ");
    })
  }
  return (
    <>
      <div className="qoshish">
        <form onSubmit={submitdata}>
          <div className="header-flex">
            <h1>Mahsulot haqida</h1>
            <button type="submit">o'zgartirish</button>
          </div>
          <div className="mahsulot_kirit">
            <div>
              <div className="mahsulot_img">
                <label htmlFor="rasm">
                  <FontAwesomeIcon icon={faImage} />
                </label>
                <input type="file" id="rasm" />
              </div>
            </div>
            <div className="mahsulot_kiritish">
              <div className="mahsulot_view">
                <div>
                  <p>QR kodi:</p>
                  <label htmlFor="QR"> <FontAwesomeIcon icon={faQrcode} /> </label>
                  <input type="file" id="QR" />
                </div>
                <div>
                  <p>barcode:</p>
                  <label htmlFor="shtrix"> <FontAwesomeIcon icon={faBarcode} /> </label>
                  <input type="file" id="shtrix" />
                </div>
              </div>
              <div className="yuzi_toliq">
                <label>Nomi</label>
                <input type="text" placeholder="mahsulot nomini kiriting"
                  name="nom"
                  value={editData.nom}
                  onChange={changeEditData}
                />
              </div>
              <div className="mahuslot_input">
                <div>
                  <label>soni</label>
                  <input type="number" placeholder="soni..."
                    name="son"
                    value={editData.son}
                    onChange={changeEditData}
                  />
                </div>
                <div>
                  <label>narxi:</label>
                  <input type="text"
                    name="narx"
                    value={editData.narx}
                    onChange={changeEditData}
                  />
                </div>
                <div>
                  <label>rang:</label>
                  <input type="text" placeholder="rangi"
                    name="rang"
                    value={editData.rang}
                    onChange={changeEditData}
                  />
                </div>
                <div>
                  <label>kompania:</label>
                  <input type="text" placeholder="kompania nomi"
                    name="kompania"
                    value={editData.kompania}
                    onChange={changeEditData}
                  />
                </div>
                <div>
                  <label>vazni:</label>
                  <input type="number" placeholder="raqam kiriting"
                    name="kg"
                    value={editData.kg}
                    onChange={changeEditData}
                  />
                </div>
                <div>
                  <label>tur:</label>
                  <input type="text" placeholder="mahsulot turi"
                    name="tur"
                    value={editData.tur}
                    onChange={changeEditData}
                  />
                </div>
                <div>
                  <label>Omborga kiritilgan sanasi:</label>
                  <input type="date"
                    name="sana"
                    value={editData.sana}
                    onChange={changeEditData}
                  />
                </div>
                <div>
                  <label>Yaroqlilik Muddati:</label>
                  <input type="text"
                    name="mudat"
                    value={editData.mudat}
                    onChange={changeEditData}
                  />
                </div>
              </div>
              <div className="yuzi_toliq">
                <label>Qo'shimcha izoh:</label>
                <textarea id="textarea"
                  name="izoh"
                  value={editData.izoh}
                  onChange={changeEditData}
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