import React from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "../../layout/Formats";
import { Entete1 } from "../../layout/Entetes";
import { createCertMedical } from "../../../actions/fiches";

const CerificatMedical = ({
  date,
  nameAgent,
  lastNameAgent,
  idPatient,
  handleChangeConstat,
  dataCM,
  close,
  print,
  namePatient,
  lastNamePatient,
}) => {
  const dispatch = useDispatch();
  //Submit
  const submit = () => {
    dispatch(
      createCertMedical({
        constat: dataCM,
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    close();
    print();
  };

  return (
    <form className='A4' autoComplete='false'>
      <Entete1 date={date} />
      <h3 className='text-center text-decoration-underline text-uppercase my-3'>
        Certificat Médical
      </h3>
      <div className='text-justify'>
        <p className='fs-5'>
          Je soussigné{" "}
          <span className='fw-bold ml-2'>
            {" "}
            {`${nameAgent} ${lastNameAgent}`}
          </span>
          ,
          <br /> reconnait avoir consulté ce jour{" "}
          <span className='fw-bold'>{formatDate(date)} </span> <br />
          le (la) patient(e):{" "}
          <span className='fw-bold mx-2'>{`${namePatient} ${lastNamePatient}`}</span>
        </p>
        <h5>Et constaté</h5>
        <textarea
          className='form-control text-capitalize'
          value={dataCM}
          onChange={handleChangeConstat}
          cols='90'
          rows='4'
        />
      </div>
      <div className='fs-4 mt-3 ms-2'>
        En foi de quoi, le present certificat lui est delivré pour servir et
        valoir ce que de droit
      </div>
      <div className='text-end'>
        <h6> Le Médecin</h6>
        <p>
          {nameAgent} {lastNameAgent}
        </p>
      </div>
      <button className='btnValid' type='button' onClick={submit}>
        VALIDER
      </button>
    </form>
  );
};

export default CerificatMedical;
