import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

class PrintConsultationGenerale extends Component {
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
        <h4 className='text-center my-3 text-uppercase text-decoration-underline'>
          Consultation médecine Génerale
        </h4>

        <div className='text-capitalize'>
          <div className='row'>
            <div className='col-6'>
              Nom et Prénom :{" "}
              <span className='fw-bold'>
                {" "}
                {namePatient} {lastNamePatient}
              </span>
            </div>
            <div className='col-3 text-center'>
              Age :{" "}
              <span className='fw-bold'>
                {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
                {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                  ? "ans"
                  : "an"}
              </span>
            </div>
            <div className='col-3 text-end'>
              Sexe : <span className='fw-bold'>{data.sexe}</span>
            </div>
          </div>
          <div className='row'>
            <div className='col-6'>
              Adresse : <span className='fw-bold'>{data.adresse}</span>
            </div>
            <div className='col-6'>
              Fonction : <span className='fw-bold'>{data.fonction}</span>
            </div>
          </div>

          <p className='fs-6 my-1'>
            Motif de Consultation :{" "}
            <span className='lead'>{data.motifConsultation}</span>
          </p>
          <span>- Intérrogatoires </span>
          <p className='fs-6 my-1'>
            Médical : <span className='lead'>{data.medical}</span>
          </p>
          <p className='fs-6 my-1'>
            chirurgical : <span className='lead'>{data.chirurgical}</span>
          </p>
          <span>ATCD Personnels :</span>
          <p className='fs-6 my-1'>
            gyneco-obstetrique :{" "}
            <span className='lead'>{data.gynecoObstetrique}</span>
          </p>
          <p className='fs-6 my-1'>
            Allergies Medicamenteuse ou alimentation :{" "}
            <span className='lead'>{data.allergies}</span>
          </p>
          <span>- ATCDs</span>
          <p className='fs-6 my-1'>
            Familiaux : <span className='lead'>{data.familiaux}</span>
          </p>
          <p className='fs-6 my-1'>
            Automédication ou prescription médicale reçu:{" "}
            <span className='lead'>{data.automedication}</span>
          </p>
          <p className='fs-6 my-1'>
            Hospitalisation recente pour :{" "}
            <span className='lead'>{data.hospitalisationRecente}</span>
          </p>
          <span>Constantes :</span>
          <div className='row text-center'>
            <div className='col-6 row'>
              <div className='col-4'>
                T° :<span className='fw-bold'> {data.t}</span>
              </div>
              <div className='col-4'>
                FC :<span className='fw-bold'> {data.fc}</span>
              </div>
              <div className='col-4'>
                SpO2 :<span className='fw-bold'> {data.spo2}</span>
              </div>
            </div>
            <div className='col-6 row'>
              <div className='col-6'>
                TA :<span className='fw-bold'> {data.ta}</span>
              </div>
              <div className='col-6'>
                POIDS :<span className='fw-bold'> {data.poids}</span> KG
              </div>
            </div>
          </div>

          <p className='fs-6 my-1'>
            Signe Généreaux :{" "}
            <span className='lead'>{data.signeGenereaux}</span>
          </p>
          <p className='fs-6 my-1'>
            Examen Physique :{" "}
            <span className='lead'>{data.examenPhysique}</span>
          </p>
          <p className='fs-6 my-1'>
            Soins reçu en urgence à l'admission :{" "}
            <span className='lead'>{data.soinsRecuUrgence}</span>
          </p>
          <p className='fs-6 my-1'>
            Examens complementaires et resultats :{" "}
            <span className='lead'>{data.examenResultat}</span>
          </p>
          <p className='fs-6 my-1'>
            Ordonnance prescrite et/ou hospitalisation :{" "}
            <span className='lead'>{data.ordonnanceHospitalisation}</span>
          </p>
        </div>
        <br />
        <div className='text-end'>
          <h6 className='text-decoration-underline'>Le Médecin:</h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    );
  }
}

export default PrintConsultationGenerale;
