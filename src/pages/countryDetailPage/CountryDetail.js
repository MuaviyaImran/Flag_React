/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./countryDetailPageStyle.css";
import CustomButton from "../../components/customButton";
import { useLocation } from "react-router-dom";
import * as CONSTANT from "../../utils/constants.js";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import currencyCodes from "currency-codes";
const CountryDetail = (currency) => {
  const location = useLocation();
  const capitalName = location.state.capitalName;
  const mode = useSelector((state) => state?.variable);
  const [countryDetail, setCountryDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [borderCountries, setBorderCountries] = useState([]);
  useEffect(() => {
    fetchCountryDetail();
  }, []);
  /* Fetching Single Country Flag details with only these fields
     - name
     - population
     - region
     - capital
     - flags
     - subregion
     - tld
     - currencies
     - languages
     - borders
  */
  const fetchCountryDetail = () => {
    setIsLoading(true);
    let url;
    /*Setting URL on the base of Its Capital. 
    IF Capital exsits API call will be on the base of capital else call will be on its official name.*/
    if (capitalName) {
      url = `${CONSTANT.getCountryDetail}${capitalName}?fields=name,population,region,capital,flags,subregion,tld,currencies,languages,borders`;
    } else {
      url = `${CONSTANT.getCountryByOfficialName}${location.state.countryNameWithNoCap}?fields=name,population,region,capital,flags,subregion,tld,currencies,languages,borders`;
    }
    fetch(`${url}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountryDetail(data);
        //Getting Borders name on the behalf of abbreviations of border names
        Promise.all(
          data?.[0]?.borders.map((country) => {
            return fetch(
              `${CONSTANT.getCountryByCode}${country}?fields=name,capital`
            ).then((response) => {
              return response.json();
            });
          })
        ).then((borderData) => {
          setBorderCountries(
            borderData
              .map((data, index) => {
                return {
                  common: data.name.common,
                  capital: data.capital[0],
                };
              })
              .sort((a, b) => a.common.localeCompare(b.common))
          );
          setIsLoading(false);
        });
      });
  };

  const navigate = useNavigate();
  const countryData = countryDetail.map((data) => {
    //React component for border buttons
    const borderButtons = (
      <>
        {data?.borders.length > 0 ? (
          borderCountries.map((country) => {
            if (country) {
              return (
                <button
                  key={country.common}
                  style={
                    mode.type === CONSTANT.LIGHT_MODE.type
                      ? {
                          color: CONSTANT.LIGHT_MODE.textColor,
                          backgroundColor: CONSTANT.LIGHT_MODE.cardBackground,
                        }
                      : {
                          color: CONSTANT.DARK_MODE.textColor,
                          backgroundColor: CONSTANT.DARK_MODE.cardBackground,
                        }
                  }
                  onClick={() => {
                    navigate(
                      `/country-detail/${country.common}`,
                      {
                        state: {
                          countryName: country.capital,
                        },
                      },
                      { replace: true }
                    );
                    window.location.reload();
                  }}
                  className="button-country"
                >
                  <span
                    style={{
                      fontsize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {country.common}
                  </span>
                </button>
              );
            } else {
              return null;
            }
          })
        ) : (
          <p className="no-border-text">No countries to display.</p>
        )}
      </>
    );
    //React component for flag details
    const flagDetails = (
      <div className="col-6 m">
        <h3 className="countryName">{data?.name.common}</h3>
        <div
          className="row flag-detail"
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
          <div className="col-6 flag-detail-text">
            <p>
              <b style={{ fontSize: "16px", fontWeight: "600px" }}>
                {"Native Name: "}
              </b>
              {
                <span
                  key={Object.entries(data?.name.nativeName)[0][1].common}
                  style={{
                    fontSize: "16px",
                    fontWeight: "300px",
                  }}
                >
                  {Object.entries(data?.name.nativeName)[0][1].common}
                </span>
              }
            </p>
            <p>
              <b>{"Population: "} </b>
              <span
                className="custom"
                style={{
                  fontSize: "16px",
                  fontWeight: "300px",
                  textOverflow: "ellipsis",
                }}
              >
                {data?.population.toLocaleString()}
              </span>
            </p>
            <p>
              <b>{"Region: "}</b>
              <span style={{ fontSize: "16px", fontWeight: "300px" }}>
                {data?.region.toString()}
              </span>
            </p>
            <p>
              <b> {"Sub Region: "}</b>
              <span
                className="custom"
                style={{ fontSize: "16px", fontWeight: "300px" }}
              >
                {data?.subregion.toString()}
              </span>
            </p>
            <p>
              <b> {"Capital: "}</b>
              <span
                className="custom"
                style={{ fontSize: "16px", fontWeight: "300px" }}
              >
                {data?.capital.toString()
                  ? data?.capital.toString()
                  : "No Capital Available"}
              </span>
            </p>
          </div>
          <div className="col-6 rest-details">
            <p>
              <b> {"Top Level Domain: "}</b>
              <span style={{ fontSize: "16px", fontWeight: "300px" }}>
                {data?.tld[0]}
              </span>
            </p>
            <p>
              <b>Currencies: </b>
              {data &&
                Object.keys(data?.currencies).map((currency) => {
                  return (
                    <span
                      key={Object.values(currency)}
                      style={{
                        fontSize: "16px",
                        fontWeight: "300px",
                      }}
                    >
                      {currencyCodes.code(currency).currency}
                    </span>
                  );
                })}
            </p>
            <p>
              <b>Languages: </b>
              {data &&
                Object.entries(data?.languages)
                  .sort(([, langA], [, langB]) => langA.localeCompare(langB))
                  .map(([key, val], index) => {
                    const lang = `${val}`;
                    const language = index === 0 ? lang : `, ${lang}`;
                    return (
                      <span
                        key={language}
                        style={{
                          fontSize: "16px",
                          fontWeight: "300px",
                        }}
                      >
                        {language}
                      </span>
                    );
                  })}
            </p>
          </div>
          <div className="row">
            <span className="d-flex border-detail">
              <b className="mt-1 text-nowrap">Border Countries: </b>
              <div className="border-buttons">{borderButtons}</div>
            </span>
          </div>
        </div>
      </div>
    );
    return (
      <div key={data?.name.official}>
        <Navbar />
        <div className="base margin-l-r mt-0 mb-0 pt-5 pb-5">
          {isLoading === true ? (
            <Loader />
          ) : (
            <>
              <CustomButton title={"Back"} />
              <div className=" my-5 row mob-view">
                <div className="col-6">
                  <img
                    className=" shadow-lg img-flag"
                    src={data?.flags.png}
                    alt={data?.name.official}
                  />
                </div>
                {flagDetails}
              </div>
            </>
          )}
        </div>
        <div className="last-div"></div>
      </div>
    );
  });
  return (
    <div
      style={
        mode.type === CONSTANT.LIGHT_MODE.type
          ? {
              backgroundColor: CONSTANT.LIGHT_MODE.cardBackground,
              color: CONSTANT.LIGHT_MODE.textColor,
            }
          : {
              backgroundColor: CONSTANT.DARK_MODE.backgroundColor,
              color: CONSTANT.DARK_MODE.textColor,
            }
      }
    >
      {countryData}
    </div>
  );
};
export default CountryDetail;
