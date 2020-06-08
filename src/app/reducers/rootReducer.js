import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../../testarea/testReducer";
import eventReducer from "../EventComponents/eventReducer";
import modalReduer from "../Modals/modalReduer";
import authReducer from "../auth/authReducer";
import asyncReducer from "../async/asyncReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReduer,
  auth: authReducer,
  async: asyncReducer,
});

export default rootReducer;
