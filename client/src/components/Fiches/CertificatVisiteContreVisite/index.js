import React from "react";
import { useDispatch } from "react-redux";
import { Entete2 } from "../../layout/Entetes";
import { formatDate } from "../../layout/Formats";
import { createCertVisContMed } from "../../../actions/fiches";

const CertificatVisiteContreVisite = ({
  date,
  close,
  print,
  agents,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
  lieuDeNaissance,
  idPatient,
  nameAgent,
  lastNameAgent,
  medecin2,
  setMedecin2,
}) => {
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(
      createCertVisContMed({ patient: idPatient, createdBy2: medecin2 })
    );
    close();
    print();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete2 />
      <div>
        <h3 className='my-2 text-center text-uppercase text-decoration-underline'>
          Certificat De Visite Médicale
        </h3>
        <p>
          En exécution des règlements en vigueur, nous soussigné{" "}
          <span className='fw-bold'>
            {nameAgent} {lastNameAgent}
          </span>
        </p>
        <p className='my-2'>
          Certifions que le (la) nommé (e):
          <span className='fw-bold'>
            {" "}
            {namePatient} {lastNamePatient}
          </span>
        </p>
        <p className='my-2'>
          {" "}
          Né (e) à :<span className='ms-2 fw-bold'>{lieuDeNaissance}</span>, le{" "}
          <span className='ms-2 fw-bold'>{formatDate(dateDeNaissance)}</span>
        </p>
        <p className='my-2'>
          N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique
          contre indiquant son aptitude à travailler ou à concourir.
        </p>
        <p className='my-2'>
          En conséquence, le (la) susnommé (e) est{" "}
          <span className='fw-bold border border-3 border-dark rounded-circle p-1'>
            Apte
          </span>
        </p>
        <div className='text-end'>Fait à Niamey, le {formatDate(date)}</div>
        <div className='text-end mt-2 mb-5'>
          <h6 className='text-decoration-underline'>Médecin</h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
        <hr className='my-4' />
        <h3 className='mb-2 mt-5 text-center text-decoration-underline text-uppercase'>
          Certificat De Contre Visite Médicale
        </h3>

        <div>
          En exécution des règlements en vigueur, nous soussigné
          <select
            className='border-0 border-bottom border-info'
            value={medecin2}
            onChange={(e) => setMedecin2(e.target.value)}
          >
            <option>Choisir le deuxieme médecin</option>
            {agents.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <p className='my-2'>
          Certifions que le (la) nommé (e):
          <span className='fw-bold'>
            {" "}
            {namePatient} {lastNamePatient}
          </span>
        </p>
        <p className='my-2'>
          {" "}
          Né (e) à :<span className='ms-2 fw-bold'>{lieuDeNaissance}</span>, le{" "}
          <span className='ms-2 fw-bold'>{formatDate(dateDeNaissance)}</span>
        </p>
        <p className='my-2'>
          N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique
          contre indiquant son aptitude à travailler ou à concourir.
        </p>
        <p className='my-2'>
          En conséquence, le (la) susnommé (e) est{" "}
          <span className='fw-bold border border-3 border-dark rounded-circle p-1'>
            Apte
          </span>
        </p>
        <div className='text-end'>Fait à Niamey, le {formatDate(date)}</div>
        <div className='text-end'>
          <h6 className='text-decoration-underline'>Médecin</h6>
          <p>{medecin2}</p>
        </div>
      </div>
      <button className='btnValid' type='button' onClick={submit}>
        VALIDER
      </button>
    </form>
  );
};

export default CertificatVisiteContreVisite;
