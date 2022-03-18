import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { formatDate } from "../layout/Formats";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { toast } from "react-toastify";

export const CertificatMedicaux = ({
  idPatient,
  namePatient,
  lastNamePatient,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/certificatmedical")
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
            <div className='A4 mb-2' key={item._id}>
              <Entete1 date={item.date} />
              <h3 className='text-center text-decoration-underline text-uppercase my-5'>
                Certificat Médical
              </h3>
              <div className='text-capitalize'>
                <p className='fs-5 ml-5'>
                  Je soussigné, DR <span className='fw-bold'>{item.agent}</span>
                  ,
                </p>
                <p className='fs-5'>
                  reconnait avoir consulté Ce jour
                  <span className='fw-bold'> {formatDate(item.date)}</span>
                  <br />
                  le (la) patient(e):{" "}
                  <span className='fw-bold'>{`${namePatient} ${lastNamePatient}`}</span>
                </p>
                <h5>Et constaté</h5>
                <p className='fs-5 text-justify'>{item.constat}</p>
                <br /> <br />
                <p className='fs-5'>
                  En foi de quoi, le present certificat lui est delivré pour
                  servir et valoir ce que de droit
                </p>
              </div>
              <div className='text-end'>
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
          <div>Ce patient ne dispose d'aucun Certificat Médical !</div>
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
