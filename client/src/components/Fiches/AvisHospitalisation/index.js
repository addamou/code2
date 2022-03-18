import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createAviHosp } from "../../../actions/fiches";

const AvisHospitalisation = ({
  date,
  nameAgent,
  lastNameAgent,
  idPatient,
  printAH,
  closeAH,
  namePatient,
  lastNamePatient,
  data,
  handleChange,
}) => {
  const dispatch = useDispatch();
  //Submit
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      createAviHosp({
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
        ...data,
      })
    );
    closeAH();
    printAH();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete1 date={date} />
      <h3 className='text-center text-decoration-underline my-2'>
        AVIS HOSPITALISATION
      </h3>
      <div className='row my-3'>
        <div className='col-1 mt-auto'>A :</div>
        <div className='col-11 form-group'>
          <input
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            type='text'
            value={data.assurance}
            onChange={handleChange}
            id='assurance'
          />
        </div>
      </div>
      <div className='lead'>
        Patient :{" "}
        <span className='fw-bold'>{`${namePatient} ${lastNamePatient}`}</span>
      </div>
      <div className='row'>
        <div className='col-3 mt-auto'>Numéro d'assuré </div>
        <div className='col-9 form-group'>
          <input
            type='text'
            value={data.numAssure}
            onChange={handleChange}
            id='numAssure'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-3 mt-auto'>Nom de l'assuré</div>
        <div className='col-9 form-group'>
          <input
            type='text'
            value={data.nomAssure}
            onChange={handleChange}
            id='nomAssure'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-2 mt-auto'>Société :</div>
        <div className='col-10 form-group'>
          <input
            value={data.societe}
            type='text'
            onChange={handleChange}
            id='societe'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-4 mt-auto'>Diagnostic clinique d'entrée</div>
        <div className='col-8 form-group'>
          <input
            value={data.diagnostic}
            type='text'
            onChange={handleChange}
            id='diagnostic'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-5 mt-auto'>Date et Heure d'Hospitalisation</div>
        <div className='col-7 form-group'>
          <input
            value={data.dateHospitalisation}
            onChange={handleChange}
            type='datetime-local'
            id='dateHospitalisation'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-4 mt-auto'>Durée d'Hospitalisation</div>
        <div className='col-8 form-group'>
          <input
            value={data.dureeHospitalisation}
            onChange={handleChange}
            type='text'
            id='dureeHospitalisation'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <button className='btnValid' type='button' onClick={submit}>
        VALIDER
      </button>
    </form>
  );
};

export default AvisHospitalisation;
