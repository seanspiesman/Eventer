import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { reducer as ToastrReducer } from "react-redux-toastr";
import testReducer from "../../testarea/testReducer";
import eventReducer from "../EventComponents/eventReducer";
import modalReduer from "../Modals/modalReduer";
import authReducer from "../auth/authReducer";
import asyncReducer from "../async/asyncReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReduer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToastrReducer,
});

export default rootReducer;
