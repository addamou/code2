import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

class PrintBulletinSortie extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      dateDeNaissance,
      data,
      nameAgent,
      lastNameAgent,
    } = this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <h3 className='text-center text-decoration-underline my-3'>
          BULLETIN DE SORTIE
        </h3>
        <div className='row'>
          <div className='col-6'>
            Nom du malade :{" "}
            <span className='fw-bold'>{`${namePatient} ${lastNamePatient}`}</span>
          </div>
          <div className='col-6 text-end'>
            Age:{" "}
            <span className='fw-bold'>
              {date.getFullYear() - parseInt(dateDeNaissance)}
            </span>
            {date.getFullYear() - parseInt(dateDeNaissance) > 1 ? "ans" : "an"}
          </div>
        </div>
        <div className='text-capitalize'>
          <p className='mr-3 fs-5 my-2'>
            Motif d'hospitalisation:{" "}
            <span className='fw-bold'>{data.motifHospitalisation}</span>
          </p>
          <div className='row'>
            <p className='col-6 fs-5 my-2'>
              Periode du: <span className='fw-bold'>{data.debutPeriode}</span>
            </p>
            <p className='col-6 fs-5 my-2'>
              Au: <span className='fw-bold'>{data.finPeriode}</span>
            </p>
          </div>

          <p className='mr-3 fs-5 my-2'>
            Durée d'hospitalisation:{" "}
            <span className='fw-bold'>{data.dureeHospitalisation} jours</span>
          </p>

          <p className='mr-3 fs-5 my-2'>
            Diagnostic Retenu:{" "}
            <span className='fw-bold'>{data.diagnosticRetenu}</span>
          </p>

          <p className='mr-3 fs-5 my-2'>
            Date de sortie: <span className='fw-bold'>{data.dateSortie}</span>
          </p>

          <p className='fs-5 my-2'>Ordonnance de sortie:</p>

          <span className='fw-bold my-2'>{data.ordonnanceSortie1}</span>

          <span className='fw-bold my-2'>{data.ordonnanceSortie2}</span>

          <span className='fw-bold my-2'>{data.ordonnanceSortie3}</span>

          <p className='mr-3 h5 my-2'>
            Visite retour:{" "}
            <span className='fs-4 fw-bold'>{data.visiteRetour}</span>
          </p>
          <div className='row mt-3'>
            <div className='text-start'>
              <h6 className='text-decoration-underline'>
                Le Patient (ou son Repondant)
              </h6>
            </div>
            <div className='text-end'>
              <h6 className='text-decoration-underline'>Le Médecin</h6>
              <p>
                {nameAgent} {lastNameAgent}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintBulletinSortie;
