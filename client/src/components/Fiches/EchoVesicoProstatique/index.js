import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { formatDate } from "../../layout/Formats";
import { createEchoPros } from "../../../actions/fiches";

const EchoVesicoProstatique = ({
  date,
  nameAgent,
  lastNameAgent,
  idPatient,
  printEP,
  closeEP,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
  data,
  handleChange,
}) => {
  const dispatch = useDispatch();
  //Submit
  const submit = () => {
    dispatch(
      createEchoPros({
        patient: idPatient,
        ...data,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    closeEP();
    printEP();
  };

  return (
    <form className='A4' autoComplete='off'>
      <Entete1 date={date} />
      <h3 className='text-center text-decoration-underline my-2'>
        ECHOGRAPHIE VESICO-PROSTATIQUE
      </h3>
      <div className='row'>
        <div className='col-6'>
          Nom et Prénom :{" "}
          <span className='ms-2 fw-bolder'>
            {namePatient} {lastNamePatient}
          </span>
        </div>
        <div className='col-6 text-end'>
          Age :
          <span className='ms-2 fw-bolder'>
            {date.getFullYear() - parseInt(dateDeNaissance)}
            {date.getFullYear() - parseInt(dateDeNaissance) > 1 ? "ans" : "an"}
          </span>
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-4 mt-auto'>Renseignements cliniques :</div>
        <div className='col-8'>
          <input
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            placeholder='Renseignements cliniques'
            value={data.renseignementClinique}
            onChange={(e) => handleChange(e)}
            id='renseignementClinique'
          />
        </div>
      </div>
      <p>
        Date de réalisation{" "}
        <span className='fw-bolder'>{formatDate(date)}</span>
      </p>
      <h5>RESULTATS</h5>
      <div className='form-group my-1'>
        <label>Prostate:</label>
        <textarea
          placeholder='Prostate'
          className='form-control text-capitalize'
          value={data.prostate}
          id='prostate'
          style={{ fontSize: 15 }}
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='3'
        />
      </div>
      <div className='form-group my-1'>
        <label>Vésicules séminales:</label>
        <textarea
          placeholder='Vésicules séminales'
          className='form-control text-capitalize'
          value={data.vesiculeSeminale}
          id='vesiculeSeminale'
          style={{ fontSize: 15 }}
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='2'
        />
      </div>
      <div className='form-group my-1'>
        <label>Véssie:</label>
        <textarea
          placeholder='Véssie'
          className='form-control text-capitalize'
          value={data.vessie}
          id='vessie'
          style={{ fontSize: 15 }}
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='2'
        />
      </div>
      <div className='row my-1'>
        <div className='col-3 mt-auto'>Volume vésical:</div>
        <div className='col-9'>
          <input
            type='text'
            placeholder='Volume vésical'
            className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2'
            value={data.volumeVesical}
            onChange={(e) => handleChange(e)}
            id='volumeVesical'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-3 mt-auto'>Parois vésicale:</div>
        <div className='col-9'>
          <input
            type='text'
            placeholder='Parois vésicale'
            className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2'
            value={data.paroisVesicale}
            onChange={(e) => handleChange(e)}
            id='paroisVesicale'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-4 mt-auto'>Résidu post-mictionnel:</div>
        <div className='col-8'>
          <input
            type='text'
            placeholder='Résidu post-mictionnel'
            className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2'
            value={data.residuPostMictionnel}
            onChange={(e) => handleChange(e)}
            id='residuPostMictionnel'
          />
        </div>
      </div>
      <div className='form-group'>
        <label>Reins</label>
        <textarea
          placeholder='Reins'
          className='form-control text-capitalize'
          value={data.reins}
          id='reins'
          style={{ fontSize: 15 }}
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='2'
        />
      </div>
      <div className='form-group'>
        <label>Conclusion</label>
        <textarea
          placeholder='Conclusion'
          className='form-control text-capitalize'
          value={data.conclusion}
          id='conclusion'
          style={{ fontSize: 15 }}
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='4'
        />
      </div>
      <button className='btnValid' type='button' onClick={submit}>
        VALIDER
      </button>
    </form>
  );
};

export default EchoVesicoProstatique;
