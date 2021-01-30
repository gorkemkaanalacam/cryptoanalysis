import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../Screens/CalendarScreen';

const EconomicsStackNavigator = createStackNavigator();

export default EconomicsNavigator = () => {
  return (
    <EconomicsStackNavigator.Navigator>
      <EconomicsStackNavigator.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Takvim',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Image
              source={require('../../assets/icon.png')}
              style={{ width: 50, height: 50 }}
            />
          ),
        }}
      />
    </EconomicsStackNavigator.Navigator>
  );
};
