import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

export default AddPortfolioButton = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PortfolioAdd')}>
      <Ionicons
        name="add"
        size={24}
        color={ConstantStyle.primaryColor}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  );
};
