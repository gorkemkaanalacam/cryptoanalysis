import React, { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CryptoNavigator from './CryptoNavigator';
import NewsNavigator from './NewsNavigator';
import EconomicsNavigator from './EconomicsNavigator';
import CalculatorNavigator from './CalculatorNavigator';
import PortfolioNavigator from './PortfolioNavigator';
import HomeScreen from '../Screens/HomeScreen';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

const AppBottomTabNavigator = createBottomTabNavigator();

export default AppNavigator = () => {
  return (
    <AppBottomTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Crypto') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Economics') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Calculator') {
            iconName = focused ? 'calculator' : 'calculator-outline';
          } else if (route.name === 'Portfolio') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: ConstantStyle.secondaryColor,
        inactiveTintColor: ConstantStyle.primaryColor,
        activeBackgroundColor: ConstantStyle.tabBackgroundColor,
        inactiveBackgroundColor: ConstantStyle.tabBackgroundColor,
      }}
    >
      <AppBottomTabNavigator.Screen
        name="Crypto"
        component={CryptoNavigator}
        options={{ title: 'Piyasalar' }}
      />
      <AppBottomTabNavigator.Screen
        name="Portfolio"
        component={PortfolioNavigator}
        options={{ title: 'Portfolyo' }}
      />
      <AppBottomTabNavigator.Screen
        name="News"
        component={NewsNavigator}
        options={{ title: 'Haberler' }}
      />
      <AppBottomTabNavigator.Screen
        name="Economics"
        component={EconomicsNavigator}
        options={{ title: 'Takvim' }}
      />
      <AppBottomTabNavigator.Screen
        name="Calculator"
        component={CalculatorNavigator}
        options={{ title: 'Hesaplayıcı' }}
      />
      <AppBottomTabNavigator.Screen name="Home" component={HomeScreen} />
    </AppBottomTabNavigator.Navigator>
  );
};
