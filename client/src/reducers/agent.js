import {
  DELETE_USER_SUCCESS,
  GET_USER_SUCCESS,
  REGISTER_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  USER_PROFILE_SUCCESS,
} from "../actions/types";

const initialAgent = {
  agents: [],
  agent: null,
  loading: true,
  error: {},
};

export const agent = (state = initialAgent, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        agents: payload,
        loading: false,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        agent: { ...state.agent, agents: payload },
        loading: false,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        agent: { ...state.agent, agents: payload },
        loading: false,
      };

      case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        agent: { ...state.agent, agents: payload },
        loading: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        agent: { ...state.agent, agents: payload },
        loading: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        agents: state.agents.filter((agent) => agent._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};
