import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import LoadingModal from "../Components/LoadingModal";
import moment from "moment";
import Style from "../Assets/Styles/Style";
import ConstantStyle from "../Assets/Styles/ConstantStyle";
import WebView from "react-native-webview";

export default CryptoDetailScreen = ({ route, navigation }) => {
  const [onLoadView, setOnLoadView] = useState(true);

  const currency = route.params.currency;
  const slug = currency.slug.charAt(0).toUpperCase() + currency.slug.slice(1);
  const marketData = currency.metrics.market_data;

  useEffect(() => {
    navigation.setOptions({ title: slug });
  }, []);

  return (
    <>
        <WebView
          style={{
            flex: 1,
            backgroundColor: ConstantStyle.backgroundColor,
            transform:[{scale: onLoadView ? 0 : 1}]
          }}
          scalesPageToFit={false}
          source={{ uri: "http://yureginesaglik.site/graphs/test.html" }}
          startInLoadingState={true}
          renderLoading={() => <LoadingModal isVisible={true} />}
          onLoad={() => setOnLoadView(false)}
        />
      {onLoadView ? (
        null
      ) : (
        <View style={{ flex: 0.5 }}>
          <View style={{ flexDirection: "row", padding: 5 }}>
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
                {"%" + marketData.percent_change_usd_last_24_hours.toFixed(2)}
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
                {"$" + marketData.volume_last_24_hours.toFixed(0)}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", padding: 5 }}>
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
                {"$" + marketData.ohlcv_last_24_hour.low.toFixed(2)}
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
                {"$" + marketData.ohlcv_last_24_hour.high.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
