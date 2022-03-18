import React from "react";
import { Entete4 } from "../layout/Entetes";
import { formatDate } from "../layout/Formats";

export const Bulletin = ({
  date,
  namePatient,
  lastNamePatient,
  nameAgent,
  lastNameAgent,
  data,
}) => {
  return (
    <div
      className='card p-5 mb-2'
      style={{ width: "45rem", color: "#000", background: "#fff" }}
    >
      <Entete4 titre={"BULLETIN D'EXAMEN"} />
      <div className='row my-3'>
        <div className='col-md-6 text-end h6'>Nom : {namePatient}</div>
        <div className='col-md-6 h6'>Prénom : {lastNamePatient}</div>
      </div>
      <div className='row border' style={{ background: "#CACACA" }}>
        <div className='col-md-6 border-right'>
          <b>DEMANDES</b>
        </div>
        <div className='col-md-6'>
          <b>REPONSES</b>
        </div>
      </div>
      <div className='row border' style={{ background: "#f5f5f5" }}>
        <div className='col-md-6 border-right text-start'>
          {data.map((it) => (
            <p className='my-auto' key={it.acteMedicale}>
              {it.acteMedicale}
            </p>
          ))}
        </div>
        <div className='col-md-6' />
      </div>
      <div className='text-end mt-4'>
        <h6>Fait à Niamey, Le {formatDate(date)}</h6>
      </div>
      <div className='row'>
        <div className='col-md-6 text-start'>
          <h6>Le Médecin</h6>
          {nameAgent} {lastNameAgent}
        </div>
        <div className='col-md-6 text-end'>
          <h6>Laborantin</h6>
        </div>
      </div>
    </div>
  );
};
