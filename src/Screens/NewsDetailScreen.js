import React, { useEffect, useState } from 'react';
import LoadingModal from '../Components/LoadingModal';
import WebView from 'react-native-webview';

export default NewsDetailScreen = ({ route }) => {
  const source = route.params.source;

  return (
    <WebView
      source={{ uri: source }}
      renderLoading={<LoadingModal isVisible={true} />}
    />
  );
};
