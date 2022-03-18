import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

class PrintEchoVesicoProstatique extends Component {
  render() {
    const { date, namePatient, lastNamePatient, dateDeNaissance, data } =
      this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <h3 className='text-center text-decoration-underline my-2'>
          ECHOGRAPHIE VESICO-PROSTATIQUE
        </h3>
        <div className='text-capitalize'>
          <p className='lead mr-2'>
            Nom et Prénom:{" "}
            <strong className='mx-2'>
              {` ${namePatient} ${lastNamePatient}`}{" "}
            </strong>{" "}
            age:{" "}
            <strong className='mx-2'>
              {date.getFullYear() - parseInt(dateDeNaissance)}
            </strong>
            ans
          </p>
          <strong>Renseignements cliniques:</strong>
          <p className='lead mr-2'>{data.renseignementClinique}</p>
          <p className='lead mr-2'>
            Date de réalisation{" "}
            <strong className='mx-2'>
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </strong>
          </p>
          <h4>RESULTATS</h4>
          <strong>Prostate:</strong>
          <p className='lead mr-2'>{data.prostate}</p>
          <strong>Vésicules séminales:</strong>
          <p className='lead mr-2'>{data.vesiculeSeminale}</p>
          <strong>Véssie:</strong>
          <p className='lead mr-2'>{data.vessie}</p>
          <strong className='ml-5'>Volume vésical:</strong>
          <p className='lead mr-2'>{data.volumeVesical}</p>
          <strong className='ml-5'> Parois vésicale:</strong>
          <p className='lead mr-2'>{data.paroisVesicale}</p>
          <strong>Résidu post-mictionnel:</strong>
          <p className='lead mr-2'>{data.residuPostMictionnel}</p>
          <strong> Reins:</strong>
          <p className='lead mr-2'>{data.reins}</p>
          <strong>Conclusion:</strong>
          <p className='lead mr-2'>{data.conclusion}</p>
        </div>
      </div>
    );
  }
}

export default PrintEchoVesicoProstatique;
