import React, { Component } from "react";
import { formatDate } from "../../layout/Formats";
import { Entete1 } from "../../layout/Entetes";

export class PrintCertificatMedical extends Component {
  render() {
    const {
      date,
      dataCM,
      nameAgent,
      lastNameAgent,
      namePatient,
      lastNamePatient,
    } = this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <h3 className='text-center text-decoration-underline text-uppercase my-3'>
          Certificat Médical
        </h3>
        <div className='text-capitalize'>
          <p className='fs-5'>
            Je soussigné, DR{" "}
            <span className='fw-bold'>{`${nameAgent} ${lastNameAgent}`}</span>,{" "}
          </p>
          <p className='fs-5 me-1'>
            reconnait avoir consulté Ce jour
            <span className='fw-bold ms-2'>{formatDate(date)}</span>
            <br />
            le (la) patient(e):{" "}
            <span className='fw-bold'>{`${namePatient} ${lastNamePatient}`}</span>
          </p>
          <h5>Et constaté</h5>
          <p className='fs-5 text-justify'>{dataCM}</p>
          <br /> <br />
          <p className='fs-5'>
            En foi de quoi, le present certificat lui est delivré pour servir et
            valoir ce que de droit.
          </p>
        </div>
        <div className='text-end mt-3'>
          <h6 className='text-decoration-underline'>Le Médecin:</h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    );
  }
}

export default PrintCertificatMedical;
