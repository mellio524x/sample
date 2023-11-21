import { createContext, useEffect, useReducer } from "react";
import { isValidToken } from "../utils/jwt";
import apiService from "../api/axios";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT_SUCCESS = "AUTH.LOGOUT_SUCCESS";
// const UPDATE_SUCCESS = "AUTH.UPDATE_SUCCESS";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    // case UPDATE_SUCCESS:
    //   const { firstName, lastName, coverUrl } = action.payload;
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       firstName,
    //       lastName,
    //       coverUrl,
    //     },
    //   };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    //valid accessToken, then save it to localStorage
    window.localStorage.setItem("accessToken", accessToken);
    //also add it to Authorization of axios api call
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    //if not, remove and delete any previous token
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

const AuthProvider = ({ children }) => {
  const [state, action] = useReducer(reducer, initialState);
  // updatedProfile

  useEffect(() => {
    const initialize = async () => {
      try {
        //define accessToken got from localStorage
        const accessToken = window.localStorage.getItem("accessToken");
        //
        //if accessToken exists and valid
        if (accessToken && isValidToken) {
          //setSession to call api with accessToken
          setSession(accessToken);
          //and get user data
          const response = await apiService.get("/users/me");
          const user = response.user; //
          //save user data to redux store as user from payload
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          //setSession with null
          setSession(null);
          //and trigger action type INITIALIZE with false authentication
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        //log err
        console.log(error);
        //setSession with null
        setSession(null);
        //and trigger action type INITIALIZE with false authentication
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
  }, []);
  //replace with backend api endpoints
  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callback();
  };
  //replace with backend api endpoints
  const register = async ({ email, password }, callback) => {
    const response = await apiService.post("/users", { email, password });
    const { user, accessToken } = response.data;
    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT_SUCCESS });
    callback();
  };

  // useEffect(() => {}, [updatedProfile])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
