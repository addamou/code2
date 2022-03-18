import { toast } from "react-toastify";
import api from "../utils/api";
import {
  CREATE_DOC_SUCCESS,
  DELETE_DOC_SUCCESS,
  DOCUMENT_ERROR,
  GET_DOC_SUCCESS,
} from "./types";

//Get documents administratif
export const getDoc = () => async (dispatch) => {
  try {
    const res = await api.get("/document");

    dispatch({
      type: GET_DOC_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DOCUMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create document administratif
export const createDoc = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/document", formData);

    dispatch({
      type: CREATE_DOC_SUCCESS,
      payload: res.data,
    });
    toast.success("Document enregistrer correctement.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: DOCUMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Effacer un document
export const deleteDocument = (id) => async (dispatch) => {
  if (window.confirm("Est tu sure ? de supprimer ce donnée !")) {
    try {
      const res = await api.delete(`/document/${id}`);

      dispatch({
        type: DELETE_DOC_SUCCESS,
        payload: res.data,
      });

      toast.success("Rapport de validation de caisse effacé", {
        position: "top-center",
      });
    } catch (err) {
      dispatch({
        type: DOCUMENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
