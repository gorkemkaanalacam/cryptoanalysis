import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingModal from '../Components/LoadingModal';
import Style from '../Assets/Styles/Style';

export default CryptoListScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [cryptoList, setCryptoList] = useState();

  const fetchCryptoList = () => {
    setRefreshing(false);
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

  return (
    <View>
      <FlatList
        data={cryptoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CryptoDetail', { slug: item.slug })
              }
            >
              <Text style={Style.Text}>{item.slug}</Text>
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchCryptoList} />
        }
      />
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
