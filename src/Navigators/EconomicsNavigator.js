import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../Screens/CalendarScreen';

const EconomicsStackNavigator = createStackNavigator();

export default EconomicsNavigator = () => {
  return (
    <EconomicsStackNavigator.Navigator>
      <EconomicsStackNavigator.Screen
        name="Calendar"
        component={CalendarScreen}
      />
    </EconomicsStackNavigator.Navigator>
  );
};
