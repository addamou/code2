import {
  CREATE_STOCK_SUCCESS,
  DELETE_STOCK_SUCCESS,
  GET_ONE_SUCCESS,
  GET_STOCK,
  GET_STOCK_SUCCESS,
} from "../actions/types";

const initialStock = {
  stocks: [],
  stock: null,
  loading: true,
  error: {},
};

export const stock = (state = initialStock, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_STOCK_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_STOCK:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case CREATE_STOCK_SUCCESS:
      return {
        ...state,
        stock: { ...state.stock, stocks: payload },
        loading: false,
      };

    case DELETE_STOCK_SUCCESS:
      return {
        ...state,
        stocks: state.stocks.filter((stock) => stock._id !== payload),
        loading: false,
      };
    case GET_ONE_SUCCESS:
      return { ...state, stock: action.payload };

    default:
      return state;
  }
};
