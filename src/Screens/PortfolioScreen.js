import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default PortfolioScreen = ({ navigation }) => {
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [cryptoList, setCryptoList] = useState();
  const [coinCount, setCoinCount] = useState(0);
  const [coinValue, setCoinValue] = useState(0);
  const [portfolioList, setPortfolioList] = useState();

  const fetchCryptoList = () => {
    setLoadingModalVisible(true);
    fetch(
      'https://data.messari.io/api/v2/assets?fields=id,slug,symbol,metrics/market_data'
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptoList(data.data);
        setLoadingModalVisible(false);
      });
  };

  const fetchPortfolioList = async () => {
    setLoadingModalVisible(true);
    const portfolios = await AsyncStorage.getItem('portfolios');
    setPortfolioList(JSON.parse(portfolios));
    setLoadingModalVisible(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCryptoList();
      fetchPortfolioList();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (cryptoList) {
      setCoinValue(cryptoList[0].metrics.market_data.ohlcv_last_1_hour.low);
    }
  }, [cryptoList]);

  return (
    <View>
      <FlatList
        data={portfolioList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text>{item.amount}</Text>;
        }}
      />
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
