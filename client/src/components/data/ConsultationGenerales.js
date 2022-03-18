import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatAnnee } from "../layout/Formats";
import { toast } from "react-toastify";

export const ConsultationGenerales = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/generale")
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
              <h3 className='text-center text-uppercase text-decoration-underline my-2'>
                Consultation médecine Génerale
              </h3>

              <div className='text-capitalize'>
                <div className='row'>
                  <div className='col-4'>
                    Nom et Prénom:{" "}
                    <span className='fw-bold'>
                      {namePatient} {lastNamePatient}
                    </span>
                  </div>
                  <div className='col-4 text-center'>
                    Age:{" "}
                    <span className='fw-bold'>
                      {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                      {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                        ? "ans"
                        : "an"}
                    </span>
                  </div>
                  <div className='col-4 text-end'>
                    Sexe : <span className='fw-bold'>{item.sexe}</span>
                  </div>
                </div>

                <div className='row'>
                  <span className='col-6'>
                    Adresse : <span>{item.adresse}</span>
                  </span>
                  <span className='col-6 text-end'>
                    Fonction : <span>{item.fonction}</span>
                  </span>
                </div>
                <p className='my-1'>
                  <span className='mr-3'>
                    Motif de Consultation :{" "}
                    <span>{item.motifConsultation}</span>
                  </span>
                </p>
                <span>- Intérrogatoires </span>
                <p className='my-1'>
                  <span className='mr-3'>
                    Médical : <span className='mr-4'>{item.medical}</span>
                  </span>
                  <span className='mr-3'>
                    chirurgical :{" "}
                    <span className='ml-4'>{item.chirurgical}</span>
                  </span>
                </p>
                <span>ATCD Personnels :</span>
                <p className='my-1'>
                  <span className='mr-3'>
                    gyneco-obstetrique : <span> {item.gynecoObstetrique}</span>
                  </span>
                </p>
                <p className='my-1'>
                  <span className='mr-3'>
                    Allergies Medicamenteuse ou alimentation :{" "}
                    <span>{item.allergies}</span>
                  </span>
                </p>
                <span>- ATCDs</span>
                <p className='my-1'>
                  <span className='mr-3'>
                    Familiaux : <span>{item.familiaux}</span>
                  </span>
                </p>
                <p className='my-1'>
                  <span className='mr-3'>
                    Automédication ou prescription médicale reçu:{" "}
                    <span>{item.automedication}</span>
                  </span>
                </p>
                <p className='my-1'>
                  <span className='mr-3'>
                    Hospitalisation recente pour :{" "}
                    <span>{item.hospitalisationRecente}</span>
                  </span>
                </p>
                <span>Constantes :</span>
                <div className='row'>
                  <span className='col-3'>
                    {" "}
                    T° <span className='fw-bold'>{item.t}</span>
                  </span>
                  <span className='col-3'>
                    FC <span className='fw-bold'>{item.fc}</span>
                  </span>

                  <span className='col-3'>
                    SpO2 <span className='fw-bold'>{item.spo2}</span>
                  </span>
                  <span className='col-3'>
                    TA <span className='fw-bold'>{item.ta}</span>
                  </span>
                </div>
                <p className='my-1'>
                  <span className='mr-3'>
                    Signe Généreaux : <span>{item.signeGenereaux}</span>
                  </span>
                </p>
                <p className='my-1'>
                  <span className='mr-3'>
                    Examen Physique : <span>{item.examenPhysique}</span>
                  </span>
                </p>
                <p className='my-1'>
                  <span className='mr-3'>
                    Soins reçu en urgence à l'admission :{" "}
                    <span>{item.soinsRecuUrgence}</span>
                  </span>
                </p>
                <p className='my-1'>
                  <span className='mr-3'>
                    {" "}
                    Examens complementaires et resultats :{" "}
                    <span>{item.examenResultat}</span>
                  </span>
                </p>
                <p className='my-1'>
                  <span className='mr-3'>
                    {" "}
                    Ordonnance prescrite et/ou hospitalisation :{" "}
                    <span>{item.ordonnanceHospitalisation}</span>
                  </span>
                </p>
              </div>
              <br />

              <div className='text-end'>
                <h6 className='text-decoration-underline'> Le Médecin:</h6>
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
            Ce patient ne dispose d'aucune Fiche de Consultation Generale !
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
