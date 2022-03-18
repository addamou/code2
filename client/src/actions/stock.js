import { toast } from "react-toastify";
import api from "../utils/api";
import {
  CREATE_STOCK_FAIL,
  CREATE_STOCK_SUCCESS,
  CREATE_SUCCESS,
  DELETE_STOCK_FAIL,
  DELETE_STOCK_SUCCESS,
  GET_STOCK_FAIL,
  GET_STOCK_SUCCESS,
  STOCK_ERROR,
} from "./types";

//Création de offres de service
export const createStock = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/stock", formData);

    dispatch({
      type: CREATE_STOCK_SUCCESS,
      payload: res.data,
    });
    toast.success("Produit de stock ajouter avec succés", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: CREATE_STOCK_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//afficher les stock
export const getStock = () => async (dispatch) => {
  try {
    const res = await api.get("/stock");

    dispatch({
      type: GET_STOCK_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_STOCK_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//effacer les stock
export const deleteStock = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/stock/${id}`);

    dispatch({
      type: DELETE_STOCK_SUCCESS,
      payload: res.data,
    });
    toast.success("Ce produit est effacé.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: DELETE_STOCK_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//nouvel entree ou sortie effectué
export const addData = (choix, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/stock/data/${choix}`, formData);

    dispatch({
      type: CREATE_SUCCESS,
      payload: res.data,
    });
    toast.success("Nouvelle entrée ou sortie effectué.", {
      position: "top-center",
    });
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
