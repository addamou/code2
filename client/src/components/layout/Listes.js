import React from "react";
import Modal from "../layout/Modal";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";

export const ListePatient = ({
  name,
  lastName,
  phone,
  id,
  patientsTrouver,
}) => {
  return (
    <div
      style={{ width: 500 + "px", background: "#000", marginBottom: 10 }}
      className='border border-primary border-3 rounded-pill row'
      onClick={() => patientsTrouver(id)}
    >
      <div className='col-md-7 fs-5'>
        <FaUserCircle className='mb-1 text-info mr-2' /> {name} {lastName}
      </div>
      <div className='col-md-5 fs-5'>
        <FaPhoneAlt className='text-success mb-1 mr-2' /> {phone}
      </div>
    </div>
  );
};

export const ListePatientPerception = ({
  name,
  lastName,
  demande,
  id,
  idPatient,
  handleClick,
  assurencePriseEnCharge,
}) => {
  return (
    <>
      <ul className='list-group'>
        <li
          className='list-group-item btn text-light bg-success mb-2'
          key={id}
          onClick={() =>
            handleClick({
              name,
              lastName,
              demande,
              id,
              idPatient,
              assurencePriseEnCharge,
            })
          }
        >
          <em>{name}</em> {lastName}
        </li>
      </ul>
    </>
  );
};

export const ListeDemande = ({
  data,
  open,
  close,
  click,
  vider,
  assurance,
  patient,
}) => {
  return (
    <Modal
      ouvrir={open}
      fermer={close}
      bg={"#330E03"}
      titre={`LES DEMANDES DE ${patient.lastName} ${patient.name}`}
      bouton={"VALIDER ET REDIRIGER"}
      bouton2={"EFFACER"}
      option={true}
      css={"col-6"}
      css1={"btn btn-success"}
      css2={"btn btn-danger"}
      click={() => click()}
      click2={() => vider(patient.id)}
    >
      <div className='table-responsive bg-light p-3'>
        <div className='row fs-5'>
          <div className='col-md-6'>
            Identité:{" "}
            <span className='fw-bold'>{`${patient.lastName} ${patient.name}`}</span>
          </div>
          <div className='col-md-6'>
            Assurance: <span className='fw-bold'>{assurance}</span>{" "}
          </div>
        </div>
        <div className='border border-primary bg-primary text-light text-center'>
          <h6>Demandes Du Patient</h6>
        </div>
        <div className='border mt-1'>
          <ol className='fw-bolder'>
            {data.map((item, index) => (
              <li key={index} className=''>
                {item.acteMedicale}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Modal>
  );
};

export const ListePatientMedecin = ({
  accueil,
  idGeant,
  post,
  demande,
  patientName,
  module,
  adresse,
  patientLastName,
  patientPhone,
  patientId,
  dateDeNaissance,
  lieuDeNaissance,
  handlePatient,
  idSup,
}) => {
  return (
    post && (
      <div
        style={{ background: "#000" }}
        className='border border-danger border-3 rounded-1 d-flex flex-column align-self-center mb-2'
        onClick={() =>
          handlePatient({
            idGeant,
            accueil,
            module,
            demande,
            patientName,
            patientLastName,
            adresse,
            patientPhone,
            patientId,
            dateDeNaissance,
            lieuDeNaissance,
            idSup,
          })
        }
      >
        <div className='p-0'>
          <p className='my-1 fw-bold'>
            <em>{patientName}</em> {patientLastName}
          </p>
          <p className='my-1 text-info'>
            {demande[0].acteMedicale !== undefined
              ? demande[0].acteMedicale
              : demande[0]}
          </p>
        </div>
      </div>
    )
  );
};

export const ListePatientLabo = ({
  accueil,
  idGeant,
  post,
  demande,
  patientName,
  module,
  adresse,
  patientLastName,
  patientPhone,
  patientId,
  dateDeNaissance,
  lieuDeNaissance,
  handlePatient,
  idSup,
}) => {
  return (
    post && (
      <div
        style={{ background: "#000" }}
        className='border border-danger border-3 rounded-1 d-flex flex-column align-self-center mb-2'
        onClick={() =>
          handlePatient({
            idGeant,
            accueil,
            module,
            demande,
            patientName,
            patientLastName,
            adresse,
            patientPhone,
            patientId,
            dateDeNaissance,
            lieuDeNaissance,
            idSup,
          })
        }
      >
        <div className='p-0'>
          <p className='my-1 fw-bold'>
            <em>{patientName}</em> {patientLastName}
          </p>
          <p className='my-1 text-info'>
            {demande[0].acteMedicale !== undefined
              ? demande[0].acteMedicale
              : demande[0]}
          </p>
        </div>
      </div>
    )
  );
};
