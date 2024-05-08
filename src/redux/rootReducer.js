import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authReducer";
const rootReducer = combineReducers({
  AuthReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
