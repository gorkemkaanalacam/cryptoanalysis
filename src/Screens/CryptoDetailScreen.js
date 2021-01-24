import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoadingModal from '../Components/LoadingModal';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import Style from '../Assets/Styles/Style';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

export default CryptoDetailScreen = ({ route, navigation }) => {
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [cryptoAnalysis, setCryptoAnalysis] = useState();
  const [chartDatasets, setChartDatasets] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  const currency = route.params.currency;
  const slug = currency.slug.charAt(0).toUpperCase() + currency.slug.slice(1);
  const marketData = currency.metrics.market_data;
  navigation.setOptions({ title: slug });

  console.log();

  const fetchCryptoAnalysis = () => {
    const start = moment().add(-7, 'days').format('YYYY-MM-DD');
    const end = moment().format('YYYY-MM-DD');
    setLoadingModalVisible(true);
    fetch(
      `https://data.messari.io/api/v1/assets/${slug}/metrics/price/time-series?start=${start}&end=${end}&interval=1d`
    )
      .then((response) => response.json())
      .then((data) => {
        setChartLabels(
          data.data.values.map((item) => {
            return moment(item[0]).locale('tr').format('ddd');
          })
        );
        setChartDatasets(
          data.data.values.map((item) => {
            return item[1].toFixed(2);
          })
        );
        setCryptoAnalysis(data.data);
        setLoadingModalVisible(false);
      });
  };

  useEffect(() => {
    fetchCryptoAnalysis();
  }, []);

  return (
    <>
      {cryptoAnalysis && chartDatasets && chartLabels && (
        <View style={{ flex: 1 }}>
          <LineChart
            data={{
              labels: chartLabels,
              datasets: [
                {
                  data: chartDatasets,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: ConstantStyle.tabBackgroundColor,
              backgroundGradientFrom: ConstantStyle.tabBackgroundColor,
              backgroundGradientTo: ConstantStyle.backgroundColor,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 5,
              },
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: ConstantStyle.secondaryColor,
              },
            }}
            bezier
            style={{
              margin: 10,
              borderRadius: 5,
            }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <View
                style={{
                  backgroundColor: ConstantStyle.inputColor,
                  margin: 10,
                  padding: 10,
                  flex: 1,
                }}
              >
                <Text style={{ color: ConstantStyle.thirdColor }}>Değişim</Text>
                <Text style={{ ...Style.text, fontSize: 20 }}>
                  {'%' + marketData.percent_change_usd_last_24_hours.toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: ConstantStyle.inputColor,
                  margin: 10,
                  padding: 10,
                  flex: 1,
                }}
              >
                <Text style={{ color: ConstantStyle.thirdColor }}>Hacim</Text>
                <Text style={{ ...Style.text, fontSize: 20 }}>
                  {'$' + marketData.volume_last_24_hours.toFixed(0)}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <View
                style={{
                  backgroundColor: ConstantStyle.inputColor,
                  margin: 10,
                  padding: 10,
                  flex: 1,
                }}
              >
                <Text style={{ color: ConstantStyle.thirdColor }}>Düşük</Text>
                <Text style={{ ...Style.text, fontSize: 20 }}>
                  {'$' + marketData.ohlcv_last_24_hour.low.toFixed(2)}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: ConstantStyle.inputColor,
                  margin: 10,
                  padding: 10,
                  flex: 1,
                }}
              >
                <Text style={{ color: ConstantStyle.thirdColor }}>Yüksek</Text>
                <Text style={{ ...Style.text, fontSize: 20 }}>
                  {'$' + marketData.ohlcv_last_24_hour.high.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
      <LoadingModal isVisible={loadingModalVisible} />
    </>
  );
};
