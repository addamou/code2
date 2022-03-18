import {
  CREATE_PATIENT_SUCCESS,
  DELETE_PATIENT_SUCCESS,
  GET_PATIENT_SUCCESS,
  UPDATE_PATIENT_SUCCESS,
} from "../actions/types";

const initialPatient = {
  patients: [],
  patient: null,
  loading: true,
  error: {},
};

export const patient = (state = initialPatient, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PATIENT_SUCCESS:
      return {
        ...state,
        patients: payload,
        loading: false,
      };

    case CREATE_PATIENT_SUCCESS:
      return {
        ...state,
        patient: { ...state.patient, patients: payload },
        loading: false,
      };
    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        patient: { ...state.patient, patients: payload },
        loading: false,
      };

    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        patients: state.patients.filter((patient) => patient._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};
