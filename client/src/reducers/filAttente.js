import {
  CREATE_ACCUEIL_SUCCESS,
  GET_ACCUEIL_SUCCESS,
  GET_MEDECIN_SUCCESS,
  RETIRER_SUCCESS,
  VALIDATION_SUCCESS,
} from "../actions/types";

const initialAccueil = {
  filAccueils: [],
  filAccueil: null,
  loading: true,
  error: {},
};

const initialMedecin = {
  filMedecins: [],
  filMedecin: null,
  loading: true,
  error: {},
};

export const filAccueil = (state = initialAccueil, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ACCUEIL_SUCCESS:
      return {
        ...state,
        filAccueils: payload,
        loading: false,
      };

    case VALIDATION_SUCCESS:
    case CREATE_ACCUEIL_SUCCESS:
      return {
        ...state,
        filAccueil: { ...state.filAccueil, filAccueils: payload },
        loading: false,
      };

    case RETIRER_SUCCESS:
      return {
        ...state,
        filAccueils: state.filAccueils.filter(
          (filAccueil) => filAccueil._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export const filMedecin = (state = initialMedecin, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MEDECIN_SUCCESS:
      return {
        ...state,
        filMedecinss: payload,
        loading: false,
      };

    case CREATE_ACCUEIL_SUCCESS:
      return {
        ...state,
        filMedecins: { ...state.filMedecins, filMedecinss: payload },
        loading: false,
      };

    case RETIRER_SUCCESS:
      return {
        ...state,
        filMedecins: state.filMedecins.filter(
          (filMedecins) => filMedecins._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};
