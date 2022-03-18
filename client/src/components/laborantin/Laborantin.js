import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modale from "../layout/Modale";
import { ListePatientMedecin } from "../layout/Listes";
import BulletinExamen from "../Fiches/BulletinExamen";
import PrintBulletinExamen from "../Fiches/BulletinExamen/printBulletinExamen";
import { FaRegEnvelope } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import ReactToPrint from "react-to-print";
import api from "../../utils/api";
import { createRappMedecin } from "../../actions/rapportMedecin";

const listeStyleDiv = {
  background: "#1F0B01",
  height: 100 + "%",
  overflowY: "auto",
  width: 20 + "%",
  padding: 10,
  textAlign: "center",
};
const listeStyle = {
  height: 88 + "vh",
};

const Laborantin = () => {
  const dispatch = useDispatch();
  const date = new Date();
  //Agent
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const { name, lastName, post } = user;

  /**Filtrage des patients au niveau des differents medecins */
  const [data, setData] = useState([]);

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
      })
      .catch((err) => console.error(err.response));
  }, [post]);

  useEffect(() => {
    GetPatient();
  }, [GetPatient]);

  //BulletinExamen
  const refBE = useRef();
  const [show, setShow] = useState(false);
  const [printbe, setPrintBE] = useState(false);

  const [patient, setPatient] = useState({
    name: "",
    lastName: "",
    phone: 0,
    dateDeNaissance: "",
    lieuDeNaissance: "",
    adresse: "",
    id: "",
  });

  const [patientSelect, setPatientSelect] = useState({ demande: [] });
  const [Examen, setExamen] = useState({});

  const selectPatient = ({
    idGeant,
    demande,
    idSup,
    accueil,
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
      idSup,
      accueil,
      patientName,
      patientLastName,
      adresse,
      patientPhone,
      patientId,
      module,
      dateDeNaissance,
      lieuDeNaissance,
    });
    GetPatient();
    setShow(true);

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
      lieuDeNaissance,
      adresse,
    });

    toast.info(
      `🦄 Patient ${patientName} ${patientLastName} est selectionné(e)`,
      { position: toast.POSITION.TOP_CENTER }
    );

    if (idSup) {
      selectBulletin(idSup);
    } else {
      setExamen({});
      setProductsExam([]);
    }
    dispatch(
      createRappMedecin({
        namePatient: `${patientName} ${patientLastName}`,
        agent: `${name} ${lastName}`,
        motif: demande[0],
      })
    );
  };

  //charger le bulletin d'examen du patient
  const selectBulletin = (id) => {
    api
      .post("/bulletinexamen/one", { id })
      .then((res) => {
        setExamen(res.data);
        setProductsExam(res.data.data);
      })
      .catch((errors) => console.error(errors));
  };
  //console.log(Examen);
  //Envoi al'emmetteur
  const envoiAuteur = () => {
    //if (!Examen._id) return;
    api.post("/users/one", { id: Examen.createdBy }).then((res) => {
      const resp = res.data;
      if (!resp) return;
      api
        .post("/accueil/infirmiere", {
          id: patientSelect.accueil,
          post: resp.post,
        })
        .then((res) => {
          setExamen({});
          setPatient({});
          setPatientSelect({ demande: [] });
          GetPatient();
          setShow(false);
        });
    });
  };

  const [productsExam, setProductsExam] = useState([]);

  const handleProductsExam = (e) => {
    setProductsExam(
      productsExam.map((item, index) =>
        index === e.index ? { ...item, response: e.response } : item
      )
    );
  };

  return (
    <main style={{ height: 100 + "%", margin: 0, padding: 0 }}>
      <div className='bg3'>
        <div
          style={{ width: 100 + "%", display: "flex", flexDirection: "row" }}
        >
          <div style={listeStyleDiv} className='text-light text-center'>
            <div style={listeStyle}>
              {data.length > 0 ? (
                <h6>
                  {" "}
                  {data.length} {data.length > 1 ? "PATIENTS" : "PATIENT(E)"} EN
                  ATTENTE
                </h6>
              ) : (
                <h6>AUCUN PATIENT EN ATTENTE</h6>
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
                    key={item._id}
                  />
                ))}
            </div>
            <div>
              {Examen && Examen._id && (
                <div className='m-auto'>
                  <button
                    className='btn btn-primary mx-auto'
                    onClick={() => envoiAuteur(patientSelect.idGeant)}
                  >
                    INFORMER LE MEDECIN <FaRegEnvelope className='mb-1' />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='container' style={{ width: 80 + "%" }}>
            <>
              {show && (
                <div
                  style={{ width: 75 + "%" }}
                  className='my-2 bg-dark text-light text-center border border-primary border-4 fs-4 fw-bold'
                >
                  FICHES MEDICALES DE{" "}
                  <span className='text-uppercase text-info ml-1'>
                    {patient.name + " " + patient.lastName}
                  </span>
                </div>
              )}

              {Examen && Examen._id && (
                <div className='m-auto'>
                  <BulletinExamen
                    namePatient={patient.name}
                    lastNamePatient={patient.lastName}
                    dateDeNaissance={patient.dateDeNaissance}
                    idPatient={patient.id}
                    productsExam={productsExam}
                    poste={post}
                    nameAgent={name}
                    lastNameAgent={lastName}
                    handleProductsExam={handleProductsExam}
                    idUpdate={patientSelect.idSup}
                    btn={() => setPrintBE(true)}
                    date={date}
                  />
                </div>
              )}
              {printbe && (
                <Modale close={() => setPrintBE(false)}>
                  <ReactToPrint
                    trigger={() => (
                      <button className='printBoutton'>
                        Imprimer <MdPrint />
                      </button>
                    )}
                    content={() => refBE.current}
                  />

                  <PrintBulletinExamen
                    namePatient={patient.name}
                    lastNamePatient={patient.lastName}
                    dateDeNaissance={patient.dateDeNaissance}
                    nameAgent={name}
                    lastNameAgent={lastName}
                    productsExam={productsExam}
                    poste={post}
                    date={date}
                    ref={refBE}
                  />
                </Modale>
              )}
            </>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Laborantin;
