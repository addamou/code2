import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";
import { formatDate, formatHeure } from "../../layout/Formats";

class PrintAvisHospitalisation extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      nameAgent,
      lastNameAgent,
      data,
    } = this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <h3 className='text-center my-3 text-decoration-underline'>
          AVIS D'HOSPITALISATION
        </h3>
        <div className='text-capitalize text-justify'>
          <p className='fs-5 my-2'>
            <span>A :</span> <span className='fw-bolder'>{data.assurance}</span>
          </p>
          <p className='fs-5 my-2'>
            <span>Patient :</span>{" "}
            <span className='fw-bolder'>{`${namePatient} ${lastNamePatient}`}</span>
          </p>
          <p className='fs-5 my-2'>
            <span>Numéro d'assuré :</span>{" "}
            <span className='fw-bolder'>{data.numAssure}</span>
          </p>
          <p className='fs-5 my-2'>
            <span>Nom de l'assuré :</span>{" "}
            <span className='fw-bolder'>{data.nomAssure}</span>
          </p>
          <p className='fs-5 my-2'>
            <span>Société :</span>{" "}
            <span className='fw-bolder'>{data.societe}</span>
          </p>
          <p className='fs-5 my-2'>
            <span>Diagnostic clinique d'entrée :</span>{" "}
            <span className='fw-bolder'>{data.diagnostic}</span>
          </p>
          <p className='fs-5 my-2'>
            <span>Date et Heure d'Hospitalisation :</span>{" "}
            <span className='fw-bolder'>
              {formatDate(data.dateHospitalisation)} à{" "}
              {formatHeure(data.timeHospitalisation)}.
            </span>
          </p>
          <p className='fs-5 my-2'>
            <span>Durée d'Hospitalisation :</span>{" "}
            <span className='fw-bolder'>{data.dureeHospitalisation}</span>
          </p>
        </div>
        <div className='text-end mt-5'>
          <h6 className='text-decoration-underline'>Le Médecin</h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    );
  }
}

export default PrintAvisHospitalisation;
