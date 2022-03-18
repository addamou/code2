import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { formatDate } from "../layout/Formats";
import { Pagination } from "../layout/Pagination";
import { Entete2 } from "../layout/Entetes";
import { toast } from "react-toastify";

export const CertificatVisiteMedicaux = ({
  idPatient,
  namePatient,
  lastNamePatient,
  lieuDeNaissance,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/certificatvisitemedicale")
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
  const [ParPage] = useState(5);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const currentData = result.slice(first, last);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentData.length > 0 ? (
        currentData.map((item) => {
          return (
            <div className='A4' key={item._id}>
              <Entete2 />
              <h3 className='my-5 text-center text-uppercase text-decoration-underline'>
                Certificat De Visite Médicale
              </h3>
              <p>
                En exécution des règlements en vigueur, nous soussigné{" "}
                <span className='fw-bold'>{item.agent}</span>
              </p>
              <p className='my-2'>
                Certifions que le (la) nommé (e):
                <span className='fw-bold'>
                  {" "}
                  {namePatient} {lastNamePatient}
                </span>
              </p>
              <p className='my-2'>
                {" "}
                Né (e) à :
                <span className='ms-2 fw-bold'>{lieuDeNaissance}</span>, le{" "}
                <span className='ms-2 fw-bold'>
                  {formatDate(dateDeNaissance)}
                </span>
              </p>
              <p className='text-justify fs-5 text-capitalize'>
                {item.justification}
              </p>
              <div className='text-end my-3'>
                Fait à Niamey, le {formatDate(item.date)}
              </div>
              <div className='text-end mt-5'>
                <h6 className='text-decoration-underline'>Médecin</h6>
                <p>{item.agent}</p>
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
          <div>
            Ce patient ne dispose d'aucun Certificat de Visite Médical !
          </div>
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
