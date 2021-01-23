import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingModal from '../Components/LoadingModal';
import { LineChart } from 'react-native-chart-kit';

export default CryptoDetailScreen = ({ route }) => {
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [cryptoAnalysis, setCryptoAnalysis] = useState();

  const slug = route.params.slug;

  const fetchCryptoAnalysis = () => {
    setLoadingModalVisible(true);
    fetch(
      `https://data.messari.io/api/v1/assets/${slug}/metrics/price/time-series?start=2020-01-01&end=2020-01-07&interval=1d`
    )
      .then((response) => response.json())
      .then((data) => {
        setCryptoAnalysis(data.data);
        setLoadingModalVisible(false);
      });
  };

  useEffect(() => {
    fetchCryptoAnalysis();
  }, []);

  return (
    <View>
      <Text>Crypto Detail Screen</Text>
      {cryptoAnalysis && (
        <LineChart
          data={{
            labels: [
              '2020-01-01',
              '2020-01-02',
              '2020-01-03',
              '2020-01-04',
              '2020-01-05',
              '2020-01-06',
            ],
            datasets: [
              {
                data: cryptoAnalysis.values[0],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}

      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
