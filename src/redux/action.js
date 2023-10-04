//Funtion to store mode variable in Redux Store
export const setModeVariable = (variable) => ({
  type: "SET_MODE_VARIABLE",
  payload: variable,
});
