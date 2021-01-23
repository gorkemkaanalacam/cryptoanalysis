import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import LoadingModal from '../Components/LoadingModal';

export default CalendarScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [calander, setCalander] = useState();

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
          return <Text>{item.Event}</Text>;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchCalander} />
        }
      />
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
