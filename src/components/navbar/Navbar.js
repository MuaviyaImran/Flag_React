import React from "react";

import "../.././index.css";
import "./navbarStyle.css";
import * as CONSTANT from "../../utils/constants.js";
import { setModeVariable } from "../../redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state?.variable);
  //Toggle button which handles Dark / Light Mode
  const toggleMode = () => {
    if (mode.type === CONSTANT.LIGHT_MODE.type) {
      dispatch(setModeVariable(CONSTANT.DARK_MODE));
    } else {
      dispatch(setModeVariable(CONSTANT.LIGHT_MODE));
    }
  };

  return (
    
    <div
      className="nav-main "
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
    >
      <div className="nav-cont margin-l-r">
        <div className="nav-item-1">Where in the world?</div>
        <div className="nav-item-2 " onClick={toggleMode}>
          <i
            className={`fa fa-moon-o p-2 `}
            style={{ fontsize: "16px", fontWeight: "800" }}
          ></i>
          {mode.type === CONSTANT.LIGHT_MODE.type ? "Dark Mode" : "Light Mode"}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
