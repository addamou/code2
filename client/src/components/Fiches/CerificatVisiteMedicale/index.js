import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Entete2 } from "../../layout/Entetes";
import { formatDate } from "../../layout/Formats";
import { createCertVisMed } from "../../../actions/fiches";

const CertificatVisiteMedical = ({
  date,
  nameAgent,
  lastNameAgent,
  idPatient,
  print,
  justification,
  justificationCVM,
  namePatient,
  lastNamePatient,
  lieuDeNaissance,
  dateDeNaissance,
  close,
}) => {
  const dispatch = useDispatch();
  // text de justification
  useEffect(() => {
    justificationCVM(justification);
  }, [justificationCVM, justification]);

  //Submit
  const submit = () => {
    dispatch(
      createCertVisMed({
        patient: idPatient,
        justification,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    close();
    print();
  };

  return (
    <div className='A4'>
      <Entete2 />
      <form autoComplete='false'>
        <h3 className='my-5 text-center text-uppercase text-decoration-underline'>
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

        <textarea
          className='my-5 fw-bold form-control border-0 border-bottom border-info text-justify text-capitalize'
          value={justification}
          style={{ fontSize: 15 }}
          onChange={(e) => justificationCVM(e.target.value)}
          cols='90'
          rows='4'
        />

        <div className='text-end my-3'>
          Fait à Niamey, le {formatDate(date)}
        </div>
        <div className='text-end mt-5'>
          <h6 className='text-decoration-underline'>Médecin</h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
        <button className='btnValid' type='button' onClick={submit}>
          VALIDER
        </button>
      </form>
    </div>
  );
};

export default CertificatVisiteMedical;
