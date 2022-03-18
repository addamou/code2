import {
  CREATE_CAISSE_SUCCESS,
  DELETE_CAISSE_SUCCESS,
  GET_CAISSE_SUCCESS,
  GET_ONE_SUCCESS,
} from "../actions/types";

const initialStock = {
  caisses: [],
  caisse: null,
  loading: true,
  error: {},
};

export const caisse = (state = initialStock, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CAISSE_SUCCESS:
      return {
        ...state,
        caisses: payload,
        loading: false,
      };
    case GET_ONE_SUCCESS:
      return {
        ...state,
        caisse: payload,
        loading: false,
      };

    case CREATE_CAISSE_SUCCESS:
      return {
        ...state,
        caisse: { ...state.caisse, caisses: payload },
        loading: false,
      };

    case DELETE_CAISSE_SUCCESS:
      return {
        ...state,
        caisses: state.caisses.filter((caisse) => caisse._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};
