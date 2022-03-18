import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createConsIm } from "../../../actions/fiches";

const ConsultationImagerie = ({
  date,
  nameAgent,
  lastNameAgent,
  namePatient,
  lastNamePatient,
  handleChange,
  data,
  dateDeNaissance,
  idPatient,
  closeCI,
  printCI,
}) => {
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(
      createConsIm({
        ...data,
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    closeCI();
    printCI();
  };

  return (
    <form className='A4' autoComplete='off'>
      <Entete1 date={date} />
      <h3 className='text-center text-decoration-underline my-2'>IMAGERIE</h3>
      <div className='row mb-3'>
        <div className='col-9'>
          Nom et Prénom:{" "}
          <span className='fw-bold'>
            {namePatient} {lastNamePatient}
          </span>
        </div>
        <div className='col-3'>
          Age:{" "}
          <span className='fw-bold'>
            {" "}
            {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
            {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
              ? "ans"
              : "an"}
          </span>
        </div>
      </div>
      <h5 className='my-2'>Echographies</h5>
      <div className='row'>
        <div className='col-1 mt-auto'>Libellé:</div>
        <div className='col-11 from-group'>
          <input
            id='echographie'
            onChange={(e) => handleChange(e)}
            value={data.echographie}
            type='text'
            className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='observations'>Observations</label>
        <textarea
          id='observations'
          onChange={(e) => handleChange(e)}
          value={data.observations}
          cols='90'
          rows='2'
          className='form-control text-capitalize'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='conclusion'>Conclusion</label>
        <textarea
          id='conclusion'
          onChange={(e) => handleChange(e)}
          value={data.conclusion}
          cols='90'
          rows='2'
          className='form-control text-capitalize'
        />
      </div>
      <h5 className='my-2'>Radiographie</h5>
      <div className='row'>
        <div className='col-1 mt-auto'>Libellé:</div>
        <div className='col-11 from-group'>
          <input
            id='radiographie'
            onChange={(e) => handleChange(e)}
            value={data.radiographie}
            type='text'
            className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='rapport'>Rapport de la Radiographie:</label>
        <textarea
          value={data.rapport}
          id='rapport'
          style={{ fontSize: 15 }}
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='3'
          className='form-control text-capitalize'
        />
      </div>
      <div className='text-end mt-4'>
        <h6 className='text-decoration-underline'>Le Médecin</h6>
        <p>
          {nameAgent} {lastNameAgent}
        </p>
      </div>
      <button className='btnValid' type='button' onClick={submit}>
        VALIDER
      </button>
    </form>
  );
};

export default ConsultationImagerie;
