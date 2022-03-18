import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createConsGe } from "../../../actions/fiches";

const ConsultationGenerale = ({
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
      createConsGe({
        ...data,
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    close();
    print();
  };

  return (
    <form className='A4 A4CRH' autoComplete='false'>
      <Entete1 date={date} />
      <h4 className='text-center my-3 text-uppercase text-decoration-underline'>
        Consultation médecine Génerale
      </h4>
      <div className='row'>
        <div className='col-5 text-capitalize'>
          Nom et Prénom:{" "}
          <span className='fw-bold'>
            {namePatient} {lastNamePatient}
          </span>
        </div>
        <div className='col-3'>
          Age:{" "}
          <span className='fw-bold'>
            {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
            {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
              ? "ans"
              : "an"}
          </span>
        </div>
        <div className='col-4 my-auto'>
          <select
            id='sexe'
            className='form-select form-select-sm border-0 border-bottom border-primary rounded-0 border-2'
            value={data.sexe}
            onChange={(e) => handleChange(e)}
          >
            <option value=''>Choix Sexe</option>
            <option value='M'>Masculin</option>
            <option value='F'>Feminin</option>
            <option value='0'>Autre</option>
          </select>
        </div>
      </div>

      <div className='row'>
        <div className='col-6 form-group'>
          <input
            id='adresse'
            placeholder='ADRESSE'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.adresse}
            type='text'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            id='fonction'
            placeholder='FONCTION'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.fonction}
            type='text'
          />
        </div>
      </div>
      <div className='form-group'>
        <input
          id='motifConsultation'
          placeholder='MOTIF DE LA CONSULTATION'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.motifConsultation}
          type='text'
        />
      </div>
      <h5 className='text-center'>INTERROGATOIRES</h5>
      <h6>ATCD</h6>
      <h6>- Personnels:</h6>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            id='medical'
            placeholder='MEDICAL'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.medical}
            type='text'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            id='chirurgical'
            placeholder='CHIRURGICAL'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.chirurgical}
            type='text'
          />
        </div>
      </div>
      <div className='form-group'>
        <input
          id='gynecoObstetrique'
          placeholder='GYNECO-OBSTETRIQUE'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.gynecoObstetrique}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='allergies'
          placeholder='ALLERGIES MEDICAMENTEUSES OU ALIMENTAIRES'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.allergies}
          type='text'
        />
      </div>
      <h6>ATCDs</h6>
      <div className='form-group'>
        <input
          id='familiaux'
          placeholder='FAMILIAUX'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.familiaux}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='automedication'
          placeholder='AUTOMEDICATION OU PRESCRIPTION MEDICALE RECU'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.automedication}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='hospitalisationRecente'
          placeholder='HOSPITALISATION RECENTE POUR :'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.hospitalisationRecente}
          type='text'
        />
      </div>
      <h5 className='text-center'>CONSTANTES</h5>
      <div className='row'>
        <div className='col-4 form-group'>
          <input
            id='t'
            placeholder='T°'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.t}
            type='number'
          />
        </div>
        <div className='col-4 form-group'>
          <input
            id='poids'
            placeholder='POIDS'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.poids}
            type='number'
          />
        </div>
        <div className='col-4 form-group'>
          <input
            id='fc'
            placeholder='FC'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.fc}
            type='text'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            id='spo2'
            placeholder='SPO2'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.spo2}
            type='text'
          />
        </div>
        <div className='col-6 form-group'>
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
          id='signeGenereaux'
          placeholder='SIGNE GENERAUX'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.signeGenereaux}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='examenPhysique'
          placeholder='EXAMEN PHYSIQUE'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.examenPhysique}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='soinsRecuUrgence'
          placeholder="SOINS RECU EN URGENCE A L'ADMISSION"
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.soinsRecuUrgence}
          type='text'
        />
      </div>
      <div className='form-group'>
        <input
          id='examenResultat'
          placeholder='EXAMENS COMPLEMENTAIRES ET RESULTATS'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          onChange={(e) => handleChange(e)}
          value={data.examenResultat}
          type='text'
        />
      </div>
      <div className='row'>
        <div className='col-8 my-auto'>
          ORDONNANCE PRESCRITE ET/OU HOSPITALISATION
        </div>
        <div className='col-4 form-group'>
          <input
            id='ordonnanceHospitalisation'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.ordonnanceHospitalisation}
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

export default ConsultationGenerale;
