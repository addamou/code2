import React from "react";
import { useDispatch } from "react-redux";
import { Entete2 } from "../../layout/Entetes";
import { formatDate } from "../../layout/Formats";
import { createCertGros } from "../../../actions/fiches";
const CertificatGrossesse = ({
  date,
  poste,
  nameAgent,
  lastNameAgent,
  idPatient,
  printCG,
  closeCG,
  namePatient,
  lastNamePatient,
  data,
  handleChange,
}) => {
  const dispatch = useDispatch();

  //Submit
  const submit = () => {
    dispatch(
      createCertGros({
        patient: idPatient,
        ...data,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    closeCG();
    printCG();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete2 />
      <h3 className='text-center text-uppercase text-decoration-underline my-4'>
        CERTIFICAT DE GROSSESSE
      </h3>
      <div className='fs-5'>
        <p className='ps-5 mb-1'>
          Soussigné, Dr {nameAgent} {lastNameAgent},{" "}
          {poste === "sagefemme" ? "La Sage Femme" : "Gynécologue-Obstétricien"}{" "}
          de la clinique Afoua.
        </p>
        <p>
          certifie avoir examiné ce jour,{" "}
          <span className='fw-bolder ms-2'>{formatDate(date)}</span>
          La nommée:{" "}
          <span className='fw-bolder ms-2'>
            {namePatient} {lastNamePatient}
          </span>{" "}
          et déclare que la patiente à une Grossesse de :
          <span className='col-1'>
            <input
              type='number'
              placeholder='Nombre de Semaine'
              className='text-center border-0 border-bottom border-primary rounded-0 border-2'
              value={data.nbreSemaine}
              onChange={(e) => handleChange(e)}
              id='nbreSemaine'
            />
          </span>
          <span>Semaines d'aménorrhé</span>
          <span className='col-1'>
            (
            <input
              type='number'
              placeholder='Nombre de Mois'
              className='text-center border-0 border-bottom border-primary rounded-0 border-2'
              value={data.nbreMois}
              onChange={(e) => handleChange(e)}
              id='nbreMois'
            />
            ) mois.
          </span>
          <br />
          <span className='ms-2'>L'accouchement est prévu le</span>
          <span>
            <input
              type='date'
              className='text-center border-0 border-bottom border-primary rounded-0 border-2'
              value={data.datePrevu}
              onChange={(e) => handleChange(e)}
              id='datePrevu'
            />
          </span>
        </p>
        <p className='fw-bolder'>Sauf Complication</p>
        <div className='text-end my-5'>
          Fait à Niamey, le {formatDate(date)}
        </div>
      </div>
      <div className='text-end mt-2'>
        <h6 className='text-decoration-underline'>
          {poste === "sagefemme" ? "La Sage Femme" : "Le Gynecologue"}
        </h6>
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

export default CertificatGrossesse;
