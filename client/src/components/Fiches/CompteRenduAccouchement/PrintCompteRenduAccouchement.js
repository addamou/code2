import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

class PrintCompteRenduAccouchement extends Component {
  render() {
    const { date, poste, data, nameAgent, lastNameAgent } = this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <h3 className='text-center my-3 text-decoration-underline'>
          COMPTE RENDU D'ACCOUCHEMENT
        </h3>
        <div>
          <p className='fs-5 text-justify text-capitalize'>{data.cra}</p>
        </div>
        <div className='text-end mt-5'>
          <h6 className='text-decoration-underline'>
            {poste === "sagefemme" ? "La Sage Femme" : "Le Gynecologue"}
          </h6>
          <p>
            {nameAgent} {lastNameAgent}
          </p>
        </div>
      </div>
    );
  }
}

export default PrintCompteRenduAccouchement;
