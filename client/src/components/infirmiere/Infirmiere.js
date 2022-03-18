import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
import Modale from "../layout/Modale";
import { MdPrint } from "react-icons/md";
import {
  FaRegFolderOpen,
  FaTrashAlt,
  FaIdCard,
  FaList,
  FaTemperatureLow,
  FaSyringe,
} from "react-icons/fa";
import api from "../../utils/api";
import { ListePatientMedecin } from "../layout/Listes";
import { Bulletin } from "../data/Bulletin";
import { Rechercher } from "../Formulaires";
import { createRappMedecin } from "../../actions/rapportMedecin";
import { DossierMedicaux } from "../data/DossierMedicaux";
import FicheTemperature from "../Fiches/FicheTemperature";
import PrintFicheTemperature from "../Fiches/FicheTemperature/PrintFicheTemperature";
import { FicheTemperatures } from "../data/FicheTemperatures";
import { SoinUrgences } from "../data/SoinUrgences";
import { FicheNumerations } from "../data/FicheNumerations";

const listeStyleDiv = {
  background: "#1F0B01",
  height: 100 + "%",
  overflowY: "auto",
  width: 20 + "%",
  padding: 10,
  textAlign: "center",
};
const listeStyle = {
  height: 95 + "vh",
};

const Infirmiere = () => {
  const date = new Date();
  const dispatch = useDispatch();
  //Agent
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const { name, lastName, post } = user;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(true);
  const [data, setData] = useState([]);
  const [dataLabo, setDataLabo] = useState([]);

  /**Filtrage des patients au niveau des differents medecins */
  const GetPatient = React.useCallback(() => {
    // write your callback function here ...
    api
      .get("/medecins")
      .then((res) => {
        const resp = res.data;
        if (resp) {
          const response = resp.accueil.filter(
            (item) => item.geant.post === post
          );
          setData(response);
        }
        if (resp) {
          const bulletin = resp.accueil.filter(
            (item) => item.geant.post === "laborantin"
          );
          setDataLabo(bulletin);
        }
      })
      .catch((err) => console.error(err.response));
  }, [post]);

  useEffect(() => {
    GetPatient();
  }, [GetPatient]);

  // Avoir le Dossier Medical du Patient
  const [DossierMedicals, setDossierMedical] = useState([]);

  const getDossierPatient = (id) => {
    api
      .post("/dossier", { id: id })
      .then((res) => setDossierMedical(res.data))
      .catch((errors) => console.log(errors));
  };

  //Modales de selection patients
  const [patientSelect, setPatientSelect] = useState({});
  const [patient, setPatient] = useState({});

  //Fonction de selection de Patient
  const selectPatient = ({
    idGeant,
    demande,
    accueil,
    idSup,
    patientName,
    patientLastName,
    adresse,
    patientPhone,
    patientId,
    module,
    dateDeNaissance,
    lieuDeNaissance,
  }) => {
    setPatientSelect({
      idGeant,
      demande,
      accueil,
      idSup,
      patientName,
      patientLastName,
      adresse,
      patientPhone,
      patientId,
      module,
      dateDeNaissance,
      lieuDeNaissance,
    });

    const date = new Date(dateDeNaissance);
    let j = date.getDate();
    let m = date.getMonth() + 1;
    const a = date.getFullYear();

    j = j < 10 ? "0" + j : j + "";
    m = m < 10 ? "0" + m : m + "";
    const naissanceDate = a + "-" + m + "-" + j;
    setPatient({
      name: patientName,
      lastName: patientLastName,
      id: patientId,
      phone: patientPhone,
      dateDeNaissance: naissanceDate,
      lieuDeNaissance: lieuDeNaissance,
      adresse: adresse,
    });
    toast.info(
      `Patient(e) ${patientName} ${patientLastName} est sélectionné(e)`,
      { position: "top-center" }
    );
    getDossierPatient(patientId);
    setShow(true);
    setSearch(false);
    dispatch(
      createRappMedecin({
        namePatient: `${patientName} ${patientLastName}`,
        agent: `${name} ${lastName}`,
        motif: demande[0],
      })
    );
  };

  /** Effacer un patient de la liste */
  const retirerPatient = (id) => {
    api
      .delete(`/medecins/${id}`)
      .then((res) => {
        const Id = res.data._id;
        window.confirm("Voulez vous retirer ce patient de la liste");
        api.delete(`/accueil/${Id}`);
        toast.info("Le patient est retiré de la liste", {
          position: "top-center",
        });
        setPatientSelect({});
        setShow(false);
        GetPatient();
        setSearch(true);
      })
      .catch((err) => console.error(err));
  };

  //les modales states
  //Modal Fiche Temperature
  const refFT = useRef();
  const [ft, setFT] = useState(false);
  const [printft, setPrintFT] = useState(false);
  const [ficheT, setFicheT] = useState(false);

  const [dataFT, setDataFT] = useState({});
  const handleDataIF = (data) => {
    setDataFT(data);
  };

  //Bulletin des Patients
  const [bull, setBull] = useState(false);
  //Modale Dossier Medical

  const [doss, setDoss] = useState(false);
  //Modale Soin Urgence

  const [soinUr, setSoinUr] = useState(false);

  const [ficheN, setFicheN] = useState(false);

  return (
    <main
      style={{ height: 100 + "%", width: 100 + "%", margin: 0, padding: 0 }}
    >
      <div className='container-fluid bg2'>
        <div className='row'>
          <div className='text-light text-center' style={listeStyleDiv}>
            <div style={listeStyle}>
              {data.length > 0 ? (
                <h6>
                  {data.length} {data.length > 1 ? "PATIENTS" : "PATIENT(E)"} EN
                  ATTENTE
                </h6>
              ) : (
                <h6> AUCUN PATIENT EN ATTENTE</h6>
              )}
              {data !== [] &&
                data.map((item) => (
                  <ListePatientMedecin
                    handlePatient={selectPatient}
                    patientName={item.geant.patient.name}
                    patientLastName={item.geant.patient.lastName}
                    patientPhone={item.geant.patient.phone}
                    patientId={item.geant.patient._id}
                    demande={item.geant.demande}
                    post={item.geant.post}
                    idGeant={item._id}
                    key={item.idGeant}
                    adresse={
                      item.geant.patient.adresse
                        ? item.geant.patient.adresse
                        : ""
                    }
                    module={item.geant.module}
                    dateDeNaissance={
                      item.geant.patient.dateDeNaissance
                        ? item.geant.patient.dateDeNaissance
                        : ""
                    }
                    lieuDeNaissance={
                      item.geant.patient.lieuDeNaissance
                        ? item.geant.patient.lieuDeNaissance
                        : ""
                    }
                    accueil={item.geant._id}
                    idSup={item.geant.idSup}
                  />
                ))}
            </div>
            <div className='d-flex align-items-baseline'>
              {patientSelect.idGeant && (
                <Fragment className='btnDiv'>
                  <button
                    className='btn btn-danger m-auto'
                    onClick={() => retirerPatient(patientSelect.idGeant)}
                  >
                    RETIRER DE LA LISTE <FaTrashAlt />
                  </button>
                </Fragment>
              )}
            </div>
          </div>
          <div className='py-2' style={{ width: 80 + "%" }}>
            {search && <Rechercher GetPatient={GetPatient} poste={post} />}

            {show && (
              <div
                style={{ width: 80 + "%" }}
                className='my-5 mx-auto bg-dark text-light text-center border border-primary border-4 fs-4 fw-bold'
              >
                FICHES MEDICALES DE{" "}
                <span className='text-uppercase text-info ml-1'>
                  {patient.name + " " + patient.lastName}
                </span>
              </div>
            )}
            <div className='col-12 d-flex justify-content-center'>
              <div className='col-5 mt-2 mx-auto'>
                {dataLabo !== [] && (
                  <button
                    onClick={() => setBull(true)}
                    className='btn col-12 btn-secondary mb-1'
                    type='button'
                  >
                    <FaList className='mb-1' /> {dataLabo.length}{" "}
                    {dataLabo.length > 1 ? "PATIENTS" : "PATIENT"} A PRELEVER
                  </button>
                )}

                {show && (
                  <Fragment>
                    <div className='btn-group-vertical col-12'>
                      <button
                        onClick={() => setDoss(true)}
                        className='btn btn-dark mb-1'
                        type='button'
                      >
                        <FaIdCard className='mb-1' /> DOSSIER MEDICAL
                      </button>
                      <button
                        onClick={() => setFicheT(true)}
                        className='btn btn-primary mb-1'
                        type='button'
                      >
                        <FaTemperatureLow className='mb-1' /> FICHE DE
                        TEMPERATURE
                      </button>
                      <button
                        onClick={() => setFicheN(true)}
                        className='btn btn-dark my-1'
                        type='button'
                      >
                        <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE
                        NUMERATION
                      </button>
                      <button
                        onClick={() => setSoinUr(true)}
                        className='btn btn-success mb-1'
                        type='button'
                      >
                        <FaSyringe className='mb-1' /> SOINS D'URGENCES
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
            <Fragment>
              {patientSelect.idGeant && (
                <div className='listeDiv'>
                  <FaRegFolderOpen className='buttonAdd ' />
                  <ul>
                    <li onClick={() => setFT(true)}>FICHE DE TEMPERATURE</li>
                  </ul>
                </div>
              )}
            </Fragment>
            <Fragment>
              {/** Dossier Medical */}
              {doss && (
                <Modale close={() => setDoss(false)}>
                  {DossierMedicals.length !== [] && (
                    <DossierMedicaux
                      namePatient={patient.name}
                      lastNamePatient={patient.lastName}
                      dateDeNaissance={patient.dateDeNaissance}
                      idPatient={patient.id}
                      date={date}
                    />
                  )}
                </Modale>
              )}

              {/** Fiche de Temperature */}

              {ft && (
                <Modale close={() => setFT(false)}>
                  <FicheTemperature
                    namePatient={patient.name}
                    lastNamePatient={patient.lastName}
                    idPatient={patient.id}
                    dateDeNaissance={patient.dateDeNaissance}
                    close={() => setFT(false)}
                    print={() => setPrintFT(true)}
                    date={date}
                    nameAgent={name}
                    lastNameAgent={lastName}
                    poste={post}
                    handleData={handleDataIF}
                  />
                </Modale>
              )}
              {printft && (
                <Modale close={() => setPrintFT(false)}>
                  <ReactToPrint
                    trigger={() => (
                      <button className='printBoutton'>
                        Imprimer <MdPrint />
                      </button>
                    )}
                    content={() => refFT.current}
                  />

                  <PrintFicheTemperature
                    namePatient={patient.name}
                    lastNamePatient={patient.lastName}
                    dateDeNaissance={patient.dateDeNaissance}
                    data={dataFT}
                    nameAgent={name}
                    lastNameAgent={lastName}
                    date={date}
                    poste={post}
                    ref={refFT}
                  />
                </Modale>
              )}

              {ficheT && (
                <Modale close={() => setFicheT(false)}>
                  <FicheTemperatures
                    idPatient={patient.id}
                    namePatient={patient.name}
                    lastNamePatient={patient.lastName}
                    dateDeNaissance={patient.dateDeNaissance}
                  />
                </Modale>
              )}

              {/** Bulletins d'examens */}

              {bull && (
                <Modale close={() => setBull(false)}>
                  {dataLabo !== [] &&
                    dataLabo.map((item) => (
                      <Bulletin
                        namePatient={item.geant.patient.name}
                        key={item.geant.patient.name}
                        data={item.geant.demande}
                        lastNamePatient={item.geant.patient.lastName}
                        date={date}
                      />
                    ))}
                </Modale>
              )}

              {/** Fiche de Numeration */}
              {ficheN && (
                <Modale close={() => setFicheN(false)}>
                  <FicheNumerations
                    namePatient={patient.name}
                    lastNamePatient={patient.lastName}
                    idPatient={patient.id}
                  />
                </Modale>
              )}

              {/** Fiche de Soin d'urgence */}

              {soinUr && (
                <Modale close={() => setSoinUr(false)}>
                  <SoinUrgences
                    idPatient={patient.id}
                    namePatient={patient.name}
                    lastNamePatient={patient.lastName}
                    dateDeNaissance={patient.dateDeNaissance}
                  />
                </Modale>
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Infirmiere;
