/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-self-assign */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import DropdownMenu from "../components/dropdown/DropDown";
import SearchBarComp from "../components/searchbar/SearchBar";
import Card from "../components/card/Card.js";
import * as CONSTANT from "../utils/constants.js";
import "../components/card/cardStyle.css";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [countriesData, setCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const mode = useSelector((state) => state?.variable);
  useEffect(() => {
    fetchCountryData();
  }, []);
  //useState for setting selectedRegion to all to show all regions country
  useEffect(() => {
    if (selectedRegion === "All") {
      setSelectedRegion("");
    }
  }, [selectedRegion]);
  /* Fetching All Country Flag details with only these fields
     - name
     - population
     - region
     - capital
     - flags
  */
  const fetchCountryData = () => {
    setIsLoading(true);
    fetch(
      `${CONSTANT.getAllCountries}?fields=name,population,region,capital,flags`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountriesData(data);
      });
    setIsLoading(false);
  };

  //Functionality to search and filter countries
  const filteredCountriesData = countriesData.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

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
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="margin-l-r base spc-btw">
            <SearchBarComp
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <DropdownMenu
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
          </div>
          <div className="card-main margin-l-r">
            {filteredCountriesData.map((countyData) => {
              return (
                <div
                  key={countyData.name.official}
                  onClick={() => {
                    if (countyData.capital.length !== 0) {
                      navigate(`/country-detail/${countyData?.name.common}`, {
                        state: {
                          capitalName: countyData.capital[0],
                        },
                      });
                    } else {
                      navigate(`/country-detail/${countyData?.name.common}`, {
                        state: {
                          countryNameWithNoCap: countyData.name.common,
                        },
                      });
                    }
                  }}
                >
                  <Card country={countyData} />
                </div>
              );
            })}
          </div>
          <div className="py-3"></div>
          <div
            className={`${
              filteredCountriesData.length < 5 &&
              filteredCountriesData.length >= 1
                ? "last-div-home"
                : ""
            } ${filteredCountriesData.length === 0 ? " no-element" : ""}`}
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
          ></div>
        </>
      )}
    </div>
  );
};

export default Home;
