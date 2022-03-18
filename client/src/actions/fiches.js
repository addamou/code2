import { toast } from "react-toastify";
import api from "../utils/api";
import {
  AVISHOS_ERROR,
  BE_ERROR,
  BULSORT_ERROR,
  CA_ERROR,
  CG_ERROR,
  CMED_ERROR,
  COMPACC_ERROR,
  COMPHOSP_ERROR,
  CONGE_ERROR,
  CONIM_ERROR,
  CONPE_ERROR,
  CREATE_AHOSP_SUCCESS,
  CREATE_BE_SUCCESS,
  CREATE_BULSORT_SUCCESS,
  CREATE_CA_SUCCESS,
  CREATE_CG_SUCCESS,
  CREATE_CMED_SUCCESS,
  CREATE_COMPACC_SUCCESS,
  CREATE_COMPHOSP_SUCCESS,
  CREATE_CONGE_SUCCESS,
  CREATE_CONIM_SUCCESS,
  CREATE_CONPE_SUCCESS,
  CREATE_CVCVM_SUCCESS,
  CREATE_CVM_SUCCESS,
  CREATE_DECHARGE_SUCCESS,
  CREATE_DOSSMED_SUCCESS,
  CREATE_ECHOABD_SUCCESS,
  CREATE_ECHOPROS_SUCCESS,
  CREATE_FT_SUCCESS,
  CREATE_ORD_SUCCESS,
  CVCVM_ERROR,
  CVM_ERROR,
  DECHARGE_ERROR,
  DOSSMED_ERROR,
  ECHOABD_ERROR,
  ECHOPROS_ERROR,
  FT_ERROR,
  GET_AHOSP_SUCCESS,
  GET_BE_SUCCESS,
  GET_BULSORT_SUCCESS,
  GET_CA_SUCCESS,
  GET_CG_SUCCESS,
  GET_CMED_SUCCESS,
  GET_COMPACC_SUCCESS,
  GET_COMPHOSP_SUCCESS,
  GET_CONGE_SUCCESS,
  GET_CONIM_SUCCESS,
  GET_CONPE_SUCCESS,
  GET_CVCVM_SUCCESS,
  GET_CVM_SUCCESS,
  GET_DECHARGE_SUCCESS,
  GET_DOSSMED_SUCCESS,
  GET_ECHOABD_SUCCESS,
  GET_ECHOPROS_SUCCESS,
  GET_FT_SUCCESS,
  GET_ORD_SUCCESS,
  ORD_ERROR,
  UPDATE_BE_SUCCESS,
} from "./types";

//Dossier Medical
export const createDMedical = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/dossier", formData);

    dispatch({
      type: CREATE_DOSSMED_SUCCESS,
      payload: res.data,
    });
    toast.info("Dossier médical créer.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: DOSSMED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getDossMed = () => async (dispatch) => {
  try {
    const res = await api.get("/dossier");

    dispatch({
      type: GET_DOSSMED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DOSSMED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Avis Hospitalisation
export const createAviHosp = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/avishospitalisation", formData);

    dispatch({
      type: CREATE_AHOSP_SUCCESS,
      payload: res.data,
    });
    toast.info("Avis d'hospitalisation créer.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: AVISHOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAvisHos = () => async (dispatch) => {
  try {
    const res = await api.get("/avishospitalisation");

    dispatch({
      type: GET_AHOSP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AVISHOS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Bulletin de sortie
export const createBullSortie = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/bulletinsortie", formData);

    dispatch({
      type: CREATE_BULSORT_SUCCESS,
      payload: res.data,
    });
    toast.info("Bulletin de sortie créer.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: BULSORT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getBullSortie = () => async (dispatch) => {
  try {
    const res = await api.get("/bulletinsortie");

    dispatch({
      type: GET_BULSORT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BULSORT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Bulletin d'Examen
export const getBullExam = () => async (dispatch) => {
  try {
    const res = await api.get("/bulletinexamen");

    dispatch({
      type: GET_BE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createBulExam = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/bulletinexamen", formData);

    dispatch({
      type: CREATE_BE_SUCCESS,
      payload: res.data,
    });
    toast.info("Bulletin de sortie créer.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: BE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateBulExam = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/bulletinexamen/update", formData);

    dispatch({
      type: UPDATE_BE_SUCCESS,
      payload: res.data,
    });
    toast.info("Résultat d'examen valider.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: BE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Certificat d'accouchement
export const getCertAcc = () => async (dispatch) => {
  try {
    const res = await api.get("/certificataccouchement");

    dispatch({
      type: GET_CA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCertAcc = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/certificataccouchement", formData);

    dispatch({
      type: CREATE_CA_SUCCESS,
      payload: res.data,
    });
    toast.info("Certificat d'accouchement créer.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: CA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Certificat de grossesse
export const getCertGros = () => async (dispatch) => {
  try {
    const res = await api.get("/certificatgrossesse");

    dispatch({
      type: GET_CG_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCertGros = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/certificatgrossesse", formData);

    dispatch({
      type: CREATE_CG_SUCCESS,
      payload: res.data,
    });
    toast.info("Certificat de grossesse créer.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: CG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Certificat Medicale
export const getCertMedical = () => async (dispatch) => {
  try {
    const res = await api.get("/certificatmedical");

    dispatch({
      type: GET_CMED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CMED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCertMedical = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/certificatmedical", formData);

    dispatch({
      type: CREATE_CMED_SUCCESS,
      payload: res.data,
    });
    toast.info("Certificat Médical créer.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: CMED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Certificat de visite Medicale
export const getCertVisMed = () => async (dispatch) => {
  try {
    const res = await api.get("/certificatvisitemedicale");

    dispatch({
      type: GET_CVM_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CVM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCertVisMed = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/certificatvisitemedicale", formData);

    dispatch({
      type: CREATE_CVM_SUCCESS,
      payload: res.data,
    });

    toast.info("Certificat de visite médical créer.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: CVM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Certificat de visite et contre visite Medicale
export const getCertVisConVis = () => async (dispatch) => {
  try {
    const res = await api.get("/certificatvisitecontrevisite");

    dispatch({
      type: GET_CVCVM_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CVCVM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCertVisContMed = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/certificatvisitecontrevisite", formData);

    dispatch({
      type: CREATE_CVCVM_SUCCESS,
      payload: res.data,
    });

    toast.info("Certificat de visite médical créer.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: CVCVM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Compte rendu d'accouchement
export const getCompAcc = () => async (dispatch) => {
  try {
    const res = await api.get("/cra");

    dispatch({
      type: GET_COMPACC_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPACC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCompAcc = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/cra", formData);

    dispatch({
      type: CREATE_COMPACC_SUCCESS,
      payload: res.data,
    });

    toast.info("Compte rendue d'accouchement créer.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: COMPACC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Compte rendu d'Hospitalisation
export const getCompHosp = () => async (dispatch) => {
  try {
    const res = await api.get("/compterenduhospitalisation");

    dispatch({
      type: GET_COMPHOSP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPHOSP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createCompHosp = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/compterenduhospitalisation", formData);

    dispatch({
      type: CREATE_COMPHOSP_SUCCESS,
      payload: res.data,
    });

    toast.info("Fiche de compte rendu d'hospitalisation disponible.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: COMPHOSP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Consultation generale
export const getConsGe = () => async (dispatch) => {
  try {
    const res = await api.get("/generale");

    dispatch({
      type: GET_CONGE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createConsGe = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/generale", formData);

    dispatch({
      type: CREATE_CONGE_SUCCESS,
      payload: res.data,
    });

    toast.info("Fiche de consultation générale disponible.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: CONGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Consultation pediatrique
export const getConsPe = () => async (dispatch) => {
  try {
    const res = await api.get("/pediatrique");

    dispatch({
      type: GET_CONPE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createConsPe = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/pediatrique", formData);

    dispatch({
      type: CREATE_CONPE_SUCCESS,
      payload: res.data,
    });

    toast.info("Fiche de consultation générale disponible.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: CONPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Consultation imagerie
export const getConsIm = () => async (dispatch) => {
  try {
    const res = await api.get("/imagerie");

    dispatch({
      type: GET_CONIM_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONIM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createConsIm = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/imagerie", formData);

    dispatch({
      type: CREATE_CONIM_SUCCESS,
      payload: res.data,
    });

    toast.info("Fiche de consultation d'imagerie disponible.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: CONIM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Decharge
export const getDecharge = () => async (dispatch) => {
  try {
    const res = await api.get("/decharge");

    dispatch({
      type: GET_DECHARGE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DECHARGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createDecharge = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/decharge", formData);

    dispatch({
      type: CREATE_DECHARGE_SUCCESS,
      payload: res.data,
    });

    toast.success("Fiche de décharge disponible.", { position: "top-center" });
  } catch (err) {
    dispatch({
      type: DECHARGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Echographie Abdominale
export const getEchoAbd = () => async (dispatch) => {
  try {
    const res = await api.get("/echographieabdominale");

    dispatch({
      type: GET_ECHOABD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ECHOABD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createEchoAbd = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/echographieabdominale", formData);

    dispatch({
      type: CREATE_ECHOABD_SUCCESS,
      payload: res.data,
    });
    toast.info("Fiche d'echographie abdominale disponible.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: ECHOABD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Echographie Prostatique
export const getEchoPros = () => async (dispatch) => {
  try {
    const res = await api.get("/echovesicoprostatique");

    dispatch({
      type: GET_ECHOPROS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ECHOPROS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createEchoPros = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/echovesicoprostatique", formData);

    dispatch({
      type: CREATE_ECHOPROS_SUCCESS,
      payload: res.data,
    });

    toast.info("Fiche d'echographie prostatique est disponible.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: ECHOPROS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Fiche de temperature
export const getTemperature = () => async (dispatch) => {
  try {
    const res = await api.get("/fichetemperature");

    dispatch({
      type: GET_FT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createTemperature = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/fichetemperature", formData);

    dispatch({
      type: CREATE_FT_SUCCESS,
      payload: res.data,
    });

    toast.info("Fiche de temperature est disponible.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: FT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Ordonnance
export const getOrdonnance = () => async (dispatch) => {
  try {
    const res = await api.get("/ordonnance");

    dispatch({
      type: GET_ORD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createOrdonnance = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/ordonnance", formData);

    dispatch({
      type: CREATE_ORD_SUCCESS,
      payload: res.data,
    });

    toast.info("L'ordonnance de ce patient est prèt.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: ORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Ordonnance
export const getSoinUrgence = () => async (dispatch) => {
  try {
    const res = await api.get("/soinsurgence");

    dispatch({
      type: GET_ORD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createSoinUrgence = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/soinsurgence", formData);

    dispatch({
      type: CREATE_ORD_SUCCESS,
      payload: res.data,
    });

    toast.info("Fiche de soin établis et reçu disponible à la reception.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: ORD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
