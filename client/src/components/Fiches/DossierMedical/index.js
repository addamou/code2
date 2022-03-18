import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { formatDate, formatHeure } from "../../layout/Formats";
import { Entete1 } from "../../layout/Entetes";
import { createDMedical } from "../../../actions/fiches";

const DossierMedical = ({
  nameAgent,
  lastNameAgent,
  date,
  namePatient,
  lastNamePatient,
  handleExamenDM,
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
      createDMedical({
        ...data,
        patient: idPatient,
        examensUlterieurs: Examens,
        medecin: `${nameAgent} ${lastNameAgent}`,
      })
    );
    handleExamenDM(Examens);
    close();
    print();
  };

  const initialExamensUlterieurs = {
    date: "",
    heure: "",
    compteRendu: "",
    modifications: "",
  };
  const [examensUlterieurs, setExamensUlterieurs] = useState(
    initialExamensUlterieurs
  );

  const handleChangeExamen = (e) => {
    setExamensUlterieurs({
      ...examensUlterieurs,
      [e.target.id]: e.target.value,
    });
  };
  const [Examens, setExamens] = useState([]);
  const handleAdd = () => {
    setExamens([...Examens, examensUlterieurs]);
    setExamensUlterieurs(initialExamensUlterieurs);
  };
  const handleDelete = (i) => {
    setExamens(Examens.filter((el, index) => i !== index));
  };
  return (
    <form className='A4 A4CRH' autoComplete='false'>
      <Entete1 date={date} />
      <h4 className='text-center my-1 text-decoration-underline'>
        DOSSIER MEDICAL
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
      <div className='row form-group'>
        <div className='col-1 mt-auto'>Adresse</div>
        <div className='col-11 mt-auto'>
          <input
            id='adresse'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            onChange={(e) => handleChange(e)}
            value={data.adresse}
            type='text'
          />
        </div>
      </div>
      <p className='lead my-1'>
        Observation prise par : Dr{" "}
        <span className='fw-bold'>
          {nameAgent} {lastNameAgent}{" "}
        </span>
      </p>
      <hr />
      <h4 className='text-center'>Type d'Assurance</h4>

      <div className='form-group'>
        <input
          placeholder='Nom et Prénom Assuré :'
          id='assure'
          onChange={(e) => handleChange(e)}
          value={data.assure}
          type='text'
          className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
        />
      </div>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            placeholder='N°Police:'
            id='numPolice'
            onChange={(e) => handleChange(e)}
            value={data.numPolice}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            placeholder='N° assuré:'
            id='numAssure'
            onChange={(e) => handleChange(e)}
            value={data.numAssure}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-6 row'>
          <div className='col-4 mt-auto'>Entrée le:</div>
          <div className='col-8'>
            <input
              id='entree'
              onChange={(e) => handleChange(e)}
              value={data.entree}
              type='date'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            />
          </div>
        </div>
        <div className='col-6 row'>
          <div className='col-4 mt-auto'>Sortie le:</div>
          <div className='col-8'>
            <input
              id='sortie'
              onChange={(e) => handleChange(e)}
              value={data.sortie}
              type='date'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-4 row'>
          <div className='col-4 mt-auto'>Chambre:</div>
          <div className='col-8'>
            <input
              id='chambre'
              onChange={(e) => handleChange(e)}
              value={data.chambre}
              type='text'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            />
          </div>
        </div>
        <div className='col-8 row'>
          <div className='col-6 mt-auto'> Motif de Consultation:</div>
          <div className='col-6'>
            <input
              id='motifConsultation'
              onChange={(e) => handleChange(e)}
              value={data.motifConsultation}
              type='text'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            />
          </div>
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='histoireMaladie'>Histoire de la maladie</label>
        <textarea
          id='histoireMaladie'
          className='form-control text-capitalize'
          onChange={(e) => handleChange(e)}
          value={data.histoireMaladie}
          cols='90'
          rows='3'
        />
      </div>
      <h6>ATCD</h6>
      <span>- Personnels:</span>
      <div className='row'>
        <div className='col-4 form-group'>
          <input
            placeholder='Médicale :'
            id='medicale'
            onChange={(e) => handleChange(e)}
            value={data.medicale}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-4 form-group'>
          <input
            placeholder='Chirurgical :'
            id='chirurgical'
            onChange={(e) => handleChange(e)}
            value={data.chirurgical}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-4 form-group'>
          <input
            placeholder='Gynéco-obstétrique :'
            id='gynecoObstetrique'
            onChange={(e) => handleChange(e)}
            value={data.gynecoObstetrique}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-2 mt-auto'>- Familiers :</div>
        <div className='col-10 form-group'>
          <input
            id='familiers'
            onChange={(e) => handleChange(e)}
            value={data.familiers}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-3 mt-auto'>Examens à l'entrée :</div>
        <div className='col-9 form-group'>
          <input
            id='examenEntree'
            onChange={(e) => handleChange(e)}
            value={data.examenEntree}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row text-center'>
        <div className='col-3 row'>
          <div className='col-4 mt-auto'>T°</div>
          <div className='col-8 form-group'>
            <input
              id='t'
              onChange={(e) => handleChange(e)}
              value={data.t}
              type='number'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            />
          </div>
        </div>
        <div className='col-3 row'>
          <div className='col-4 mt-auto'>TA</div>
          <div className='col-8 form-group'>
            <input
              id='ta'
              onChange={(e) => handleChange(e)}
              value={data.ta}
              type='text'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            />
          </div>
        </div>
        <div className='col-3 row'>
          <div className='col-4 mt-auto '>Poids</div>
          <div className='col-8 form-group'>
            <input
              id='poids'
              onChange={(e) => handleChange(e)}
              value={data.poids}
              type='number'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            />
          </div>
        </div>
        <div className='col-3 row'>
          <div className='col-4 mt-auto'>Taille</div>
          <div className='col-8 form-group'>
            <input
              id='taille'
              onChange={(e) => handleChange(e)}
              value={data.taille}
              type='text'
              className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            placeholder='Etat Général :'
            id='etatGeneral'
            onChange={(e) => handleChange(e)}
            value={data.etatGeneral}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            placeholder='Coeur :'
            id='coeur'
            onChange={(e) => handleChange(e)}
            value={data.coeur}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            placeholder='Poumons :'
            id='poumons'
            onChange={(e) => handleChange(e)}
            value={data.poumons}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            placeholder='ABD:'
            id='abd'
            onChange={(e) => handleChange(e)}
            value={data.abd}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-6 form-group'>
          <input
            placeholder='ORL :'
            id='orl'
            onChange={(e) => handleChange(e)}
            value={data.orl}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-6 form-group'>
          <input
            placeholder='Autres app :'
            id='autresApp'
            onChange={(e) => handleChange(e)}
            value={data.autresApp}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='resume'>RESUME</label>
        <textarea
          id='resume'
          onChange={(e) => handleChange(e)}
          value={data.resume}
          style={{ fontSize: 15 }}
          cols='90'
          rows='2'
          className='form-control text-capitalize'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='examenDemandes'>Examens demandés</label>
        <textarea
          id='examenDemandes'
          onChange={(e) => handleChange(e)}
          value={data.examenDemandes}
          style={{ fontSize: 15 }}
          cols='90'
          rows='2'
          className='form-control text-capitalize'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='diagnosticRetenu'>Diagnostic Retenu</label>
        <textarea
          id='diagnosticRetenu'
          onChange={(e) => handleChange(e)}
          value={data.diagnosticRetenu}
          style={{ fontSize: 15 }}
          cols='90'
          rows='2'
          className='form-control text-capitalize'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='conduiteTenir'>Conduite à Ténir</label>
        <textarea
          id='conduiteTenir'
          onChange={(e) => handleChange(e)}
          value={data.conduiteTenir}
          style={{ fontSize: 15 }}
          cols='90'
          rows='2'
          className='form-control text-capitalize'
        />
      </div>

      <h3 className='text-center my-1'>Examens Ultérieurs</h3>
      <div className='row'>
        <div className='col-4 mt-auto'>Dates Heures Médecins</div>
        <div className='col-8 form-group'>
          <input
            id='date'
            onChange={(e) => handleChangeExamen(e)}
            value={examensUlterieurs.date}
            type='datetime-local'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='compteRendu'>
          Compte Rendu : Examen clinique - Para clinique
        </label>
        <textarea
          id='compteRendu'
          cols='90'
          rows='2'
          onChange={(e) => handleChangeExamen(e)}
          value={examensUlterieurs.compteRendu}
          className='form-control text-capitalize'
        />
      </div>
      <div className='row'>
        <div className='form-group col-10'>
          <input
            placeholder='Modification Thérapeutiques Actes'
            id='modifications'
            onChange={(e) => handleChangeExamen(e)}
            value={examensUlterieurs.modifications}
            type='text'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2 my-2'
          />
        </div>
        <div className='col-2 my-auto'>
          <button
            className='btn btn-success'
            type='button'
            onClick={() => handleAdd()}
          >
            Ajouter
          </button>
        </div>
      </div>

      <Fragment>
        <table>
          <thead>
            <tr>
              <th>Dates Heures Médecins:</th>
              <th>Compte Rendu: Examen clinique - Para clinique:</th>
              <th>Modification Thérapeutiques Actes:</th>
            </tr>
          </thead>
          <tbody>
            {data.examensUlterieurs &&
              data.examensUlterieurs.length &&
              data.examensUlterieurs.length !== 0 &&
              data.examensUlterieurs.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {" "}
                      {formatDate(el.date)}---{formatHeure(el.date)}{" "}
                    </td>
                    <td>{el.compteRendu}</td>
                    <td>{el.modifications} </td>
                  </tr>
                );
              })}
            {Examens &&
              Examens.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {formatDate(el.date)}--{formatHeure(el.date)}
                    </td>
                    <td>{el.compteRendu}</td>
                    <td>{el.modifications} </td>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(index)}
                    >
                      X
                    </button>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                <strong>Observation</strong>
                <textarea
                  id='observations'
                  onChange={(e) => handleChange(e)}
                  value={data.observations}
                  cols='90'
                  rows='1'
                  className='form-control text-capitalize'
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </Fragment>
      <button className='btnValid' type='button' onClick={submit}>
        VALIDER
      </button>
    </form>
  );
};

export default DossierMedical;
