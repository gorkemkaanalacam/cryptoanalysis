import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingModal from '../Components/LoadingModal';
import Style from '../Assets/Styles/Style';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

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
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const percent =
            item.metrics.market_data.percent_change_usd_last_24_hours;
          const percentColor = percent.toString().includes('-')
            ? 'red'
            : 'green';

          return (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
              onPress={() =>
                navigation.navigate('CryptoDetail', {
                  currency: item,
                })
              }
            >
              <View style={{ flex: 1 }}>
                <Text style={{ ...Style.text, fontSize: 16 }}>
                  {item.slug.charAt(0).toUpperCase() + item.slug.slice(1)}
                </Text>
                <Text style={{ color: ConstantStyle.thirdColor }}>
                  {item.symbol}
                </Text>
              </View>
              <View style={{ flexShrink: 0, alignItems: 'flex-end' }}>
                <Text style={{ ...Style.text, fontSize: 16 }}>
                  {item.metrics.market_data.price_usd.toFixed(2)}
                </Text>
                <Text style={{ ...Style.text, color: percentColor }}>
                  {'%' +
                    item.metrics.market_data.percent_change_usd_last_24_hours.toFixed(
                      2
                    )}
                </Text>
              </View>
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
