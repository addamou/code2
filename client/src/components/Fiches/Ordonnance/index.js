import React from "react";
import { useDispatch } from "react-redux";
import { Entete1 } from "../../layout/Entetes";
import { createOrdonnance } from "../../../actions/fiches";

const Ordonnance = ({
  poste,
  date,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
  idPatient,
  closeO,
  printO,
  nameAgent,
  lastNameAgent,
  produit,
  medicaments,
  change,
  del,
  ajouter,
}) => {
  const dispatch = useDispatch();

  const Submit = () => {
    dispatch(
      createOrdonnance({
        medicaments,
        patient: idPatient,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
    );
    closeO();
    printO();
  };

  return (
    <>
      <section className='A5V' style={{ fontSize: "13px" }}>
        <Entete1 date={date} />
        <h4 className='text-center my-1 text-decoration-underline'>
          ORDONNANCE
        </h4>
        <form autoComplete='false'>
          <div className='row my-1'>
            <div className='col-6'>
              <input
                type='text'
                id='titre'
                className='form-control'
                onChange={change}
                value={produit.titre}
                placeholder='Nom du Produits'
              />
            </div>
            <div className='col-6'>
              <input
                type='text'
                id='quantite'
                className='form-control '
                onChange={change}
                value={produit.quantite}
                placeholder='Quantité du Produit'
              />
            </div>
          </div>
          <div className='row my-1'>
            <div className='col-6'>
              <input
                type='text'
                id='prise'
                className='form-control '
                onChange={change}
                value={produit.prise}
                placeholder='Méthode de Prise'
              />
            </div>
            <div className='col-6'>
              <button
                type='button'
                onClick={ajouter}
                className='btn btn-success form-control'
              >
                Ajouter
              </button>
            </div>
          </div>
        </form>
        <div className='row'>
          <div className='col-9 text-end'>
            Nom et Prénom:{" "}
            <span className='fw-bold'>
              {namePatient} {lastNamePatient}
            </span>
          </div>
          <div className='col-3 text-end'>
            Age:{" "}
            <span className='fw-bold'>
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                ? "ans"
                : "an"}
            </span>
          </div>
        </div>
        <div className='table-responsive'>
          <table className='table'>
            <thead className='bg-secondary text-light'>
              <tr>
                <th scope='col' style={{ width: 105 }}>
                  Qtés
                </th>
                <th scope='col'>Produits</th>
                <th scope='col'>Prise</th>
              </tr>
            </thead>
            <tbody>
              {medicaments.length > 0 ? (
                medicaments.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope='row'>{item.quantite}</th>
                      <td>{item.titre}</td>
                      <td>
                        {item.prise}{" "}
                        <button
                          className='btn btn-danger'
                          type='button'
                          onClick={() => del(index)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <th scope='row'>-</th>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div>
          <div className='text-end mt-3'>
            <h6 className='text-decoration-underline'>
              {poste === "sagefemme" ? "La Sage Femme" : "Le Medecin"}
            </h6>
            <p>
              {nameAgent} {lastNameAgent}
            </p>
          </div>
        </div>
      </section>
      <button className='btnValid' type='button' onClick={Submit}>
        VALIDER
      </button>
    </>
  );
};

export default Ordonnance;
