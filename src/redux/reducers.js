import { combineReducers } from "redux";

const handleAddName = function (state = { name: "" }, action) {
  switch (action.type) {
    case "addNameLogin": {
      return {
        name: action.payload.userLogin,
      };
    }
    default:
      return state;
  }
};
export default combineReducers({ handleAddName });
