import React from "react";
import { useDispatch } from "react-redux";
import { createBullSortie } from "../../../actions/fiches";
import { Entete1 } from "../../layout/Entetes";

const BulletinSortie = ({
  date,
  nameAgent,
  lastNameAgent,
  idPatient,
  print,
  close,
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
      createBullSortie({
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
        ...data,
      })
    );
    close();
    print();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete1 date={date} />
      <h3 className='my-2 text-center text-decoration-underline'>
        BULLETIN DE SORTIE
      </h3>
      <div className='row'>
        <div className='col-6'>
          Nom du malade :{" "}
          <span className='fw-bold'>
            {` ${namePatient} ${lastNamePatient}`}{" "}
          </span>
        </div>
        <div className='col-6 text-end'>
          Age :{" "}
          <span className='fw-bold'>
            {date.getFullYear() - parseInt(dateDeNaissance)}{" "}
            {date.getFullYear() - parseInt(dateDeNaissance) > 1 ? "ans" : "an"}
          </span>
        </div>
      </div>
      <div className='form-group mt-2'>
        <label htmlFor='motifHospitalisation'>Motif d'hospitalisation:</label>
        <textarea
          value={data.motifHospitalisation}
          className='form-control text-capitalize'
          id='motifHospitalisation'
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='2'
        />
      </div>
      <div className='row'>
        <div className='col-7 row'>
          <div className='col-4 mt-auto'>Periode: du</div>
          <div className='col-8 form-group'>
            <input
              type='date'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
              value={data.debutPeriode}
              onChange={(e) => handleChange(e)}
              id='debutPeriode'
            />
          </div>
        </div>
        <div className='col-5 row'>
          <div className='col-2 mt-auto'>au</div>
          <div className='col-10 form-group'>
            <input
              type='date'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
              value={data.finPeriode}
              onChange={(e) => handleChange(e)}
              id='finPeriode'
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-4 mt-auto'>Durée d'hospitalisation :</div>
        <div className='col-7 form-group'>
          <input
            type='number'
            value={data.dureeHospitalisation}
            onChange={(e) => handleChange(e)}
            id='dureeHospitalisation'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-1 mt-auto'>jour(s)</div>
      </div>
      <div className='form-group'>
        <label htmlFor='iagnosticRetenu'> Diagnostic Retenu:</label>
        <textarea
          value={data.diagnosticRetenu}
          className='form-control text-capitalize'
          id='diagnosticRetenu'
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='2'
        />
      </div>
      <div className='row'>
        <div className='col-3 mt-auto'>Date de sortie:</div>
        <div className='col-9 form-group'>
          <input
            type='date'
            value={data.dateSortie}
            onChange={(e) => handleChange(e)}
            id='dateSortie'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='form-group mt-2'>
        <label className='ordonnanceSortie1'>- Ordonnance de sortie :</label>
        <textarea
          value={data.ordonnanceSortie1}
          className='form-control text-capitalize'
          id='ordonnanceSortie1'
          onChange={(e) => handleChange(e)}
          cols='90'
          rows='1'
        />
      </div>
      -
      <textarea
        value={data.ordonnanceSortie2}
        className='form-control text-capitalize'
        id='ordonnanceSortie2'
        onChange={(e) => handleChange(e)}
        cols='90'
        rows='1'
      />
      -
      <textarea
        value={data.ordonnanceSortie3}
        className='form-control text-capitalize'
        id='ordonnanceSortie3'
        onChange={(e) => handleChange(e)}
        cols='90'
        rows='1'
      />
      <br />
      <div className='row'>
        <div className='col-2 my-auto'>Visite retour</div>
        <div className='col-10'>
          <input
            type='date'
            value={data.visiteRetour}
            onChange={(e) => handleChange(e)}
            id='visiteRetour'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='text-start'>
          <h6>Le malade (ou son repondant)</h6>
        </div>
        <div className='text-end'>
          <h6>Le Médecin</h6>
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

export default BulletinSortie;
