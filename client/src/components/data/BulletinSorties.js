import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatAnnee, formatDate } from "../layout/Formats";
import { toast } from "react-toastify";

export const BulletinSorties = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/bulletinsortie")
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
              <h3 className='text-center text-decoration-underline my-3'>
                BULLETIN DE SORTIE
              </h3>
              <div className='row'>
                <div className='col-6'>
                  Nom du malade :{" "}
                  <span className='fw-bold'>{`${namePatient} ${lastNamePatient}`}</span>
                </div>
                <div className='col-6 text-end'>
                  Age:{" "}
                  <span className='fw-bold'>
                    {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                  </span>
                  {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                    ? "ans"
                    : "an"}
                </div>
              </div>
              <div className='text-capitalize'>
                <p className='mr-3 fs-5 my-2'>
                  Motif d'hospitalisation:{" "}
                  <span className='fw-bold'>{item.motifHospitalisation}</span>
                </p>
                <div className='row'>
                  <p className='col-6 fs-5 my-2'>
                    Periode du:{" "}
                    <span className='fw-bold'>
                      {formatDate(item.debutPeriode)}
                    </span>
                  </p>
                  <p className='col-6 fs-5 my-2'>
                    Au:{" "}
                    <span className='fw-bold'>
                      {formatDate(item.finPeriode)}
                    </span>
                  </p>
                </div>

                <p className='mr-3 fs-5 my-2'>
                  Durée d'hospitalisation:{" "}
                  <span className='fw-bold'>
                    {item.dureeHospitalisation} jours
                  </span>
                </p>

                <p className='mr-3 fs-5 my-2'>
                  Diagnostic Retenu:{" "}
                  <span className='fw-bold'>{item.diagnosticRetenu}</span>
                </p>

                <p className='mr-3 fs-5 my-2'>
                  Date de sortie:{" "}
                  <span className='fw-bold'>{formatDate(item.dateSortie)}</span>
                </p>

                <p className='fs-5 my-2'>Ordonnance de sortie:</p>

                <span className='fw-bold my-2'>{item.ordonnanceSortie1}</span>

                <span className='fw-bold my-2'>{item.ordonnanceSortie2}</span>

                <span className='fw-bold my-2'>{item.ordonnanceSortie3}</span>

                <p className='mr-3 h5 my-2'>
                  Visite retour:{" "}
                  <span className='fs-4 fw-bold'>
                    {formatDate(item.visiteRetour)}
                  </span>
                </p>
                <div className='row mt-3'>
                  <div className='text-start'>
                    <h6>Le malade (ou son repondant)</h6>
                  </div>
                  <div className='text-end'>
                    <h6 className='text-decoration-underline'>Le Médecin</h6>
                    <p>{item.agent}</p>
                  </div>
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
          <div>Ce patient ne dispose d'aucun Bulletin de Sortie !</div>
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
