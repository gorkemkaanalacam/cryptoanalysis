import React, { useContext } from 'react';
import { Image } from 'react-native';
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
        options={{
          title: 'Haberler',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Image
              source={require('../../assets/icon.png')}
              style={{ width: 50, height: 50 }}
            />
          ),
        }}
      />
      <NewsStackNavigator.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{ title: '' }}
      />
    </NewsStackNavigator.Navigator>
  );
};
