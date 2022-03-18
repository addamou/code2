import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

export class PrintSoinsUrgence extends Component {
  render() {
    const {
      nameAgent,
      lastNameAgent,
      namePatient,
      lastNamePatient,
      dateDeNaissance,
      dataSU,
      date,
      dataP,
    } = this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <div className='my-3 text-capitalize'>
          <ul>
            <li>
              NOM : <span className='fw-bold l-base'>{namePatient}</span>
            </li>
            <li>
              PRENOM : <span className='fw-bold l-base'>{lastNamePatient}</span>
            </li>
            <li>
              Age :{" "}
              <span className='fw-bold l-base'>
                {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
                {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                  ? "ans"
                  : "an"}
              </span>
            </li>
          </ul>
        </div>
        <h3 className='text-center my-3 text-decoration-underline'>
          SOINS D'URGENCE
        </h3>

        <div className='table-responsive text-capitalize'>
          <table className='table mx-auto'>
            <thead>
              <tr>
                <th style={{ width: 400 }}>DESIGNATION DES PRODUITS</th>
                <th>QUANTITE</th>
              </tr>
            </thead>
            <tbody>
              {dataSU.map((item, index) => {
                return (
                  <tr key={index} id={index}>
                    <td>{item.label}</td>
                    <td>{item.nbr}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='mt-2'>
          <h6>Protocol de Soin</h6>
          <p className='text-capitalize text-justify'>{dataP}</p>
        </div>
        <div className='mt-4 text-end'>
          <h6 className='text-decoration-underline'>Le Médecin</h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    );
  }
}

export default PrintSoinsUrgence;
