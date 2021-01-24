import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CryptoListScreen from '../Screens/CryptoListScreen';
import NewsListScreen from '../Screens/NewsListScreen';
import NewsDetailScreen from '../Screens/NewsDetailScreen';

const NewsStackNavigator = createStackNavigator();

export default NewsNavigator = () => {
  return (
    <NewsStackNavigator.Navigator>
      <NewsStackNavigator.Screen
        name="NewsList"
        component={NewsListScreen}
        options={{ title: 'Haberler' }}
      />
      <NewsStackNavigator.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{ title: '' }}
      />
    </NewsStackNavigator.Navigator>
  );
};
