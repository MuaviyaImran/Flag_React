import React from "react";
import { Route, Routes } from "react-router-dom";
import CountryDetail from "./pages/countryDetailPage/CountryDetail";
import Home from "./pages/Home";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/country-detail/:countryname"
            element={<CountryDetail />}
          />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
