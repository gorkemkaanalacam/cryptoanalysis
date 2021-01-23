import { StyleSheet } from 'react-native';
import ConstantStyle from './ConstantStyle';

export default Style = StyleSheet.create({
  view: {
    padding: 20,
  },
  text: {
    color: ConstantStyle.primaryColor,
  },
  textInput: {
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: ConstantStyle.inputColor,
  },
  button: {
    color: ConstantStyle.inputColor,
  },
});
