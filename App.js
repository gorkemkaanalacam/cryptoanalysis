import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootNavigator from './src/Navigators/RootNavigator';
import Provider from './src/Context/Provider';
import { StatusBar } from 'expo-status-bar';
import ConstantStyle from './src/Assets/Styles/ConstantStyle';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: ConstantStyle.primaryColor,
    background: ConstantStyle.backgroundColor,
    border: ConstantStyle.tabBackgroundColor,
    text: ConstantStyle.primaryColor,
    card: ConstantStyle.tabBackgroundColor,
  },
};

export default App = ({ navigation }) => {
  return (
    <Provider>
      <StatusBar />
      <NavigationContainer theme={MyTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};
