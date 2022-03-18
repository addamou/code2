import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createCompHosp } from "../../../actions/fiches";

const CompteRenduHospitalisation = ({
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
      createCompHosp({
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
      <h4 className='text-center my-3 text-decoration-underline'>
        Compte Rendu D'Hospitalisation
      </h4>
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
            onChange={handleChange}
          >
            <option value=''>Choix Sexe</option>
            <option value='M'>Masculin</option>
            <option value='F'>Feminin</option>
            <option value='0'>Autre</option>
          </select>
        </div>
      </div>
      <div className='form-group'>
        <input
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          placeholder="MOTIF D'HOSPITALISATION"
          id='motifHospitalisation'
          onChange={handleChange}
          value={data.motifHospitalisation}
          type='text'
        />
      </div>
      <div className='row'>
        <div className='col-3 my-auto'> Hospitalisé du :</div>
        <div className='col-4'>
          <input
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            id='debutHospitalisation'
            onChange={handleChange}
            value={data.debutHospitalisation}
            type='date'
          />
        </div>
        <div className='col-1 my-auto'>au :</div>
        <div className='col-4'>
          <input
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            id='finHospitalisation'
            onChange={handleChange}
            value={data.finHospitalisation}
            type='date'
          />
        </div>
      </div>
      <b>ATCD</b>
      <p className='my-1'>- Personnels:</p>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            placeholder='Médicale:'
            id='medicale'
            onChange={handleChange}
            value={data.medicale}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            placeholder='Chirurgical:'
            id='chururgical'
            onChange={handleChange}
            value={data.chururgical}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-6'>
          <input
            placeholder='Gynéco-obstétrique:'
            id='gynecoObstretrique'
            onChange={handleChange}
            value={data.gynecoObstretrique}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6'>
          <input
            placeholder='Familiers:'
            id='familiers'
            onChange={handleChange}
            value={data.familiers}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='form-group'>
        <input
          placeholder="Examens à l'entrée:"
          id='examenEntree'
          onChange={handleChange}
          value={data.examenEntree}
          type='text'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
        />
      </div>
      <div className='row'>
        <div className='col-3 form-group'>
          <input
            placeholder='T°'
            id='t'
            onChange={handleChange}
            value={data.t}
            type='number'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-3 form-group'>
          <input
            placeholder='TA'
            id='ta'
            onChange={handleChange}
            value={data.ta}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-3 form-group'>
          <input
            placeholder='Poids'
            id='poids'
            onChange={handleChange}
            value={data.poids}
            type='number'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-3 form-group'>
          <input
            placeholder='Taille'
            id='taille'
            onChange={handleChange}
            value={data.taille}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            placeholder='Etat Général:'
            id='etatGeneral'
            onChange={handleChange}
            value={data.etatGeneral}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            placeholder='Coeur:'
            id='coeur'
            onChange={handleChange}
            value={data.coeur}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            placeholder='Poumons:'
            id='poumons'
            onChange={handleChange}
            value={data.poumons}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            placeholder='ABD:'
            id='abd'
            onChange={handleChange}
            value={data.abd}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            placeholder='ORL:'
            id='orl'
            onChange={handleChange}
            value={data.orl}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            placeholder='Autres app:'
            id='autresApp'
            onChange={handleChange}
            value={data.autresApp}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='examenDemandes' className='form-label'>
          Examens demandés:
        </label>
        <textarea
          className='form-control'
          id='examenDemandes'
          onChange={handleChange}
          value={data.examenDemandes}
          rows='2'
        ></textarea>
      </div>
      <div className='form-group'>
        <label htmlFor='examenDemandes' className='form-label'>
          Diagnostic Retenu:
        </label>
        <textarea
          className='form-control'
          id='diagnosticRetenu'
          onChange={handleChange}
          value={data.diagnosticRetenu}
          rows='2'
        ></textarea>
      </div>
      <div className='form-group'>
        <label htmlFor='examenDemandes' className='form-label'>
          Conduite à Ténir:
        </label>
        <textarea
          className='form-control'
          id='conduiteTenir'
          onChange={handleChange}
          value={data.conduiteTenir}
          rows='2'
        ></textarea>
      </div>
      <div className='form-group'>
        <label htmlFor='examenDemandes' className='form-label'>
          Evolution:
        </label>
        <textarea
          className='form-control'
          id='evolution'
          onChange={handleChange}
          value={data.evolution}
          rows='2'
        ></textarea>
      </div>
      <div className='text-end mt-2'>
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

export default CompteRenduHospitalisation;
