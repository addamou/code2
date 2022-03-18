import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatAnnee } from "../layout/Formats";
import { toast } from "react-toastify";

export const SoinUrgences = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/soinsurgence")
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
              <div className='my-3 text-capitalize row'>
                <span className='col-4'>
                  NOM : <span className='fw-bold'>{namePatient}</span>
                </span>
                <span className='col-4'>
                  PRENOM : <span className='fw-bold'>{lastNamePatient}</span>
                </span>
                <span className='col-4'>
                  Age :{" "}
                  <span className='fw-bold'>
                    {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                    {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                      ? "ans"
                      : "an"}
                  </span>
                </span>
              </div>
              <h4 className='text-center my-3 text-decoration-underline'>
                SOINS D'URGENCE
              </h4>

              <div className='table-responsive text-capitalize'>
                <table className='table mx-auto'>
                  <thead className='bg-secondary text-light'>
                    <tr>
                      <th style={{ width: 400 }}>DESIGNATION DES PRODUITS</th>
                      <th>QUANTITE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.demande.map((items, index) => {
                      return (
                        <tr key={index} id={index}>
                          <td>{items.label}</td>
                          <td>{items.nbr}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className='mt-2'>
                <h6>Protocol de Soin</h6>
                <p className='text-capitalize text-justify'>{item.protocol}</p>
              </div>
              <div className='text-end text-capitalize mt-2'>
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
          <div>Ce patient ne dispose d'aucune Fiche de Soin d'Urgence !</div>
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
