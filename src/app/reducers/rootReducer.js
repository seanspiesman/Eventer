import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../../testarea/testReducer";
import eventReducer from "../EventComponents/eventReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
});

export default rootReducer;
