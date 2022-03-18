import React, { Component } from "react";
import { Entete3 } from "../../layout/Entetes";

const style = {
  border: "solid 2px #000",
};

const style2 = {
  borderRight: "1px solid #000",
};

class PrintBulletinExament extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      dateDeNaissance,
      nameAgent,
      lastNameAgent,
      productsExam,
      poste,
    } = this.props;

    return (
      <div className='A5'>
        <Entete3 date={date} />
        <div>
          <div className='row mt-2'>
            <div className='w-50 text-end'>
              <p>
                Nom et Prénom:{" "}
                <span className='fw-bold'>
                  {namePatient} {lastNamePatient}
                </span>
              </p>
            </div>
            <div className='w-50 text-end'>
              <p>
                Age:{" "}
                <span className='fw-bold'>
                  {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
                  {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                    ? "ans"
                    : "an"}
                </span>
              </p>
            </div>
          </div>

          <div className='row border'>
            <div className='w-50 text-center text-light bg-secondary'>
              <h5>DEMANDE</h5>
            </div>
            <div className='w-50 text-center text-light bg-secondary'>
              <h5>REPONSE</h5>
            </div>
          </div>
          <div className='row' style={style}>
            <div className='w-50 my-auto' style={style2}>
              {productsExam.map((el, index) => (
                <p className='my-0' key={index} id={index}>
                  {el.label || el.acteMedicale}
                </p>
              ))}
            </div>
            <div className='w-50 my-auto'>
              {productsExam.map((el, index) => (
                <p className='my-0' key={index} id={index}>
                  {el.response}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='w-50'>
            <h6 className='text-decoration-underline'>Le Medecin</h6>
            <p>{poste !== "laborantin" && `${nameAgent} ${lastNameAgent}`}</p>
          </div>
          <div className='w-50 text-end'>
            <h6 className='text-decoration-underline'>Laborantin</h6>
            <p>{poste === "laborantin" && `${nameAgent} ${lastNameAgent}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintBulletinExament;
