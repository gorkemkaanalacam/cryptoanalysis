import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

export default LoadingModal = ({ isVisible }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          backgroundColor: '#000',
          flex: 1,
          opacity: 0.5,
          justifyContent: 'center',
        }}
      >
        <View>
          <ActivityIndicator color="#000" size={40} />
        </View>
      </View>
    </Modal>
  );
};
