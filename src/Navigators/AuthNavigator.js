import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

const AuthStackNavigator = createStackNavigator();

export default AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Giriş' }}
      />
      <AuthStackNavigator.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Kayıt' }}
      />
    </AuthStackNavigator.Navigator>
  );
};
