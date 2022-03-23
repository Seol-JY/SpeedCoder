import { SET_CORRECTCHR } from "./types";

const setCorrectchrState = {
    Correctchr: 100
}

const setCorrectchrReducer = (state = setCorrectchrState, action) => {
    switch (action.type) {
        case SET_CORRECTCHR:
            return {
                ...state,
                Correctchr: action.value
            }
        default: return state;
    }
}

export default setCorrectchrReducer