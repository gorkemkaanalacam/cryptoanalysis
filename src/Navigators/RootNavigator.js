import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from '../Navigators/AppNavigator';
import AuthNavigator from '../Navigators/AuthNavigator';
import { Context } from '../Context/Provider';

const RootStackNavigator = createStackNavigator();

export default RootNavigator = () => {
  const { state } = useContext(Context);

  return (
    <RootStackNavigator.Navigator>
      {state.userToken == null ? (
        <RootStackNavigator.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStackNavigator.Screen
          name="App"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      )}
    </RootStackNavigator.Navigator>
  );
};
