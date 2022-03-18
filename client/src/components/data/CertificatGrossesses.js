import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { formatDate } from "../layout/Formats";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { toast } from "react-toastify";

export const CertificatGrossesses = ({
  idPatient,
  namePatient,
  lastNamePatient,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/certificatgrossesse")
      .then((res) => setData(res.data))
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
            <div className='A4 mb-2' key={item._id}>
              <Entete1 date={item.date} />
              <h2 className='text-center text-decoration-underline my-5'>
                CERTIFICAT DE GROSSESSE
              </h2>
              <div className='text-capitalize fs-5'>
                <p className='ps-3'>
                  Soussigné Dr{" "}
                  <span className='fw-bolder me-2'> {item.agent},</span>
                  Gynécologue-Obstétricien de la clinique Afoua.
                </p>
                <p className=''>
                  Certifie avoir examiné ce jour{" "}
                  <span className='ms-2 fw-bolder'>
                    {formatDate(item.date)}
                  </span>
                  , la nommée:{" "}
                  <span className='ms-2 fw-bolder'>
                    {namePatient} {lastNamePatient}
                  </span>{" "}
                  et déclare que la patiente à une Grossesse de :
                  <span className='ms-2 fw-bolder'>{item.nbreSemaine}</span>{" "}
                  Semaines d'aménorrhé{" "}
                  <b className='ps-2'>( {item.nbreMois} )</b> mois.{" "}
                </p>
                <p className=''>
                  L'accouchement est prévu le{" "}
                  <span className='ms-2 fw-bolder'>
                    {formatDate(item.datePrevu)}
                  </span>
                </p>
                <p className='fw-bolder'>Sauf Complication</p>
                <div className='text-end my-5 fs-6'>
                  Fait à Niamey, le {formatDate(item.date)}
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />

              <div className='text-end'>
                <h6 className='text-decoration-underline'>Le Médecin</h6>
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
          <div>Ce patient ne dispose d'aucun Certificat de Grossesse !</div>
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
