import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete4 } from "../layout/Entetes";
import { formatDate } from "../layout/Formats";
import { toast } from "react-toastify";

export const BulletinExamens = ({
  idPatient,
  namePatient,
  lastNamePatient,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/bulletinexamen")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Une s'est produit lors de la récuperation des données !", {
          position: "top-center",
        });
      });
  }, []);

  const result = data.filter((datas) => datas.patient === idPatient);

  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(3);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const currentData = result.slice(first, last);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentData.length > 0 ? (
        currentData.map((item) => {
          return (
            <div
              key={item._id}
              className='card p-5 mb-2'
              style={{ width: "45rem", color: "#000", background: "#fff" }}
            >
              <Entete4 titre={"BULLETIN D'EXAMEN"} />
              <div className='row my-3'>
                <div className='col-md-6 text-end h6'>Nom : {namePatient}</div>
                <div className='col-md-6 h6'>Prénom : {lastNamePatient}</div>
              </div>
              <div className='row border' style={{ background: "#CACACA" }}>
                <div className='col-md-6 border-right'>
                  <b>DEMANDES</b>
                </div>
                <div className='col-md-6'>
                  <b>REPONSES</b>
                </div>
              </div>
              <div className='row border' style={{ background: "#f5f5f5" }}>
                <div className='col-md-6 border-right text-start'>
                  {item.data.map((it) => (
                    <p className='my-auto' key={it.label}>
                      {it.label}
                    </p>
                  ))}
                </div>
                <div className='col-md-6'>
                  {item.data.map((it) => (
                    <p className='my-auto' key={it.response}>
                      {it.response}
                    </p>
                  ))}
                </div>
              </div>
              <div className='text-end mt-4'>
                <h6>Fait à Niamey, Le {formatDate(item.date)}</h6>
              </div>
              <div className='row'>
                <div className='col-md-6 text-start'>
                  <h6>Le Médecin</h6>
                  <p>{item.medecin}</p>
                </div>
                <div className='col-md-6 text-end'>
                  <h6>Laborantin</h6>
                  <p>{item.laborantin}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div
          className='d-flex flex-column 
                justify-content-center align-items-center
                text-center text-light display-3'
          style={{ height: "90vh", width: "100vw" }}
        >
          <div>Ce patient ne dispose d'aucun Bulletin d'Examen !</div>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
        <Pagination
          ParPage={ParPage}
          total={result.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};
