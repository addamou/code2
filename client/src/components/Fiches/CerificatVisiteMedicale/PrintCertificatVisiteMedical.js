import React, { Component } from "react";
import { formatDate } from "../../layout/Formats";
import { Entete2 } from "../../layout/Entetes";

class PrintCertificatVisiteMedical extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      nameAgent,
      lieuDeNaissance,
      dateDeNaissance,
      lastNameAgent,
      justification,
    } = this.props;

    return (
      <div className='A4 my-0'>
        <Entete2 />
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
        <p className='fs-5 text-justify'>{justification}</p>
        <div className='text-end my-3'>
          Fait à Niamey, le {formatDate(date)}
        </div>
        <div className='text-end mt-5'>
          <h6 className='text-decoration-underline'>Médecin</h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    );
  }
}

export default PrintCertificatVisiteMedical;
