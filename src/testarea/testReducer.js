import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testContants";
import { createReducer } from "../app/common/util/reducerUtils";

const initialState = {
  data: 42,
  name: "hello",
  cool: "beans",
};

const incrementCounter = (state) => {
  return { ...state, data: state.data + 1 };
};

const decrementCounter = (state) => {
  return { ...state, data: state.data - 1 };
};

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter,
});

//More difficult for larger apps
// const testReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case INCREMENT_COUNTER:
//       return { ...state, data: state.data + 1 };
//     case DECREMENT_COUNTER:
//       return { ...state, data: state.data - 1 };
//     default:
//       return state;
//   }
// };
