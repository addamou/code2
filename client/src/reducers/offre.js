import {
  CREATE_OFFRE_SUCCESS,
  DELETE_OFFRE_SUCCESS,
  GET_OFFRE_SUCCESS,
} from "../actions/types";

const initialStock = {
  offres: [],
  offre: null,
  loading: true,
  error: {},
};

export const offre = (state = initialStock, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_OFFRE_SUCCESS:
      return {
        ...state,
        offres: payload,
        loading: false,
      };

    case CREATE_OFFRE_SUCCESS:
      return {
        ...state,
        offre: { ...state.offre, offres: payload },
        loading: false,
      };

    case DELETE_OFFRE_SUCCESS:
      return {
        ...state,
        offres: state.offres.filter((offre) => offre._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};
