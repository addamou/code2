import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete2 } from "../layout/Entetes";
import { formatDate } from "../layout/Formats";
import { toast } from "react-toastify";

export const CompteRenduAccouchements = ({ idPatient }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/cra")
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
              <h3 className='text-center my-3 text-decoration-underline'>
                COMPTE RENDU D'ACCOUCHEMENT
              </h3>
              <div>
                <p className='fs-5 text-justify text-capitalize'>{item.cra}</p>
              </div>

              <div className='text-end mt-3'>
                <p className='lead'>
                  Fait à Niamey, le <span>{formatDate(item.date)}</span>
                </p>
              </div>
              <div className='text-end mt-4'>
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
          <div>Ce patient ne dispose d'aucun Compte Rendu d'Accouchement !</div>
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
