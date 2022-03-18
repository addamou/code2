import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: {},
  users: [],
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
