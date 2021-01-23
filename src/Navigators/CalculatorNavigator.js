import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalculatorScreen from '../Screens/CalculatorScreen';

const CalculatorStackNavigator = createStackNavigator();

export default CalculatorNavigator = () => {
  return (
    <CalculatorStackNavigator.Navigator>
      <CalculatorStackNavigator.Screen
        name="Calculator"
        component={CalculatorScreen}
      />
    </CalculatorStackNavigator.Navigator>
  );
};
