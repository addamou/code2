import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Entete3 } from "../../layout/Entetes";
import { Numeration } from "../../Formulaires";
import api from "../../../utils/api";
import { getOffre } from "../../../actions/offre";
import { updateBulExam } from "../../../actions/fiches";

const style = { border: "solid 2px #000" };

const style2 = { borderRight: "1px solid #000" };

const BulletinExamen = ({
  date,
  poste,
  nameAgent,
  lastNameAgent,
  namePatient,
  lastNamePatient,
  idUpdate,
  dateDeNaissance,
  idPatient,
  closeBE,
  printBE,
  handleProductsExam,
  productsExam,
  handleDelete,
  btn,
}) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getOffre()), [dispatch]);
  const offreState = useSelector((state) => state.offre);
  const { offres } = offreState;
  const [offreRes, setOffreRes] = useState([]);

  useEffect(() => {
    if (offres.length > 0) {
      setOffreRes(offres.filter((item) => item.poste === "laborantin"));
    }
  }, [offres]);

  //Creation par les medecins et sage femme
  const handleSubmit = () => {
    api
      .post("/bulletinexamen", {
        patient: idPatient,
        data: productsExam,
        medecin: `${nameAgent} ${lastNameAgent}`,
      })
      .then((res) =>
        api.post("/accueil/add", {
          demande: productsExam,
          assurencePriseEnCharge: "",
          patient: idPatient,
          idSup: res.data._id,
        })
      );
    toast.info("Bulletin d'examen est établis et prèt à imprimer", {
      position: "top-center",
    });
    closeBE();
    printBE();
  };

  // Mise a jour par le Laborantin
  const handleUpdate = () => {
    dispatch(
      updateBulExam({
        id: idUpdate,
        data: productsExam,
        laborantin: `${nameAgent} ${lastNameAgent}`,
      })
    );
    btn();
  };

  //Traitement des demandes d'examens
  const [currentProduct, setCurrentProduct] = useState({});
  const handleChangeProduct = (e) =>
    setCurrentProduct(offres.find((el) => el.label === e.target.value));

  const [indexResponse, setIndexResponse] = useState(null);
  const handleIndexLabo = (index) => {
    let resp = "";
    productsExam.map((el, i) => index === i && (resp = el.response));
    setResponseInd(resp);
    setIndexResponse(index);
  };

  const [responseInd, setResponseInd] = useState("");
  const handleResponseChange = (e) => setResponseInd(e.target.value);

  const handleAddResponse = () => {
    handleProductsExam({ response: responseInd, index: indexResponse });
    setResponseInd("");
    setIndexResponse(null);
  };

  const handleAdd = () => handleProductsExam({ ...currentProduct, nbr: 1 });

  return (
    <div className='A5' autoComplete='false'>
      <Entete3 date={date} />
      <div>
        <div className='row mt-2'>
          <div className='col-md-6 text-end'>
            <p>
              Nom et Prénom:{" "}
              <span className='fw-bold'>
                {namePatient} {lastNamePatient}
              </span>
            </p>
          </div>
          <div className='col-md-6 text-end'>
            <p>
              Age:{" "}
              <span className='fw-bold'>
                {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
              </span>
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                ? "ans"
                : "an"}
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            {poste !== "laborantin" && (
              <>
                <div className='row mb-1'>
                  <div className='col-9'>
                    <select
                      className='form-select form-select 
                                            border-info border-0 border border-bottom rounded-0
                                            '
                      value={currentProduct.label || ""}
                      onChange={(e) => handleChangeProduct(e)}
                    >
                      <option value='' key=''>
                        Choix d'Examens
                      </option>
                      {offreRes.map((item) => (
                        <option value={item.label} key={item._id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='col-3'>
                    <button
                      className='btn btn-block btn-success ml-2'
                      onClick={() => handleAdd()}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='col-md-6'>
            {poste === "laborantin" && indexResponse !== null && (
              <>
                <div className='row mb-1'>
                  <div className='col-8'>
                    <input
                      className='form-control'
                      type='text'
                      value={responseInd}
                      onChange={(e) => handleResponseChange(e)}
                      placeholder='Résultat'
                    />
                  </div>
                  <div className='col-4'>
                    <button
                      className='btn btn-success me-2'
                      onClick={() => handleAddResponse()}
                    >
                      Répondre
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className=''>
          <div className='row border'>
            <div className='col-md-6 text-center text-light bg-secondary'>
              <h5>DEMANDE</h5>
            </div>
            <div className='col-md-6 text-center text-light bg-secondary'>
              <h5>REPONSE</h5>
            </div>
          </div>
          <div className='row' style={style}>
            <div className='col-6' style={style2}>
              {productsExam.map((el, index) => (
                <p className='my-1' key={index} id={index}>
                  {el.label || el.acteMedicale}
                  {poste !== "laborantin" ? (
                    <button
                      type='button'
                      className='btn btn-danger ms-2'
                      onClick={() => handleDelete(index)}
                    >
                      Retirer
                    </button>
                  ) : (
                    <button
                      type='button'
                      className='btn btn-primary ms-2'
                      onClick={() => handleIndexLabo(index)}
                    >
                      Répondre
                    </button>
                  )}
                </p>
              ))}
              <p></p>
            </div>
            <div className='col-6'>
              {productsExam.map((el, index) => (
                <p key={index} id={index}>
                  {el.response}
                </p>
              ))}
            </div>
          </div>
        </div>
        {poste === "laborantin" && (
          <Numeration
            idUpdate={idUpdate}
            idPatient={idPatient}
            name={nameAgent}
            lastName={lastNameAgent}
          />
        )}
        <div className='row mt-3'>
          <div className='w-50'>
            <h6 className='text-decoration-underline'>Le Medecin</h6>
            <p>{poste !== "laborantin" && `${nameAgent} ${lastNameAgent}`}</p>
          </div>
          <div className='w-50 text-end'>
            <h6 className='text-decoration-underline'>Laborantin</h6>
            <p>{poste === "laborantin" && `${nameAgent} ${lastNameAgent}`}</p>
          </div>
        </div>
      </div>
      {poste !== "laborantin" ? (
        <button type='button' className='btnValid' onClick={handleSubmit}>
          VALIDER
        </button>
      ) : (
        <button type='button' className='btnValid' onClick={handleUpdate}>
          VALIDER
        </button>
      )}
    </div>
  );
};

export default BulletinExamen;
