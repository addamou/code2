import React, { Component, Fragment } from "react";
import { formatDate, formatHeure } from "../../layout/Formats";
import { Entete1 } from "../../layout/Entetes";

class PrintDossierMedical extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      dateDeNaissance,
      nameAgent,
      lastNameAgent,
      data,
      Examens,
    } = this.props;

    return (
      <div className='A4 A4CRH'>
        <Entete1 date={date} />
        <h3 className='my-2 text-center text-decoration-underline'>
          DOSSIER MEDICAL
        </h3>
        <div className='text-capitalize'>
          <div className='d-flex row'>
            <div className='col-6'>
              <p className='py-1'>
                Nom et Prénom:{" "}
                <span className='fw-bold'>
                  {namePatient} {lastNamePatient}
                </span>
              </p>
            </div>
            <div className='col-3'>
              <p className='py-1'>
                {" "}
                Age :{" "}
                <span className='fw-bold'>
                  {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
                  {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                    ? "ans"
                    : "an"}
                </span>{" "}
                ans
              </p>
            </div>
            <div className='col-3'>
              <p className='py-1'>
                Sexe: <span className='fw-bold'>{data.sexe}</span>
              </p>
            </div>
          </div>
          <div className='row'>
            <diw className='col-4'>
              Adresse: <em className='ml-1 fw-bold'>{data.adresse}</em>
            </diw>
            <diw className='col-8'>
              Observation prise par: Dr{" "}
              <em className='ml-1 fw-bold'>
                {nameAgent} {lastNameAgent}
              </em>
            </diw>
          </div>
          <Fragment>
            <h4 className='text-center'>Type d'Assurance</h4>
            <p className='my-1'>
              Nom et Prénom Assuré:{" "}
              <span className='fw-bold ml-1'>{data.assure}</span>
            </p>
            <p className='my-1'>
              N°Police: <span className='fw-bold ml-1'></span>
            </p>
            <p className='my-1'>
              N° assuré: <span className='fw-bold ml-1'>{data.numPolice}</span>
            </p>
          </Fragment>
          <div className='row'>
            <div className='col-md-4'>
              <p className='my-1'>
                Entrée le :{" "}
                <span className='fw-bold'>{formatDate(data.entree)}</span>
              </p>
            </div>
            <div className='col-md-4'>
              <p className='my-1'>
                Sortie le:{" "}
                <span className='fw-bold'>{formatDate(data.sortie)}</span>
              </p>
            </div>
            <div className='col-md-4'>
              <p className='my-1'>
                Chambre: <span className='fw-bold'>{data.chambre}</span>
              </p>
            </div>
          </div>
          <Fragment>
            <p className='my-1'>
              Motif de Consultation:{" "}
              <span className='ml-1 lead'>{data.motifConsultation}</span>
            </p>
            <p className='my-1'>
              Histoire de la maladie:{" "}
              <span className='ml-1 lead'>{data.histoireMaladie}</span>
            </p>
          </Fragment>
          <Fragment>
            <h6>ATCD</h6>
            <strong>Personnels:</strong>
          </Fragment>

          <div className='text-justify'>
            Médicale: <span>{data.medicale}</span>
          </div>
          <div className='text-justify'>
            Chirurgical: <span>{data.chirurgical}</span>
          </div>

          <div className='text-justify'>
            Gynéco-obstétrique: <span>{data.gynecoObstetrique}</span>
          </div>

          <div className='text-justify'>
            Chirurgical: <span>{data.chirurgical}</span>
          </div>
          <strong>Familiers:</strong>
          <p className='my-1 text-justify'>{data.familiers}</p>
          <p className='my-1 text-justify'>
            {" "}
            Examens à l'entrée: <span>{data.examenEntree}</span>
          </p>
          <div className='row'>
            <div className='col-md-3'>
              T° : <span>{data.t}</span>
            </div>
            <div className='col-md-3'>
              TA : <span>{data.ta}</span>
            </div>
            <div className='col-md-3'>
              Poids : <span>{data.poids}</span>
            </div>
            <div className='col-md-3'>
              Taille : <span>{data.taille}</span>
            </div>
          </div>
          <Fragment>
            <p className='my-1 text-justify'>
              Etat Général: <span>{data.etatGeneral}</span>
            </p>
            <p className='my-1 text-justify'>
              Coeur: <span>{data.coeur}</span>
            </p>
            <p className='my-1 text-justify'>
              Poumons: <span>{data.poumons}</span>
            </p>
            <p className='my-1 text-justify'>
              ABD: <span>{data.abd}</span>
            </p>
            <p className='my-1 text-justify'>
              ORL: <span>{data.orl}</span>
            </p>
            <p className='my-1 text-justify'>
              Autres app: <span>{data.autresApp}</span>
            </p>
          </Fragment>
          <Fragment>
            <h6>RESUME:</h6>
            <p className='my-1 text-justify'>{data.resume}</p>
            <h6> Examens demandés:</h6>
            <p className='my-1 text-justify'>{data.examenDemandes}</p>
            <h6>Diagnostic Retenu:</h6>
            <p className='my-1 text-justify'>{data.diagnosticRetenu}</p>
            <h6>Conduite à Ténir:</h6>
            <p className='my-1 text-justify'>{data.conduiteTenir}</p>
          </Fragment>
        </div>

        <Fragment>
          <h3 className='text-center'>Examens Ultérieurs</h3>
          <table>
            <thead>
              <tr>
                <th>Dates Heures Médecins:</th>
                <th>Compte Rendu: Examen clinique - Para clinique:</th>
                <th>Modification Thérapeutiques Actes:</th>
              </tr>
            </thead>
            <tbody>
              {Examens &&
                Examens.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {" "}
                        {formatDate(el.date)} à {formatHeure(el.date)}{" "}
                      </td>
                      <td>{el.compteRendu}</td>
                      <td>{el.modifications} </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <strong>Observation</strong>
                  <p className='text-justify'>{data.observations}</p>
                </td>
              </tr>
            </tfoot>
          </table>
        </Fragment>
      </div>
    );
  }
}

export default PrintDossierMedical;
