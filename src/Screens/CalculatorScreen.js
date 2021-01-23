import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default CalculatorScreen = () => {
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [cryptoList, setCryptoList] = useState();
  const [coinCount, setCoinCount] = useState(0);
  const [coinValue, setCoinValue] = useState(0);
  const [coinType, setCoinType] = useState(0);

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

  useEffect(() => {
    fetchCryptoList();
  }, []);

  useEffect(() => {
    if (cryptoList) {
      setCoinValue(cryptoList[0].metrics.market_data.ohlcv_last_1_hour.high);
    }
  }, [cryptoList]);

  useEffect(() => {
    if (coinType) {
      setCoinValue(
        cryptoList.filter((x) => x.symbol === coinType)[0].metrics.market_data
          .ohlcv_last_1_hour.high
      );
    }
  }, [coinType]);

  return (
    <View>
      <TextInput
        placeholder="Value"
        value={coinCount.toString()}
        onChangeText={setCoinCount}
        keyboardType="number-pad"
      />
      <Picker onValueChange={setCoinType} selectedValue={coinType}>
        {cryptoList?.map((item) => {
          return (
            <Picker.Item key={item.id} label={item.slug} value={item.symbol} />
          );
        })}
      </Picker>
      <Text>{coinValue * coinCount}</Text>
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
