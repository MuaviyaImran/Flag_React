import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as CONSTANT from "../../utils/constants.js";
import "../.././index.css";
import "./dropdownstyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function DropdownMenu(props) {
  const mode = useSelector((state) => state?.variable);

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectRegion = (region) => {
    props.setSelectedRegion(region);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        onClick={toggleDropdown}
        className="dropdown-button"
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{props.selectedRegion || "Filter by Region"}</span>
          <span style={{ paddingTop: "2px" }}>
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </div>
      </button>

      {isOpen && (
        <ul
          className={
            mode.type === CONSTANT.LIGHT_MODE.type
              ? "dropdown-item-light dropdown-menu"
              : "dropdown-item-dark dropdown-menu"
          }
          style={
            mode.type === CONSTANT.LIGHT_MODE.type
              ? {
                  backgroundColor: CONSTANT.LIGHT_MODE.backgroundColor,
                }
              : {
                  backgroundColor: CONSTANT.DARK_MODE.cardBackground,
                }
          }
        >
          {regions.map((region) => {
            return (
              <li
                key={region}
                onClick={() => selectRegion(region)}
                style={
                  mode.type === CONSTANT.LIGHT_MODE.type
                    ? {
                        color: CONSTANT.LIGHT_MODE.textColor,
                      }
                    : {
                        color: CONSTANT.DARK_MODE.textColor,
                      }
                }
              >
                {region}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
