import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAction from './AuthAction';
import authReducer from './AuthReducer';

const Context = createContext();

export default Provider = ({ children }) => {
  const [state, dispatch] = useReducer(
    authReducer.reducer,
    authReducer.initalState
  );

  const authContext = useMemo(() => authAction(dispatch), []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  return (
    <Context.Provider value={{ authContext, state }}>
      {children}
    </Context.Provider>
  );
};

export { Context };
