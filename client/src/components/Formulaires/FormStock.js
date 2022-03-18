import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Modal from "../layout/Modal";
import api from "../../utils/api";
import { createStock, addData } from "../../actions/stock";
import FicheStock from "../FicheStock";

export const NouveauProduit = ({
  ouvrir,
  fermer,
  name,
  lastName,
  getObjet,
}) => {
  const dispatch = useDispatch();

  /** UseState Fonction **/
  const inputData = {
    description: "",
    unite: "",
    stockMax: "",
    stockMin: "",
    agent: `${name} ${lastName}`,
  };
  const [inputValues, setInputValues] = useState(inputData);
  const { description, unite, stockMax, stockMin } = inputValues;

  /** La fonction Onchange **/
  const change = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  /** Fonction pour soumettre les données a l'API **/
  const submit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createStock({ ...inputValues }));
      setInputValues(inputData);
      //window.location.reload()
    } catch (err) {
      toast.error(
        `Echec d'enregistrement, vérifié s'il n'existe pas déjà ! || ${err}`,
        { position: "top-center" }
      );
      setInputValues(inputData);
    }
    getObjet();
    fermer();
  };

  return (
    <Modal
      ouvrir={ouvrir}
      fermer={fermer}
      click={submit}
      click2={() => setInputValues(inputData)}
      css={"col-6"}
      css1={"btn btn-success"}
      css2={"btn btn-danger"}
      bg={"#5F5F5F"}
      titre={"CREATION DE PRODUIT"}
      bouton={"ENREGISTRER"}
      bouton2={"REINITIALISER"}
    >
      <form className='p-3 bg-dark text-white border-info' autoComplete='off'>
        <div className='form-group'>
          <label>Description</label>
          <input
            type='text'
            name='description'
            value={description}
            onChange={change}
            className='form-control text-lowercase'
            placeholder='Description'
            required
          />
        </div>
        <div className='form-group'>
          <label>Unité</label>
          <input
            type='text'
            name='unite'
            value={unite}
            onChange={change}
            className='form-control text-capitalize'
            placeholder='Unites'
            required
          />
        </div>
        <div className='row form-group'>
          <div className='col-6'>
            <label>Stock de Sécurité</label>
            <input
              type='number'
              name='stockMin'
              value={stockMin}
              onChange={change}
              className='form-control'
              placeholder='Stock Minimum'
              required
            />
          </div>
          <div className='col-6'>
            <label>Stock Maximum</label>
            <input
              type='number'
              name='stockMax'
              value={stockMax}
              onChange={change}
              className='form-control'
              placeholder='Stock Maximum'
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export const NouveauEntrer = ({ ouvrir, fermer, getObjet, data }) => {
  const dispatch = useDispatch();
  useEffect(() => getObjet(), [getObjet]);

  // useState et Valeur initial du state
  const dataInit = {
    destination: "",
    entree: "",
    lot: "",
    datePeremption: "",
    perte: "",
    observation: "",
  };
  const [entrer, setEntrer] = useState(dataInit);
  const { destination, entree, lot, datePeremption, perte, observation } =
    entrer;
  const [choix, setChoix] = useState("");
  // On change Fonction
  const change = (e) => {
    const { name, value } = e.target;
    setEntrer({ ...entrer, [name]: value });
  };

  // Submit fonction
  const submit2 = async (e) => {
    e.preventDefault();
    try {
      dispatch(addData(choix, entrer));

      setEntrer(dataInit);
      setChoix("");
      getObjet();
    } catch (err) {
      toast.error(
        `Une erreur s'est produit, verifier ta selection ! ||${err}`,
        { position: "top-center" }
      );
      setChoix("");
      setEntrer(dataInit);
    }
    fermer();
  };

  return (
    <Modal
      ouvrir={ouvrir}
      fermer={fermer}
      click={submit2}
      click2={() => setEntrer(dataInit)}
      css={"col-6 border-success"}
      css1={"btn btn-success"}
      css2={"btn btn-danger"}
      bg={"#085A0F"}
      titre={"FORMULAIRE ENTRER PRODUIT"}
      bouton={"ENREGISTRER"}
      bouton2={"REINITIALISER"}
    >
      <form className='p-3 bg-dark text-light' autoComplete='off'>
        <div className='form-group'>
          <label>Selectionner le Produit</label>
          <select
            className='select form-control form-control-sm '
            onChange={(e) => setChoix(e.target.value)}
            required
          >
            <option defaultValue=''>Choisi le produit</option>
            {data.map((item) => (
              <option key={item._id} value={item._id}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label>Destination | Provenance</label>
          <input
            type='text'
            name='destination'
            value={destination}
            onChange={change}
            className='form-control text-capitalize'
            placeholder='Destination ou Provenance'
          />
        </div>

        <div className='row'>
          <div className='col-6 form-group'>
            <label>N° Lot</label>
            <input
              type='text'
              name='lot'
              value={lot}
              onChange={change}
              className='form-control text-capitalize'
              placeholder='Numero du Lot'
            />
          </div>
          <div className='col-6 form-group'>
            <label>Entrée</label>
            <input
              type='number'
              name='entree'
              value={entree}
              onChange={change}
              className='form-control'
              placeholder='Quantité Entrant'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-6 form-group'>
            <label>Date Peremption</label>
            <input
              type='date'
              name='datePeremption'
              value={datePeremption}
              onChange={change}
              className='form-control'
            />
          </div>
          <div className='col-6 form-group'>
            <label>Perte ou Ajustement</label>
            <input
              type='text'
              name='perte'
              value={perte}
              onChange={change}
              className='form-control text-capitalize'
              placeholder='Perte ou Ajustement'
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Observation</label>
          <textarea
            name='observation'
            value={observation}
            onChange={change}
            className='form-control text-capitalize'
            rows='3'
            placeholder='Mes Observation...'
          />
        </div>
      </form>
    </Modal>
  );
};

export const NouveauSortie = ({ ouvrir, fermer, getObjet, data }) => {
  const dispatch = useDispatch();
  useEffect(() => getObjet(), [getObjet]);

  // useState et Valeur initial du state
  const dataInit2 = {
    destination: "",
    entree: 0,
    sortie: "",
    perte: "",
    observation: "",
  };
  const [sortir, setSortir] = useState(dataInit2);
  const { destination, sortie, perte, observation } = sortir;
  const [choix, setChoix] = useState("");

  // On change Fonction
  const change2 = (e) => {
    const { name, value } = e.target;
    setSortir({ ...sortir, [name]: value });
  };

  // Submit fonction
  const submit3 = async (e) => {
    e.preventDefault();
    try {
      dispatch(addData(choix, sortir));

      setSortir(dataInit2);
      setChoix("");
      getObjet();
    } catch (err) {
      toast.error(
        `Une erreur s'est produit, verifier ta selection ! ||${err}`,
        { position: "top-center" }
      );
      setChoix("");
      setSortir(dataInit2);
    }
    fermer();
  };

  return (
    <Modal
      ouvrir={ouvrir}
      fermer={fermer}
      click={submit3}
      click2={() => setSortir(dataInit2)}
      css={"col-6 border-danger"}
      css1={"btn btn-success"}
      css2={"btn btn-danger"}
      bg={"#7A070D"}
      titre={"FORMULAIRE SORTIE PRODUIT"}
      bouton={"ENREGISTRER"}
      bouton2={"REINITIALISER"}
    >
      <form className='p-3 bg-dark' autoComplete='off'>
        <div className='form-group'>
          <label>Selectionner le Produit</label>
          <select
            className='select form-control form-control-sm'
            onChange={(e) => setChoix(e.target.value)}
            required
          >
            <option defaultValue=''>Choisi le produit</option>
            {data.map((item) => (
              <option key={item._id} value={item._id}>
                {item.description}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Destinataire</label>
          <input
            type='text'
            name='destination'
            value={destination}
            onChange={change2}
            className='form-control text-capitalize'
            placeholder='Destination'
          />
        </div>
        <div className='row'>
          <div className='col-4 form-group'>
            <label>Sortie</label>
            <input
              type='number'
              name='sortie'
              value={sortie}
              onChange={change2}
              className='form-control'
              placeholder='Quantitée Sortante'
            />
          </div>
          <div className='col-8 form-group'>
            <label>Perte ou Ajustement</label>
            <input
              type='text'
              name='perte'
              value={perte}
              onChange={change2}
              className='form-control text-capitalize'
              placeholder='Perte ou Ajustement'
            />
          </div>
        </div>
        <div className='form-group'>
          <label>Observation</label>
          <textarea
            name='observation'
            value={observation}
            onChange={change2}
            className='form-control text-capitalize'
            row='3'
            placeholder='Mes Observation...'
          />
        </div>
      </form>
    </Modal>
  );
};

export const Recherche = ({ getObjet }) => {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [fiche, setFiche] = useState(false);

  const BTN =
    description === "" ? (
      ""
    ) : (
      <button type='submit' className='btn btn-outline-info ms-2'>
        <ddd />
        Rechercher
      </button>
    );

  const submit = (e) => {
    e.preventDefault();
    api.post("/stock/verify", { description }).then((res) => {
      if (res) {
        setResult(res.data.stock);
        setDescription("");
        setFiche(true);
      } else {
        setResult([]);
        setDescription("");
        toast.warning(
          "Verifier la liste pour confirmer son existence dans la base de donnée et respecter l'orthographe!",
          { position: "top-center" }
        );
      }
    });
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
      <form onSubmit={submit} className='d-flex mx-auto col-7'>
        <div className='input-group'>
          <input
            type='text'
            className='form-control border-danger border-4 text-lowercase'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder='Recherche ...'
          />
        </div>
        {BTN}
      </form>
      {result !== undefined && (
        <FicheStock
          open={fiche}
          close={() => setFiche(false)}
          data={result}
          getObjet={getObjet}
        />
      )}
    </div>
  );
};
