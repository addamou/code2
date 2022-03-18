import React, { Component } from "react";
import { formatDate, formatHeure } from "../../layout/Formats";
import { Entete1 } from "../../layout/Entetes";

class PrintCertificatAccouchement extends Component {
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
        <Entete1 date={date} />
        <h2 className='text-center text-decoration-underline my-5'>
          CERTIFICAT D'ACCOUCHEMENT
        </h2>
        <div className='text-capitalize fs-5'>
          <p className=' mb-3 mt-5'>
            La Nommée:{" "}
            <span className='fw-bolder ms-2'>
              {namePatient} {lastNamePatient}
            </span>
          </p>
          <div className='row'>
            <div className='col-md-8'>
              <p className=''>
                Profession :
                <span className='fw-bolder ms-2'>{data.profession}</span>
              </p>
            </div>
            <div className='col-md-4'>
              <p className=''>
                MLE :<span className='fw-bolder ms-2'>{data.mle}</span>
              </p>
            </div>
          </div>
          <p className='mb-3'>
            A accouché le :
            <span className='fw-bolder ms-2'>
              {formatDate(data.dateAccouchement)} à{" "}
              {formatHeure(data.dateAccouchement)}
            </span>
          </p>
          <p className='my-3'>
            D'un enfant de Sexe :
            <span className='fw-bolder ms-2'>{data.sexe}</span>
          </p>
          <p className='my-3'>
            Et qui à reçu le Prénom de :
            <span className='fw-bolder ms-2'>{data.prenom}</span>
          </p>
          <p className='my-3'>
            Dont le Père est :
            <span className='fw-bolder ms-2'>{data.pere}</span>
          </p>
          <p className='my-3'>
            La Mère est :
            <span className='fw-bolder ms-2'>{`${namePatient} ${lastNamePatient}`}</span>
          </p>
          <br />
          <div className='text-end mt-5'>
            <h6 className='text-decoration-underline'>
              {poste === "sagefemme" ? "La Sage Femme" : "Le Gynecologue"}
            </h6>
            <p>
              {nameAgent} {lastNameAgent}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintCertificatAccouchement;
