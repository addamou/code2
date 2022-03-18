import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createCompAcc } from "../../../actions/fiches";

const CompteRenduAccouchement = ({
  date,
  nameAgent,
  lastNameAgent,
  poste,
  idPatient,
  printCRA,
  closeCRA,
  data,
  handleChange,
}) => {
  const dispatch = useDispatch();
  //Submit
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      createCompAcc({
        ...data,
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    closeCRA();
    printCRA();
  };

  return (
    <div className='A4'>
      <Entete1 date={date} />
      <h3 className='text-center my-3 text-decoration-underline'>
        COMPTE RENDU ACCOUCHEMENT
      </h3>
      <div className='avh'>
        <form autoComplete='false'>
          <textarea
            className='form-control text-dark text-capitalize'
            cols='90'
            rows='15'
            value={data.cra}
            id='cra'
            placeholder="L'accouchement s'est bien ..."
            onChange={(e) => handleChange(e)}
          />
          <button className='btnValid' onClick={submit} type='submit'>
            VALIDER
          </button>
        </form>
        <div className='text-end mt-5'>
          <h6 className='text-decoration-underline'>
            {poste === "sagefemme" ? "La Sage Femme" : "Le Gynecologue"}
          </h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompteRenduAccouchement;
