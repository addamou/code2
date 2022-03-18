import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createEchoAbd } from "../../../actions/fiches";

const EchoAbdominale = ({
  date,
  nameAgent,
  lastNameAgent,
  idPatient,
  printEA,
  closeEA,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
  data,
  handleChange,
}) => {
  const dispatch = useDispatch();

  //Submit
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      createEchoAbd({
        patient: idPatient,
        ...data,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    closeEA();
    printEA();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete1 date={date} />
      <h3 className='text-center text-decoration-underline my-2'>
        ECHOGRAPHIE ABDOMINALE
      </h3>
      <div>
        Je soussigné{" "}
        <span className='fw-bolder'>
          {" "}
          {nameAgent} {lastNameAgent},{" "}
        </span>
        certifie avoir examiné ce jour{" "}
        <span className='fw-bolder'>
          {" "}
          {namePatient} {lastNamePatient}
        </span>
        <span className='ms-2'>Age: </span>
        <span className='fw-bolder'>
          {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
          {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
            ? "ans"
            : "an"}
        </span>
      </div>
      <div className='row my-1'>
        <span className='col-2 mt-auto'>Indications:</span>
        <span className='col-10'>
          <input
            type='text'
            placeholder='Indiation'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            value={data.indications}
            onChange={handleChange}
            id='indications'
          />
        </span>
      </div>
      <h6 className='mt-2'>RESULTATS</h6>
      <b>Foie</b> <br />
      <b>- Taille</b>
      <div className='row my-1'>
        <div className='col-3 mt-auto'>Lobe droit Mesure</div>
        <div className='col-5'>
          <input
            type='number'
            placeholder='Lobe droit Mesure'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            value={data.lobeDroit}
            onChange={handleChange}
            id='lobeDroit'
          />
        </div>
        <div className='col-4 mt-auto'>mm en avant du rein droit.</div>
      </div>
      <div className='row my-1'>
        <div className='col-4 mt-auto'>Lobe Gauche Mesure</div>
        <div className='col-4'>
          <input
            type='number'
            placeholder='Lobe Gauche Mesure'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            value={data.lobeGauche}
            onChange={handleChange}
            id='lobeGauche'
          />
        </div>
        <div className='col-4 mt-auto'>mm en avant de l'aorte.</div>
      </div>
      <div className='row my-1'>
        <div className='col-4 mt-auto'>Flèche hépatique mesure</div>
        <div className='col-8'>
          <input
            type='text'
            placeholder='Flèche hépatique mesure'
            value={data.flecheHepatique}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='flecheHepatique'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Echostructure:</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Echostructure'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            value={data.echostructure}
            onChange={handleChange}
            id='echostructure'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Contours :</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Contours'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            value={data.contours}
            onChange={handleChange}
            id='contours'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-1 mt-auto'>Autres:</div>
        <div className='col-11'>
          <input
            type='text'
            placeholder='Taille'
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            value={data.autres}
            onChange={handleChange}
            id='autres'
          />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='tpvh'>Tronc porte et veines hépatique</label>
        <textarea
          value={data.tpvh}
          id='tpvh'
          style={{ fontSize: 15 }}
          onChange={(e) => handleChange(e)}
          className='form-control'
          cols='90'
          row='2'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='tpvh'>Vésicule biliaire</label>
        <textarea
          value={data.vesiculeBiliaire}
          id='vesiculeBiliaire'
          style={{ fontSize: 15 }}
          onChange={(e) => handleChange(e)}
          className='form-control'
          cols='90'
          row='2'
        />
      </div>
      <b>Pancréas :</b>
      <div className='row my-1'>
        <div className='col-1 mt-auto'>Taille</div>
        <div className='col-10'>
          <input
            type='number'
            placeholder='Taille'
            value={data.taillePancreas}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='taillePancreas'
          />
        </div>
        <div className='col-1 mt-auto'>mm.</div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Echostructure</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Echostructure'
            value={data.echostructurePancreas}
            className='col-8 form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='echostructurePancreas'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Autres</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Autres'
            value={data.autresPancreas}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='autresPancreas'
          />
        </div>
      </div>
      <br />
      <b>Rate :</b>
      <div className='row my-1'>
        <div className='col-1 mt-auto'>Taille</div>
        <div className='col-10'>
          <input
            type='number'
            placeholder='Taille'
            value={data.tailleRate}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='tailleRate'
          />
        </div>
        <div className='col-1 mt-auto'>mm</div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Echostructure</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Echostructure'
            value={data.echostructureRate}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='echostructureRate'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Contours</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Contours'
            value={data.contoursRate}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='contoursRate'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Autres</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Autres'
            value={data.autresRate}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='autresRate'
          />
        </div>
      </div>
      <b>Reins:</b> <br />
      <b>- Droit</b>
      <div className='row my-1'>
        <div className='col-1 mt-auto'>Taille</div>
        <div className='col-10'>
          <input
            type='number'
            placeholder='Taille'
            value={data.tailleDroitReins}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='tailleDroitReins'
          />
        </div>
        <div className='col-1 mt-auto'>mm</div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Echostructure:</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Echostructure'
            value={data.echostructureDroitReins}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='echostructureDroitReins'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-4 mt-auto'>Cavités pyélocalicielles</div>
        <div className='col-8'>
          <input
            type='text'
            placeholder='Cavités pyélocalicielles Droit'
            value={data.cavitePyelocalicielleDroit}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='cavitePyelocalicielleDroit'
          />
        </div>
      </div>
      <b>- Gauche</b>
      <div className='row my-1'>
        <div className='col-1 mt-auto'>Taille</div>
        <div className='col-10'>
          <input
            type='number'
            placeholder='Taille'
            value={data.tailleGaucheReins}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='tailleGaucheReins'
          />
        </div>
        <div className='col-1 mt-auto'>mm</div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Echostructure:</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Echostructure'
            value={data.echostructureGaucheReins}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='echostructureGaucheReins'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-4 mt-auto'>Cavités pyélocalicielles</div>
        <div className='col-8'>
          <input
            type='text'
            placeholder='Cavités pyélocalicielles Gauche'
            value={data.cavitePyelocalicielleGauche}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='cavitePyelocalicielleGauche'
          />
        </div>
      </div>
      <b>Vessie</b>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Contour</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Contour'
            value={data.contoursVessie}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='contoursVessie'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Contenu</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Contenu Vessie'
            value={data.contenuVessie}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='contenuVessie'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Parois</div>
        <div className='col-10'>
          <input
            type='text'
            placeholder='Parois'
            value={data.paroisVessie}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='paroisVessie'
          />
        </div>
      </div>
      <div className='row my-1'>
        <div className='col-2 mt-auto'>Mesure</div>
        <div className='col-9'>
          <input
            type='number'
            placeholder='Mesure'
            value={data.mesureParoisVessie}
            className='form-control border-0 border-bottom border-primary rounded-0 border-2'
            onChange={handleChange}
            id='mesureParoisVessie'
          />
        </div>
        <div className='col-1'>mm</div>
      </div>
      <div className='form-group'>
        <label htmlFor='conclusion'>conclusion</label>
        <textarea
          type='text'
          placeholder='Conclusion'
          value={data.conclusion}
          cols='90'
          row='2'
          className='fs-5 form-control'
          onChange={handleChange}
          id='conclusion'
        />
      </div>
      <button className='btnValid' type='button' onClick={submit}>
        VALIDER
      </button>
    </form>
  );
};

export default EchoAbdominale;
