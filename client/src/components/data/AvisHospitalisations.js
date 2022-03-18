import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Entete1 } from "../layout/Entetes";
import { formatDate, formatHeure } from "../layout/Formats";
import { Pagination } from "../layout/Pagination";
import { toast } from "react-toastify";

export const AvisHospitalisations = ({
  idPatient,
  namePatient,
  lastNamePatient,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/avishospitalisation")
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
            <div className='A4 mb-2' key={item._id}>
              <Entete1 date={item.date} />
              <h3 className='my-2 text-center text-decoration-underline'>
                AVIS D'HOSPITALISATION
              </h3>
              <div className='text-capitalize text-justify'>
                <p className='fs-5 my-2'>
                  <span>A :</span>{" "}
                  <span className='fw-bold'>{item.assurance}</span>
                </p>
                <p className='fs-5 my-2'>
                  <span>Patient :</span>{" "}
                  <span className='fw-bold'>{`${namePatient} ${lastNamePatient}`}</span>
                </p>
                <p className='fs-5 my-2'>
                  <span>Numéro d'assuré :</span>{" "}
                  <span className='fw-bold'>{item.numAssure}</span>
                </p>
                <p className='fs-5 my-2'>
                  <span>Nom de l'assuré :</span>{" "}
                  <span className='fw-bold'>{item.nomAssure}</span>
                </p>
                <p className='fs-5 my-2'>
                  <span>Société :</span>{" "}
                  <span className='fw-bold'>{item.societe}</span>
                </p>
                <p className='fs-5 my-2'>
                  <span>Diagnostic clinique d'entrée :</span>{" "}
                  <span className='fw-bold'>{item.diagnostic}</span>
                </p>
                <p className='fs-5 my-2'>
                  <span>Date et Heure d'Hospitalisation :</span>{" "}
                  <span className='fw-bold'>
                    {formatDate(item.dateHospitalisation)} à{" "}
                    {formatHeure(item.timeHospitalisation)}
                  </span>
                </p>
                <p className='fs-5 my-2'>
                  <span>Durée d'Hospitalisation :</span>{" "}
                  <span className='fw-bold'>{item.dureeHospitalisation}</span>
                </p>
              </div>

              <div className='text-end mt-3'>
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
