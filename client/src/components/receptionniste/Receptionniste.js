import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../layout/Modal";
import MultiSelect from "../MultiSelect";
import api from "../../utils/api";
import {
  ListeDemande,
  ListePatient,
  ListePatientPerception,
} from "../layout/Listes";
import { FormCaisse } from "../Formulaires";
import { getOffre } from "../../actions/offre";

export const Receptionniste = () => {
  //Use Dispatch fonction
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOffre());
  }, [dispatch]);

  //Agent
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  // Lister les Patients a la perception
  const [listePatient, setListePatient] = useState([]);

  const GetPatient = React.useCallback(() => {
    // write your callback function here ...
    api
      .get("/reception")
      .then((res) => {
        const resp = res.data;
        if (resp) {
          setListePatient(resp.accueil);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.warning(
          "Erreur serveur, Patienter quelques secondes puis recharger",
          { position: "top-center" }
        );
      });
  }, []);

  useEffect(() => {
    GetPatient();
  }, [GetPatient]);

  //Les modales de visiblités
  const [recherche, setRecherche] = useState(true);
  const [nouveauPatient, setNouveauPatient] = useState(false);
  const [rapportCaisse, setRapportCaisse] = useState(false);
  const [resultat, setResultat] = useState(false);
  const [selectionner, setSelectionner] = useState(false);
  const [prestation, setPrestation] = useState(false);
  //State Patient
  const initialPatient = {
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "1234",
  };
  const [patient, setPatient] = useState(initialPatient);
  const { name, lastName, phone, email, password } = patient;

  const [data, setData] = useState([]);
  //demande select
  const [accueil, setAccueil] = useState({});
  //state ID patient
  const [idPatient, setIdPatient] = useState("");
  const [product, setProduct] = useState("");
  //On Change Patient
  const changePatient = (e) => {
    const { id, value } = e.target;
    setPatient({ ...patient, [id]: value });
  };

  // on Change Accueil
  const handleAccueil = (e) => {
    const { id, value } = e.target;
    setAccueil({ ...accueil, [id]: value });
  };
  //Selection  de la liste des patient trouver
  const [patients, setPatients] = useState({});
  const selectionPatient = ({
    name,
    lastName,
    demande,
    id,
    assurencePriseEnCharge,
  }) => {
    let data = demande.map((item) => {
      return {
        acteMedicale: item.label,
        poste: item.poste,
      };
    });
    setPatients({
      name,
      lastName,
      id,
      assurencePriseEnCharge,
    });
    setProduct(data);
    toast.info(`${name} ${lastName} est selectionné(e)`, {
      position: "top-center",
    });
    setSelectionner(true);
    setRecherche(false);
  };
  //Patients Trouver
  const offreService = (item) => setAccueil({ ...accueil, demande: item });

  const patientsTrouver = (id) => {
    setIdPatient(id);
    setPatient({ ...patient, demande: [] });
    setPrestation(true);
    setResultat(false);
  };

  //Revenir page accueil
  const fermerPrestation = () => {
    setPrestation(false);
    setRecherche(true);
  };

  //fonction de creation
  const createPatient = (e) => {
    e.preventDefault();

    api
      .post("/patient", patient)
      .then((res) => {
        const resp = res.data;
        api
          .post("/accueil/add", { ...accueil, patient: resp._id })
          .then((res) => {
            toast.info("Le dossier du patient est prêt pour sa demande", {
              position: "top-center",
            });
            setAccueil({});
            setPatient(initialPatient);
            setNouveauPatient(false);
            setData([]);
            setRecherche(true);
            GetPatient();
          })

          .catch((err) => {
            console.log(err);
            GetPatient();
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

  //Rechercher un patient
  const recherchePatient = (e) => {
    e.preventDefault();
    api
      .post("/patient/verify", { name, lastName })
      .then((res) => {
        const resp = res.data;
        if (resp.length !== null) {
          toast.info(
            "Veuillez selectionner l'utilisateur parmis les réponses disponibles",
            { position: "top-center" }
          );
          setData(res.data.patient);
          setRecherche(false);
          setResultat(true);
        } else {
          setData([]);
          setRecherche(true);
          setResultat(false);
          toast.warning(
            "aucun patient correspond à ce nom, veuillez créer un nouveau",
            { position: "top-center" }
          );
        }
      })
      .catch((errors) => {
        setData([]);

        if (errors.response.data.name) {
          toast.error(errors.response.data.name, { position: "top-center" });
        }
        if (errors.response.data.lastName) {
          toast.error(errors.response.data.lastName, {
            position: "top-center",
          });
        }
      });
  };

  //Valider demandes apres succes des recherche
  const nouvelDemandePatient = (e) => {
    e.preventDefault();
    api
      .post("/accueil", { ...accueil, patient: idPatient })
      .then((res) => {
        const resp = res.data;
        api
          .post("/accueil/perception", {
            id: resp._id,
            demande: resp.demande[0].label,
            post: resp.demande[0].poste,
          })
          .then((res) => {
            toast.success("Le dossier du patient est prêt pour sa demande", {
              position: "top-center",
            });
            setPatient(initialPatient);
            setAccueil({});
            setPrestation(false);
            setRecherche(true);
            setPrestation(false);
            setResultat(false);
            setData([]);
            GetPatient();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        if (err.response.data.demande) {
          toast.error(err.response.data.demande, { position: "top-center" });
        }
        if (err.response.data.patient) {
          toast.error(err.response.data.patient, { position: "top-center" });
        }
      });
  };

  //Validation des redirection Bulletin et Soin d'urgence
  const submitPerception = () => {
    api
      .post("/accueil/perception", {
        demande: product,
        post: product[0].poste,
        police: patients.police,
        id: patients.id,
      })

      .then((res) => {
        toast.info("Le patient est pris en charge.", {
          position: "top-center",
        });
        GetPatient();
        setProduct([]);
        setRecherche(true);
        setSelectionner(false);
      });
  };

  //Retirer un patient si il ne veux pas payer
  const retraitPatient = (id) => {
    api
      .delete(`/reception/${id}`)
      .then((res) => {
        window.confirm("Voulez vous retirer ce patient de la liste ?");
        api
          .delete(`/accueil/${id}`)
          .then((res) => {
            console.log(res.data);
            toast.warn("La demande du patient est effacée .", {
              position: "top-center",
            });
            setRecherche(true);
            GetPatient();
            setProduct([]);
            setSelectionner(false);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <section
      className='bg4'
      style={{ width: 100 + "%", height: 90 + "vh", padding: 0, margin: 0 }}
    >
      <div className='d-flex justify-content-between px-2'>
        <div className='p-2' style={{ widht: 21 + "%" }}>
          {listePatient.length > 0 ? (
            <Fragment>
              <h5 className='text-light text-center'>
                {listePatient.length}{" "}
                {listePatient.length > 1
                  ? "PATIENTS EN ATTENTES"
                  : "PATIENT EN ATTENTE"}
              </h5>
              {listePatient.map((item) => (
                <ListePatientPerception
                  handleClick={selectionPatient}
                  idPatient={item.accueil.patient._id}
                  id={item.accueil._id}
                  key={item.accueil._id}
                  name={item.accueil.patient.name}
                  lastName={item.accueil.patient.lastName}
                  demande={item.accueil.demande}
                  assurencePriseEnCharge={item.accueil.assurencePriseEnCharge}
                />
              ))}
            </Fragment>
          ) : (
            <h6 className='text-light text-center mt-3'>
              AUCUN PATIENT REDIRIGE
            </h6>
          )}
        </div>
        <div style={{ widht: 69 + "%" }}>
          <div className='py-5 d-flex flex-column align-items-center justify-content-center'>
            {recherche && (
              <form
                className='row col-7 align-self-center'
                onSubmit={recherchePatient}
              >
                <h3 className='text-center text-light mb-2'>
                  VERIFICATION PATIENT
                </h3>
                <div className='col-5'>
                  <input
                    type='text'
                    className='form-control'
                    value={name}
                    id='name'
                    onChange={changePatient}
                    placeholder='Ex: Mireille'
                  />
                </div>
                <div className='col-6'>
                  <input
                    type='text'
                    className='form-control'
                    value={lastName}
                    id='lastName'
                    onChange={changePatient}
                    placeholder='Ex: Moussa Hassane'
                  />
                </div>
                <div className='col-1'>
                  <button className='btn btn-success' type='submit'>
                    <FaSearch className='p-auto' />
                  </button>
                </div>
              </form>
            )}

            {selectionner && (
              <ListeDemande
                data={product}
                patient={patients}
                assurance={patients.assurencePriseEnCharge}
                open={() => setSelectionner(true)}
                close={() => setSelectionner(false)}
                click={submitPerception}
                vider={retraitPatient}
              />
            )}
            {rapportCaisse && (
              <FormCaisse
                open={() => setRapportCaisse(true)}
                close={() => setRapportCaisse(false)}
                GetPatient={GetPatient}
                name={user.name}
                lastName={user.lastName}
              />
            )}

            {prestation && (
              <Modal
                ouvrir={() => setPrestation(true)}
                fermer={fermerPrestation}
                css={"col-md-5"}
                css1={"btn btn-success"}
                bg={"#033323"}
                titre={"Ajouter une demande pour ce patient"}
                click={nouvelDemandePatient}
                bouton={"VALIDER"}
              >
                <form className='bg-dark p-3'>
                  <div className='form-group text-dark'>
                    <label className='text-light'>
                      NOS PRESTATIONS DE SERVICE
                    </label>
                    <MultiSelect
                      setDemande={offreService}
                      className='form-control'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='assurencePriseEnCharge'>
                      Compagnie d'Assurance du Patient
                    </label>
                    <input
                      type='text'
                      className='form-control m-auto'
                      value={accueil.assurencePriseEnCharge}
                      placeholder="Nom de l'assurance prise en charge"
                      onChange={(e) => handleAccueil(e)}
                      id='assurencePriseEnCharge'
                    />
                  </div>
                </form>
              </Modal>
            )}

            {resultat && (
              <div className='card p-3 text-light bg-dark'>
                <h4 className='mx-auto'>Résultat des Recherches</h4>
                {data.length > 0 &&
                  data.map((item) => (
                    <ListePatient
                      name={item.name}
                      lastName={item.lastName}
                      id={item._id}
                      key={item._id}
                      phone={item.phone}
                      patientsTrouver={patientsTrouver}
                    />
                  ))}
              </div>
            )}

            {nouveauPatient && (
              <Modal
                ouvrir={() => setNouveauPatient(true)}
                fermer={() => setNouveauPatient(false)}
                css={"col-md-6"}
                bg={"#083546"}
                titre={"CREATION NOUVEAU PATIENT"}
                click={createPatient}
                css1={"btn btn-success"}
                bouton={"CREER"}
              >
                <form className='bg-light bg-dark p-3' autoComplete='false'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label htmlFor='name' className='form-label text-info'>
                        Prénom du Patient
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        value={name}
                        onChange={changePatient}
                        placeholder='Damouré'
                        id='name'
                      />
                    </div>
                    <div className='col-md-6'>
                      <label
                        htmlFor='lastName'
                        className='form-label text-info'
                      >
                        Nom de Famille
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        id='lastName'
                        value={lastName}
                        onChange={changePatient}
                        placeholder='Zika'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label htmlFor='phone' className='form-label text-info'>
                        Numéro Portable
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        id='phone'
                        required
                        value={phone}
                        onChange={changePatient}
                        placeholder='96000000(pere)'
                      />
                    </div>
                    <div className='col-md-6'>
                      <label htmlFor='email' className='form-label text-info'>
                        Email du Patient (Facultatif)
                      </label>
                      <input
                        className='form-control'
                        type='email'
                        value={email}
                        placeholder='test@mail.ne'
                        onChange={changePatient}
                        id='email'
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <label
                        htmlFor='assurencePriseEnCharge'
                        className='form-label text-info'
                      >
                        Societé d'Assurance
                      </label>
                      <input
                        type='text'
                        className='form-control mx-auto my-1'
                        value={accueil.assurencePriseEnCharge}
                        placeholder='Les Furets.com'
                        onChange={(e) => handleAccueil(e)}
                        id='assurencePriseEnCharge'
                      />
                    </div>
                    <div className='col-6'>
                      <label
                        htmlFor='password'
                        className='form-label text-info'
                      >
                        Mot de Passe Patient
                      </label>
                      <input
                        type='text'
                        className='form-control mx-auto my-1'
                        value={password}
                        placeholder='1234'
                        id='password'
                        readOnly
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='text-light text-info'>
                      NOS PRESTATIONS DE SERVICE
                    </label>
                    <MultiSelect
                      setDemande={offreService}
                      className='form-control'
                    />
                  </div>
                </form>
              </Modal>
            )}
          </div>
        </div>
        <div style={{ widht: 10 + "%" }}>
          <div className='btn-group-vertical px-2 mt-2'>
            <button
              className='btn btn-primary mt-3'
              onClick={() => setRapportCaisse(true)}
              type='button'
            >
              RAPPORT DE CAISSE
            </button>
            <button
              className='btn btn-warning mt-3'
              onClick={() => setNouveauPatient(true)}
              type='button'
            >
              <FaUserPlus /> NOUVEAU PATIENT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
