import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "./Formats";
import { Pagination } from "./Pagination";
import { toast } from "react-toastify";
import { FaCalculator, FaDownload, FaPlus, FaTrashAlt } from "react-icons/fa";
import { deleteAgent } from "../../actions/agent";
import { deleteStock } from "../../actions/stock";
import { deleteRappMedecin } from "../../actions/rapportMedecin";

import api from "../../utils/api";
import { Link } from "react-router-dom";
import { Offres } from "../Formulaires";
import { deleteOffre } from "../../actions/offre";

export const TableauListe = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(10);
  const last = currentPage * ParPage;
  const first = last - ParPage;
  const datas = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const dispatch = useDispatch();

  return (
    <div className='text-center'>
      {datas.length > 0 ? (
        <>
          <h3 className='text-center text-light text-decoration-underline text-capitalize'>
            Tableau Récapitulatif des produits en Stock
          </h3>
          <table className='table table-bordered table-responsive shadow-lg'>
            <thead className='bg-secondary text-light'>
              <tr>
                <th scope='col' style={{ width: 300 }}>
                  Désignation
                </th>
                <th scope='col' style={{ width: 150 }}>
                  Date
                </th>
                <th scope='col' style={{ width: 150 }}>
                  Agent
                </th>
                <th scope='col' style={{ width: 150 }}>
                  Option
                </th>
              </tr>
            </thead>
            <tbody className='bg-light'>
              {datas.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className='text-start'>{item.description}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.agent}</td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => dispatch(deleteStock(item._id))}
                      >
                        Effacer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            ParPage={ParPage}
            total={data.length}
            paginate={paginate}
          />
        </>
      ) : (
        <div
          className='d-flex flex-columntext-center align-items-center justify-content-center text-danger'
          style={{ width: "100vw", height: "90vh" }}
        >
          <h1>Le Magasin est vide actuellement</h1>
        </div>
      )}
    </div>
  );
};
export const TableauOffres = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(10);
  const last = currentPage * ParPage;
  const first = last - ParPage;
  const datas = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='text-center mx-auto mt-2' style={{ width: "80%" }}>
      {datas.length > 0 ? (
        <>
          <h3 className='text-center text-decoration-underline text-capitalize'>
            Tableau Récapitulatif des produits en Stock
          </h3>
          <table className='table table-striped table-responsive shadow-lg'>
            <thead className='bg-secondary text-light'>
              <tr>
                <th scope='col' style={{ width: 200 }}>
                  Désignation
                </th>
                <th scope='col' style={{ width: 80 }}>
                  Date
                </th>
                <th scope='col' style={{ width: 100 }}>
                  Agent
                </th>
              </tr>
            </thead>
            <tbody className='bg-light'>
              {datas.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className='text-start'>{item.description}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.agent}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='d-flex flex-wrap'>
            <Pagination
              ParPage={ParPage}
              total={data.length}
              paginate={paginate}
            />
          </div>
        </>
      ) : (
        <div
          className='d-flex flex-columntext-center align-items-center justify-content-center text-danger'
          style={{ width: "100vw", height: "90vh" }}
        >
          <h1>Le Magasin est vide actuellement</h1>
        </div>
      )}
    </div>
  );
};

//Tableau Recap de Caisse journaliere
export const TableauCaisse = ({ data }) => {
  /**Pagination */

  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(10);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const tabCaisse = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /*** ================================================= */

  return (
    <>
      {tabCaisse.length > 0 ? (
        <div
          className='table-responsive container text-capitalize'
          style={{ width: "95%" }}
        >
          <h4 className='text-center my-3 text-decoration-underline text-capitalize'>
            Tableau Récapitulatif des Encaissements
          </h4>
          <table className='table table-sm table-striped mx-auto shadow-lg'>
            <thead className='bg-info text-white'>
              <tr className='text-center'>
                <th scope='col' style={{ width: "140px" }}>
                  Date de Montée
                </th>
                <th scope='col' style={{ width: "140px" }}>
                  Date de Descente
                </th>
                <th scope='col' style={{ width: "150px" }}>
                  Recette journalière
                </th>
                <th scope='col' style={{ width: "130px" }}>
                  Fichier Récap
                </th>
                <th scope='col' style={{ width: "200px" }}>
                  Caissière
                </th>
                <th scope='col'>Observation</th>
              </tr>
            </thead>
            <tbody className='bg-white text-black' style={{ fontSize: 15 }}>
              {tabCaisse.map((item) => (
                <tr key={item._id}>
                  <td className='text-noir'>{formatDate(item.monter)}</td>
                  <td className='text-noir'>{formatDate(item.descente)}</td>
                  <td className='text-noir'>{item.montant} F CFA</td>
                  <td>
                    <a
                      className='text-dark'
                      href={`/${item.document}`}
                      download
                    >
                      <FaDownload className='mb-2 mr-2' /> fichier
                    </a>
                  </td>
                  <td className='text-noir'>{item.caissiere}</td>
                  <td className='text-noir'>{item.observation}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='d-flex flex-wrap'>
            <Pagination
              ParPage={ParPage}
              total={data.length}
              paginate={paginate}
            />
          </div>
        </div>
      ) : (
        <div
          className='d-flex flex-column align-items-center justify-content-center text-light'
          style={{ height: "90vh" }}
        >
          <h1>Aucun donnée !</h1>
        </div>
      )}
    </>
  );
};

//tableau du financiere
export const TabFinanciere = ({ data, open, poste }) => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(10);
  const last = currentPage * ParPage;
  const first = last - ParPage;
  const tabFin = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      {poste !== "directrice" && (
        <button className='btn btn-success w-75 ms-5 my-2' onClick={open}>
          Nouveau Rapport de Validation
        </button>
      )}
      {tabFin.length > 0 ? (
        <div className='text-capitalize mx-auto' style={{ width: "90%" }}>
          <div className='table-responsive'>
            <h4 className='text-center text-decoration-underline text-capitalize'>
              Tableau Récapitulatif des Validations de Caisse
            </h4>
            <table className='table table-sm table-striped shadow-lg'>
              <thead className='bg-primary text-light'>
                <tr className='text-center'>
                  <th scope='col' style={{ width: "130px" }}>
                    Date Recep
                  </th>
                  <th scope='col' style={{ width: "200px" }}>
                    Caissière
                  </th>
                  <th scope='col' style={{ width: "143px" }}>
                    Recette /jrs
                  </th>
                  <th scope='col' style={{ width: "130px" }}>
                    Manque
                  </th>
                  <th scope='col'>Observation</th>
                  <th scope='col' style={{ width: "200px" }}>
                    Fiancière
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white text-dark'>
                {tabFin.map((item) => (
                  <tr key={item._id}>
                    <td>{formatDate(item.debut)}</td>
                    <td>{item.caissiere}</td>
                    <td>{item.montant} F CFA</td>
                    <td>{item.manque} F CFA</td>
                    <td>{item.observation}</td>
                    <td>{item.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Pagination
                ParPage={ParPage}
                total={data.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className='d-flex flex-column align-items-center justify-content-center text-light'
          style={{ height: "90vh" }}
        >
          <h1>Aucun donnée !</h1>
        </div>
      )}
    </Fragment>
  );
};

//Listes des Agents
export const TabAgents = ({ data, getAgent }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(10);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const tabUser = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {tabUser.length > 0 ? (
        <div className='table-responsive text-capitalize col-12'>
          <h3 className='text-center text-uppercase text-decoration-underline my-3'>
            Listes de Nos Agents
          </h3>
          <table
            className='table table-sm table-striped mx-auto shadow-lg'
            style={{ width: "80vw" }}
          >
            <thead className='bg-primary text-light'>
              <tr>
                <th scope='col'>Nom</th>
                <th scope='col'>Prénom</th>
                <th scope='col' className='text-center' style={{ width: 100 }}>
                  Mobile
                </th>
                <th scope='col' style={{ width: 100 }}>
                  Email
                </th>
                <th scope='col' style={{ width: 120 }}>
                  Poste
                </th>
                <th scope='col' className='text-center' style={{ width: 80 }}>
                  Restaurer
                </th>
                <th scope='col' className='text-center' style={{ width: 30 }}>
                  Effacer
                </th>
              </tr>
            </thead>
            <tbody className='bg-light'>
              {tabUser.map((item) => (
                <TR
                  id={item._id}
                  key={item._id}
                  name={item.name}
                  lastName={item.lastName}
                  phone={item.phone}
                  email={item.email}
                  post={item.post}
                  getAgent={getAgent}
                />
              ))}
            </tbody>
          </table>
          <div className='px-3' style={{ display: "flex", flexWrap: "wrap" }}>
            <Pagination
              ParPage={ParPage}
              total={data.length}
              paginate={paginate}
            />
          </div>
        </div>
      ) : (
        <div
          className='d-flex flex-column align-items-center justify-content-center text-light'
          style={{ height: "90vh" }}
        >
          <h1>Aucun donnée !</h1>
        </div>
      )}
    </>
  );
};

export const TR = ({ name, lastName, phone, post, email, id, getAgent }) => {
  const dispatch = useDispatch();
  const ResetPassword = () => {
    api.put(`/users/pass/${id}`, { password: "0000" }).then((user) => {
      toast.success("Le mot de passe de " + name + " est rénitialiser à 0000", {
        position: "top-center",
      });
      getAgent();
    });
  };

  return (
    <>
      <tr key={id}>
        <td style={{ color: "#000", fontSize: 18 }}>{name}</td>
        <td style={{ color: "#110601", fontSize: 18 }}>{lastName}</td>
        <td style={{ color: "#0010F7", fontSize: 18 }}>{phone}</td>
        <td className='text-info'>{email}</td>
        <td>{post}</td>
        <td>
          <button
            className='btn btn-outline-primary m-auto'
            onClick={() => ResetPassword()}
          >
            {" "}
            Restaurer
          </button>
        </td>
        <td className='p-auto'>
          <button
            type='button'
            onClick={() => dispatch(deleteAgent(id))}
            className='btn btn-outline-danger m-auto'
          >
            <FaTrashAlt />
          </button>{" "}
        </td>
      </tr>
    </>
  );
};

//Offres de services
export const TabOffres = ({ data, dispatch }) => {
  const [offre, setOffre] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(15);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const offreData = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <>
        <div className='d-grid gap-2'>
          <button
            type='button'
            className='btn btn-primary m-2'
            onClick={() => setOffre(true)}
          >
            Ajout Offre
          </button>
        </div>
        {offre && (
          <Offres
            ouvrir={() => setOffre(true)}
            fermer={() => setOffre(false)}
          />
        )}
      </>
      {
        <>
          {offreData.length > 0 ? (
            <div className='table-responsive mx-auto' style={{ width: "80%" }}>
              <div className='d-grid gap-2'></div>
              <h3 className='text-center text-uppercase text-decoration-underline my-3'>
                Listes de Nos Offres de Services
              </h3>
              <table className='table table-sm table-striped shadow-lg'>
                <thead className='bg-secondary text-light'>
                  <tr>
                    <th scope='col'>Nos Offres</th>
                    <th scope='col'>Prestataire</th>
                    <th scope='col'>Effacer</th>
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {offreData !== [] &&
                    offreData.map((item) => (
                      <tr>
                        <td>{item.label}</td>
                        <td>{item.poste}</td>
                        <th key={item._id} scope='row'>
                          <button
                            type='button'
                            onClick={() => dispatch(deleteOffre(item._id))}
                            className='btn btn-outline-danger mx-2'
                          >
                            <FaTrashAlt />
                          </button>
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Pagination
                  ParPage={ParPage}
                  total={data.length}
                  paginate={paginate}
                />
              </div>
            </div>
          ) : (
            <div
              className='d-flex flex-column justify-content-center align-items-center text-danger'
              style={{ height: "90vh" }}
            >
              <h1>Aucun Offre de Service</h1>
            </div>
          )}
        </>
      }
    </Fragment>
  );
};

export const TabPatient = ({ data, date }) => {
  const PasseWord = (id) => {
    api
      .put(`/patient/${id}`, { password: "0000" })
      .then((res) =>
        toast.info("le mot de passe du patient créer (0000)", {
          position: "top-center",
        })
      )
      .catch((err) => console.error(err));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(10);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const patientData = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {
        <>
          {patientData.length > 0 ? (
            <div className='table-responsive mx-auto' style={{ width: "95%" }}>
              <h3 className='text-center text-uppercase text-decoration-underline my-3'>
                Listes des Patients
              </h3>
              <table className='table table-sm table-striped bordered shadow-lg'>
                <thead className='bg-secondary text-light'>
                  <tr>
                    <th scope='col' style={{ width: "100px" }}>
                      Nom
                    </th>
                    <th scope='col' style={{ width: "100px" }}>
                      Prenom
                    </th>
                    <th scope='col' style={{ width: "80px" }}>
                      Mobile
                    </th>
                    <th scope='col' style={{ width: "70px" }}>
                      Email
                    </th>
                    <th scope='col' style={{ width: "50px" }}>
                      Age
                    </th>
                    <th scope='col' style={{ width: "90px" }}>
                      Domicile
                    </th>
                    <th scope='col' style={{ width: "20px" }}>
                      M-Passe
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-light'>
                  {patientData !== [] &&
                    patientData.map((item) => (
                      <tr key={item._id}>
                        <td>{item.lastName}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>
                          <span className='fw-bolder me-1'>
                            {date.getFullYear() -
                              parseInt(item.dateDeNaissance)}
                          </span>
                          {date.getFullYear() - parseInt(item.dateDeNaissance) >
                          1
                            ? "ans"
                            : "an"}
                        </td>
                        <td>{item.adresse}</td>
                        <td>
                          <button
                            className='btn btn-warning'
                            onClick={() => PasseWord(item._id)}
                          >
                            <FaCalculator />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Pagination
                  ParPage={ParPage}
                  total={data.length}
                  paginate={paginate}
                />
              </div>
            </div>
          ) : (
            <div
              className='d-flex flex-column justify-content-center align-items-center text-light'
              style={{ height: "90vh" }}
            >
              <hi>Aucun Offre de Service</hi>
            </div>
          )}
        </>
      }
    </>
  );
};

export const DocAdministratif = ({ data, open }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(10);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const docAdData = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex flex-column align-items-center'>
      <div>
        <button
          className='btn btn-primary my-2 shadow-lg'
          type='button'
          onClick={open}
        >
          <FaPlus /> Nouveau Document
        </button>
      </div>
      {docAdData.length > 0 ? (
        <div className='table-responsive mx-auto' style={{ width: "90%" }}>
          <table className='table table-sm table-striped shadow-lg'>
            <thead className='bg-secondary text-white'>
              <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Auteur</th>
                <th scope='col' style={{ width: 280 }}>
                  Titre
                </th>
                <th scope='col'>Documents</th>
              </tr>
            </thead>
            <tbody className='bg-white '>
              {docAdData !== [] &&
                docAdData.map((item) => (
                  <tr key={item._id}>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.agent}</td>
                    <td>{item.titre}</td>
                    <td>
                      <Link
                        className='text-dark'
                        to={`/${item.document}`}
                        target='_blank'
                        download
                      >
                        <FaDownload className='mb-2 mr-2' /> Fichier
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className='d-flex flex-wrap'>
            <Pagination
              ParPage={ParPage}
              total={data.length}
              paginate={paginate}
            />
          </div>
        </div>
      ) : (
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <h1 className='mt-5'>Aucun donnée actuellement</h1>
        </div>
      )}
    </div>
  );
};

export const DossierMedical = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(10);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const docMedData = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='d-flex flex-column align-items-center'>
      {docMedData.length > 0 ? (
        <div className='table-responsive mx-auto' style={{ width: "90%" }}>
          <h2 className='text-center text-uppercase text-decoration-underline my-3'>
            Tableau des Hospitalisations
          </h2>
          <table className='table table-sm table-striped shadow-lg'>
            <thead className='bg-secondary text-white'>
              <tr>
                <th scope='col'>Date Entre</th>
                <th scope='col'>Date Sortie</th>
                <th scope='col'>Medecin</th>
                <th scope='col'>Assuré</th>
                <th scope='col'>Num Police</th>
                <th scope='col'>Num Assure</th>
                <th scope='col'>Chambre</th>
              </tr>
            </thead>
            <tbody className='bg-white '>
              {docMedData !== [] &&
                docMedData.map((item) => (
                  <tr key={item._id}>
                    <td>{formatDate(item.entree)}</td>
                    <td>{formatDate(item.sortie)}</td>
                    <td>{item.medecin}</td>
                    <td>{item.assure}</td>
                    <td>{item.numPolice}</td>
                    <td>{item.numAssure}</td>
                    <td>{item.chambre}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className='d-flex flex-wrap'>
            <Pagination
              ParPage={ParPage}
              total={data.length}
              paginate={paginate}
            />
          </div>
        </div>
      ) : (
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <h1 className='mt-5'>Aucun donnée actuellement</h1>
        </div>
      )}
    </div>
  );
};

export const HistoriqueMedecin = ({ id }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get(`/rapportmedecin`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Une s'est produit lors de la récuperation des données !", {
          position: "top-center",
        });
      });
  }, []);

  const effacerRap = (id) => {
    window.confirm("Voulez vous le supprimer?");
    dispatch(deleteRappMedecin(id));
  };

  const result = data.filter((datas) => datas.createdBy === id);
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(5);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const currentData = result.slice(first, last);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {currentData.length > 0 ? (
        <Fragment>
          <h2 className='text-center text-light'>Mes Notes</h2>
          <table className='table table-sm table-striped bg-light'>
            <thead>
              <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Patient</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Motif</th>
                <th scope='col'>Conclusion</th>
                <th scope='col'>option</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr>
                  <td>{formatDate(item.date)}</td>
                  <th scope='row'>
                    {item.namePatient} {item.lastNamePatient}
                  </th>
                  <td>{item.phone}</td>
                  <td>{item.motif}</td>
                  <td>{item.conclusion}</td>
                  <td>
                    <button
                      className='btn btn-outline-danger'
                      type='button'
                      onClick={() => effacerRap(item._id)}
                    >
                      Effacer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
            <Pagination
              ParPage={ParPage}
              total={result.length}
              paginate={paginate}
            />
          </div>
        </Fragment>
      ) : (
        <div>
          <h1>Aucun données</h1>
        </div>
      )}
    </div>
  );
};
