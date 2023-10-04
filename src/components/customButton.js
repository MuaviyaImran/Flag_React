import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import * as CONSTANT from "../utils/constants.js";
import { useSelector } from "react-redux";
const CustomButton = (props) => {
  const mode = useSelector((state) => state?.variable);
  const navigate = useNavigate();
  return (
    <button
      className="button-back"
      style={
        mode.type === CONSTANT.LIGHT_MODE.type
          ? {
              backgroundColor: CONSTANT.LIGHT_MODE.cardBackground,
              color: CONSTANT.LIGHT_MODE.textColor,
            }
          : {
              backgroundColor: CONSTANT.DARK_MODE.cardBackground,
              color: CONSTANT.DARK_MODE.textColor,
            }
      }
      onClick={() => navigate("/")}
    >
      <FontAwesomeIcon icon={faArrowLeftLong} />
      <span className="mx-2"></span>
      {props.title}
    </button>
  );
};
export default CustomButton;
