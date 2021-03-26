import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import LoadingModal from "../Components/LoadingModal";
import Style from "../Assets/Styles/Style";
import ConstantStyle from "../Assets/Styles/ConstantStyle";
import moment from "moment";

export default AnalysisListScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [analyzes, setAnalyzes] = useState();

  const fetchAnalyzes = () => {
    setRefreshing(false);
    setLoadingModalVisible(true);
    fetch("http://yureginesaglik.site/wp-json/wp/v2/analysis/")
      .then((response) => response.json())
      .then((data) => {
        setAnalyzes(data);
        setLoadingModalVisible(false);
      });
  };

  useEffect(() => {
    fetchAnalyzes();
  }, []);

  return (
    <View>
      <FlatList
        data={analyzes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 20,
                marginBottom: 10,
                backgroundColor: ConstantStyle.inputColor
              }}
            >
              <View style={{ flex: 1, alignItems:'center' }}>
                <Text style={{ ...Style.text, fontSize: 16 }}>
                  {item.acf.title}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 8 }}>
                  <Text
                    style={{ color: ConstantStyle.thirdColor, fontSize: 12 }}
                  >
                    {item.acf.description}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAnalyzes} />
        }
      />
      <LoadingModal isVisible={loadingModalVisible} />
    </View>
  );
};
