import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

export default LoadingModal = ({ isVisible }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View>
          <ActivityIndicator color="#fff" size={40} />
        </View>
      </View>
    </Modal>
  );
};
