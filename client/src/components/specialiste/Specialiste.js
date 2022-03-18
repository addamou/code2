import React, { useState, useEffect, Fragment, useRef } from "react";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactToPrint from "react-to-print";
import { ProfilPatient, Rechercher } from "../Formulaires";
import { ListePatientMedecin } from "../layout/Listes";
import { getAgent } from "../../actions/agent";
import { FaProcedures, FaFolderOpen, FaTrashAlt } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import Modale from "../layout/Modale";
//Les Importations des Fiches
import AvisHospitalisation from "../Fiches/AvisHospitalisation";
import PrintAvisHospitalisation from "../Fiches/AvisHospitalisation/PrintAvisHospitalisation";
import { AvisHospitalisations } from "../data/AvisHospitalisations";
import BulletinExamen from "../Fiches/BulletinExamen";
import PrintBulletinExamen from "../Fiches/BulletinExamen/printBulletinExamen";
import { BulletinExamens } from "../data/BulletinExamens";
import BulletinSortie from "../Fiches/BulletinSortie";
import PrintBulletinSortie from "../Fiches/BulletinSortie/PrintBulletinSortie";
import { BulletinSorties } from "../data/BulletinSorties";
import CertificatAccouchement from "../Fiches/CertificatAccouchement";
import PrintCertificatAccouchement from "../Fiches/CertificatAccouchement/PrintCertificatAccouchement";
import { CertificatAccouchements } from "../data/CertificatAccouchements";
import CertificatGrossesse from "../Fiches/CertificatGrossesse";
import PrintCertificatGrossesse from "../Fiches/CertificatGrossesse/PrintCertificatGrossesse";
import { CertificatGrossesses } from "../data/CertificatGrossesses";
import CertificatMedical from "../Fiches/CertificatMedical";
import PrintCertificatMedical from "../Fiches/CertificatMedical/PrintCertificatMedical";
import { CertificatMedicaux } from "../data/CertificatMedicaux";
import CertificatVisiteMedicale from "../Fiches/CerificatVisiteMedicale";
import PrintCertificatVisiteMedical from "../Fiches/CerificatVisiteMedicale/PrintCertificatVisiteMedical";
import { CertificatVisiteMedicaux } from "../data/CertificatVisiteMedicaux";
import CertificatVisteContreVisite from "../Fiches/CertificatVisiteContreVisite";
import PrintCertificatVisteContreVisite from "../Fiches/CertificatVisiteContreVisite/PrintCertificatDeVisiteEtContreVisiteMedicale";
import CompteRenduHospitalisation from "../Fiches/CompteRenduHospitalisation";
import PrintCompteRenduHospitalisation from "../Fiches/CompteRenduHospitalisation/PrintCompteRenduHospitalisation";
import { CompteRenduHospitalisations } from "../data/CompteRenduHospitalisations";
import CompteRenduAccouchement from "../Fiches/CompteRenduAccouchement";
import PrintCompteRenduAccouchement from "../Fiches/CompteRenduAccouchement/PrintCompteRenduAccouchement";
import { CompteRenduAccouchements } from "../data/CompteRenduAccouchements";
import ConsultationGenerale from "../Fiches/ConsultationGenerale";
import PrintConsultationGenerale from "../Fiches/ConsultationGenerale/PrintGenerale";
import { ConsultationGenerales } from "../data/ConsultationGenerales";
import ConsultationImagerie from "../Fiches/ConsultationImagerie";
import PrintConsultationImagerie from "../Fiches/ConsultationImagerie/PrintImagerie";
import { ConsultationImageries } from "../data/ConsultationImageries";
import ConsultationPediatrique from "../Fiches/ConsultationPediatrique";
import PrintPediatrique from "../Fiches/ConsultationPediatrique/PrintPediatrique";
import { ConsultationPediatriques } from "../data/ConsultationPediatriques";
import DossierMedical from "../Fiches/DossierMedical";
import Decharge from "../Fiches/Decharge";
import PrintDecharge from "../Fiches/Decharge/PrintDecharge";
import { Decharges } from "../data/Decharges";
import PrintDossierMedical from "../Fiches/DossierMedical/PrintDossier";
import { DossierMedicaux } from "../data/DossierMedicaux";
import EchoAbdominale from "../Fiches/EchoAbdominale";
import PrintEchoAbdominale from "../Fiches/EchoAbdominale/PrintEchographieAbdominale";
import { EchoAbdominales } from "../data/EchoAbdominales";
import EchoVesicoProstatique from "../Fiches/EchoVesicoProstatique";
import PrintEchoVesicoProstatique from "../Fiches/EchoVesicoProstatique/PrintEchoVesicoProstatique";
import { EchoProstates } from "../data/EchoProstates";
import { FicheNumerations } from "../data/FicheNumerations";
import { FicheTemperatures } from "../data/FicheTemperatures";
import Ordonnance from "../Fiches/Ordonnance";
import PrintOrdonance from "../Fiches/Ordonnance/PrintOrdonance";
import { Ordonnances } from "../data/Ordonnances";
import SoinUrgence from "../Fiches/SoinsUrgence";
import PrintSoinUrgence from "../Fiches/SoinsUrgence/PrintSoinsUrgence";
import { SoinUrgences } from "../data/SoinUrgences";
import { Bouton } from "../data/Bouton";
import { createRappMedecin } from "../../actions/rapportMedecin";

const listeMed = {
  background: "#01031BE0",
  height: "90vh",
  overflowY: "auto",
  width: 20 + "%",
  padding: 10,
};

const MedecinSpecialiste = () => {
  const date = new Date();
  const dispatch = useDispatch();
  //Listes des Medecins
  useEffect(() => {
    dispatch(getAgent());
  }, [dispatch]);
  const agentData = useSelector((state) => state.agent);
  const { agents } = agentData;

  //Filtrage des medecins pour les visite et Contre Viste
  const [medecins, setMedecins] = useState([]);
  useEffect(() => {
    if (agents !== undefined) {
      const medecin = agents.filter(
        (item) =>
          item.post !== "receptionniste" ||
          "financiere" ||
          "maintenancier" ||
          "laborantin",
        "infirmiere" || "gestionnairestock"
      );

      const resultat = medecin.map((item) => {
        return { name: `${item.name} ${item.lastName}` };
      });
      setMedecins(resultat);
    }
  }, [agents]);

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
        if (resp !== null) {
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

  //Onchange Fonction
  const handleChange = (e) => {
    e.target.id === "phone"
      ? setPatient({ ...patient, [e.target.id]: parseInt(e.target.value) })
      : setPatient({ ...patient, [e.target.id]: e.target.value });
  };

  //Modale update patient et Voir les Boutons d'historique
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(true);

  // selection de Patient de la liste et initialisation des donnee de patient
  const initialPatient = {
    name: "",
    lastName: "",
    phone: 0,
    dateDeNaissance: "",
    lieuDeNaissance: "",
    adresse: "",
    id: "",
  };

  const [patient, setPatient] = useState(initialPatient);

  const [patientSelect, setPatientSelect] = useState({});

  const selectPatient = ({
    idGeant,
    accueil,
    demande,
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
      accueil,
      demande,
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
      `Patient(e) ${patientName} ${patientLastName} est selectionné(e)`,
      { position: "top-center" }
    );

    getDossierMedical(patientId);
    setUpdate(true);
    setShow(true);
    setSearch(false);
    dispatch(
      createRappMedecin({
        createdBy: user._id,
        patient: `${patientName} ${patientLastName}`,
        agent: `${name} ${lastName}`,
      })
    );
  };

  //Dossier Medical
  const [DossierMedicals, setDossierMedical] = useState([]);
  const [Examlterieurs, setExamlterieurs] = useState([]);

  const getDossierMedical = (id) => {
    api
      .get("/dossier")
      .then((res) => {
        const result = res.data;
        let responses = [];
        result.map((el) =>
          el.examensUlterieurs.map((element) => responses.push(element))
        );
        setDossierMedical(result);
        setExamlterieurs(responses);
      })
      .catch((errors) => console.log(errors));
  };

  //Fonction Mise a jour profil
  const updatePatient = (e) => {
    e.preventDefault();

    api
      .post("/patient/update", patient)
      .then((res) => {
        toast.info("Vous venez de mettre à jour le profil du patient.", {
          position: "top-center",
        });
        setUpdate(false);
        setUpdate(initialPatient);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /** fonction Envoi de patient vers les infirmieres */
  const envoiInfirmiere = (id) => {
    api
      .put(`/accueil/${id}`, { id: patientSelect.accueil, post: "infirmiere" })
      .then((res) => {
        GetPatient();
        setShow(false);
        setSearch(true);
      })
      .catch((errors) => console.log(errors));
  };

  /** Effacer un patient de la liste */
  const effacerPatient = (id) => {
    api
      .delete(`/medecins/${id}`)
      .then((res) => {
        const Id = res.data._id;
        window.confirm("Voulez vous retirer ce patient de la liste");
        api.delete(`/accueil/${Id}`);
        setShow(false);
        setPatientSelect({});
        toast.info("Le patient est retiré de la liste", {
          position: "top-center",
        });
        GetPatient();
        setSearch(true);
      })
      .catch((err) => console.error(err));
  };

  /**Les Fiches et infos des patients*/

  //Bulletin D'examens
  const [bull, setBull] = useState(false);
  const refBilExam = useRef();
  const [bulletinExam, setBulletinExam] = useState(false);
  const [printBullExam, setPrintBullExam] = useState(false);

  const [productsExam, setProductsExam] = useState([]);
  const handleProductsExam = (e) =>
    setProductsExam([...productsExam, { ...e, response: "" }]);
  const DeleteExam = (i) =>
    setProductsExam(productsExam.filter((item, index) => index !== i));

  //Ordonnances
  const refO = useRef();
  const [ord, setOrd] = useState(false);
  const [o, setO] = useState(false);
  const [printO, setPrintO] = useState(false);

  const initialMed = { titre: "", quantite: "", prise: "" };
  const [produit, setProduit] = useState(initialMed);
  const Change = (e) =>
    setProduit({ ...produit, [e.target.id]: e.target.value });
  const [medicament, setMedicament] = useState([]);
  const ajouter = () => {
    setMedicament([...medicament, produit]);
    setProduit(initialMed);
  };

  const del = (item) =>
    setMedicament(medicament.filter((index, value) => item !== value));

  //Modal Dossier Medical
  const refDM = useRef();
  const [doss, setDoss] = useState(false);
  const [dm, setDM] = useState(false);
  const [printDM, setPrintDM] = useState(false);

  const [dataDM, setDataDM] = useState({});
  const handleChangeDM = (e) =>
    setDataDM({ ...dataDM, [e.target.id]: e.target.value });

  const [ExamenDM, setExamenDM] = useState([]);
  const handleExamenDM = (data) => setExamenDM(data);

  //Modal Avis Hospitaliastion
  const refAH = useRef();
  const [avisH, setAvisH] = useState(false);
  const [ah, setAH] = useState(false);
  const [printah, setPrintAH] = useState(false);

  const [dataAH, setDataAH] = useState({});
  const handleChangeAH = (e) =>
    setDataAH({ ...dataAH, [e.target.id]: e.target.value });

  //Modal Bulletin de Sortie
  const refBS = useRef();
  const [bulS, setBulS] = useState(false);
  const [bs, setBS] = useState(false);
  const [printbs, setPrintBS] = useState(false);

  const [dataBS, setDataBS] = useState({});
  const handleChangeBS = (e) =>
    setDataBS({ ...dataBS, [e.target.id]: e.target.value });

  //Modal Certificat Visite Medicale
  const certificatVM = useRef();
  const [certVM, setCertVM] = useState(false);
  const [cvm, setCvm] = useState(false);
  const [printCVM, setPrintCVM] = useState(false);

  const [justification, setJustification] =
    useState(`N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail. 
En conséquence, le (la) susnommé (e) est apte`);
  const justificationCVM = (a) => setJustification(a);

  //Modal Certificat Medicale
  const refCM = useRef();
  const [certM, setCertM] = useState(false);
  const [cm, setCM] = useState(false);
  const [printCM, setPrintCM] = useState(false);

  const [dataCM, setDataCM] = useState("");
  const handleChangeConstat = (e) => setDataCM(e.target.value);

  //Modal Consultation General
  const refConG = useRef();
  const [consGe, setConsGe] = useState(false);
  const [conG, setConG] = useState(false);
  const [printConG, setPrintConG] = useState(false);

  const [dataConG, setDataConG] = useState({});
  const handleChangeConG = (e) =>
    setDataConG({ ...dataConG, [e.target.id]: e.target.value });

  //Modal Compte Rendu Hospitalisation
  const refCRH = useRef();
  const [compHos, setCompHos] = useState(false);
  const [crh, setCRH] = useState(false);
  const [printcrh, setPrintCRH] = useState(false);

  const [dataCRH, setDataCRH] = useState({});
  const handleChangeCRH = (e) =>
    setDataCRH({ ...dataCRH, [e.target.id]: e.target.value });

  //Modal Decharges
  const refDecharge = useRef();
  const [dech, setDech] = useState(false);
  const [decharge, setDecharge] = useState(false);
  const [printD, setPrintD] = useState(false);

  const [responsable, setResponsable] = useState("");
  const handleChangeResponsableDecharge = (e) => {
    setResponsable(e.target.value);
  };
  const [typeResponsable, setTypeResponsable] = useState({
    malade: false,
    parent: false,
    accompagnant: false,
  });
  const handleChangeTypeResponsableDecharge = (e) => {
    setTypeResponsable({
      malade: false,
      parent: false,
      accompagnant: false,
      [e.target.id]: e.target.checked,
    });
  };

  //Modal Consultation Imagerie
  const [imge, setImge] = useState(false);
  const refI = useRef();
  const [img, setImg] = useState(false);
  const [printImg, setPrintImg] = useState(false);

  const [dataI, setDataI] = useState({});
  const handleChangeI = (e) =>
    setDataI({ ...dataI, [e.target.id]: e.target.value });

  //Modal Soin Urgence
  const refSU = useRef();
  const [soinUrg, setSoinUrg] = useState(false);
  const [su, setSU] = useState(false);
  const [printsu, setPrintSU] = useState(false);
  const [dataSU, setDataSU] = useState([]);
  const [protocol, setProtocol] = useState("");

  const handleProducts = (e) => {
    if (!e) {
      setDataSU([]);
    }
    setDataSU([...dataSU, e]);
  };

  const handleDeleteProduct = (i) =>
    setDataSU(dataSU.filter((item, index) => index !== i));

  //Modal Fiche Temperature
  const [ficheT, setFicheT] = useState(false);
  const [ficheN, setFicheN] = useState(false);
  //Modal Echographie Abdominale
  const refEA = useRef();
  const [echoA, setEchoA] = useState(false);
  const [ea, setEA] = useState(false);
  const [printea, setPrintEA] = useState(false);

  const [dataEA, setDataEA] = useState({});
  const handleChangeEA = (e) =>
    setDataEA({ ...dataEA, [e.target.id]: e.target.value });

  //Modal Echographie Prostatique
  const refEVP = useRef();
  const [echoP, setEchoP] = useState(false);
  const [ep, setEP] = useState(false);
  const [printep, setPrintEP] = useState(false);

  const [dataEVP, setDataEVP] = useState({});
  const handleChangeEVP = (e) =>
    setDataEVP({ ...dataEVP, [e.target.id]: e.target.value });

  //Modal Dossier Certificat Accouchement
  const refCA = useRef();
  const [certAcc, setCertAcc] = useState(false);
  const [ca, setCA] = useState(false);
  const [printca, setPrintCA] = useState(false);

  const [dataCA, setDataCA] = useState({});
  const handleChangeCA = (e) =>
    setDataCA({ ...dataCA, [e.target.id]: e.target.value });

  //Modal Dossier Certificat Grossesses
  const refCG = useRef();
  const [certGros, setCertGros] = useState(false);
  const [cg, setCG] = useState(false);
  const [printcg, setPrintCG] = useState(false);

  const [dataCG, setDataCG] = useState({});
  const handleChangeCG = (e) =>
    setDataCG({ ...dataCG, [e.target.id]: e.target.value });

  //Modal Compte Rendu Accouchement
  const refCRA = useRef();
  const [compAcc, setCompAcc] = useState(false);
  const [cra, setCRA] = useState(false);
  const [printcra, setPrintCRA] = useState(false);

  const [dataCRA, setDataCRA] = useState({});
  const handleChangeCRA = (e) =>
    setDataCRA({ ...dataCRA, [e.target.id]: e.target.value });

  //Modal Consultation Peiatrie
  const refCP = useRef();
  const [consPe, setConsPe] = useState(false);
  const [cp, setCP] = useState(false);
  const [printcp, setPrintCP] = useState(false);

  const [dataCP, setDataCP] = useState({});
  const handleChangeCP = (e) =>
    setDataCP({ ...dataCP, [e.target.id]: e.target.value });

  //Modal Certificat de visite et contre visite
  const refCVCV = useRef();
  const [cvcv, setCVCV] = useState(false);
  const [printcvcv, setPrintCVCV] = useState(false);
  const [medecin2, setMedecin2] = useState("");

  /**Les Infos des patients */

  return (
    <section style={{ width: "100%" }}>
      <div className='d-flex container-fluid m-0 p-0 row w-100 bg1'>
        <div
          className='col-3 text-center text-light pl-1 justify-content-between d-flex flex-column'
          style={listeMed}
        >
          <div>
            {data.length > 0 ? (
              <h6>
                {" "}
                {data.length} {data.length > 1 ? "PATIENTS" : "PATIENT(E)"} EN
                ATTENTE
              </h6>
            ) : (
              <h6>AUCUN PATIENT EN ATTENTE</h6>
            )}
            {data.length > 0 &&
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
                  key={item._id}
                  adresse={
                    item.geant.patient.adresse ? item.geant.patient.adresse : ""
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
                />
              ))}
          </div>
          <div>
            {patientSelect.idGeant && (
              <div className=''>
                <button
                  className='btn btn-danger m-1'
                  type='button'
                  onClick={() => effacerPatient(patientSelect.idGeant)}
                >
                  Retirer <FaTrashAlt />
                </button>
                <button
                  className='btn btn-primary m-1'
                  type='button'
                  onClick={() => envoiInfirmiere(patientSelect.accueil)}
                >
                  Hospitaliser <FaProcedures />
                </button>
              </div>
            )}
          </div>
        </div>
        <div style={{ width: 80 + "%" }}>
          {search && <Rechercher GetPatient={GetPatient} poste={post} />}
          {show && (
            <Fragment>
              <h2 className='my-5 bg-dark text-light text-center border border-primary border-4'>
                DOCUMENTS MEDICAUX DE{" "}
                <span className='text-uppercase text-info ml-1'>
                  {patient.name + " " + patient.lastName}
                </span>
              </h2>
              <Bouton
                DM={() => setDoss(true)}
                BE={() => setBull(true)}
                FT={() => setFicheT(true)}
                FN={() => setFicheN(true)}
                CGE={() => setConsGe(true)}
                OR={() => setOrd(true)}
                CRH={() => setCompHos(true)}
                AH={() => setAvisH(true)}
                SU={() => setSoinUrg(true)}
                IM={() => setImge(true)}
                EA={() => setEchoA(true)}
                EP={() => setEchoP(true)}
                DE={() => setDech(true)}
                CVM={() => setCertVM(true)}
                CM={() => setCertM(true)}
                BS={() => setBulS(true)}
              />
            </Fragment>
          )}
          <Fragment>
            {patientSelect.idGeant && (
              <div className='listeDiv'>
                <FaFolderOpen className='buttonAdd' />
                <ul>
                  <li onClick={() => setAH(true)}>AVIS D'HOSPITALISATION</li>
                  <li onClick={() => setBulletinExam(true)}>
                    BULLETIN D'EXAMEN
                  </li>
                  <li onClick={() => setBS(true)}>BULLETIN DE SORTIE</li>
                  <li onClick={() => setCvm(true)}>
                    CERTIFICAT DE VISITE MEDICALE
                  </li>
                  <li onClick={() => setCM(true)}>CERTIFICAT MEDICAL</li>
                  <li onClick={() => setDM(true)}>DOSSIER MEDICAL</li>
                  <li onClick={() => setO(true)}>ORDONNANCE</li>
                </ul>
              </div>
            )}
          </Fragment>
          <Fragment>
            {update && (
              <ProfilPatient
                handleChange={handleChange}
                updatePatient={updatePatient}
                open={() => setUpdate(true)}
                close={() => setUpdate(false)}
                patient={patient}
              />
            )}

            {/** Dossier Medical */}

            {dm && (
              <Modale close={() => setDM(false)}>
                <DossierMedical
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  handleChange={handleChangeDM}
                  data={dataDM}
                  handleExamenDM={handleExamenDM}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  close={() => setDM(false)}
                  print={() => setPrintDM(true)}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printDM && (
              <Modale close={() => setPrintDM(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refDM.current}
                />

                <PrintDossierMedical
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={dataDM}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  Examens={ExamenDM}
                  date={date}
                  ref={refDM}
                />
              </Modale>
            )}

            {doss && (
              <Modale close={() => setDoss(false)}>
                {DossierMedicals.length > 0 ? (
                  <DossierMedicaux
                    namePatient={patient.name}
                    lastNamePatient={patient.lastName}
                    dateDeNaissance={patient.dateDeNaissance}
                    close={() => setDM(false)}
                    print={() => setPrintDM(true)}
                    handleChange={handleChangeDM}
                    data={DossierMedicals[0]}
                    date={date}
                    Examens={Examlterieurs}
                    idPatient={patient.id}
                  />
                ) : (
                  <div
                    className='d-flex flex-column 
                                    justify-content-center align-items-center
                                    text-center text-light display-3'
                    style={{ height: "90vh", width: "100vw" }}
                  >
                    <div>Ce patient ne dispose pas de Dossier Médical !</div>
                  </div>
                )}
              </Modale>
            )}

            {/**Bulletin Examens */}

            {bulletinExam && (
              <Modale close={() => setBulletinExam(false)}>
                <BulletinExamen
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  closeBE={() => setBulletinExam(false)}
                  printBE={() => setPrintBullExam(true)}
                  handleProductsExam={handleProductsExam}
                  productsExam={productsExam}
                  handleDelete={DeleteExam}
                  handleDeleteResponse={() => null}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  poste={post}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printBullExam && (
              <Modale close={() => setPrintBullExam(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refBilExam.current}
                />

                <PrintBulletinExamen
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  productsExam={productsExam}
                  poste={post}
                  ref={refBilExam}
                />
              </Modale>
            )}

            {bull && (
              <Modale close={() => setBull(false)}>
                <BulletinExamens
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/**Ordonnances */}

            {o && (
              <Modale close={() => setO(false)}>
                <Ordonnance
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  closeO={() => setO(false)}
                  printO={() => setPrintO(true)}
                  change={Change}
                  produit={produit}
                  medicaments={medicament}
                  ajouter={ajouter}
                  del={del}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  poste={post}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printO && (
              <Modale close={() => setPrintO(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refO.current}
                />

                <PrintOrdonance
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={medicament}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  poste={post}
                  date={date}
                  ref={refO}
                />
              </Modale>
            )}

            {ord && (
              <Modale close={() => setOrd(false)}>
                <Ordonnances
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  poste={post}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/**Avis d'AvisHospitalisations */}

            {ah && (
              <Modale close={() => setAH(false)}>
                <AvisHospitalisation
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataAH}
                  closeAH={() => setAH(false)}
                  printAH={() => setPrintAH(true)}
                  handleChange={handleChangeAH}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  poste={post}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printah && (
              <Modale close={() => setPrintAH(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refAH.current}
                />

                <PrintAvisHospitalisation
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataAH}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  poste={post}
                  ref={refAH}
                />
              </Modale>
            )}

            {avisH && (
              <Modale close={() => setAvisH(false)}>
                <AvisHospitalisations
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Bulletin de Sortie */}

            {bs && (
              <Modale close={() => setBS(false)}>
                <BulletinSortie
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataBS}
                  dateDeNaissance={patient.dateDeNaissance}
                  close={() => setBS(false)}
                  print={() => setPrintBS(true)}
                  handleChange={handleChangeBS}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printbs && (
              <Modale close={() => setPrintBS(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refBS.current}
                />

                <PrintBulletinSortie
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={dataBS}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refBS}
                />
              </Modale>
            )}

            {bulS && (
              <Modale close={() => setBulS(false)}>
                <BulletinSorties
                  date={date}
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** certificat visite medical */}

            {cvm && (
              <Modale close={() => setCvm(false)}>
                <CertificatVisiteMedicale
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  lieuDeNaissance={patient.lieuDeNaissance}
                  module={patientSelect.module}
                  close={() => setCvm(false)}
                  print={() => setPrintCVM(true)}
                  label={true}
                  justificationCVM={justificationCVM}
                  justification={justification}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printCVM && (
              <Modale close={() => setPrintCVM(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer
                      <MdPrint />
                    </button>
                  )}
                  content={() => certificatVM.current}
                />

                <PrintCertificatVisiteMedical
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  lieuDeNaissance={patient.lieuDeNaissance}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  justification={justification}
                  date={date}
                  ref={certificatVM}
                />
              </Modale>
            )}

            {certVM && (
              <Modale close={() => setCertVM(false)}>
                <CertificatVisiteMedicaux
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  lieuDeNaissance={patient.lieuDeNaissance}
                  justification={justification}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Certificat Medical */}

            {cm && (
              <Modale close={() => setCM(false)}>
                <CertificatMedical
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  handleChangeConstat={handleChangeConstat}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  module={patientSelect.module}
                  dataCM={dataCM}
                  close={() => setCM(false)}
                  print={() => setPrintCM(true)}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printCM && (
              <Modale close={() => setPrintCM(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refCM.current}
                />
                <PrintCertificatMedical
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dataCM={dataCM}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refCM}
                />
              </Modale>
            )}

            {certM && (
              <Modale close={() => setCertM(false)}>
                <CertificatMedicaux
                  namePatient={patient.name}
                  dateDeNaissance={patient.dateDeNaissance}
                  lastNamePatient={patient.lastName}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Consultation General */}

            {conG && (
              <Modale close={() => setConG(false)}>
                <ConsultationGenerale
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataConG}
                  dateDeNaissance={patient.dateDeNaissance}
                  close={() => setConG(false)}
                  print={() => setPrintConG(true)}
                  handleChange={handleChangeConG}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}
            {printConG && (
              <Modale close={() => setPrintConG(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refConG.current}
                />

                <PrintConsultationGenerale
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={dataConG}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refConG}
                />
              </Modale>
            )}

            {consGe && (
              <Modale close={() => setConsGe(false)}>
                <ConsultationGenerales
                  namePatient={patient.name}
                  dateDeNaissance={patient.dateDeNaissance}
                  lastNamePatient={patient.lastName}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Compte rendu AvisHospitalisations */}

            {crh && (
              <Modale close={() => setCRH(false)}>
                <CompteRenduHospitalisation
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  handleChange={handleChangeCRH}
                  data={dataCRH}
                  print={() => setPrintCRH(true)}
                  close={() => setCRH(false)}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printcrh && (
              <Modale close={() => setPrintCRH(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refCRH.current}
                />

                <PrintCompteRenduHospitalisation
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={dataCRH}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refCRH}
                />
              </Modale>
            )}

            {compHos && (
              <Modale close={() => setCompHos(false)}>
                <CompteRenduHospitalisations
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** DEcharge */}

            {decharge && (
              <Modale close={() => setDecharge(false)}>
                <Decharge
                  responsable={responsable}
                  handleChangeResponsableDecharge={
                    handleChangeResponsableDecharge
                  }
                  handleChangeTypeResponsableDecharge={
                    handleChangeTypeResponsableDecharge
                  }
                  typeResponsable={typeResponsable}
                  module={patientSelect.module}
                  closeD={() => setDecharge(false)}
                  printD={() => setPrintD(true)}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  poste={post}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printD && (
              <Modale close={() => setPrintD(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refDecharge.current}
                />

                <PrintDecharge
                  handleChangeResponsableDecharge={
                    handleChangeResponsableDecharge
                  }
                  responsable={responsable}
                  handleChangeTypeResponsableDecharge={
                    handleChangeTypeResponsableDecharge
                  }
                  typeResponsable={typeResponsable}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  poste={post}
                  ref={refDecharge}
                  date={date}
                />
              </Modale>
            )}
            {dech && (
              <Modale close={() => setDech(false)}>
                <Decharges idPatient={patient.id} />
              </Modale>
            )}

            {/** Cons Imagerie */}

            {img && (
              <Modale close={() => setImg(false)}>
                <ConsultationImagerie
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataI}
                  dateDeNaissance={patient.dateDeNaissance}
                  closeCI={() => setImg(false)}
                  printCI={() => setPrintImg(true)}
                  handleChange={handleChangeI}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printImg && (
              <Modale close={() => setPrintImg(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refI.current}
                />

                <PrintConsultationImagerie
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={dataI}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refI}
                />
              </Modale>
            )}

            {imge && (
              <Modale
                close={() => {
                  setImge(false);
                }}
              >
                <ConsultationImageries
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Soin d'urgence */}

            {su && (
              <Modale close={() => setSU(false)}>
                <SoinUrgence
                  close={() => setSU(false)}
                  print={() => setPrintSU(true)}
                  date={date}
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  dataSU={dataSU}
                  dataP={protocol}
                  setDataP={setProtocol}
                  handleProducts={handleProducts}
                  handleDelete={handleDeleteProduct}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printsu && (
              <Modale close={() => setPrintSU(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refSU.current}
                />

                <PrintSoinUrgence
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  dataSU={dataSU}
                  dataP={protocol}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refSU}
                />
              </Modale>
            )}

            {soinUrg && (
              <Modale
                close={() => {
                  setSoinUrg(false);
                }}
              >
                <SoinUrgences
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Fiche de Temperature */}

            {ficheT && (
              <Modale close={() => setFicheT(false)}>
                <FicheTemperatures
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
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

            {/** Echo Abdominale */}

            {ea && (
              <Modale close={() => setEA(false)}>
                <EchoAbdominale
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataEA}
                  dateDeNaissance={patient.dateDeNaissance}
                  closeEA={() => setEA(false)}
                  printEA={() => setPrintEA(true)}
                  handleChange={handleChangeEA}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printea && (
              <Modale close={() => setPrintEA(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refEA.current}
                />

                <PrintEchoAbdominale
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={dataEA}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refEA}
                />
              </Modale>
            )}

            {echoA && (
              <Modale close={() => setEchoA(false)}>
                <EchoAbdominales
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Echo Prostate  */}

            {ep && (
              <Modale close={() => setEP(false)}>
                <EchoVesicoProstatique
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataEVP}
                  dateDeNaissance={patient.dateDeNaissance}
                  closeEP={() => setEP(false)}
                  printEP={() => setPrintEP(true)}
                  handleChange={handleChangeEVP}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}
            {printep && (
              <Modale close={() => setPrintEP(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refEVP.current}
                />

                <PrintEchoVesicoProstatique
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={dataEVP}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refEVP}
                />
              </Modale>
            )}

            {echoP && (
              <Modale close={() => setEchoP(false)}>
                <EchoProstates
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Compte rendu d'Accouchement */}

            {cra && (
              <Modale close={() => setCRA(false)}>
                <CompteRenduAccouchement
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataCRA}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  closeCRA={() => setCRA(false)}
                  printCRA={() => setPrintCRA(true)}
                  handleChange={handleChangeCRA}
                  date={date}
                  poste={post}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printcra && (
              <Modale close={() => setPrintCRA(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refCRA.current}
                />

                <PrintCompteRenduAccouchement
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataCRA}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  poste={post}
                  ref={refCRA}
                />
              </Modale>
            )}
            {compAcc && (
              <Modale close={() => setCompAcc(false)}>
                <CompteRenduAccouchements
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  name={name}
                  lastName={lastName}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Certificat d'accouchement */}

            {ca && (
              <Modale close={() => setCA(false)}>
                <CertificatAccouchement
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  printCA={() => setPrintCA(true)}
                  closeCA={() => setCA(false)}
                  data={dataCA}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  handleChange={handleChangeCA}
                  date={date}
                  poste={post}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {printca && (
              <Modale close={() => setPrintCA(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refCA.current}
                />

                <PrintCertificatAccouchement
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataCA}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  poste={post}
                  ref={refCA}
                />
              </Modale>
            )}
            {certAcc && (
              <Modale close={() => setCertAcc(false)}>
                <CertificatAccouchements
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Certificat de Grossesse */}
            {cg && (
              <Modale close={() => setCG(false)}>
                <CertificatGrossesse
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  printCG={() => setPrintCG(true)}
                  closeCG={() => setCG(false)}
                  handleChange={handleChangeCG}
                  data={dataCG}
                  date={date}
                  poste={post}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  idPatient={patient.id}
                />
              </Modale>
            )}
            {printcg && (
              <Modale close={() => setPrintCG(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refCG.current}
                />

                <PrintCertificatGrossesse
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataCG}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  poste={post}
                  ref={refCG}
                />
              </Modale>
            )}

            {certGros && (
              <Modale close={() => setCertGros(false)}>
                <CertificatGrossesses
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Consultation pediatique */}
            {cp && (
              <Modale close={() => setCP(false)}>
                <ConsultationPediatrique
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  data={dataCP}
                  dateDeNaissance={patient.dateDeNaissance}
                  close={() => setCP(false)}
                  print={() => setPrintCP(true)}
                  handleChange={handleChangeCP}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  idPatient={patient.id}
                />
              </Modale>
            )}
            {printcp && (
              <Modale close={() => setPrintCP(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refCP.current}
                />

                <PrintPediatrique
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  data={dataCP}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refCP}
                />
              </Modale>
            )}
            {consPe && (
              <Modale close={() => setConsPe(false)}>
                <ConsultationPediatriques
                  namePatient={patient.name}
                  lastNamePatient={patient.lastName}
                  dateDeNaissance={patient.dateDeNaissance}
                  idPatient={patient.id}
                />
              </Modale>
            )}

            {/** Certificat Visite Contre Visite */}

            {cvcv && (
              <Modale close={() => setCVCV(false)}>
                <CertificatVisteContreVisite
                  namePatient={patientSelect.patientName}
                  lastNamePatient={patientSelect.patientLastName}
                  dateDeNaissance={patientSelect.dateDeNaissance}
                  lieuDeNaissance={patientSelect.lieuDeNaissance}
                  module={patientSelect.module}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  close={() => setCVCV(false)}
                  print={() => setPrintCVCV(true)}
                  agents={medecins}
                  medecin2={medecin2}
                  setMedecin2={setMedecin2}
                  date={date}
                  idPatient={patientSelect.patientId}
                />
              </Modale>
            )}

            {printcvcv && (
              <Modale close={() => setPrintCVCV(false)}>
                <ReactToPrint
                  trigger={() => (
                    <button className='printBoutton'>
                      Imprimer <MdPrint />
                    </button>
                  )}
                  content={() => refCVCV.current}
                />

                <PrintCertificatVisteContreVisite
                  namePatient={patientSelect.patientName}
                  lastNamePatient={patientSelect.patientLastName}
                  dateDeNaissance={patientSelect.dateDeNaissance}
                  lieuDeNaissance={patientSelect.lieuDeNaissance}
                  medecin2={medecin2}
                  nameAgent={name}
                  lastNameAgent={lastName}
                  date={date}
                  ref={refCVCV}
                />
              </Modale>
            )}
          </Fragment>
        </div>
      </div>
    </section>
  );
};

export default MedecinSpecialiste;
