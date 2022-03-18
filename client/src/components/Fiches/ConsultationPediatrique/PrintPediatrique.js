import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

class PrintConsultationPediatrique extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      dateDeNaissance,
      nameAgent,
      lastNameAgent,
      data,
    } = this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <h4 className='my-3 text-center'>Consultation Pediatrique</h4>
        <div className='text-capitalize'>
          <div className='row mb-0'>
            <div className='col-6'>
              <p className='fs-6'>
                Nom et Prénom:{" "}
                <span className='fw-bold'>
                  {namePatient} {lastNamePatient}
                </span>
              </p>
            </div>
            <div className='col-3 text-center'>
              <p className='fs-6'>
                Age :
                <span className='fw-bold'>
                  {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
                  {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                    ? "ans"
                    : "an"}
                </span>
              </p>{" "}
            </div>
            <div className='col-3 text-end'>
              <p className='fs-6'>
                Sexe: <span className='fw-bold'>{data.sexe}</span>
              </p>{" "}
            </div>
          </div>
          <div>
            <p className='fs-6 mb-1'>
              Adresse : <span className='fw-bold'>{data.adresse}</span>
            </p>
            <p className='fs-6 my-1'>
              Maladie Connue :{" "}
              <span className='fw-bold'>{data.maladieConnue}</span>
            </p>
            <p className='fs-6 my-1'>
              Motif de Consultation :{" "}
              <span className='fw-bold'>{data.motifConsultation}</span>
            </p>
          </div>

          <div>
            <h5 className='mt-3'>Constante et Monsuration:</h5>
            <div className='row justtify-content-between'>
              <div className='col-md-3'>
                <p className='fs-6'>
                  Poids : <span className='fw-bold'>{data.poids}</span>
                </p>
              </div>
              <div className='col-md-3'>
                <p className='fs-6'>
                  Taille : <span className='fw-bold'>{data.taille}</span>
                </p>
              </div>
              <div className='col-md-3'>
                <p className='fs-6'>
                  PC : <span className='fw-bold'>{data.pc}</span>
                </p>
              </div>
              <div className='col-md-3'>
                <p className='fs-6'>
                  T° : <span className='fw-bold'>{data.t}</span>
                </p>
              </div>
            </div>

            <div className='row justtify-content-between'>
              <div className='col-md-3'>
                <p className='fs-6'>
                  FR : <span className='fw-bold'>{data.fr}</span>
                </p>
              </div>
              <div className='col-md-3'>
                <p className='fs-6'>
                  FC : <span className='fw-bold'>{data.fc}</span>
                </p>
              </div>
              <div className='col-md-3'>
                <p className='fs-6'>
                  SaO2 : <span className='fw-bold'>{data.sao2}</span>
                </p>
              </div>
              <div className='col-md-3'>
                <p className='fs-6'>
                  TA : <span className='fw-bold'>{data.ta}</span>
                </p>
              </div>
            </div>
            <p className='fs-6'>
              Examen Physique :{" "}
              <span className='fw-bold'>{data.examenPhysique}</span>
            </p>
            <p className='fs-6'>
              Bilan resultats :{" "}
              <span className='fw-bold'>{data.bilanResultats}</span>
            </p>
            <p className='fs-6'>
              Diagnostic : <span className='fw-bold'>{data.diagnostic}</span>
            </p>
            <p className='fs-6'>
              Traitement : <span className='fw-bold'>{data.traitement}</span>
            </p>
            <p className='fs-6'>
              Rendez-vous : <span className='fw-bold'>{data.rdv}</span>
            </p>
          </div>
          <div className='text-end'>
            <h6> Le Médecin:</h6>
            <p>
              {nameAgent} {lastNameAgent}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintConsultationPediatrique;
