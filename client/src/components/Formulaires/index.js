import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Modal from "../layout/Modal";
import { Postes } from "../data/Postes";
import { createRappCaisse } from "../../actions/caisse";
import { createRappFinancier } from "../../actions/finance";
import { createRappMedecin } from "../../actions/rapportMedecin";
import { createOffre } from "../../actions/offre";
import { createDoc } from "../../actions/documents";

// formulaire d'ajout offre de service
export const Offres = ({ ouvrir, fermer }) => {
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const dispatch = useDispatch();
  const initOffre = { label: "", poste: "" };
  const [offre, setOffre] = useState(initOffre);

  /** La fonction Onchange **/
  const ChangeO = (e) => setOffre({ ...offre, [e.target.id]: e.target.value });

  const submit2 = (e) => {
    e.preventDefault();
    if (offre !== "") {
      dispatch(createOffre(offre));
      fermer();
      setOffre(initOffre);
    } else {
      toast.error("Verifier si tous les champs sont remplis...", {
        position: "top-center",
      });
      setOffre(initOffre);
    }
  };
  const offress =
    user.isAdmin === true ? (
      <Modal
        ouvrir={ouvrir}
        fermer={fermer}
        click={submit2}
        css={"col-4 border-danger border-3"}
        css1={"btn btn-success"}
        bg={"#0016DD"}
        titre={"FORMULAIRE DE PRESTATION DE SERVICE"}
        bouton={"CREER"}
      >
        <form className='p-3 bg-dark text-light' autoComplete='false'>
          <div className='form-group'>
            <label htmlFor='label'>Titre</label>
            <input
              type='text'
              required
              className='form-control text-capitalize'
              value={offre.label}
              onChange={ChangeO}
              placeholder='Libellé'
              id='label'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='post' className='form-label'>
              Postes
            </label>
            <select
              className='form-control form-control-sm'
              id='poste'
              value={offre.poste}
              onChange={ChangeO}
            >
              <option defaultValue={{}}>Choisir...</option>
              {Postes.map((item) => (
                <option key={item.id} value={item.poste}>
                  {item.poste}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    ) : (
      <Modal
        ouvrir={ouvrir}
        fermer={fermer}
        css={"col-6 border-danger border-3"}
        css1={"btn btn-success"}
        bg={"#0016DD"}
        titre={"VOUS N'ETES PAS AUTORISE POUR CET ACTION"}
      >
        <div className='bg-light text-center display-4'>
          Cette action est destinée aux administrateurs.
        </div>
      </Modal>
    );
  return offress;
};

// formulaire de modification de mot de passe
export const Password = ({ ouvrir, fermer, id }) => {
  const [reset, setReset] = useState({ id, password: "", confirmPassword: "" });

  const handleChange = (e) =>
    setReset({ ...reset, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post(`/agent/password`, reset)
      .then((res) => {
        if (reset.password === "") {
          //  block of code to be executed if condition1 is true
          toast.warning("Champs Mot de passe ne doit pas être vide", {
            position: "top-center",
          });
        } else if (reset.confirmPassword === "") {
          //  block of code to be executed if the condition2 is false and condition2 is true
          toast.warning("Champs Confirmer Mot de passe ne doit pas être vide", {
            position: "top-center",
          });
        } else if (reset.password !== reset.confirmPassword) {
          //  block of code to be executed if the condition3 is false and condition2 is false
          toast.warning("Les mots de passe ne concorde pas", {
            position: "top-center",
          });
        } else {
          toast.info("La modification de votre mot de passe à réussi.", {
            position: "top-center",
          });
          setReset({ password: "", confirmPassword: "" });

          fermer();
        }
      })
      .catch((err) => toast.error(err, { position: "top-center" }));
  };

  return (
    <Modal
      ouvrir={ouvrir}
      fermer={fermer}
      click={handleSubmit}
      css={"col-6 border-success border-3"}
      css1={"btn btn-success"}
      bg={"#4E2B04"}
      titre={"FORMULAIRE DE MODIFICATION MOT DE PASSE"}
      bouton={"MODIFIER"}
    >
      <form className='p-3 bg-secondary' autoComplete='false'>
        <div className='form-group my-3'>
          <label htmlFor='password'>Nouveau Mot de passe</label>
          <input
            type='password'
            className='form-control mx-auto'
            value={reset.password}
            onChange={handleChange}
            placeholder='Nouveau mot de passe'
            id='password'
          />
        </div>
        <div className='form-group my-3'>
          <label htmlFor='confirmPassword'>Confirmer Mot de passe</label>
          <input
            type='password'
            className='form-control mx-auto'
            id='confirmPassword'
            value={reset.confirmPassword}
            onChange={handleChange}
            placeholder='confirmer le mot de passe'
          />
        </div>
      </form>
    </Modal>
  );
};

//formulaire ajout de document administratif
export const Document = ({ ouvrir, fermer, agentNom, agentPrenom, getDoc }) => {
  const dispatch = useDispatch();

  const [titre, setTitre] = useState("");
  const [agent] = useState(`${agentNom} ${agentPrenom}`);
  const [fileName, setFileName] = useState("");

  const ChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  const SubmitD = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("agent", agent);
    formData.append("document", fileName);

    dispatch(createDoc(formData));
    setTitre("");
    setFileName("");
    fermer();
    getDoc();
  };

  return (
    <Modal
      ouvrir={ouvrir}
      fermer={fermer}
      click={SubmitD}
      css={"col-6 border-info border-3"}
      css1={"btn btn-success"}
      bg={"#E76208"}
      titre={"FORMULAIRE D'AJOUT DOCUMENT ADMINISTRATIF"}
      bouton={"AJOUTER"}
    >
      <form
        encType='multipart/form-data'
        className='bg-dark text-light p-3'
        autoComplete='false'
      >
        <div className='form-group'>
          <label>Nom du Document</label>
          <input
            type='text'
            className='form-control'
            onChange={(e) => setTitre(e.target.value)}
            id='titre'
            placeholder='Entrer titre du document'
          />
        </div>
        <div className='form-group'>
          <div className='mb-3'>
            <label className='custom-file'>
              <input
                type='file'
                fileName='document'
                onChange={ChangeFile}
                id='document'
                aria-describedby='fileHelpId'
                className='custom-file-input'
              />
            </label>
          </div>
        </div>
      </form>
    </Modal>
  );
};

// formulaire ajout rapport journalier de caisse
export const FormCaisse = ({ open, close, name, lastName }) => {
  const dispatch = useDispatch();

  //useState Declaration
  const [monter, setMonter] = useState("");
  const [montant, setMontant] = useState("");
  const [fileName, setFileName] = useState("");
  const [observation, setObservation] = useState("");
  const [caissiere] = useState(`${name} ${lastName}`);

  const ChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  const Submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("monter", monter);
    formData.append("montant", montant);
    formData.append("observation", observation);
    formData.append("document", fileName);
    formData.append("caissiere", caissiere);

    dispatch(createRappCaisse(formData));
    setMonter("");
    setMontant("");
    setObservation("");
    setFileName("");
    close();
  };

  return (
    <Modal
      ouvrir={open}
      fermer={close}
      click={Submit}
      css={"col-6"}
      css1={"btn btn-success"}
      bg={"#08041D"}
      titre={"RAPPORT DE CAISSE"}
      bouton={"VALIDER"}
    >
      <div className='bg-light p-3'>
        <form encType='multipart/form-data' autoComplete='false'>
          <div className='form-group'>
            <label htmlFor='monter'>DATE ET HEURE DE PRISE DE SERVICE</label>
            <input
              type='datetime-local'
              className='form-control'
              value={monter}
              onChange={(e) => setMonter(e.target.value)}
              id='monter'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='montant'>TOTAL DES ENCAISSEMENT</label>
            <input
              type='number'
              className='form-control'
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              id='montant'
              placeholder='Entrer la somme encaissée'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='observation'>MES OBSERVATION</label>
            <textarea
              type='text'
              className='form-control text-capitalize'
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              id='observation'
              placeholder='Entrer vos observations'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='document'>Document Récapitulatif</label>
            <br />
            <input
              type='file'
              filename='document'
              onChange={ChangeFile}
              id='document'
              className='custom-file-input'
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

// formulaire de validation du rapport de la caisse
export const FormFinanciere = ({
  ouvrir,
  fermer,
  agentPrenom,
  agentNom,
  nouveau,
}) => {
  const dispatch = useDispatch();
  //INITIALISATION DE STATE
  const initialState = {
    debut: "",
    caissiere: "",
    montant: "",
    manque: 0,
    observation: "",
    agent: `${agentPrenom} ${agentNom}`,
  };

  const [data, setData] = useState(initialState);
  const { debut, caissiere, montant, manque, observation } = data;

  const ChangeF = (e) => setData({ ...data, [e.target.id]: e.target.value });

  const SubmitF = (e) => {
    e.preventDefault();
    dispatch(createRappFinancier(data));
    setData(initialState);
    fermer();
    nouveau();
  };

  return (
    <Modal
      ouvrir={ouvrir}
      fermer={fermer}
      click={SubmitF}
      css={"col-6 border-info border-3"}
      css1={"btn btn-success"}
      bg={"#E76208"}
      titre={"FORMULAIRE DE VALIDATION DE CAISSE"}
      bouton={"VALIDER"}
    >
      <form className='p-3 bg-dark text-light' autoComplete='false'>
        <div className='row'>
          <div className='col-md-6'>
            <label htmlFor='debut'>Date de Reception</label>
            <input
              type='date'
              className='form-control'
              onChange={ChangeF}
              value={debut}
              id='debut'
              placeholder='Date de reception du rapport de la caissière'
            />
          </div>

          <div className='col-md-6'>
            <label htmlFor='caissiere'>La Perceptriste</label>
            <input
              type='text'
              className='form-control'
              onChange={ChangeF}
              value={caissiere}
              id='caissiere'
              placeholder='Nom et Prénom'
            />
          </div>
        </div>

        <div className='row text-light'>
          <div className='col-md-6'>
            <label htmlFor='montant'>Montant de Caisse</label>
            <input
              type='number'
              className='form-control'
              onChange={ChangeF}
              value={montant}
              id='montant'
              placeholder='Montant Encaisser'
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='manque'>Manquement Constaté</label>
            <input
              type='number'
              className='form-control'
              onChange={ChangeF}
              value={manque}
              id='manque'
              placeholder='Manque Constaté'
            />
          </div>
        </div>
        <div className='form-group my-1 text-light text-center'>
          <label htmlFor='observation'>Observations</label>
          <textarea
            type='text'
            className='form-control'
            onChange={ChangeF}
            value={observation}
            id='observation'
            placeholder='Observations constaté'
          />
        </div>
      </form>
    </Modal>
  );
};

// formulaire de mise a jour du profil patient
export const ProfilPatient = ({
  updatePatient,
  open,
  close,
  patient,
  handleChange,
  load,
}) => {
  return (
    <Modal
      ouvrir={open}
      fermer={close}
      click={updatePatient}
      css={"col-6"}
      css1={"btn btn-success"}
      bg={"#004370"}
      titre={"MISE A JOUR PROFIL PATIENT"}
      bouton={
        !load ? (
          "MISE A JOUR"
        ) : (
          <span className='spinner-border text-danger' role='status' />
        )
      }
    >
      <form className='p-3 bg-dark text-left text-light' autoComplete='false'>
        <div className='d-flex row'>
          <div className='form-group col-6'>
            <label htmlFor='name'>Prénom</label>
            <input
              type='text'
              className='form-control'
              value={patient.name}
              onChange={handleChange}
              placeholder='Prénom du patient'
              id='name'
            />
          </div>
          <div className='form-group col-6'>
            <label htmlFor='lastName'>Nom de famille</label>
            <input
              type='text'
              className='form-control'
              id='lastName'
              value={patient.lastName}
              onChange={handleChange}
              placeholder='Nom de Famille'
            />
          </div>
        </div>
        <div className='d-flex row'>
          <div className='form-group col-6'>
            <label htmlFor='dateDeNaissance'>Date de Naissance</label>
            <input
              type='date'
              className='form-control'
              value={patient.dateDeNaissance}
              placeholder='Date de Naissance'
              onChange={handleChange}
              id='dateDeNaissance'
            />
          </div>
          <div className='form-group col-6'>
            <label htmlFor='lieuDeNaissance'>Lieu de Naissance</label>
            <input
              type='text'
              className='form-control'
              id='lieuDeNaissance'
              value={patient.lieuDeNaissance}
              onChange={handleChange}
              placeholder='Lieu de Naissance'
            />
          </div>
        </div>
        <div className='d-flex row'>
          <div className='form-group col-6'>
            <label htmlFor='phone'>Numéro de téléphone</label>
            <input
              type='tel'
              className='form-control'
              id='phone'
              value={patient.phone}
              onChange={handleChange}
              placeholder='Numéro de téléphone'
            />
          </div>
          <div className='form-group col-6'>
            <label htmlFor='adresse'>Adresse</label>
            <input
              type='text'
              className='form-control'
              value={patient.adresse}
              placeholder='Adresse du Patient'
              onChange={handleChange}
              id='adresse'
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

// formulaire de mise a jour du profil agent
export const ProfilAgent = ({
  ouvrir,
  fermer,
  name,
  lastName,
  phone,
  id,
  email,
  password,
}) => {
  const initialProfil = {
    id,
    name,
    lastName,
    email,
    phone,
    password,
  };

  const [profil, setProfil] = useState(initialProfil);

  const handleChange = (e) => {
    setProfil({ ...profil, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .put(`/agent/${id}`, profil)
      .then((user) => {
        toast.success("Votre profil est mise à jour", {
          position: "top-center",
        });
        setProfil(initialProfil);
        fermer();
      })
      .catch((errors) => {
        console.error(errors);
      });
  };

  return (
    <Modal
      ouvrir={ouvrir}
      fermer={fermer}
      click={handleSubmit}
      css={"col-6"}
      css1={"btn btn-success"}
      bg={"#083746"}
      titre={"MISE A JOUR PROFIL AGENT"}
      bouton={"VALIDER"}
    >
      <form className='bg-light p-3' autoComplete='false'>
        <div className='row my-2'>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control'
              value={profil.name}
              onChange={handleChange}
              placeholder='Prénom'
              id='name'
            />
          </div>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control'
              id='lastName'
              value={profil.lastName}
              onChange={handleChange}
              placeholder='Nom de Famille'
            />
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-6'>
            <input
              type='email'
              className='form-control'
              value={profil.email}
              onChange={handleChange}
              id='email'
              placeholder='test@email.it'
            />
          </div>
          <div className='col-md-6'>
            <input
              type='phone'
              className='form-control'
              id='phone'
              value={profil.phone}
              onChange={handleChange}
              placeholder='Numéro de téléphone'
            />
          </div>
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            id='password'
            value={profil.password}
            onChange={handleChange}
            placeholder='Nouveau mot de passe'
          />
        </div>
      </form>
    </Modal>
  );
};

// formulaire de recherche de patient
export const Rechercher = ({ poste, GetPatient }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const recherche = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/patient/verifier", { name, phone });
      if (res) {
        const response = await res.data;
        await api.post(`/accueil/medecin`, {
          patient: response._id,
          demande: poste,
          post: poste,
        });
        GetPatient();
        setName("");
        setPhone("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Aucun patient ne correspond à ces informations !");
      GetPatient();
      setName("");
      setPhone("");
    }
  };

  return (
    <form
      className='d-flex my-5 justify-content-center'
      onSubmit={recherche}
      autoComplete='false'
    >
      <div className='col-3 ms-2'>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='form-control'
          placeholder='Nom Patient'
        />
      </div>
      <div className='col-3 ms-2'>
        <input
          type='text'
          id='phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='form-control'
          placeholder='Numero du Patient'
        />
      </div>
      <button className='btn btn-outline-success ms-2' type='submit'>
        Rechercher
      </button>
    </form>
  );
};

// formulaire ajout fiche de numeration
export const Numeration = ({ idUpdate, idPatient, name, lastName }) => {
  //fiche
  const [agent] = useState(`${name} ${lastName}`);
  const [id1] = useState(idUpdate);
  const [id2] = useState(idPatient);
  const [filename, setFilename] = useState("");

  const ChangeFile = (e) => {
    setFilename(e.target.files[0]);
  };
  const submitF = () => {
    const formData = new FormData();
    formData.append("agent", agent);
    formData.append("bulletinId", id1);
    formData.append("patient", id2);
    formData.append("fiche", filename);
    api
      .post(`/fichenumeration`, formData)
      .then((res) => {
        toast.info(res.data, { position: "top-center" });
      })
      .catch((err) => console.error(err));
    setFilename("");
  };
  return (
    <form
      encType='multipart/form-data'
      className='d-flex my-2'
      autoComplete='false'
    >
      <div className='col-8'>
        <label className='custom-file'>
          <input
            type='file'
            filename='fiche'
            onChange={ChangeFile}
            id='fiche'
            className='custom-file-input'
          />
        </label>
      </div>
      <button
        className='btn btn-outline-success'
        type='button'
        onClick={submitF}
      >
        Repondre
      </button>
    </form>
  );
};

// formulaire d'ajout de patient
export const NouveauPatient = ({
  open,
  close,
  vider,
  assurencePriseEnCharge,
  handleChangeAccueil,
}) => {
  const initPatient = {
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: 1234,
  };
  const [patients, setPatients] = useState(initPatient);
  const { name, lastName, phone, email } = patients;
  const [accueil, setAccueil] = useState("");
  const change = (e) => {
    const { id, value } = e.target;
    setPatients({ ...patients, [id]: value });
  };

  const createPatient = (e) => {
    e.preventDefault();

    api
      .post(`/patient/add`, patients)
      .then((res) => {
        api
          .post(`/accueil`, { accueil, patient: res.data._id })
          .then((res) => {
            toast.info("Patient créer et rediriger vers le medecin.", {
              position: "top-center",
            });
            vider();
            setAccueil("");
          })
          .catch((err) => {
            if (err.response.data.demande) {
              toast.error(err.response.data.demande, {
                position: "top-center",
              });
            }
            if (err.response.data.patient) {
              toast.error(err.response.data.patient, {
                position: "top-center",
              });
            }
          });
      })

      .catch((errors) => {
        if (errors.response.data.lastName) {
          toast.error(errors.response.data.lastName, {
            position: "top-center",
          });
        }
        if (errors.response.data.name) {
          toast.error(errors.response.data.name, { position: "top-center" });
        }
        if (errors.response.data.phone) {
          toast.error(errors.response.data.phone, { position: "top-center" });
        }
      });
  };

  return (
    <Modal
      ouvrir={open}
      fermer={close}
      css={"col-md-6"}
      bg={"#083546"}
      titre={"CREATION NOUVEAU PATIENT"}
      click={createPatient}
      css1={"btn btn-success"}
      bouton={"CREER"}
    >
      <form className='bg-light bg-dark p-3'>
        <div className='row mb-3'>
          <div className='col-md-6'>
            <input
              className='form-control'
              type='text'
              value={name}
              onChange={change}
              placeholder='Prénom'
              id='name'
            />
          </div>
          <div className='col-md-6'>
            <input
              className='form-control'
              type='text'
              id='lastName'
              value={lastName}
              onChange={change}
              placeholder='Nom de Famille'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <input
              className='form-control'
              type='text'
              id='phone'
              value={phone}
              onChange={change}
              placeholder='Numéro de téléphone Exemple: 90000000(pere)'
            />
          </div>
          <div className='col-md-6'>
            <input
              className='form-control'
              type='email'
              value={email}
              placeholder='Email du Patient'
              onChange={change}
              id='email'
            />
          </div>
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control mx-auto my-4'
            value={assurencePriseEnCharge}
            placeholder="Nom de l'assurance prise en charge"
            onChange={handleChangeAccueil}
            id='assurencePriseEnCharge'
          />
        </div>
        <div className='form-group'>
          <label
            htmlFor='accueil'
            className='form-label text-light text-center'
          >
            NOS PRESTATIONS DE SERVICE
          </label>
          <select
            multiple
            className='form-control form-control-sm'
            onChange={(e) => setAccueil(e.target.value)}
            id='accueil'
          >
            <option></option>
            {/*
                            offre.map((item) => <option key={item.id} value={item.label}>{item.label}</option>)
                        */}
          </select>
        </div>
      </form>
    </Modal>
  );
};

//formulaire d'ajout rapport de medecin
export const RapportMedecin = ({
  open,
  close,
  patientN,
  patientL,
  patientId,
  phone,
  agent,
  createdBy,
}) => {
  const dispatch = useDispatch();
  const initialRap = {
    motif: "",
    conclusion: "",
    phone: phone,
    namePatient: patientN,
    lastNamePatient: patientL,
    agent: agent,
    createdBy: createdBy,
    patient: patientId,
  };
  const [formData, setFormData] = useState(initialRap);
  const { motif, conclusion, namePatient, lastNamePatient } = formData;

  const changeRapport = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const submitRapp = (e) => {
    e.preventDefault();
    dispatch(createRappMedecin(formData));
    close();
  };

  return (
    <Modal
      ouvrir={open}
      fermer={close}
      css={"col-md-6"}
      bg={"#083546"}
      titre={"RAPPORT INFORMATION"}
      click={submitRapp}
      css1={"btn btn-success"}
      bouton={"CREER"}
    >
      <form className='p-3 text-light bg-secondary' autoComplete='false'>
        <div className='row'>
          <div className='form-group'>
            <label htmlFor='namePatient'>Nom Patient</label>
            <input
              type='text'
              className='form-control'
              id='namePatient'
              onChange={changeRapport}
              value={namePatient}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lastNamePatient'>Nom de Famille</label>
            <input
              type='text'
              className='form-control'
              id='lastNamePatient'
              onChange={changeRapport}
              value={lastNamePatient}
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='motif'>Motif consultation</label>
          <input
            type='text'
            className='form-control text-capitalize'
            id='motif'
            onChange={changeRapport}
            value={motif}
            placeholder='Motif Consultation'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='conclusion'>Conclusion</label>
          <textarea
            className='form-control text-capitalize'
            rows={3}
            id='conclusion'
            onChange={changeRapport}
            value={conclusion}
          />
        </div>
      </form>
    </Modal>
  );
};
