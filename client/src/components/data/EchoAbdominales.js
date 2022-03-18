import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatAnnee } from "../layout/Formats";
import { toast } from "react-toastify";

export const EchoAbdominales = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/echographieabdominale")
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
              <h3 className='text-center text-uppercase text-decoration-underline my-2'>
                Echographie Abdominale
              </h3>
              <div className='text-capitalize'>
                <p className='my-0'>
                  Nous soussignons Dr{" "}
                  <span className='fw-bolder'>{item.agent}</span>, certifie
                  avoir examiné ce jour{" "}
                  <span>
                    {" "}
                    {namePatient} {lastNamePatient}
                  </span>
                  Age :{" "}
                  <strong className='ml-1'>
                    {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                    {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                      ? "ans"
                      : "an"}
                  </strong>
                </p>
                <p className='my-0'>
                  Indications:{" "}
                  <span className='fw-bolder'>{item.indications}</span>
                </p>
                <strong>RESULTATS</strong>
                <p className='my-0'>Foie:</p>
                <p className='my-0'>Taille:</p>
                <p className='my-0'>
                  <span>
                    - Lobe droit mesure{" "}
                    <span className='fw-bolder'>{item.lobeDroit}</span> mm en
                    avant du rein droit
                  </span>
                  <span className='ml-2'>
                    - Lobe gauche mesure{" "}
                    <span className='fw-bolder'>{item.lobeGauche}</span> mm en
                    avant de l'aorte
                  </span>
                </p>
                <p className='my-0'>
                  - Flèche hépatique mesure{" "}
                  <span className='fw-bolder'>{item.flecheHepatique}</span>
                </p>
                <p className='my-0'>
                  - Echostructure :{" "}
                  <span className='fw-bolder'>{item.echostructure}</span>
                </p>
                <p className='my-0'>
                  - Contours :{" "}
                  <span className='fw-bolder'>{item.contours}</span>
                </p>
                <p className='my-0'>
                  Autres : <span className='fw-bolder'>{item.autres}</span>
                </p>
                <p className='my-0'>
                  Tronc porte et veines hépatique :{" "}
                  <span className='fw-bolder'>{item.tpvh}</span>
                </p>
                <p className='my-0'>
                  Vésicule biliaire:
                  <span className='fw-bolder'>{item.vesiculeBiliaire}</span>
                </p>
                <p className='my-0'> Pancréas :</p>
                <p className='my-0'>
                  Taille :{" "}
                  <span className='fw-bolder'>{item.taillePancreas}</span> mm,
                  Echostructure :{" "}
                  <span className='fw-bolder'>
                    {item.echostructurePancreas}
                  </span>
                </p>
                <p className='my-0'>
                  Contours :
                  <span className='fw-bolder'>{item.contoursPancreas}</span>
                </p>
                <p className='my-0'>
                  Autres :
                  <span className='fw-bolder'>{item.autresPancreas}</span>
                </p>
                <p className='my-0'> Rate :</p>
                <p className='my-0'>
                  Taille :<span className='fw-bolder'>{item.tailleRate}</span>{" "}
                  mm, Echostructure:{" "}
                  <span className='fw-bolder'>{item.echostructureRate}</span>{" "}
                </p>
                <p className='my-0'>
                  Contours :
                  <span className='fw-bolder'>{item.contoursRate}</span>
                </p>
                <p className='my-0'>
                  Autres :<span className='fw-bolder'>{item.autresRate}</span>
                </p>
                <p className='my-0'>Reins :</p>
                <p className='my-0'>- Droit :</p>
                <p className='my-0'>
                  Taille :
                  <span className='fw-bolder'>{item.tailleDroitReins}</span>mm,
                  Echostructure:{" "}
                  <span className='fw-bolder'>
                    {item.echostructureDroitReins}
                  </span>
                </p>
                <p className='my-0'>
                  Cavités pyélocalicielles
                  <span className='fw-bolder'>
                    {item.cavitePyelocalicielleDroit}
                  </span>
                </p>
                <p className='my-0'>- Gauche :</p>
                <p className='my-0'>
                  Taille :
                  <span className='fw-bolder'>{item.tailleGaucheReins}</span>mm,
                  Echostructure:{" "}
                  <span className='fw-bolder'>
                    {item.echostructureGaucheReins}
                  </span>
                </p>
                <p className='my-0'>
                  Cavités pyélocalicielles
                  <span className='fw-bolder'>
                    {item.cavitePyelocalicielleGauche}
                  </span>
                </p>
                <p className='my-0'>Vessie :</p>
                <p className='my-0'>
                  contours :
                  <span className='fw-bolder'>{item.contoursVessie}</span>
                </p>
                <p className='my-0'>
                  contenu:
                  <span className='fw-bolder'>{item.contenuVessie}</span>
                </p>
                <p className='my-0'>
                  parois:<span className='fw-bolder'>{item.paroisVessie}</span>{" "}
                  et mesure :{" "}
                  <span className='fw-bolder'>{item.mesureParoisVessie}</span>mm
                </p>
                <p className='my-0'>
                  Conclusion:
                  <span className='fw-bolder'> {item.conclusion}</span>
                </p>
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
            Ce patient ne dispose d'aucun Certificat d'Echographie Abdominale !
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
