import React, { Component } from "react";
import { formatDate } from "../../layout/Formats";
import { Entete2 } from "../../layout/Entetes";

class PrintCertificatGrossesse extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      nameAgent,
      lastNameAgent,
      data,
      poste,
    } = this.props;

    return (
      <div className='A4'>
        <Entete2 />
        <h3 className='text-center text-uppercase text-decoration-underline my-4'>
          CERTIFICAT DE GROSSESSE
        </h3>
        <div className='text-capitalize fs-5'>
          <p className='ps-3'>
            Soussigné Dr{" "}
            <span className='fw-bolder me-2'>
              {" "}
              {nameAgent} {lastNameAgent},
            </span>
            {poste === "sagefemme"
              ? "La Sage Femme"
              : "Gynécologue-Obstétricien"}{" "}
            de la clinique Afoua.
          </p>
          <p className=''>
            Certifie avoir examiné ce jour{" "}
            <span className='ms-2 fw-bolder'>{formatDate(date)}</span>, la
            nommée:{" "}
            <span className='ms-2 fw-bolder'>
              {namePatient} {lastNamePatient}
            </span>{" "}
            et déclare que la patiente à une Grossesse de :
            <span className='ms-2 fw-bolder'>{data.nbreSemaine}</span> Semaines
            d'aménorrhé <b className='ps-2'>( {data.nbreMois} )</b> mois.{" "}
          </p>
          <p className=''>
            L'accouchement est prévu le{" "}
            <span className='ms-2 fw-bolder'>{formatDate(data.datePrevu)}</span>
          </p>
          <p className='fw-bolder'>Sauf Complication</p>
          <div className='text-end my-5 fs-6'>
            Fait à Niamey, le {formatDate(date)}
          </div>
        </div>
        <div className='text-end mt-5'>
          <h6 className='text-decoration-underline'>
            {poste === "sagefemme" ? "La Sage Femme" : "Le Gynecologue"}
          </h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    );
  }
}

export default PrintCertificatGrossesse;
