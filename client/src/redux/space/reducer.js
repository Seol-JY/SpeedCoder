import { SET_SPACECHR } from "./types";

const setSpacechrState = {
  Spacechr: 10,
};

const setSpacechrReducer = (state = setSpacechrState, action) => {
  switch (action.type) {
    case SET_SPACECHR:
      return {
        ...state,
        Spacechr: action.value,
      };
    default:
      return state;
  }
};

export default setSpacechrReducer;
