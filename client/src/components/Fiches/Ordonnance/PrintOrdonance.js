import React, { Component } from "react";
import { formatDate } from "../../layout/Formats";
import { Entete2 } from "../../layout/Entetes";

class PrintOrdonance extends Component {
  render() {
    const {
      poste,
      date,
      namePatient,
      lastNamePatient,
      dateDeNaissance,
      nameAgent,
      lastNameAgent,
      data,
    } = this.props;

    return (
      <section className='A5V text-black' style={{ fontSize: "13px" }}>
        <Entete2 date={date} />
        <div className='row my-3'>
          <div className='col-md-9'>
            Nom et Prénom:{" "}
            <span className='text-end fw-bold'>
              {namePatient} {lastNamePatient}
            </span>
          </div>
          <div className='col-md-3'>
            Age:{" "}
            <span className='text-end fw-bold'>
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                ? "ans"
                : "an"}
            </span>
          </div>
        </div>

        <h4 className='text-center my-3 text-decoration-underline'>
          ORDONNANCE
        </h4>

        <div className='table-responsive'>
          <table className='table'>
            <thead style={{ background: "#D3D3D3" }}>
              <tr>
                <th scope='col' style={{ width: 105 }}>
                  Qtés
                </th>
                <th scope='col'>Produits</th>
                <th scope='col'>Prise</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <th scope='row'>{item.quantite}</th>
                  <td>{item.titre}</td>
                  <td>{item.prise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='text-end mb-1'>
          Fait à Niamey, le {formatDate(date)}
        </div>
        <div className='text-end'>
          <h6 className='text-decoration-underline'>
            {poste === "sagefemme" ? "La Sage Femme" : "Le Medecin"}
          </h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </section>
    );
  }
}

export default PrintOrdonance;
