import "redux";
import { combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import setCorrectchrReducer from "./correct/reducer";
import setWrongchrReducer from "./wrong/reducer";
import setSpacechrReducer from "./space/reducer";

const rootReducer = combineReducers({
  correct: setCorrectchrReducer,
  wrong: setWrongchrReducer,
  space: setSpacechrReducer,
});

const store = createStore(rootReducer);
export default store;
