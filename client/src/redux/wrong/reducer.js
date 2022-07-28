import { SET_WRONGCHR } from "./types";

const setWrongchrState = {
  Wrongchr: 10,
};

const setWrongchrReducer = (state = setWrongchrState, action) => {
  switch (action.type) {
    case SET_WRONGCHR:
      return {
        ...state,
        Wrongchr: action.value,
      };
    default:
      return state;
  }
};

export default setWrongchrReducer;
