import React, { useContext } from 'react';
import { Image } from 'react-native';
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
        options={{
          title: 'Piyasalar',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Image
              source={require('../../assets/icon.png')}
              style={{ width: 50, height: 50 }}
            />
          ),
        }}
      />
      <CryptoStackNavigator.Screen
        name="CryptoDetail"
        component={CryptoDetailScreen}
      />
    </CryptoStackNavigator.Navigator>
  );
};
