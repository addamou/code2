import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  DocAdministratif,
  DossierMedical,
  TabAgents,
  TabFinanciere,
  TableauCaisse,
  TableauOffres,
  TabOffres,
  TabPatient,
} from "../layout/Tableaux";
import { useDispatch, useSelector } from "react-redux";
import { Document, FormFinanciere } from "../Formulaires";
import { getRappFinancier } from "../../actions/finance";
import { getOffre } from "../../actions/offre";
import { getRCaisse } from "../../actions/caisse";
import { getDoc } from "../../actions/documents";
import { Maintenance } from "../layout/Maintenance";
import { toast } from "react-toastify";

const Administrateur = () => {
  const dispatch = useDispatch();
  //Agent
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const { post, name, lastName } = user;
  const date = new Date();

  //Data caisse
  useEffect(() => dispatch(getRCaisse()), [dispatch]);
  const dataCaisse = useSelector((state) => state.caisse.caisses);

  const [rappCaisse, setRappCaisse] = useState(false);
  const caisse = () => {
    setRappCaisse(true);
    setAgent(false);
    setDocsAdmin(false);
    setStockage(false);
    setOpenOffre(false);
    setPatient(false);
    setRappFinanier(false);
    setDossMedic(false);
    setMaintenances(false);
  };

  //fiches de finances
  const finance = useSelector((state) => state.finance.finances);
  useEffect(() => dispatch(getRappFinancier()), [dispatch]);

  const [formFin, setFormFin] = useState(false);
  const [rappFinanier, setRappFinanier] = useState(false);
  const finances = () => {
    setRappFinanier(true);
    setRappCaisse(false);
    setAgent(false);
    setDocsAdmin(false);
    setStockage(false);
    setOpenOffre(false);
    setPatient(false);
    setDossMedic(false);
    setMaintenances(false);
  };

  //Data document Administratif
  useEffect(() => dispatch(getDoc()), [dispatch]);
  const dataDA = useSelector((state) => state.document.documents);
  const [docu, setDocu] = useState(false);
  const [docsAdmin, setDocsAdmin] = useState(false);
  const docs = () => {
    setDocsAdmin(true);
    setRappFinanier(false);
    setRappCaisse(false);
    setAgent(false);
    setStockage(false);
    setOpenOffre(false);
    setPatient(false);
    setDossMedic(false);
    setMaintenances(false);
  };

  //Liste des Agents
  const [dataAgent, setDataAgent] = useState([]);
  const getAgent = () => {
    api.get("/users").then((response) => setDataAgent(response.data));
  };
  useEffect(() => getAgent(), []);

  const [agent, setAgent] = useState(false);
  const agents = () => {
    setAgent(true);
    setDocsAdmin(false);
    setRappFinanier(false);
    setRappCaisse(false);
    setStockage(false);
    setOpenOffre(false);
    setPatient(false);
    getDoc();
    setDossMedic(false);
    setMaintenances(false);
  };

  //Data Offres
  const offreData = useSelector((state) => state.offre.offres);
  useEffect(() => dispatch(getOffre()), [dispatch]);
  const [openOffre, setOpenOffre] = useState(false);
  const offres = () => {
    setOpenOffre(true);
    setAgent(false);
    setDocsAdmin(false);
    setRappFinanier(false);
    setRappCaisse(false);
    setStockage(false);
    setPatient(false);
    setDossMedic(false);
    setMaintenances(false);
  };

  //Liste des patients
  const [dataPatient, setDataPatient] = useState([]);
  useEffect(() => {
    api.get("/patient").then((res) => setDataPatient(res.data));
  }, []);
  const [patient, setPatient] = useState(false);
  const patients = () => {
    setPatient(true);
    setAgent(false);
    setDocsAdmin(false);
    setRappFinanier(false);
    setRappCaisse(false);
    setStockage(false);
    setOpenOffre(false);
    setDossMedic(false);
    setMaintenances(false);
  };

  const [dataStock, setDataStock] = useState([]);
  useEffect(() => {
    api.get("/stock").then((res) => setDataStock(res.data));
  }, []);
  const [stockage, setStockage] = useState(false);
  const openStock = () => {
    setStockage(true);
    setAgent(false);
    setDocsAdmin(false);
    setRappFinanier(false);
    setRappCaisse(false);
    setOpenOffre(false);
    setPatient(false);
    setDossMedic(false);
    setMaintenances(false);
  };

  const [dataDossierMed, setDataDossierMed] = useState([]);
  useEffect(() => {
    api.get("/dossier").then((res) => setDataDossierMed(res.data));
  }, []);
  const [dossMedic, setDossMedic] = useState(false);
  const docsMed = () => {
    setDossMedic(true);
    setStockage(false);
    setAgent(false);
    setDocsAdmin(false);
    setRappFinanier(false);
    setRappCaisse(false);
    setOpenOffre(false);
    setPatient(false);
    setMaintenances(false);
  };

  const [maintenances, setMaintenances] = useState(false);
  const maint = () => {
    setMaintenances(true);
    setDossMedic(false);
    setStockage(false);
    setAgent(false);
    setDocsAdmin(false);
    setRappFinanier(false);
    setRappCaisse(false);
    setOpenOffre(false);
    setPatient(false);
  };

  const vidange = () => {
    api.delete("/accueil/maintenance");
    api.delete("/medecins/maintenance");
    api.delete("/reception/maintenance");
    toast.success("Vous etes entrain de nettoyer les fils d'attente", {
      position: "top-center",
    });
  };

  return (
    <section style={{ width: "100%", height: "100%", padding: "0 auto" }}>
      <div className='d-flex'>
        <div className='col-2'>
          <div
            className=''
            style={{ width: "100%", background: "#ff9000" }}
            onClick={caisse}
          >
            <div className='card-body text-center text-light'>
              <h5 className='card-title'>Rapports Caisse</h5>
              <h5 className='card-subtitle mb-2 fw-bold'>
                {dataCaisse.length}
              </h5>
            </div>
          </div>
          <div
            className=''
            style={{ width: "100%", background: "#1EC100" }}
            onClick={finances}
          >
            <div className='card-body text-center text-light'>
              <h5 className='card-title'>Rapport Financier</h5>
              <h5 className='card-subtitle mb-2 fw-bold'>{finance.length}</h5>
            </div>
          </div>
          <div
            className=''
            style={{ width: "100%", background: "#E100C8" }}
            onClick={docs}
          >
            <div className='card-body text-center text-light'>
              <h5 className='card-title'>Docs Administratifs</h5>
              <h5 className='card-subtitle mb-2 fw-bold'>{dataDA.length}</h5>
            </div>
          </div>
          <div
            className=''
            style={{ width: "100%", background: "#0411f9" }}
            onClick={agents}
          >
            <div className='card-body text-center text-light'>
              <h5 className='card-title'>Agents</h5>
              <h5 className='card-subtitle mb-2 fw-bold'>{dataAgent.length}</h5>
            </div>
          </div>
          <div
            className=''
            style={{ width: "100%", background: "#00B4B4" }}
            onClick={offres}
          >
            <div className='card-body text-center text-dark'>
              <h5 className='card-title'>Offres</h5>
              <h5 className='card-subtitle mb-2 fw-bold'>{offreData.length}</h5>
            </div>
          </div>
          <div
            className='bg-danger'
            style={{ width: "100%" }}
            onClick={patients}
          >
            <div className='card-body text-center text-light'>
              <h5 className='card-title'>Patients</h5>
              <h5 className='card-subtitle mb-2 fw-bold'>
                {dataPatient.length}
              </h5>
            </div>
          </div>
          <div
            className=' bg-success'
            style={{ width: "100%" }}
            onClick={openStock}
          >
            <div className='card-body text-center text-light'>
              <h5 className='card-title'>Produits Stockés</h5>
              <h5 className='card-subtitle mb-2 fw-bold'>{dataStock.length}</h5>
            </div>
          </div>
          <div
            style={{ width: "100%", background: "#0a5648" }}
            onClick={docsMed}
          >
            <div className='card-body text-center text-light'>
              <h5 className='card-title'>Dossier Medicaux</h5>
              <h5 className='card-subtitle mb-2 fw-bold'>
                {dataDossierMed.length}
              </h5>
            </div>
          </div>
          <div style={{ width: "100%", background: "#000" }} onClick={maint}>
            <div className='card-body text-center text-light'>
              <h5 className='card-title'>Maitenance</h5>
              <button
                className='btn btn-outline-warning'
                type='button'
                onClick={vidange}
              >
                Maintenance
              </button>
            </div>
          </div>
        </div>

        {/** Les Modales **/}
        <div className='col-10' style={{ background: "#f7c9ad" }}>
          {rappCaisse && <TableauCaisse data={dataCaisse} />}
          {rappFinanier && (
            <>
              {" "}
              <TabFinanciere
                data={finance}
                open={() => setFormFin(true)}
                poste={post}
              />
              {formFin && (
                <FormFinanciere
                  nouveau={getRappFinancier()}
                  agentPrenom={name}
                  agentNom={lastName}
                  fermer={() => setFormFin(false)}
                  ouvrir={() => setFormFin(true)}
                />
              )}
            </>
          )}

          {docsAdmin && (
            <div>
              <DocAdministratif data={dataDA} open={() => setDocu(true)} />
              {docu && (
                <Document
                  getDoc={getDoc}
                  ouvrir={() => setDocu(true)}
                  fermer={() => setDocu(false)}
                  agentNom={name}
                  agentPrenom={lastName}
                />
              )}
            </div>
          )}
          {agent && <TabAgents data={dataAgent} getAgent={getAgent} />}
          {openOffre && (
            <TabOffres
              data={offreData}
              getOffre={getOffre}
              dispatch={dispatch}
            />
          )}
          {patient && <TabPatient data={dataPatient} date={date} />}
          {stockage && <TableauOffres data={dataStock} />}
          {dossMedic && <DossierMedical data={dataDossierMed} />}
          {maintenances && <Maintenance />}
        </div>
      </div>
    </section>
  );
};

export default Administrateur;
