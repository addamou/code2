import React from "react";
import { Entete1 } from "../../layout/Entetes";
import { useDispatch } from "react-redux";
import { formatDate, formatHeure } from "../../layout/Formats";
import { createDecharge } from "../../../actions/fiches";

const Decharge = ({
  printD,
  closeD,
  date,
  poste,
  nameAgent,
  lastNameAgent,
  handleChangeResponsableDecharge,
  responsable,
  handleChangeTypeResponsableDecharge,
  typeResponsable,
  idPatient,
  module,
}) => {
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(
      createDecharge({
        responsable,
        typeResponsable,
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    closeD();
    printD();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete1 date={date} />
      <h3 className='text-center my-5 text-decoration-underline'>DECHARGE</h3>
      <div className='row'>
        <div className='col-3 my-auto text-end lead'>Je soussigné</div>
        <div className='col-9 form-group'>
          <input
            placeholder='nom et prénom du demandeur'
            type='text'
            value={responsable}
            onChange={(e) => handleChangeResponsableDecharge(e)}
            className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row my-3'>
        <div className='col-4 my-auto'>
          <label>Malade</label>{" "}
          <input
            type='checkbox'
            onChange={(e) => handleChangeTypeResponsableDecharge(e)}
            checked={typeResponsable.malade}
            id='malade'
          />
        </div>
        <div className='col-4 my-auto text-center'>
          <label>Parent</label>{" "}
          <input
            type='checkbox'
            onChange={(e) => handleChangeTypeResponsableDecharge(e)}
            checked={typeResponsable.parent}
            id='parent'
          />
        </div>
        <div className='col-4 my-auto text-end'>
          <label>Accompagnant</label>{" "}
          <input
            type='checkbox'
            id='accompagnant'
            onChange={(e) => handleChangeTypeResponsableDecharge(e)}
            checked={typeResponsable.accompagnant}
          />
        </div>
      </div>
      <p className=' my-2 fs-4'>
        {" "}
        Décide de quitter la Clinique AFOUA ce jour
        <span className='mx-2 fw-bold'>{formatDate(date)}</span>à{" "}
        <span className='fw-bold'>{formatHeure(date)}</span>
        <span>(heures), contre avis médical.</span>
      </p>
      <p className='fs-4 my-3'>
        Attestation établie pour servir et valoir ce que de droit.
      </p>
      <div className='row' style={{ marginTop: 80 }}>
        <div className='col-6'>
          <h5 className='text-decoration-underline'>L'interessé(e)</h5>
          <p>{responsable}</p>
        </div>
        <div className='col-6 text-end'>
          <h5 className='text-decoration-underline'>
            {poste === "sagefemme" ? "La Sage Femme" : "Le Medecin"}
          </h5>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
      <button className='btnValid' type='button' onClick={submit}>
        VALIDER
      </button>
    </form>
  );
};

export default Decharge;
