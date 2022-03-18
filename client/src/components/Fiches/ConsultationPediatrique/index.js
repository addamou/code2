import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createConsPe } from "../../../actions/fiches";

const ConsultationPediatrique = ({
  date,
  nameAgent,
  lastNameAgent,
  namePatient,
  lastNamePatient,
  handleChange,
  data,
  dateDeNaissance,
  idPatient,
  close,
  print,
}) => {
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(
      createConsPe({
        ...data,
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    close();
    print();
  };

  return (
    <form className='A4 A4CRH' autoComplete='off'>
      <Entete1 date={date} />
      <h3 className='text-center text-decoration-underline text-uppercase my-3'>
        Consultation Pédiatrique
      </h3>
      <div className='row'>
        <div className='col-5 text-capitalize'>
          Nom et Prénom:{" "}
          <strong className='mr-2'>
            {namePatient} {lastNamePatient}
          </strong>
        </div>
        <div className='col-3'>
          Age: {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
          {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
            ? "ans"
            : "an"}
        </div>
        <div className='col-4'>
          <select
            id='sexe'
            className='form-select form-select-sm border-0 border-bottom border-primary rounded-0 border-2'
            value={data.sexe}
            onChange={(e) => handleChange(e)}
          >
            <option value=''>Sexe Enfant</option>
            <option value='M'>Masculin</option>
            <option value='F'>Feminin</option>
          </select>
        </div>
      </div>
      <div className='form-group'>
        <input
          id='adresse'
          placeholder='ADRESSE DU PARENT'
          className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.adresse}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='maladieConnue'
          placeholder='MALADIE CONNUE'
          className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.maladieConnue}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='motifConsultation'
          placeholder='MOTIF DE LA CONSULTATION'
          className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.motifConsultation}
          type='text'
        />
      </div>
      <h5 className='text-center'>Constante et monsuration</h5>
      <div className='row'>
        <div className='col-3'>
          <input
            id='poids'
            placeholder='POIDS'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.poids}
            type='number'
          />
        </div>
        <div className='col-3'>
          <input
            id='taille'
            placeholder='TAILLE'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.taille}
            type='text'
          />
        </div>
        <div className='col-3'>
          <input
            id='pc'
            placeholder='PC'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.pc}
            type='text'
          />
        </div>
        <div className='col-3'>
          <input
            id='t'
            placeholder='T°'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.t}
            type='number'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <input
            id='fr'
            placeholder='FR'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.fr}
            type='text'
          />
        </div>
        <div className='col-3'>
          <input
            id='fc'
            placeholder='FC'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.fc}
            type='text'
          />
        </div>
        <div className='col-3'>
          <input
            id='sao2'
            placeholder='SaO2'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.sao2}
            type='text'
          />
        </div>
        <div className='col-3'>
          <input
            id='ta'
            placeholder='TA'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.ta}
            type='text'
          />
        </div>
      </div>
      <div className='form-group'>
        <input
          id='examenPhysique'
          placeholder='EXAMEN PHYSIQUE'
          className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.examenPhysique}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='bilanResultats'
          placeholder='BILAN RESULTATS'
          className='form-control text-capitalize border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.bilanResultats}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='diagnostic'
          placeholder='DIAGNOSTIC'
          className='form-control border-0 text-capitalize border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.diagnostic}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='traitement'
          placeholder='TRAITEMENT'
          className='form-control border-0 text-capitalize border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.traitement}
          type='text'
        />
      </div>
      <div className='row'>
        <div className='col-8 my-auto text-end'>RENDEZ-VOUS</div>
        <div className='col-4 form-group'>
          <input
            id='rdv'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.rdv}
            type='date'
          />
        </div>
      </div>

      <div className='text-end'>
        <h6 className='text-decoration-underline'> Le Médecin:</h6>
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

export default ConsultationPediatrique;
