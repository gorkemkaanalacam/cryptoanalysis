import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Style from '../Assets/Styles/Style';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

export default CalculatorScreen = () => {
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [cryptoList, setCryptoList] = useState();
  const [coinCount, setCoinCount] = useState();
  const [coinValue, setCoinValue] = useState();
  const [coinType, setCoinType] = useState();

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
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          backgroundColor: ConstantStyle.inputColor,
        }}
      >
        <TextInput
          style={{
            ...Style.textInput,
            flex: 1,
            margin: 0,
            fontSize: 26,
          }}
          placeholder="0"
          placeholderTextColor={ConstantStyle.primaryColor}
          value={coinCount && coinCount}
          onChangeText={setCoinCount}
          keyboardType="number-pad"
        />
        <View
          style={{
            flexShrink: 0,
            width: 130,
            paddingTop: 10,
          }}
        >
          <Picker
            onValueChange={setCoinType}
            selectedValue={coinType}
            dropdownIconColor="#00000000"
            style={{
              color: ConstantStyle.primaryColor,
            }}
          >
            {cryptoList?.map((item) => {
              return (
                <Picker.Item
                  key={item.id}
                  label={item.slug.charAt(0).toUpperCase() + item.slug.slice(1)}
                  value={item.symbol}
                />
              );
            })}
          </Picker>
        </View>
      </View>
      <Text
        style={{
          ...Style.textInput,
          paddingVertical: 30,
          marginTop: 0,
          borderTopWidth: 1,
          fontSize: 26,
        }}
      >
        {coinCount ? '$' + (coinValue * coinCount).toFixed(2) : '0'}
      </Text>
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
