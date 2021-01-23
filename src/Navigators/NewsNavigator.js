import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CryptoListScreen from '../Screens/CryptoListScreen';
import NewsListScreen from '../Screens/NewsListScreen';

const NewsStackNavigator = createStackNavigator();

export default NewsNavigator = () => {
  return (
    <NewsStackNavigator.Navigator>
      <NewsStackNavigator.Screen name="NewsList" component={NewsListScreen} />
    </NewsStackNavigator.Navigator>
  );
};
