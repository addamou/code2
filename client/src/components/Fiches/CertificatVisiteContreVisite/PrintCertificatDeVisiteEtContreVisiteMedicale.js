import React, { Component } from "react";
import { formatDate } from "../../layout/Formats";
import { Entete2 } from "../../layout/Entetes";

class PrintCertificatVisiteContreVisite extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      dateDeNaissance,
      lieuDeNaissance,
      nameAgent,
      lastNameAgent,
      medecin2,
    } = this.props;

    return (
      <div className='A4 mt-0'>
        <Entete2 />
        <div>
          <h3 className='my-2 text-center text-uppercase text-decoration-underline'>
            Certificat De Visite Médicale
          </h3>
          <p>
            En exécution des règlements en vigueur, nous soussigné{" "}
            <span className='ms-2 fw-bold'>
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
            Né (e) à :<span className='ms-2 fw-bold'>{lieuDeNaissance}</span>,
            le{" "}
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
            <span className='ms-2 fw-bold'>{medecin2}</span>
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
            Né (e) à :<span className='ms-2 fw-bold'>{lieuDeNaissance}</span>,
            le{" "}
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
      </div>
    );
  }
}

export default PrintCertificatVisiteContreVisite;
