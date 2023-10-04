/* eslint-disable no-unused-vars */
// APIs
export const BaseURL = "https://restcountries.com/v3.1/";
export const getAllCountries = `${BaseURL}all`;
export const getCountryDetail = `${BaseURL}capital/`;
export const getCountryByCode = `${BaseURL}alpha/`;
export const getCountryByOfficialName = `${BaseURL}name/`;
//Colors

export const LIGHT_MODE = {
  type: "LIGHT_MODE",
  backgroundColor: "#FFFFFF",
  textColor: "hsl(200, 15%, 8%)",
  inputColor: "hsl(0, 0%, 52%)",
  cardBackground: "hsl(0, 0%, 98%)",
};

export const DARK_MODE = {
  type: "DARK_MODE",
  backgroundColor: "hsl(207, 26%, 17%)",
  textColor: "#FFFFFF",
  inputColor: "hsl(0, 0%, 52%)",
  cardBackground: "hsl(209, 23%, 22%)",
};
