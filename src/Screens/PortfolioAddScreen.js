import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import ConstantStyle from '../Assets/Styles/ConstantStyle';
import Style from '../Assets/Styles/Style';
import { color } from 'react-native-reanimated';

export default PortfolioAddScreen = ({ navigation }) => {
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [cryptoList, setCryptoList] = useState();
  const [currency, setCurrency] = useState();
  const [portfolioList, setPortfolioList] = useState();
  const { control, handleSubmit, errors } = useForm();

  useEffect(() => {
    getPortfolioList();
    fetchCryptoList();
  }, []);

  const getPortfolioList = () => {
    AsyncStorage.getItem('portfolios').then((value) => {
      const portfolios = JSON.parse(value);
      setPortfolioList(portfolios);
    });
  };

  const fetchCryptoList = () => {
    setLoadingModalVisible(true);
    fetch(
      'https://data.messari.io/api/v2/assets?fields=id,slug,symbol,metrics/market_data/price_usd'
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptoList(data.data);
        setCurrency(data.data[0]);
        setLoadingModalVisible(false);
      });
  };

  const setPortfolio = (portfolios) => {
    AsyncStorage.setItem('portfolios', JSON.stringify(portfolios));
    navigation.goBack();
  };

  const onSubmit = (data) => {
    const portfolios = portfolioList ? portfolioList : [];
    data = {
      ...data,
      value: currency.metrics.market_data.price_usd,
      date: new Date(),
      currency: currency.symbol,
    };
    portfolios.push(data);
    setPortfolio(portfolios);
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{
            ...Style.textInput,
            flex: 1,
            marginRight: 10,
          }}
          value={
            currency &&
            currency.metrics.market_data.price_usd.toFixed(2).toString()
          }
          editable={false}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 10,
            backgroundColor: ConstantStyle.inputColor,
          }}
        >
          <Picker
            onValueChange={setCurrency}
            selectedValue={currency}
            dropdownIconColor="#00000000"
            style={{
              color: ConstantStyle.primaryColor,
            }}
          >
            {cryptoList?.map((item) => {
              return (
                <Picker.Item key={item.id} label={item.slug} value={item} />
              );
            })}
          </Picker>
        </View>
      </View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={Style.textInput}
            placeholderTextColor={ConstantStyle.thirdColor}
            placeholder="Birim Miktarı"
            keyboardType="number-pad"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="amount"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.amount && <Text style={Style.text}>Bu alan zorunludur.</Text>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={Style.textInput}
            placeholderTextColor={ConstantStyle.thirdColor}
            placeholder="Not"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="not"
        defaultValue=""
      />

      <Button
        title="Kaydet"
        color={ConstantStyle.inputColor}
        onPress={handleSubmit(onSubmit)}
      />
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
