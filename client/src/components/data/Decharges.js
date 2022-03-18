import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatHeure, formatDate } from "../layout/Formats";
import { toast } from "react-toastify";

export const Decharges = ({ idPatient }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/decharge")
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
              <h3 className='text-center my-5'>DECHARGE</h3>
              <div className='text-capitalize'>
                <p className='lead'>
                  Je soussigné M...{" "}
                  <span className='mx-2 fw-bold'>{item.responsable}</span>
                </p>

                <div className='row my-3'>
                  <div className='col-4 my-auto'>
                    <label>Malade</label>{" "}
                    <input
                      type='checkbox'
                      readOnly
                      defaultChecked={item.typeResponsable.malade}
                    />
                  </div>
                  <div className='col-4 my-auto text-center'>
                    <label>Parent</label>{" "}
                    <input
                      type='checkbox'
                      readOnly
                      defaultChecked={item.typeResponsable.parent}
                    />
                  </div>
                  <div className='col-4 my-auto text-end'>
                    <label>Accompagnant</label>{" "}
                    <input
                      type='checkbox'
                      readOnly
                      defaultChecked={item.typeResponsable.accompagnant}
                    />
                  </div>
                </div>
                <p className=' my-2 fs-4'>
                  {" "}
                  Décide de quitter la Clinique AFOUA ce jour
                  <span className='mx-2 fw-bold'>
                    {formatDate(item.date)}
                  </span>à{" "}
                  <span className='fw-bold'>{formatHeure(item.date)}</span>
                  <span>(heures), contre avis médical.</span>
                </p>
                <p className='fs-4 my-3'>
                  Attestation établie pour servir et valoir ce que de droit.
                </p>
                <div className='row' style={{ marginTop: 80 }}>
                  <div className='col-6'>
                    <h5 className='text-decoration-underline'>
                      L'interessé(e)
                    </h5>
                    <p>{item.responsable}</p>
                  </div>
                  <div className='col-6 text-end'>
                    <h5 className='text-decoration-underline'>Le Medecin</h5>
                    {item.agent}
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
          <div>Ce patient ne dispose d'aucune Fiche de Décharge !</div>
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
