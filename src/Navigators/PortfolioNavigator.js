import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PortfolioScreen from '../Screens/PortfolioScreen';
import PortfolioAddScreen from '../Screens/PortfolioAddScreen';
import AddPortfolioButton from '../Components/AddPortfolioButton';

const PortfolioStackNavigator = createStackNavigator();

export default PortfolioNavigator = () => {
  return (
    <PortfolioStackNavigator.Navigator>
      <PortfolioStackNavigator.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={({ navigation }) => {
          return {
            headerRight: () => <AddPortfolioButton navigation={navigation} />,
          };
        }}
      />
      <PortfolioStackNavigator.Screen
        name="PortfolioAdd"
        component={PortfolioAddScreen}
      />
    </PortfolioStackNavigator.Navigator>
  );
};
