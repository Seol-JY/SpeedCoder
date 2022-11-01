import "redux";
import { combineReducers, legacy_createSotre as createStore } from "redux";
import setCorrectchrReducer from "./correct/reducer";
import setWrongchrReducer from "./wrong/reducer";

const rootReducer = combineReducers({
  correct: setCorrectchrReducer,
  wrong: setWrongchrReducer,
});

const store = createStore(rootReducer);
export default store;
