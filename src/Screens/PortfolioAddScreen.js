import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';

export default PortfolioAddScreen = ({ navigation }) => {
  const [portfolioList, setPortfolioList] = useState();
  const { control, handleSubmit, errors } = useForm();

  useEffect(() => {
    getPortfolioList();
  }, []);

  const getPortfolioList = () => {
    AsyncStorage.getItem('portfolios').then((value) => {
      const portfolios = JSON.parse(value);
      setPortfolioList(portfolios);
    });
  };

  const setPortfolio = (portfolios) => {
    AsyncStorage.setItem('portfolios', JSON.stringify(portfolios));
    navigation.goBack();
  };

  const onSubmit = (data) => {
    const portfolios = portfolioList;
    portfolios.push(data);
    setPortfolio(portfolios);
  };

  return (
    <View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="amount"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="not"
        defaultValue=""
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
