import {
  CREATE_DOC_SUCCESS,
  DELETE_DOC_SUCCESS,
  GET_DOC_SUCCESS,
  GET_ONE_SUCCESS,
} from "../actions/types";

const initialStock = {
  documents: [],
  document: null,
  loading: true,
  error: {},
};

export const document = (state = initialStock, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DOC_SUCCESS:
      return {
        ...state,
        documents: payload,
        loading: false,
      };
    case GET_ONE_SUCCESS:
      return {
        ...state,
        document: payload,
        loading: false,
      };

    case CREATE_DOC_SUCCESS:
      return {
        ...state,
        document: { ...state.document, documents: payload },
        loading: false,
      };

    case DELETE_DOC_SUCCESS:
      return {
        ...state,
        documents: state.documents.filter(
          (document) => document._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};
