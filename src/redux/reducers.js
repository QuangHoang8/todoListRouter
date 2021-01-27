import { combineReducers } from "redux";

const addName = function (state = { name }, action) {
  switch (action.type) {
    case "addName": {
      return {
        name: action.payload.userLogin,
      };
    }
    default:
      return state;
  }
};
export default combineReducers({ addName });
