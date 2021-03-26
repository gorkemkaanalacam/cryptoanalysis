import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AnalysisListScreen from '../Screens/AnalysisListScreen';

const EconomicsStackNavigator = createStackNavigator();

export default EconomicsNavigator = () => {
  return (
    <EconomicsStackNavigator.Navigator>
    <EconomicsStackNavigator.Screen
      name="AnalysisList"
      component={AnalysisListScreen}
      options={{
        title: 'Analizler',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Image
            source={require('../../assets/icon.png')}
            style={{ width: 50, height: 50 }}
          />
        ),
      }}
    />
      {/* <EconomicsStackNavigator.Screen
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
      /> */}
    </EconomicsStackNavigator.Navigator>
  );
};
