import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatAnnee } from "../layout/Formats";
import { toast } from "react-toastify";

export const Ordonnances = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/ordonnance")
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
            <div
              key={item._id}
              className='bg-light p-5 my-3'
              style={{ width: "43rem" }}
            >
              <Entete1 date={item.date} />
              <h4 className='text-center text-decoration-underline'>
                ORDONNANCE
              </h4>
              <div className='row my-3'>
                <div className='col-4 fs-5 text-right'>Nom : {namePatient}</div>
                <div className='col-4 fs-5'>Prénom : {lastNamePatient}</div>
                <div className='col-4 fs-5'>
                  Age :{formatAnnee(item.date) - parseInt(dateDeNaissance)}
                  {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                    ? "ans"
                    : "an"}
                </div>
              </div>
              <div className='table-responsive'>
                <table className='table'>
                  <thead className='bg-secondary text-white'>
                    <tr>
                      <th scope='col' style={{ width: 150 }}>
                        Qtés
                      </th>
                      <th scope='col'>Produit</th>
                      <th scope='col'>Prise</th>
                    </tr>
                  </thead>
                  <tbody className='text-noir text-left'>
                    {item.medicaments.length > 0 ? (
                      item.medicaments.map((it) => {
                        return (
                          <tr key={item.id}>
                            <td className='my-auto'>{it.quantite}</td>
                            <td className='my-auto'>{it.titre}</td>
                            <td className='my-auto'>{it.prise}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className='my-auto'>-</td>
                        <td className='my-auto'>-</td>
                        <td className='my-auto'>-</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='mt-3 text-end'>
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
          <div>Ce patient ne dispose d'aucun ordonnance !</div>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Pagination
          ParPage={ParPage}
          total={result.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};
