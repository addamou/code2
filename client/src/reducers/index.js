import { combineReducers } from "redux";
import alert from "./alert";
import { auth } from "./auth";
import { stock } from "./stock";
import { caisse } from "./caisse";
import { offre } from "./offre";
import { document } from "./document";
import { finance } from "./finance";
import { rapportM } from "./rapportMedecin";
import { agent } from "./agent";
import { filAccueil } from "./filAttente";
import { filMedecin } from "./filAttente";
import { patient } from "./patient";

export default combineReducers({
  alert,
  auth,
  stock,
  caisse,
  offre,
  document,
  finance,
  rapportM,
  agent,
  filAccueil,
  filMedecin,
  patient,
});
