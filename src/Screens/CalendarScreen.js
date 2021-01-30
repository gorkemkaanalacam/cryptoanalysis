import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import LoadingModal from '../Components/LoadingModal';
import Style from '../Assets/Styles/Style';
import ConstantStyle from '../Assets/Styles/ConstantStyle';
import moment from 'moment';

export default CalendarScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [calander, setCalander] = useState();

  console.log(calander && calander[0]);

  const fetchCalander = () => {
    setRefreshing(false);
    setLoadingModalVisible(true);
    fetch(
      'https://api.tradingeconomics.com/calendar?c=iye18mubph5qekj:8vf5yo0xkpak0oh'
    )
      .then((response) => response.json())
      .then((data) => {
        setCalander(data);
        setLoadingModalVisible(false);
      });
  };

  useEffect(() => {
    fetchCalander();
  }, []);

  return (
    <View>
      <FlatList
        data={calander}
        keyExtractor={(item) => item.CalendarId}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                marginBottom: 10,
                backgroundColor: ConstantStyle.inputColor,
              }}
            >
              <View style={{ width: 100, alignItems: 'center', flexShrink: 0 }}>
                <Text style={{ ...Style.text, fontSize: 16 }}>
                  {item.Ticker.substring(0, 3)}
                </Text>
                <Text style={{ ...Style.text, marginTop: 5 }}>
                  {moment(item.Date).format('hh:mm')}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ ...Style.text, fontSize: 16 }}>
                  {item.Event}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <Text
                    style={{ color: ConstantStyle.thirdColor, fontSize: 12 }}
                  >
                    Şimdi
                  </Text>
                  <Text
                    style={{ color: ConstantStyle.thirdColor, fontSize: 12 }}
                  >
                    {item.Actual}
                  </Text>
                  <Text
                    style={{
                      color: ConstantStyle.thirdColor,
                      fontSize: 12,
                      marginLeft: 10,
                    }}
                  >
                    Tahmin
                  </Text>
                  <Text
                    style={{ color: ConstantStyle.thirdColor, fontSize: 12 }}
                  >
                    {item.Forecast}
                  </Text>
                  <Text
                    style={{
                      color: ConstantStyle.thirdColor,
                      fontSize: 12,
                      marginLeft: 10,
                    }}
                  >
                    Önce
                  </Text>
                  <Text
                    style={{ color: ConstantStyle.thirdColor, fontSize: 12 }}
                  >
                    {item.Previous}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexShrink: 0,
                  marginRight: 20,
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: ConstantStyle.secondaryColor }}>
                  {item.Importance}
                </Text>
              </View>
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchCalander} />
        }
      />
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
