import * as CONSTANT from "../utils/constants.js";
const initialState = {
  variable: CONSTANT.LIGHT_MODE,
};

export const variableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODE_VARIABLE":
      return {
        ...state,
        variable: action.payload,
      };
    default:
      return state;
  }
};
