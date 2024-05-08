import { LOG_IN, LOG_OUT } from "./actionType";

const userLogin = localStorage.getItem("TOKEN");

const initialState = {
  isLogin: userLogin ? true : false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLogin: true,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLogin: false,
      };
    }
    default: {
      return state;
    }
  }
};
