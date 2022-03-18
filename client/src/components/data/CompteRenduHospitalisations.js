import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete2 } from "../layout/Entetes";
import { formatDate, formatAnnee } from "../layout/Formats";
import { toast } from "react-toastify";

export const CompteRenduHospitalisations = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/compterenduhospitalisation")
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
              <Entete2 date={item.date} />
              <h3 className='text-center text-decoration-underline my-2'>
                COMPTE RENDU D'HOSPITALISATION
              </h3>
              <div className='text-capitalize'>
                <div className='row'>
                  <div className='col-6'>
                    Nom et Prénom :{" "}
                    <span className='fw-bold'>
                      {namePatient} {lastNamePatient}
                    </span>
                  </div>
                  <div className='col-3 text-center'>
                    Age :{" "}
                    <span className='fw-bold'>
                      {" "}
                      {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                      {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                        ? "ans"
                        : "an"}{" "}
                    </span>
                  </div>
                  <div className='col-3 text-end'>
                    Sexe : <span className='fw-bold'>{item.sexe}</span>
                  </div>
                </div>

                <p className='my-1'>
                  <span>
                    Motif d'Hospitalisation :{" "}
                    <em className='mx-2 fw-bold'>
                      {item.motifHospitalisation}
                    </em>
                  </span>
                </p>
                <p className='my-1'>
                  Hospitalisé du :{" "}
                  <span className='mx-2 fw-bold'>
                    {formatDate(item.debutHospitalisation)}
                  </span>
                  <span>
                    au :
                    <span className='mx-2 fw-bold'>
                      {formatDate(item.finHospitalisation)}
                    </span>
                  </span>
                </p>
                <strong> ATCD</strong>
                <p>Personnels</p>
                <p className='my-1'>
                  Médicale :<span className='mx-2'>{item.medicale}</span>
                </p>
                <p className='my-1'>
                  <span></span>
                </p>
                <p className='my-1'>
                  Chirurgical : <span className='mx-2'>{item.chururgical}</span>
                </p>
                <p className='my-1'>
                  Gynéco-obstétrique :
                  <span className='mx-2'>{item.gynecoObstretrique}</span>
                </p>
                <p className='my-1'>
                  Familiers :<span className='mx-2'>{item.familiers}</span>
                </p>
                <p className='my-1'>
                  Examens à l'entrée :
                  <span className='mx-2'>{item.examenEntree}</span>
                </p>
                <div className='row'>
                  <div className='col-3'>
                    T° :<span className='fw-bolde'> {item.t} °c</span>
                  </div>
                  <div className='col-3'>
                    TA :<span className='fw-bolde'>{item.ta}</span>
                  </div>
                  <div className='col-3'>
                    Poids :<span className='fw-bolde'>{item.poids} Kg</span>
                  </div>
                  <div className='col-3'>
                    Taille :<span className='fw-bolde'>{item.taille}</span>
                  </div>
                </div>
                <p className='my-1'>
                  Etat Général :{" "}
                  <span className='mx-2'>{item.etatGeneral}</span>
                </p>
                <p className='my-1'>
                  Coeur : <span className='mx-2'>{item.coeur}</span>
                </p>
                <p className='my-1'>
                  Poumons : <span className='mx-2'>{item.poumons}</span>
                </p>
                <p className='my-1'>
                  ABD : <span className='mx-2'>{item.abd}</span>
                </p>
                <p className='my-1'>
                  ORL : <span className='mx-2'>{item.orl}</span>
                </p>
                <p className='my-1'>
                  Autres app : <span className='mx-2'>{item.autresApp}</span>
                </p>
                <p className='my-1'>
                  Examens demandés :{" "}
                  <span className='mx-2'>{item.examenDemandes}</span>
                </p>
                <p className='my-1'>
                  Diagnostic Retenu :{" "}
                  <span className='mx-2'>{item.diagnosticRetenu}</span>
                </p>
                <p className='my-1'>
                  Conduite à Ténir :{" "}
                  <span className='mx-2'>{item.conduiteTenir}</span>
                </p>
                <p className='my-1'>
                  Evolution : <span className='mx-2'>{item.evolution}</span>
                </p>

                <div className='text-end'>
                  <h6 className='text-decoration-underline'> Le Médecin</h6>
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
            Ce patient ne dispose d'aucun Fiche de Compte Rendu
            d'hospitalisation !
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
