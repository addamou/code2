import React, { Component } from "react";
import { Entete1 } from "../../layout/Entetes";

class PrintEchoAbdominale extends Component {
  render() {
    const {
      date,
      namePatient,
      lastNamePatient,
      dateDeNaissance,
      data,
      nameAgent,
      lastNameAgent,
    } = this.props;

    return (
      <div className='A4'>
        <Entete1 date={date} />
        <h3 className='text-center text-decoration-underline text-uppercase my-2'>
          Echographie Abdominale
        </h3>
        <div className='text-capitalize'>
          <p className='my-0'>
            Nous soussignons Dr{" "}
            <span className='fw-bolder'>
              {nameAgent} {lastNameAgent}
            </span>
            , certifie avoir examiné ce jour{" "}
            <span>{` ${namePatient} ${lastNamePatient}`} </span> Age :{" "}
            <strong className='ml-2'>
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
            </strong>
          </p>
          <p className='my-0'>
            Indications: <span className='fw-bolder'>{data.indications}</span>
          </p>
          <strong>RESULTATS</strong>
          <p className='my-0'>Foie:</p>
          <p className='my-0'>Taille:</p>
          <p className='my-0'>
            <span>
              - Lobe droit mesure{" "}
              <span className='fw-bolder'>{data.lobeDroit}</span> mm en avant du
              rein droit
            </span>
            <span className='ml-2'>
              - Lobe gauche mesure{" "}
              <span className='fw-bolder'>{data.lobeGauche}</span> mm en avant
              de l'aorte
            </span>
          </p>
          <p className='my-0'>
            - Flèche hépatique mesure{" "}
            <span className='fw-bolder'>{data.flecheHepatique}</span>
          </p>
          <p className='my-0'>
            - Echostructure :{" "}
            <span className='fw-bolder'>{data.echostructure}</span>
          </p>
          <p className='my-0'>
            - Contours : <span className='fw-bolder'>{data.contours}</span>
          </p>
          <p className='my-0'>
            Autres : <span className='fw-bolder'>{data.autres}</span>
          </p>
          <p className='my-0'>
            Tronc porte et veines hépatique :{" "}
            <span className='fw-bolder'>{data.tpvh}</span>
          </p>
          <p className='my-0'>
            Vésicule biliaire:
            <span className='fw-bolder'>{data.vesiculeBiliaire}</span>
          </p>
          <p className='my-0'> Pancréas :</p>
          <p className='my-0'>
            Taille : <span className='fw-bolder'>{data.taillePancreas}</span>{" "}
            mm, <br /> Echostructure :{" "}
            <span className='fw-bolder'>{data.echostructurePancreas}</span>
          </p>
          <p className='my-0'>
            Contours :<span className='fw-bolder'>{data.contoursPancreas}</span>
          </p>
          <p className='my-0'>
            Autres :<span className='fw-bolder'>{data.autresPancreas}</span>
          </p>
          <p className='my-0'> Rate :</p>
          <p className='my-0'>
            Taille :<span className='fw-bolder'>{data.tailleRate}</span> mm,{" "}
            <br /> Echostructure:{" "}
            <span className='fw-bolder'>{data.echostructureRate}</span>{" "}
          </p>
          <p className='my-0'>
            Contours :<span className='fw-bolder'>{data.contoursRate}</span>
          </p>
          <p className='my-0'>
            Autres :<span className='fw-bolder'>{data.autresRate}</span>
          </p>
          <p className='my-0'>Reins :</p>
          <p className='my-0'>- Droit :</p>
          <p className='my-0'>
            Taille :<span className='fw-bolder'>{data.tailleDroitReins}</span>
            mm, <br /> Echostructure:{" "}
            <span className='fw-bolder'>{data.echostructureDroitReins}</span>
          </p>
          <p className='my-0'>
            Cavités pyélocalicielles
            <span className='fw-bolder'>{data.cavitePyelocalicielleDroit}</span>
          </p>
          <p className='my-0'>- Gauche :</p>
          <p className='my-0'>
            Taille :<span className='fw-bolder'>{data.tailleGaucheReins}</span>
            mm, <br /> Echostructure:{" "}
            <span className='fw-bolder'>{data.echostructureGaucheReins}</span>
          </p>
          <p className='my-0'>
            Cavités pyélocalicielles
            <span className='fw-bolder'>
              {data.cavitePyelocalicielleGauche}
            </span>
          </p>
          <p className='my-0'>Vessie :</p>
          <p className='my-0'>
            contours :<span className='fw-bolder'>{data.contoursVessie}</span>
          </p>
          <p className='my-0'>
            contenu:<span className='fw-bolder'>{data.contenuVessie}</span>
          </p>
          <p className='my-0'>
            parois:<span className='fw-bolder'>{data.paroisVessie}</span> et
            mesure :{" "}
            <span className='fw-bolder'>{data.mesureParoisVessie}</span>mm
          </p>
          <p className='my-0'>
            Conclusion:<span className='fw-bolder'> {data.conclusion}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default PrintEchoAbdominale;
