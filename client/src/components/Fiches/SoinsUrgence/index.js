import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Entete1 } from "../../layout/Entetes";
import { getOffre } from "../../../actions/offre";
import { createSoinUrgence } from "../../../actions/fiches";
import { createAccueil } from "../../../actions/filAttente";

const SoinsUrgence = ({
  setDataP,
  dataP,
  date,
  nameAgent,
  lastNameAgent,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
  idPatient,
  dataSU,
  handleProducts,
  handleDelete,
  close,
  print,
}) => {
  const dispatch = useDispatch();
  const [soin, setSoin] = useState([]);
  useEffect(() => {
    dispatch(getOffre());
  }, [dispatch]);

  const offreState = useSelector((state) => state.offre);
  const { offres } = offreState;
  useEffect(() => {
    if (offres.length > 0) {
      const resp = offres.filter((item) => item.poste === "infirmiere");
      setSoin(resp);
    }
  }, [offres]);

  const [currentProduct, setCurrentProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleChangeProduct = (e) => {
    let element = soin.find((el) => el.label === e.target.value);
    setQuantity(1);
    setCurrentProduct(element);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAdd = () => {
    handleProducts({ ...currentProduct, nbr: quantity });
  };

  const submit = () => {
    dispatch(
      createSoinUrgence({
        demande: dataSU,
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
        protocol: dataP,
      })
    );
    dispatch(
      createAccueil({
        demande: dataSU,
        assurencePriseEnCharge: "",
        patient: idPatient,
      })
    );
    close();
    print();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete1 date={date} />
      <div className='my-3'>
        <ul>
          <li>
            NOM : <span className='fw-bolder'>{namePatient}</span>
          </li>
          <li>
            PRENOM : <span className='fw-bolder'>{lastNamePatient}</span>
          </li>
          <li>
            Age :{" "}
            <span className='fw-bolder'>
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                ? "ans"
                : "an"}
            </span>
          </li>
        </ul>
      </div>
      <h3 className='text-center my-3 text-decoration-underline'>
        SOINS D'URGENCE
      </h3>
      <div className='row'>
        <div className='col-8 my-auto'>
          <select
            className='form-select form-select-sm border-0 
                    border-bottom border-primary rounded-0 border-2'
            onChange={handleChangeProduct}
          >
            <option selected>Choisir les produits</option>
            {soin.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className='col-2 my-auto'>
          <input
            type='number'
            className='form-control border-0 
                    border-bottom border-primary rounded-0 border-2 my-2'
            value={quantity}
            id='quantite'
            placeholder='Quantités'
            onChange={handleChangeQuantity}
          />
        </div>
        <div className='col-2 my-auto'>
          <button onClick={handleAdd} type='button' className='btn btn-success'>
            Ajouter
          </button>
        </div>
      </div>

      <div className='table-responsive'>
        <table className='table m-auto'>
          <thead>
            <tr>
              <th style={{ width: 400 }}>DESIGNATION DES PRODUITS</th>
              <th>QUANTITE</th>
              <th>SUPPRIMER</th>
            </tr>
          </thead>
          <tbody>
            {dataSU.length > 0 ? (
              dataSU.map((el, index) => {
                return (
                  <tr key={index} id={index}>
                    <td>{el.label}</td>
                    <td>{el.nbr}</td>
                    <td>
                      <button
                        type='button'
                        className=' text-center border-0 btn btn-danger '
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrash className='m-auto' />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th>-</th>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='form-group'>
        <div className='mb-3'>
          <h5 className='form-label'>Protocol de Soin</h5>
          <textarea
            className='form-control text-capitalize'
            value={dataP.protocol}
            onChange={(e) => setDataP(e.target.value)}
            id='protocol'
            rows='3'
          />
        </div>
      </div>

      <div className='text-end mt-3'>
        <h6 className='text-decoration-underline'>Le Medecin</h6>
        <p>
          {nameAgent} {lastNameAgent}
        </p>
      </div>
      <button className='btnValid' type='button' onClick={() => submit()}>
        VALIDER
      </button>
    </form>
  );
};

export default SoinsUrgence;
