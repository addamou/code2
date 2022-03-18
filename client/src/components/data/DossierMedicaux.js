import React, { Fragment, useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatHeure, formatDate } from "../layout/Formats";
import { toast } from "react-toastify";

export const DossierMedicaux = ({
  idPatient,
  namePatient,
  lastNamePatient,
  date,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/dossier")
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
            <div className='A4 mb-2' key={item._id}>
              <Entete1 date={item.date} />
              <h3 className='my-2 text-center text-decoration-underline'>
                DOSSIER MEDICAL
              </h3>
              <div className='text-capitalize'>
                <div className='d-flex row'>
                  <div className='col-6'>
                    <p className='py-1'>
                      Nom et Prénom:{" "}
                      <span className='fw-bold'>
                        {namePatient} {lastNamePatient}
                      </span>
                    </p>
                  </div>
                  <div className='col-3'>
                    <p className='py-1'>
                      {" "}
                      Age :{" "}
                      <span className='fw-bold'>
                        {parseInt(date.getFullYear()) -
                          parseInt(dateDeNaissance)}
                        <span className='ms-1'>
                          {parseInt(date.getFullYear()) -
                            parseInt(dateDeNaissance) >
                          1
                            ? "ans"
                            : "an"}
                        </span>
                      </span>
                    </p>
                  </div>
                  <div className='col-3'>
                    <p className='py-1'>
                      Sexe: <span className='fw-bold'>{item.sexe}</span>
                    </p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-4'>
                    Adresse: <em className='ml-1 fw-bold'>{item.adresse}</em>
                  </div>
                  <div className='col-8'>
                    Observation prise par: Dr{" "}
                    <em className='ml-1 fw-bold'>{item.medecin}</em>
                  </div>
                </div>
                <div>
                  <h4 className='text-center'>Type d'Assurance</h4>
                  <p className='my-1'>
                    Nom et Prénom Assuré:{" "}
                    <span className='fw-bold ml-1'>{item.assure}</span>
                  </p>
                  <p className='my-1'>
                    N°Police: <span className='fw-bold ml-1'></span>
                  </p>
                  <p className='my-1'>
                    N° assuré:{" "}
                    <span className='fw-bold ml-1'>{item.numPolice}</span>
                  </p>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <p className='my-1'>
                      Entrée le :{" "}
                      <span className='fw-bold'>{formatDate(item.entree)}</span>
                    </p>
                  </div>
                  <div className='col-md-4'>
                    <p className='my-1'>
                      Sortie le:{" "}
                      <span className='fw-bold'>{formatDate(item.sortie)}</span>
                    </p>
                  </div>
                  <div className='col-md-4'>
                    <p className='my-1'>
                      Chambre: <span className='fw-bold'>{item.chambre}</span>
                    </p>
                  </div>
                </div>
                <Fragment>
                  <p className='my-1'>
                    Motif de Consultation:{" "}
                    <span className='ml-1 lead'>{item.motifConsultation}</span>
                  </p>
                  <p className='my-1'>
                    Histoire de la maladie:{" "}
                    <span className='ml-1 lead'>{item.histoireMaladie}</span>
                  </p>
                </Fragment>
                <Fragment>
                  <h6>ATCD</h6>
                  <strong>Personnels:</strong>
                </Fragment>

                <div className='text-justify'>
                  Médicale: <span>{item.medicale}</span>
                </div>
                <div className='text-justify'>
                  Chirurgical: <span>{item.chirurgical}</span>
                </div>

                <div className='text-justify'>
                  Gynéco-obstétrique: <span>{item.gynecoObstetrique}</span>
                </div>

                <div className='text-justify'>
                  Chirurgical: <span>{item.chirurgical}</span>
                </div>
                <strong>Familiers:</strong>
                <p className='my-1 text-justify'>{item.familiers}</p>
                <p className='my-1 text-justify'>
                  {" "}
                  Examens à l'entrée: <span>{item.examenEntree}</span>
                </p>
                <div className='row'>
                  <div className='col-md-3'>
                    T° : <span>{item.t}</span>
                  </div>
                  <div className='col-md-3'>
                    TA : <span>{item.ta}</span>
                  </div>
                  <div className='col-md-3'>
                    Poids : <span>{item.poids}</span>
                  </div>
                  <div className='col-md-3'>
                    Taille : <span>{item.taille}</span>
                  </div>
                </div>
                <Fragment>
                  <p className='my-1 text-justify'>
                    Etat Général: <span>{item.etatGeneral}</span>
                  </p>
                  <p className='my-1 text-justify'>
                    Coeur: <span>{item.coeur}</span>
                  </p>
                  <p className='my-1 text-justify'>
                    Poumons: <span>{item.poumons}</span>
                  </p>
                  <p className='my-1 text-justify'>
                    ABD: <span>{item.abd}</span>
                  </p>
                  <p className='my-1 text-justify'>
                    ORL: <span>{item.orl}</span>
                  </p>
                  <p className='my-1 text-justify'>
                    Autres app: <span>{item.autresApp}</span>
                  </p>
                </Fragment>
                <Fragment>
                  <h6>RESUME:</h6>
                  <p className='my-1 text-justify'>{item.resume}</p>
                  <h6> Examens demandés:</h6>
                  <p className='my-1 text-justify'>{item.examenDemandes}</p>
                  <h6>Diagnostic Retenu:</h6>
                  <p className='my-1 text-justify'>{item.diagnosticRetenu}</p>
                  <h6>Conduite à Ténir:</h6>
                  <p className='my-1 text-justify'>{item.conduiteTenir}</p>
                </Fragment>
              </div>

              <Fragment>
                <h3 className='text-center'>Examens Ultérieurs</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Dates Heures Médecins:</th>
                      <th>Compte Rendu: Examen clinique - Para clinique:</th>
                      <th>Modification Thérapeutiques Actes:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.examensUlterieurs.map((el, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {" "}
                            {formatDate(el.date)} à {formatHeure(el.date)}{" "}
                          </td>
                          <td>{el.compteRendu}</td>
                          <td>{el.modifications} </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3}>
                        <strong>Observation</strong>
                        <p className='text-justify'>{item.observations}</p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Fragment>
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
          <div>Ce patient ne dispose d'aucun Dossier Médicale !</div>
        </div>
      )}
      <div style={{ display: "flex", width: 400, flexWrap: "wrap" }}>
        <Pagination
          ParPage={ParPage}
          total={result.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};
