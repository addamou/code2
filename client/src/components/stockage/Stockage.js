import React, { useCallback, useEffect, useState } from "react";
import {
  FaBook,
  FaChartBar,
  FaListOl,
  FaPlusSquare,
  FaTable,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import api from "../../utils/api";
import {
  NouveauEntrer,
  NouveauProduit,
  NouveauSortie,
  Recherche,
} from "../Formulaires/FormStock";
import Modale from "../layout/Modale";
import { ModeEmploi } from "../layout/ModeEmploi";
import { TableauListe } from "../layout/Tableaux";

const Stockage = () => {
  //Date fonction
  const date = new Date();

  //Get Agent
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const { name, lastName } = user;

  //Get Produits
  const [data, setData] = useState([]);
  const getObjets = useCallback(() => {
    api
      .get("/stock")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getObjets();
  }, [getObjets]);

  // useState des Modales
  const [produit, setProduit] = useState(false);
  const [entrer, setEntrer] = useState(false);
  const [sortir, setSortir] = useState(false);
  const [liste, setListe] = useState(false);
  const [emploi, setEmploi] = useState(false);

  const open = () => {
    setListe(true);
    getObjets();
  };

  return (
    <section
      className='bg4'
      style={{ minHeight: "90vh", width: "100vw", padding: 0, margin: 0 }}
    >
      <div className='container d-flex flex-column align-items-center'>
        <header className='my-2'>
          <div className='btn-group' role='group'>
            <button
              className='btn btn-secondary ms-1'
              type='button'
              onClick={() => setProduit(true)}
            >
              <FaPlusSquare className='mb-1' /> CREATION DE PRODUIT
            </button>
            <button
              className='btn btn-success ms-1'
              type='button'
              onClick={() => setEntrer(true)}
            >
              <FaListOl className='mb-1' /> ENTRER DE STOCK
            </button>
            <button
              className='btn btn-danger ms-1'
              type='button'
              onClick={() => setSortir(true)}
            >
              <FaChartBar className='mb-1' /> SORTIE DU STOCK
            </button>
            <button
              className='btn btn-primary ms-1'
              type='button'
              onClick={open}
            >
              <FaTable className='mb-1' /> LISTE DES PRODUITS
            </button>
            <button
              className='btn btn-dark ms-1'
              type='button'
              onClick={() => setEmploi(true)}
            >
              <FaBook className='mb-1' /> MODE D'EMPLOI
            </button>
          </div>
          <Recherche getObjet={getObjets} />
        </header>
        <main>
          {produit && (
            <NouveauProduit
              ouvrir={() => setProduit(true)}
              fermer={() => setProduit(false)}
              getObjet={getObjets}
              dates={date}
              name={name}
              lastName={lastName}
            />
          )}
          {entrer && (
            <NouveauEntrer
              data={data}
              ouvrir={() => setEntrer(true)}
              fermer={() => setEntrer(false)}
              getObjet={getObjets}
              date={date}
              Name={name}
              lastName={lastName}
            />
          )}
          {sortir && (
            <NouveauSortie
              data={data}
              ouvrir={() => setSortir(true)}
              fermer={() => setSortir(false)}
              getObjet={getObjets}
              date={date}
              Name={name}
              lastName={lastName}
            />
          )}
          {liste && (
            <Modale close={() => setListe(false)}>
              <TableauListe data={data} getObjet={getObjets} />
            </Modale>
          )}
          {emploi && (
            <ModeEmploi
              ouvrir={() => setEmploi(true)}
              close={() => setEmploi(false)}
            />
          )}
        </main>
      </div>
    </section>
  );
};

export default Stockage;
