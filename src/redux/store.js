import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { variableReducer } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["variable"],
};

const persistedReducer = persistReducer(persistConfig, variableReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
