import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PortfolioScreen from '../Screens/PortfolioScreen';
import PortfolioAddScreen from '../Screens/PortfolioAddScreen';
import AddPortfolioButton from '../Components/AddPortfolioButton';

const PortfolioStackNavigator = createStackNavigator();

export default PortfolioNavigator = () => {
  return (
    <PortfolioStackNavigator.Navigator>
      <PortfolioStackNavigator.Screen
        name="Portfolyo"
        component={PortfolioScreen}
        options={({ navigation }) => {
          return {
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Image
                source={require('../../assets/icon.png')}
                style={{ width: 50, height: 50 }}
              />
            ),
            headerRight: () => <AddPortfolioButton navigation={navigation} />,
          };
        }}
      />
      <PortfolioStackNavigator.Screen
        name="PortfolioAdd"
        component={PortfolioAddScreen}
        options={{
          title: 'Portfolyo Ekle',
        }}
      />
    </PortfolioStackNavigator.Navigator>
  );
};
