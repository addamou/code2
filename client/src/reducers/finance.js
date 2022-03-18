import {
  CREATE_FINANCE_SUCCESS,
  DELETE_FINANCE_SUCCESS,
  GET_FINANCE_SUCCESS,
  GET_ONE_SUCCESS,
} from "../actions/types";

const initialStock = {
  finances: [],
  finance: null,
  loading: true,
  error: {},
};

export const finance = (state = initialStock, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FINANCE_SUCCESS:
      return {
        ...state,
        finances: payload,
        loading: false,
      };
    case GET_ONE_SUCCESS:
      return {
        ...state,
        finance: payload,
        loading: false,
      };

    case CREATE_FINANCE_SUCCESS:
      return {
        ...state,
        finance: { ...state.finance, finances: payload },
        loading: false,
      };

    case DELETE_FINANCE_SUCCESS:
      return {
        ...state,
        finances: state.finances.filter((finance) => finance._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};
