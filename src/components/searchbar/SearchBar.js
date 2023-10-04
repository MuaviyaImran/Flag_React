import React from "react";
import * as CONSTANT from "../../utils/constants.js";
import "./searchStyle.css";
import { useSelector } from "react-redux";
const SearchBarComp = ({ searchText, setSearchText }) => {
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const mode = useSelector((state) => state?.variable);
  return (
    <div className="main">
      <div className="form-group has-search">
        <span
          className="fa fa-search form-control-feedback"
          style={
            mode.type === CONSTANT.LIGHT_MODE.type
              ? {
                  color: CONSTANT.LIGHT_MODE.textColor,
                }
              : { color: CONSTANT.DARK_MODE.textColor }
          }
        ></span>
        <input
          style={
            mode.type === CONSTANT.LIGHT_MODE.type
              ? {
                  backgroundColor: CONSTANT.LIGHT_MODE.backgroundColor,
                  color: CONSTANT.LIGHT_MODE.textColor,
                }
              : {
                  backgroundColor: CONSTANT.DARK_MODE.cardBackground,
                  color: CONSTANT.DARK_MODE.textColor,
                }
          }
          type="text"
          className="form-control"
          placeholder="Search for a Country..."
          value={searchText}
          onChange={handleSearchInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBarComp;
