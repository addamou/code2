import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatDate, formatHeure } from "../layout/Formats";
import { toast } from "react-toastify";

export const CertificatAccouchements = ({
  idPatient,
  namePatient,
  lastNamePatient,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/certificataccouchement")
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
              <h2 className='text-center text-decoration-underline my-3'>
                CERTIFICAT D'ACCOUCHEMENT
              </h2>
              <div className='text-capitalize fs-5'>
                <p className=' mb-3 mt-5'>
                  La Nommée:{" "}
                  <span className='fw-bolder ms-2'>
                    {namePatient} {lastNamePatient}
                  </span>
                </p>
                <div className='row'>
                  <div className='col-md-8'>
                    <p className=''>
                      Profession :
                      <span className='fw-bolder ms-2'>{item.profession}</span>
                    </p>
                  </div>
                  <div className='col-md-4'>
                    <p className=''>
                      MLE :<span className='fw-bolder ms-2'>{item.mle}</span>
                    </p>
                  </div>
                </div>
                <p className='mb-3'>
                  A accouché le :
                  <span className='fw-bolder ms-2'>
                    {formatDate(item.dateAccouchement)} à{" "}
                    {formatHeure(item.dateAccouchement)}
                  </span>
                </p>
                <p className='my-3'>
                  D'un enfant de Sexe :
                  <span className='fw-bolder ms-2'>{item.sexe}</span>
                </p>
                <p className='my-3'>
                  Et qui à reçu le Prénom de :
                  <span className='fw-bolder ms-2'>{item.prenom}</span>
                </p>
                <p className='my-3'>
                  Dont le Père est :
                  <span className='fw-bolder ms-2'>{item.pere}</span>
                </p>
                <p className='my-3'>
                  La Mère est :
                  <span className='fw-bolder ms-2'>
                    {namePatient} {lastNamePatient}
                  </span>
                </p>
                <br />
                <br />
                <br />
                <div className='text-end'>
                  <h6 className='text-decoration-underline'>Le Gynecologue</h6>
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
          <div>Ce patient ne dispose d'aucun Certificat d'Accouchement !</div>
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
