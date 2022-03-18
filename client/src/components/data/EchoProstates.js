import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete2 } from "../layout/Entetes";
import { formatAnnee, formatDate } from "../layout/Formats";
import { toast } from "react-toastify";

export const EchoProstates = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/echovesicoprostatique")
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
              <Entete2 />
              <h2 className='text-center text-decoration-underline my-2'>
                ECHOGRAPHIE VESICO-PROSTATIQUE
              </h2>
              <div className='text-capitalize'>
                <div className='row fs-5'>
                  <div className='col-8'>
                    Nom et Prénom:{" "}
                    <span className='col-6 fw-bold'>
                      {` ${namePatient} ${lastNamePatient}`}{" "}
                    </span>
                  </div>
                  <div className='col-4'>
                    age:{" "}
                    <span className='col-6 text-end fw-bold'>
                      {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                      {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                        ? "ans"
                        : "an"}
                    </span>
                  </div>
                </div>
                <strong>Renseignements cliniques:</strong>
                <p className='fs-5 ms-2'> {item.renseignementClinique}</p>
                <p className='fs-5 ms-2'>
                  {" "}
                  Date de réalisation{" "}
                  <span className='mx-2'>{formatDate(item.date)}</span>
                </p>
                <h4>RESULTATS</h4>
                <strong>Prostate:</strong>
                <p className='fs-5 ms-2'> {item.prostate}</p>
                <strong>Vésicules séminales:</strong>
                <p className='fs-5 ms-2'> {item.vesiculeSeminale}</p>
                <strong>Véssie:</strong>
                <p className='fs-5 ms-2'> {item.vessie}</p>
                <strong className='ml-5'>Volume vésical:</strong>
                <p className='fs-5 ms-2'> {item.volumeVesical}</p>
                <strong className='ml-5'> Parois vésicale:</strong>
                <p className='fs-5 ms-2'> {item.paroisVesicale}</p>
                <strong>Résidu post-mictionnel:</strong>
                <p className='fs-5 ms-2'> {item.residuPostMictionnel}</p>
                <strong> Reins:</strong>
                <p className='fs-5 ms-2'> {item.reins}</p>
                <strong>Conclusion:</strong>
                <p className='fs-5 ms-2'> {item.conclusion}</p>
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
            Ce patient ne dispose d'aucun Fiche D'Echographie de la Prostate !
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
