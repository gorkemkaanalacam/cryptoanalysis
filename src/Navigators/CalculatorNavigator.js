import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CalculatorScreen from '../Screens/CalculatorScreen';

const CalculatorStackNavigator = createStackNavigator();

export default CalculatorNavigator = () => {
  return (
    <CalculatorStackNavigator.Navigator>
      <CalculatorStackNavigator.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          title: 'Hesaplayıcı',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Image
              source={require('../../assets/icon.png')}
              style={{ width: 50, height: 50 }}
            />
          ),
        }}
      />
    </CalculatorStackNavigator.Navigator>
  );
};
