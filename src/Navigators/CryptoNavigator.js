import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CryptoListScreen from '../Screens/CryptoListScreen';
import CryptoDetailScreen from '../Screens/CryptoDetailScreen';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

const CryptoStackNavigator = createStackNavigator();

export default CryptoNavigator = () => {
  return (
    <CryptoStackNavigator.Navigator>
      <CryptoStackNavigator.Screen
        name="CryptoList"
        component={CryptoListScreen}
        options={{ title: 'Piyasalar' }}
      />
      <CryptoStackNavigator.Screen
        name="CryptoDetail"
        component={CryptoDetailScreen}
      />
    </CryptoStackNavigator.Navigator>
  );
};
