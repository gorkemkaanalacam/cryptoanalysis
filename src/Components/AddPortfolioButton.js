import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default AddPortfolioButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PortfolioAdd')}>
      <Ionicons name="add" size={24} color="black" />
    </TouchableOpacity>
  );
};
