import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Button,
  Linking,
} from 'react-native';
import LoadingModal from '../Components/LoadingModal';
import rssParser from 'react-native-rss-parser';

export default NewsListScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [newsList, setNewsList] = useState();

  const fetchNewsList = () => {
    setRefreshing(false);
    setLoadingModalVisible(true);
    fetch('https://tr.investing.com/rss/news_301.rss')
      .then((response) => response.text())
      .then(async (responseData) => {
        const rss = await rssParser.parse(responseData);
        setNewsList(rss.items);
        setLoadingModalVisible(false);
      });
  };

  useEffect(() => {
    fetchNewsList();
  }, []);

  return (
    <View>
      <FlatList
        data={newsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.title}</Text>
              <Button
                title="go"
                onPress={() => Linking.openURL(item.links[0].url)}
              />
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchNewsList} />
        }
      />
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
