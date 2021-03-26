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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Style from '../Assets/Styles/Style';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

export default NewsListScreen = ({ navigation }) => {
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NewsDetail', { source: item.links[0].url })
              }
            >
              <View
                style={{
                  padding: 10,
                  backgroundColor: ConstantStyle.inputColor,
                  marginBottom: 10,
                  height: 140,
                }}
              >
                <Text style={{ ...Style.text, fontSize: 17 }}>
                  {item.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                  }}
                >
                  <Text
                    style={{ color: ConstantStyle.thirdColor, fontSize: 12 }}
                  >
                    {item.published}
                  </Text>
                  <Text style={{ color: ConstantStyle.secondaryColor }}>
                    Investing
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
