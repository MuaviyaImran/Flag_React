import React from "react";
import * as CONSTANT from "../../utils/constants.js";
import "./cardStyle.css";
import { useSelector } from "react-redux";
const Card = (props) => {
  //Getting mode variable from redux
  const mode = useSelector((state) => state?.variable);
  const countryCard = (
    <>
      <div
        className="card"
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
        <img
          className="flag-image"
          src={props.country.flags.png}
          alt={props.country.name.official}
        />
        <div className="card-body">
          <h5 className="card-title">
            <b>{props.country.name.common}</b>
          </h5>
          <div className="card-desc">
            <div className="popoulation-mob">
              <p className="margin-t-b">
                <b style={{ fontSize: "15px" }}>{"Population: "} </b>
                <span style={{ paddingTop: "10px", fontSize: "16px" }}>
                  {props.country.population.toLocaleString()}
                </span>
              </p>
            </div>

            <p className="margin-t-b">
              <b style={{ fontSize: "15px" }}>{"Region: "} </b>
              <span style={{ fontSize: "16px" }}>{props.country.region}</span>
            </p>
            <div className="popoulation-mob">
              <p className="padding-null margin-t-b">
                <b style={{ fontSize: "15px" }}>{"Capital:  "}</b>
                <span style={{ fontSize: "16px" }}>
                  {props.country.capital[0]
                    ? props.country.capital[0]
                    : "No Capital Available"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return countryCard;
};
export default Card;
