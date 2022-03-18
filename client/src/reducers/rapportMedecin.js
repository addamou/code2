import {
  CREATE_RAPPORT_MEDECIN_SUCCESS,
  DELETE_RAPPORT_MEDECIN_SUCCESS,
  GET_ONE_SUCCESS,
  GET_RAPPORT_MEDECIN,
} from "../actions/types";

const initialStock = {
  rapports: [],
  rapport: null,
  loading: true,
  error: {},
};

export const rapportM = (state = initialStock, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RAPPORT_MEDECIN:
      return {
        ...state,
        rapports: payload,
        loading: false,
      };
    case GET_ONE_SUCCESS:
      return {
        ...state,
        rapport: payload,
        loading: false,
      };

    case CREATE_RAPPORT_MEDECIN_SUCCESS:
      return {
        ...state,
        rapport: { ...state.rapport, rapports: payload },
        loading: false,
      };

    case DELETE_RAPPORT_MEDECIN_SUCCESS:
      return {
        ...state,
        rapports: state.rapports.filter((rapport) => rapport._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};
