import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatAnnee } from "../layout/Formats";
import { toast } from "react-toastify";

export const ConsultationImageries = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/imagerie")
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
              <h3 className='text-center text-decoration-underline my-4'>
                IMAGERIE
              </h3>
              <div>
                <div className='row'>
                  <div className='col-md-9'>
                    Nom et Prénom :{" "}
                    <span className='ml-2 fw-bold ml-2 text-capitalize'>
                      {namePatient} {lastNamePatient}
                    </span>
                  </div>
                  <div className='col-md-3'>
                    Age :{" "}
                    <span className='ml-2 fw-bold ml-2'>
                      {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                      {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                        ? "ans"
                        : "an"}
                    </span>
                  </div>
                </div>
                <h5>Echographies:</h5>
                <p className='lead my-3'>
                  Libellé :<span className='ml-2'>{item.echographie}</span>
                </p>
                <span>Observations</span>
                <p className='text-justify lead my-3 text-capitalize'>
                  <span className='ml-2'>{item.observations}</span>
                </p>
                <span>Conclusion</span>
                <p className='text-justify lead my-3 text-capitalize'>
                  {item.conclusion}
                </p>
                <h5>Radiographie</h5>
                <p className='lead my-3'>
                  Libellé :<span className='ml-2'>{item.radiographie}</span>
                </p>
                Rapport de la Radiographie:
                <p className='text-justify lead my-3 text-capitalize'>
                  {item.rapport}
                </p>
                <div className='text-end text-capitalize mt-5'>
                  <h6 className='text-decoration-underline'>Le Médecin:</h6>
                  <p>
                    {item.nameAgent} {item.lastNameAgent}
                  </p>
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
            Ce patient ne dispose d'aucun Fiche de Consultation d'Imagerie !
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
