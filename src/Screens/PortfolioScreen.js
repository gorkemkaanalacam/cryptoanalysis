import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style from '../Assets/Styles/Style';
import ConstantStyle from '../Assets/Styles/ConstantStyle';
import moment from 'moment';

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
      setCoinValue(cryptoList[0].metrics.market_data.ohlcv_last_1_hour.high);
    }
  }, [cryptoList]);

  return (
    <View>
      <FlatList
        data={cryptoList && portfolioList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const currencyValue = cryptoList.filter(
            (x) => x.symbol == item.currency
          )[0].metrics.market_data.ohlcv_last_1_hour.high;
          const result = ((item.value - currencyValue) * item.amount)
            .toFixed(2)
            .toString();
          const color = result.includes('-') ? 'red' : 'green';
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: ConstantStyle.inputColor,
                margin: 10,
                padding: 10,
              }}
            >
              <View>
                <Text style={Style.text}>
                  {item.currency + ' ' + item.amount}
                </Text>
                <Text style={Style.text}>
                  {'Alış $' + item.value.toFixed(2)}
                </Text>
                <Text style={Style.text}>
                  {moment(item.date).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={Style.text}>
                  {'$' + (item.value * item.amount).toFixed(2)}
                </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ ...Style.text, color: color }}>
                  {'$' + result}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
