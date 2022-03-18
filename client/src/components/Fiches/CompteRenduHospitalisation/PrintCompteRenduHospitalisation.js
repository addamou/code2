import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

class PrintCompteRenduHospitalisation extends Component {
  render() {
    const {
      date,
      nameAgent,
      lastNameAgent,
      namePatient,
      lastNamePatient,
      data,
      dateDeNaissance,
    } = this.props;

    return (
      <div className='A4 text-capitalize'>
        <Entete1 date={date} />
        <h4 className='text-center text-decoration-underline'>
          COMPTE RENDU D'HOSPITALISATION
        </h4>
        <div className='row'>
          <div className='col-6'>
            Nom et Prénom :{" "}
            <span className='fw-bold'>
              {namePatient} {lastNamePatient}
            </span>
          </div>
          <div className='col-3 text-center'>
            Age :{" "}
            <span className='fw-bold'>
              {" "}
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                ? "ans"
                : "an"}{" "}
            </span>
          </div>
          <div className='col-3 text-end'>
            Sexe : <span className='fw-bold'>{data.sexe}</span>
          </div>
        </div>
        <div>
          <p className='my-1'>
            Motif d'Hospitalisation :{" "}
            <em className='fw-bold'>{data.motifHospitalisation}</em>
          </p>
        </div>
        <p className='my-1'>
          Hospitalisé du :{" "}
          <span className='mx-2 fw-bold'>{data.debutHospitalisation}</span>au :
          <span className='mx-2 fw-bold'>{data.finHospitalisation}</span>
        </p>

        <strong> ATCD</strong>
        <p>Personnels</p>
        <p className='my-1'>
          Médicale :<span className='mx-2'>{data.medicale}</span>
        </p>
        <p className='my-1'>
          Chirurgical : <span className='mx-2'>{data.chururgical}</span>
        </p>
        <p className='my-1'>
          Gynéco-obstétrique :
          <span className='mx-2'>{data.gynecoObstretrique}</span>
        </p>
        <p className='my-1'>
          Familiers :<span className='mx-2'>{data.familiers}</span>
        </p>
        <p className='my-1'>
          Examens à l'entrée :<span className='mx-2'>{data.examenEntree}</span>
        </p>
        <div className='row'>
          <div className='col-3'>
            T° :<span className='fw-bolde'> {data.t} °c</span>
          </div>
          <div className='col-3'>
            TA :<span className='fw-bolde'>{data.ta}</span>
          </div>
          <div className='col-3'>
            Poids :<span className='fw-bolde'>{data.poids} Kg</span>
          </div>
          <div className='col-3'>
            Taille :<span className='fw-bolde'>{data.taille}</span>
          </div>
        </div>

        <p className='my-1'>
          Etat Général :{" "}
          <span className='mr-2 fw-bold'>{data.etatGeneral}</span>
        </p>
        <p className='my-1'>
          Coeur : <span className='mr-2 fw-bold'>{data.coeur}</span>
        </p>
        <p className='my-1'>
          Poumons : <span className='mr-2 fw-bold'>{data.poumons}</span>
        </p>
        <p className='my-1'>
          ABD : <span className='mr-2 fw-bold'>{data.abd}</span>
        </p>
        <p className='my-1'>
          ORL : <span className='mr-2 fw-bold'>{data.orl}</span>
        </p>
        <p className='my-1'>
          Autres app : <span className='mr-2 fw-bold'>{data.autresApp}</span>
        </p>
        <p className='my-1'>
          Examens demandés :{" "}
          <span className='mr-2 fw-bold'>{data.examenDemandes}</span>
        </p>
        <p className='my-1'>
          Diagnostic Retenu :{" "}
          <span className='mr-2 fw-bold'>{data.diagnosticRetenu}</span>
        </p>
        <p className='my-1'>
          Conduite à Ténir :{" "}
          <span className='mr-2 fw-bold'>{data.conduiteTenir}</span>
        </p>
        <p className='my-1'>
          Evolution : <span className='mr-2 fw-bold'>{data.evolution}</span>
        </p>
        <div className='text-end'>
          <h6 className='text-decoration-underline'> Le Médecin</h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    );
  }
}

export default PrintCompteRenduHospitalisation;
