import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete2 } from "../layout/Entetes";
import { formatAnnee, formatDate } from "../layout/Formats";
import { toast } from "react-toastify";

export const ConsultationPediatriques = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/pediatrique")
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
              <Entete2 />
              <h3 className='my-3 text-center text-decoration-underline'>
                CONSULTATION PEDIATRIE
              </h3>
              <div className='text-capitalize'>
                <div className='row mb-0'>
                  <div className='col-6'>
                    <p className='fs-5'>
                      Nom et Prénom:{" "}
                      <span className='fw-bolder'>
                        {namePatient} {lastNamePatient}
                      </span>
                    </p>
                  </div>
                  <div className='col-3 text-center'>
                    <p className='fs-5'>
                      Age :{" "}
                      <span className='fw-bolder'>
                        {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                        {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                          ? "ans"
                          : "an"}
                      </span>
                    </p>
                  </div>
                  <div className='col-3 text-end'>
                    <p className='fs-5'>
                      Sexe: <span className='fw-bolder'>{item.sexe}</span>
                    </p>{" "}
                  </div>
                </div>
                <div>
                  <p className='fs-5 mb-1'>
                    Adresse : <span className='fw-bolder'>{item.adresse}</span>
                  </p>
                  <p className='fs-5 my-1'>
                    Maladie Connue :{" "}
                    <span className='fw-bolder'>{item.maladieConnue}</span>
                  </p>
                  <p className='fs-5 my-1'>
                    Motif de Consultation :{" "}
                    <span className='fw-bolder'>{item.motifConsultation}</span>
                  </p>
                </div>

                <div>
                  <h5 className='mt-3'>Constante et Monsuration:</h5>
                  <div className='row justtify-content-between'>
                    <div className='col-md-3'>
                      <p className='fs-5'>
                        Poids : <span className='fw-bolder'>{item.poids}</span>
                      </p>
                    </div>
                    <div className='col-md-3'>
                      <p className='fs-5'>
                        Taille :{" "}
                        <span className='fw-bolder'>{item.taille}</span>
                      </p>
                    </div>
                    <div className='col-md-3'>
                      <p className='fs-5'>
                        PC : <span className='fw-bolder'>{item.pc}</span>
                      </p>
                    </div>
                    <div className='col-md-3'>
                      <p className='fs-5'>
                        T° : <span className='fw-bolder'>{item.t}</span>
                      </p>
                    </div>
                  </div>

                  <div className='row justtify-content-between'>
                    <div className='col-md-3'>
                      <p className='fs-5'>
                        FR : <span className='fw-bolder'>{item.fr}</span>
                      </p>
                    </div>
                    <div className='col-md-3'>
                      <p className='fs-5'>
                        FC : <span className='fw-bolder'>{item.fc}</span>
                      </p>
                    </div>
                    <div className='col-md-3'>
                      <p className='fs-5'>
                        SaO2 : <span className='fw-bolder'>{item.sao2}</span>
                      </p>
                    </div>
                    <div className='col-md-3'>
                      <p className='fs-5'>
                        TA : <span className='fw-bolder'>{item.ta}</span>
                      </p>
                    </div>
                  </div>
                  <p className='fs-5'>
                    Examen Physique :{" "}
                    <span className='fw-bolder'>{item.examenPhysique}</span>
                  </p>
                  <p className='fs-5'>
                    Bilan resultats :{" "}
                    <span className='fw-bolder'>{item.bilanResultats}</span>
                  </p>
                  <p className='fs-5'>
                    Diagnostic :{" "}
                    <span className='fw-bolder'>{item.diagnostic}</span>
                  </p>
                  <p className='fs-5'>
                    Traitement :{" "}
                    <span className='fw-bolder'>{item.traitement}</span>
                  </p>
                  <p className='fs-5'>
                    Rendez-vous : <span className='fw-bolder'>{item.rdv}</span>
                  </p>
                </div>
                <div className='text-end'>
                  <p>Fait à Niamey le {formatDate(item.date)}</p>
                </div>
                <div className='text-end text-capitalize mt-5'>
                  <h6 className='text-decoration-underline'> Le Médecin:</h6>
                  <p>{item.agent}</p>
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
          <div>
            Ce patient ne dispose d'aucun Fiche de Consultation Pédiatrique !
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
