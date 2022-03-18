import React from "react";
import { formatDate } from "./Formats";

export const Entete1 = ({ date }) => {
  return (
    <div className='row text-capitalize'>
      <div className='w-50'>
        <p className='my-1 h5'>CLINIQUE MEDICALE AFOUA</p>
        <p className='my-1'>Médecine Générale - Analyses Médicales</p>
        <p className='my-1'>Autres Consultations Specialisées</p>
        <p className='my-1'>Compte SONIBANK N° 0025110063931/88</p>
        <p className='my-1'>NIF 1333 * B.P.: 11454 * Tél: 20 75 34 39</p>
      </div>
      <div className='w-50'>
        <p className='text-end'>
          Niamey, le <span className='fw-bold'>{formatDate(date)}</span>
        </p>
      </div>
    </div>
  );
};

export const Entete2 = () => {
  return (
    <div className='text-capitalize'>
      <p className='my-1 fs-5'>CLINIQUE MEDICALE AFOUA</p>
      <p className='my-1'>Médecine Générale - Analyses Médicales</p>
      <p className='my-1'>Autres Consultations Specialisées</p>
      <p className='my-1'>Compte SONIBANK N° 0025110063931/88</p>
      <p className='my-1'>NIF 1333 * B.P : 11454 * Tél: 20 75 34 39</p>
    </div>
  );
};

export const Entete3 = ({ date }) => {
  return (
    <div className='row text-capitalize'>
      <div className='w-50'>
        <p className='my-1'>
          <strong>CLINIQUE MEDICALE AFOUA</strong>
        </p>
        <p className='my-0'>Médecine Générale - Analyses Médicales</p>
        <p className='my-0'>Autres Consultations Specialisées</p>
        <p className='my-0'>Compte SONIBANK N° 0025110063931/88</p>
        <p className='my-0'>NIF 1333 * B.P.: 11454 * Tél: 20 75 34 39</p>
      </div>
      <div className='w-50'>
        <p className='text-end mb-5'>
          Niamey, le <span className='fw-bold'>{formatDate(date)}</span>
        </p>
        <h3 className='mt-5 text-end'>BULLETIN D'EXAMEN</h3>
      </div>
    </div>
  );
};

export const Entete4 = ({ titre }) => {
  return (
    <div className='row text-capitalize'>
      <div className='w-50'>
        <p className='my-1'>
          <strong>CLINIQUE MEDICALE AFOUA</strong>
        </p>
        <p className='my-0'>Médecine Générale - Analyses Médicales</p>
        <p className='my-0'>Autres Consultations Specialisées</p>
        <p className='my-0'>Compte SONIBANK N° 0025110063931/88</p>
        <p className='my-0'>NIF 1333 * B.P.: 11454 * Tél: 20 75 34 39</p>
      </div>
      <div className='w-50'>
        <h3 className='mt-5 text-end'>{titre}</h3>
      </div>
    </div>
  );
};
