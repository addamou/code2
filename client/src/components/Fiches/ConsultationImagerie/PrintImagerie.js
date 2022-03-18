import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

class PrintConsultationImagerie extends Component {
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

        <h2 className='text-center text-decoration-underline my-2'>IMAGERIE</h2>
        <div>
          <div className='row'>
            <div className='col-9'>
              Nom et Prénom :{" "}
              <span className='ml-2 fw-bold text-capitalize'>
                {namePatient} {lastNamePatient}
              </span>
            </div>
            <div className='col-3 text-end'>
              Age :{" "}
              <span className='ml-2 fw-bold'>
                {" "}
                {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
                {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                  ? "ans"
                  : "an"}
              </span>
            </div>
          </div>
          <h5>Echographies:</h5>
          <p className='fs-5 my-3'>
            Libellé :<span className='ml-2'>{data.echographie}</span>
          </p>
          <span className='fw-bold'>Observations</span>
          <p className='text-justify fs-5 my-3 text-capitalize'>
            <span className='ml-2'>{data.observations}</span>
          </p>
          <span className='fw-bold'>Conclusion</span>
          <p className='text-justify fs-5 my-3 text-capitalize'>
            {data.conclusion}
          </p>
          <h5>Radiographie</h5>
          <p className='lead my-3'>
            Libellé :<span className='ml-2'>{data.radiographie}</span>
          </p>
          Rapport de la Radiographie:
          <p className='text-justify fs-5 my-3 text-capitalize'>
            {data.rapport}
          </p>
          <div className='text-end text-capitalize mt-5'>
            <h6 className='text-decoration-underline'>Le Médecin</h6>
            <p>
              {nameAgent} {lastNameAgent}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintConsultationImagerie;
