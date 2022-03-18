import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";
import { formatDate, formatHeure } from "../../layout/Formats";

export class PrintDecharge extends Component {
  render() {
    const {
      date,
      responsable,
      typeResponsable,
      nameAgent,
      lastNameAgent,
      poste,
    } = this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <h3 className='text-center my-5'>DECHARGE</h3>
        <div className='text-capitalize'>
          <p className='lead'>
            Je soussigné M...{" "}
            <span className='mx-2 fw-bold'>{responsable}</span>
          </p>

          <div className='row my-3'>
            <div className='col-4 my-auto'>
              <label>Malade</label>{" "}
              <input
                type='checkbox'
                readOnly
                defaultChecked={typeResponsable.malade}
              />
            </div>
            <div className='col-4 my-auto text-center'>
              <label>Parent</label>{" "}
              <input
                type='checkbox'
                readOnly
                defaultChecked={typeResponsable.parent}
              />
            </div>
            <div className='col-4 my-auto text-end'>
              <label>Accompagnant</label>{" "}
              <input
                type='checkbox'
                readOnly
                defaultChecked={typeResponsable.accompagnant}
              />
            </div>
          </div>
          <p className=' my-2 fs-4'>
            {" "}
            Décide de quitter la Clinique AFOUA ce jour
            <span className='mx-2 fw-bold'>{formatDate(date)}</span>à{" "}
            <span className='fw-bold'>{formatHeure(date)}</span>
            <span>(heures), contre avis médical.</span>
          </p>
          <p className='fs-4 my-3'>
            Attestation établie pour servir et valoir ce que de droit.
          </p>
          <div className='row' style={{ marginTop: 80 }}>
            <div className='col-6'>
              <h5 className='text-decoration-underline'>L'interessé(e)</h5>
              <p>{responsable}</p>
            </div>
            <div className='col-6 text-end'>
              <h5 className='text-decoration-underline'>
                {poste === "sagefemme" ? "La Sage Femme" : "Le Medecin"}
              </h5>
              {nameAgent} {lastNameAgent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintDecharge;
