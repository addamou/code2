import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createCertAcc } from "../../../actions/fiches";

const CertificatAccouchement = ({
  date,
  nameAgent,
  lastNameAgent,
  poste,
  idPatient,
  printCA,
  closeCA,
  namePatient,
  lastNamePatient,
  data,
  handleChange,
}) => {
  const dispatch = useDispatch();

  //Submit
  const submit = () => {
    dispatch(
      createCertAcc({
        patient: idPatient,
        ...data,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );

    closeCA();
    printCA();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete1 date={date} />
      <h2 className='text-center text-decoration-underline my-5'>
        CERTIFICAT D'ACCOUCHEMENT
      </h2>

      <p>
        La nommée :{" "}
        <span className='fw-bold'>
          {namePatient} {lastNamePatient}
        </span>{" "}
      </p>
      <div className='row my-2'>
        <div className='col-8 row'>
          <label htmlFor='profession' className='col-3 mt-auto'>
            Profession
          </label>
          <input
            type='text'
            className='col-9 text-capitalize border-0 border-bottom border-primary rounded-0 border-2'
            value={data.profession}
            onChange={handleChange}
            id='profession'
          />
        </div>
        <div className='col-4 row'>
          <label htmlFor='mle' className='col-3 mt-auto'>
            MLE
          </label>
          <input
            type='text'
            className='col-9 text-capitalize border-0 border-bottom border-primary rounded-0 border-2'
            value={data.mle}
            onChange={handleChange}
            id='mle'
          />
        </div>
      </div>
      <div className='row my-3'>
        <label htmlFor='dateAccouchement' className='col-3 my-auto'>
          A accouchée le
        </label>
        <input
          type='datetime-local'
          className='col-9 border-0 border-bottom border-primary rounded-0 border-2'
          value={data.dateAccouchement}
          onChange={handleChange}
          id='dateAccouchement'
        />
      </div>

      <div className='row my-3'>
        <label htmlFor='sexe' className='form-label col-1 mb-auto'>
          Sexe:
        </label>
        <select
          className='custom-select col-11 border-0 border-bottom border-primary rounded-0 border-2'
          id='sexe'
          onChange={handleChange}
          value={data.sexe}
        >
          <option value=''>Sexe de l'Enfant</option>
          <option value='Masculin'>Masculin</option>
          <option value='Feminin'>Feminin</option>
        </select>
      </div>

      <div className='row my-3'>
        <span className='col-4 mt-auto'>Et qui à reçu le Prénom de :</span>
        <input
          type='text'
          placeholder='Prénom'
          className='col-8 text-capitalize border-0 border-bottom border-primary rounded-0 border-2'
          value={data.prenom}
          onChange={handleChange}
          id='prenom'
        />
      </div>
      <div className='row my-3'>
        <span className='col-3 mt-auto'>Dont le Père est :</span>
        <input
          type='text'
          placeholder='Prénom'
          className='col-9 text-capitalize border-0 border-bottom border-primary rounded-0 border-2'
          value={data.pere}
          onChange={handleChange}
          id='pere'
        />
      </div>
      <div className='my-3'>
        <span className='col-3 mt-auto'>La Mère est :</span>
        <span className='col-9 mt-auto fw-bolder ms-2'>
          {" "}
          {namePatient} {lastNamePatient}
        </span>
      </div>

      <div className='text-end mt-5'>
        <h6 className='text-decoration-underline'>
          {poste === "sagefemme" ? "La Sage Femme" : "Le Gynecologue"}
        </h6>
        <p>
          {nameAgent} {lastNameAgent}
        </p>
      </div>
      <div>
        <button className='btnValid' type='button' onClick={submit}>
          VALIDER
        </button>
      </div>
    </form>
  );
};

export default CertificatAccouchement;
