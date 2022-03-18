import React, { useState, useEffect, Fragment } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete4 } from "../layout/Entetes";
import { formatDate } from "../layout/Formats";
import { toast } from "react-toastify";

export const FicheNumerations = ({
  idPatient,
  namePatient,
  lastNamePatient,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/fichenumeration")
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
  console.log(data);
  const result = data.filter((datas) => datas.patient === idPatient);

  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(3);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const currentData = result.slice(first, last);
  // console.log(currentData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentData.length > 0 ? (
        currentData.map((item) => {
          return (
            <Fragment>
              <div
                key={item.patient}
                className='card p-5 mb-2'
                style={{ width: "45rem", color: "#000", background: "#fff" }}
              >
                <Entete4 titre={"Fiche de Numeration"} />
                <div className='row my-3'>
                  <div className='col-md-6 text-end h6'>
                    Nom : {namePatient}
                  </div>
                  <div className='col-md-6 h6'>Prénom : {lastNamePatient}</div>
                </div>

                <img
                  src={item.fiche.data}
                  alt={namePatient}
                  className='responsive-img'
                />
                <p>Fait à Niamey, le {formatDate(item.date)}</p>
                <div className='col-md-6 text-end'>
                  <h6>Laborantin</h6>
                  <p>{item.agent}</p>
                </div>
              </div>
            </Fragment>
          );
        })
      ) : (
        <div
          className='d-flex flex-column 
                justify-content-center align-items-center
                text-center text-light display-3'
          style={{ height: "90vh", width: "100vw" }}
        >
          <div>Ce patient ne dispose d'aucun Fiche de Numeration !</div>
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
