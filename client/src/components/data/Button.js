import React from "react";
import {
  FaIdCard,
  FaVial,
  FaListUl,
  FaTemperatureLow,
  FaReceipt,
  FaSyringe,
  FaRadiation,
  FaRegCommentDots,
  FaImage,
  FaBriefcaseMedical,
  FaStethoscope,
  FaPaste,
  FaBaby,
} from "react-icons/fa";

export const Gynecologue = ({
  DM,
  BE,
  FN,
  FT,
  CG,
  OR,
  CA,
  CGE,
  CRA,
  CRH,
  RC,
  AH,
  SU,
  IM,
  EA,
  EP,
  DE,
}) => {
  return (
    <div className='d-flex row'>
      <div className='col-4 btn-group-vertical'>
        <button onClick={DM} className='btn btn-primary my-1' type='button'>
          <FaIdCard className='mb-1 mr-2' /> DOSSIER MEDICAL
        </button>
        <button onClick={BE} className='btn btn-info my-1' type='button'>
          <FaVial className='mb-1 mr-2' /> BULLETIN D'EXAMENS
        </button>
        <button onClick={FN} className='btn btn-dark my-1' type='button'>
          <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE NUMERATION
        </button>
        <button onClick={FT} className='btn btn-success my-1' type='button'>
          <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE TEMPERATURE
        </button>
        <button onClick={CGE} className='btn btn-primary my-1' type='button'>
          <FaReceipt className='mb-1 mr-2' /> FICHES DE CONSULTATIONS
        </button>
        <button onClick={OR} className='btn btn-danger my-1' type='button'>
          <FaListUl className='mb-1 mr-2' /> ORDONNANCES
        </button>
      </div>
      <div className='col-4 btn-group-vertical'>
        <button onClick={CA} className='btn btn-danger my-1' type='button'>
          <FaBriefcaseMedical className='mb-1 mr-2' /> CERTIFICAT D'ACCOUCHEMENT
        </button>
        <button onClick={CG} className='btn btn-dark my-1' type='button'>
          <FaBriefcaseMedical className='mb-1 mr-2' /> CERTIFICAT DE GROSSESSE
        </button>
        <button onClick={CRA} className='btn btn-primary my-1' type='button'>
          <FaRegCommentDots className='mb-1 mr-2' /> C.R ACCOUCHEMENT
        </button>
        <button onClick={CRH} className='btn btn-info my-1' type='button'>
          <FaRegCommentDots className='mb-1 mr-2' /> C.R HOSPITALISATION
        </button>
        <button onClick={RC} className='btn btn-dark my-1' type='button'>
          <FaBaby className='mb-1 mr-2' /> RAPPORT DE CONSULTAION
        </button>
      </div>
      <div className='col-4 btn-group-vertical'>
        <button onClick={AH} className='btn btn-info my-1' type='button'>
          <FaStethoscope className='mb-1 mr-2' /> AVIS HOSPITALISATION
        </button>
        <button onClick={SU} className='btn btn-success my-1' type='button'>
          <FaSyringe className='mb-1 mr-2' /> SOINS D'URGENCES
        </button>
        <button onClick={IM} className='btn btn-primary my-1' type='button'>
          <FaRadiation className='mb-1 mr-2' /> IMAGERIES
        </button>
        <button onClick={EA} className='btn btn-dark my-1' type='button'>
          <FaImage className='mb-1 mr-2' /> ECHO ABDOMINALE
        </button>
        <button onClick={EP} className='btn btn-danger my-1' type='button'>
          <FaImage className='mb-1 mr-2' /> ECHO PROSTATIQUE
        </button>
        <button onClick={DE} className='btn btn-info my-1' type='button'>
          <FaPaste className='mb-1 mr-2' /> DECHARGE
        </button>
      </div>
    </div>
  );
};

export const SageFemme = ({
  DM,
  BE,
  FN,
  FT,
  CG,
  OR,
  CA,
  CGE,
  CRA,
  CRH,
  CP,
  RC,
  AH,
  SU,
  IM,
  EA,
  EP,
}) => {
  return (
    <div className='d-flex row'>
      <div className='col-4 btn-group-vertical'>
        <button onClick={DM} className='btn btn-primary my-1' type='button'>
          <FaIdCard className='mb-1 mr-2' /> DOSSIER MEDICAL
        </button>
        <button onClick={BE} className='btn btn-info my-1' type='button'>
          <FaVial className='mb-1 mr-2' /> BULLETIN D'EXAMENS
        </button>
        <button onClick={FN} className='btn btn-dark my-1' type='button'>
          <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE NUMERATION
        </button>
        <button onClick={FT} className='btn btn-warning my-1' type='button'>
          <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE TEMPERATURE
        </button>
        <button onClick={CGE} className='btn btn-primary my-1' type='button'>
          <FaReceipt className='mb-1 mr-2' /> FICHES DE CONSULTATIONS
        </button>
        <button onClick={OR} className='btn btn-danger my-1' type='button'>
          <FaListUl className='mb-1 mr-2' /> ORDONNANCES
        </button>
      </div>
      <div className='col-4 btn-group-vertical'>
        <button onClick={CA} className='btn btn-danger my-1' type='button'>
          <FaBriefcaseMedical className='mb-1 mr-2' /> CERTIFICAT D'ACCOUCHEMENT
        </button>
        <button onClick={CG} className='btn btn-dark my-1' type='button'>
          <FaBriefcaseMedical className='mb-1 mr-2' /> CERTIFICAT DE GROSSESSE
        </button>
        <button onClick={CRA} className='btn btn-primary my-1' type='button'>
          <FaRegCommentDots className='mb-1 mr-2' /> C.R ACCOUCHEMENT
        </button>
        <button onClick={CRH} className='btn btn-info my-1' type='button'>
          <FaRegCommentDots className='mb-1 mr-2' /> C.R HOSPITALISATION
        </button>
        <button onClick={CP} className='btn btn-dark my-1' type='button'>
          <FaBaby className='mb-1 mr-2' /> CONSULTATIONS PEDIATRIE
        </button>
        <button onClick={RC} className='btn btn-dark my-1' type='button'>
          <FaBaby className='mb-1 mr-2' /> RAPPORT DE CONSULTAION
        </button>
      </div>
      <div className='col-4 btn-group-vertical'>
        <button onClick={AH} className='btn btn-info my-1' type='button'>
          <FaStethoscope className='mb-1 mr-2' /> AVIS HOSPITALISATION
        </button>
        <button onClick={SU} className='btn btn-success my-1' type='button'>
          <FaSyringe className='mb-1 mr-2' /> SOINS D'URGENCES
        </button>
        <button onClick={IM} className='btn btn-primary my-1' type='button'>
          <FaRadiation className='mb-1 mr-2' /> IMAGERIES
        </button>
        <button onClick={EA} className='btn btn-dark my-1' type='button'>
          <FaImage className='mb-1 mr-2' /> ECHO ABDOMINALE
        </button>
        <button onClick={EP} className='btn btn-danger my-1' type='button'>
          <FaImage className='mb-1 mr-2' /> ECHO PROSTATIQUE
        </button>
      </div>
    </div>
  );
};

export const Radiologie = ({ IM, EA, EP }) => {
  return (
    <div className='col-4 btn-group-vertical'>
      <button onClick={IM} className='btn btn-primary my-1' type='button'>
        <FaRadiation className='mb-1 mr-2' /> IMAGERIES
      </button>
      <button onClick={EA} className='btn btn-dark my-1' type='button'>
        <FaImage className='mb-1 mr-2' /> ECHO ABDOMINALE
      </button>
      <button onClick={EP} className='btn btn-danger my-1' type='button'>
        <FaImage className='mb-1 mr-2' /> ECHO PROSTATIQUE
      </button>
    </div>
  );
};

export const Echographie = ({ IM, EA, EP }) => {
  return (
    <div className='col-4 btn-group-vertical'>
      <button onClick={IM} className='btn btn-primary my-1' type='button'>
        <FaRadiation className='mb-1 mr-2' /> IMAGERIES
      </button>
      <button onClick={EA} className='btn btn-dark my-1' type='button'>
        <FaImage className='mb-1 mr-2' /> ECHO ABDOMINALE
      </button>
      <button onClick={EP} className='btn btn-danger my-1' type='button'>
        <FaImage className='mb-1 mr-2' /> ECHO PROSTATIQUE
      </button>
    </div>
  );
};

export const Generalistes = ({
  DM,
  BE,
  FN,
  FT,
  OR,
  CGE,
  CRH,
  RC,
  AH,
  SU,
  IM,
  EA,
  EP,
  DE,
  CVM,
  CM,
  BS,
}) => {
  return (
    <div className='d-flex row'>
      <div className='col-4 btn-group-vertical'>
        <button onClick={DM} className='btn btn-primary my-1' type='button'>
          <FaIdCard className='mb-1 mr-2' /> DOSSIER MEDICAL
        </button>
        <button onClick={BE} className='btn btn-info my-1' type='button'>
          <FaVial className='mb-1 mr-2' /> BULLETIN D'EXAMENS
        </button>
        <button onClick={FN} className='btn btn-dark my-1' type='button'>
          <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE NUMERATION
        </button>
        <button onClick={FT} className='btn btn-secondary my-1' type='button'>
          <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE TEMPERATURE
        </button>
        <button onClick={CGE} className='btn btn-primary my-1' type='button'>
          <FaReceipt className='mb-1 mr-2' /> FICHES DE CONSULTATIONS
        </button>
        <button onClick={OR} className='btn btn-danger my-1' type='button'>
          <FaListUl className='mb-1 mr-2' /> ORDONNANCES
        </button>
      </div>

      <div className='col-4 btn-group-vertical'>
        <button onClick={CRH} className='btn btn-info my-1' type='button'>
          <FaRegCommentDots className='mb-1 mr-2' /> C.R HOSPITALISATION
        </button>
        <button onClick={RC} className='btn btn-dark my-1' type='button'>
          <FaBaby className='mb-1 mr-2' /> RAPPORT DE CONSULTAION
        </button>
        <button onClick={IM} className='btn btn-primary my-1' type='button'>
          <FaRadiation className='mb-1 mr-2' /> IMAGERIES
        </button>
        <button onClick={EA} className='btn btn-dark my-1' type='button'>
          <FaImage className='mb-1 mr-2' /> ECHO ABDOMINALE
        </button>
        <button onClick={EP} className='btn btn-danger my-1' type='button'>
          <FaImage className='mb-1 mr-2' /> ECHO PROSTATIQUE
        </button>
        <button onClick={SU} className='btn btn-success my-1' type='button'>
          <FaSyringe className='mb-1 mr-2' /> SOINS D'URGENCES
        </button>
      </div>
      <div className='col-4 btn-group-vertical'>
        <button onClick={AH} className='btn btn-info my-1' type='button'>
          <FaStethoscope className='mb-1 mr-2' /> AVIS HOSPITALISATION
        </button>
        <button onClick={CVM} className='btn btn-danger my-1' type='button'>
          <FaBriefcaseMedical className='mb-1 mr-2' /> CERTIFICAT VISITE MEDICAL
        </button>
        <button onClick={CM} className='btn btn-warning my-1' type='button'>
          <FaBriefcaseMedical className='mb-1 mr-2' /> CERTIFICAT MEDICAL
        </button>
        <button onClick={IM} className='btn btn-primary my-1' type='button'>
          <FaRadiation className='mb-1 mr-2' /> IMAGERIES
        </button>
        <button onClick={DE} className='btn btn-info my-1' type='button'>
          <FaPaste className='mb-1 mr-2' /> DECHARGE
        </button>
        <button onClick={BS} className='btn btn-dark my-1' type='button'>
          <FaPaste className='mb-1 mr-2' /> BULLETIN DE SORTIE
        </button>
      </div>
    </div>
  );
};

export const Pediatries = ({
  DM,
  BE,
  FN,
  FT,
  OR,
  CRH,
  CP,
  RC,
  AH,
  SU,
  IM,
  EA,
  EP,
  DE,
  CVM,
  CM,
  BS,
}) => {
  return (
    <div className='d-flex row'>
      <div className='col-4 btn-group-vertical'>
        <button onClick={DM} className='btn btn-primary my-1' type='button'>
          <FaIdCard className='mb-1 mr-2' /> DOSSIER MEDICAL
        </button>
        <button onClick={BE} className='btn btn-info my-1' type='button'>
          <FaVial className='mb-1 mr-2' /> BULLETIN D'EXAMENS
        </button>
        <button onClick={FN} className='btn btn-dark my-1' type='button'>
          <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE NUMERATION
        </button>
        <button onClick={FT} className='btn btn-primay my-1' type='button'>
          <FaTemperatureLow className='mb-1 mr-2' /> FICHE DE TEMPERATURE
        </button>
        <button onClick={OR} className='btn btn-danger my-1' type='button'>
          <FaListUl className='mb-1 mr-2' /> ORDONNANCES
        </button>
        <button onClick={CP} className='btn btn-info my-1' type='button'>
          <FaBaby className='mb-1 mr-2' /> CONSULTATIONS PEDIATRIE
        </button>
      </div>
      <div className='col-4 btn-group-vertical'>
        <button onClick={CRH} className='btn btn-info my-1' type='button'>
          <FaRegCommentDots className='mb-1 mr-2' /> C.R HOSPITALISATION
        </button>
        <button onClick={RC} className='btn btn-dark my-1' type='button'>
          <FaBaby className='mb-1 mr-2' /> RAPPORT DE CONSULTAION
        </button>
        <button onClick={EA} className='btn btn-primary my-1' type='button'>
          <FaImage className='mb-1 mr-2' /> ECHO ABDOMINALE
        </button>
        <button onClick={EP} className='btn btn-danger my-1' type='button'>
          <FaImage className='mb-1 mr-2' /> ECHO PROSTATIQUE
        </button>
        <button onClick={SU} className='btn btn-success my-1' type='button'>
          <FaSyringe className='mb-1 mr-2' /> SOINS D'URGENCES
        </button>
        <button onClick={AH} className='btn btn-info my-1' type='button'>
          <FaStethoscope className='mb-1 mr-2' /> AVIS HOSPITALISATION
        </button>
      </div>
      <div className='col-4 btn-group-vertical'>
        <button onClick={CVM} className='btn btn-danger my-1' type='button'>
          <FaBriefcaseMedical className='mb-1 mr-2' /> CERTIFICAT VISITE MEDICAL
        </button>
        <button onClick={CM} className='btn btn-warning my-1' type='button'>
          <FaBriefcaseMedical className='mb-1 mr-2' /> CERTIFICAT MEDICAL
        </button>
        <button onClick={IM} className='btn btn-primary my-1' type='button'>
          <FaRadiation className='mb-1 mr-2' /> IMAGERIES
        </button>
        <button onClick={DE} className='btn btn-info my-1' type='button'>
          <FaPaste className='mb-1 mr-2' /> DECHARGE
        </button>
        <button onClick={BS} className='btn btn-dark my-1' type='button'>
          <FaPaste className='mb-1 mr-2' /> BULLETIN DE SORTIE
        </button>
      </div>
    </div>
  );
};
