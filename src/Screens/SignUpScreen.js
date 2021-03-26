import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import { Context } from '../Context/Provider';
import Style from '../Assets/Styles/Style';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

export default SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const {
    authContext: { signUp },
  } = useContext(Context);

  return (
    <View style={Style.view}>
      <View style={{ alignItems: 'center', marginVertical: 70 }}>
        <Image
          source={require('../../assets/icon.png')}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <TextInput
        style={Style.textInput}
        placeholderTextColor={ConstantStyle.thirdColor}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{ ...Style.textInput, marginBottom: 30 }}
        placeholderTextColor={ConstantStyle.thirdColor}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={{ ...Style.textInput, marginBottom: 30 }}
        placeholderTextColor={ConstantStyle.thirdColor}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        secureTextEntry
      />
      <Button
        title="Kayıt Ol"
        color={ConstantStyle.inputColor}
        onPress={() => signUp({ username, password, phone })}
      />
    </View>
  );
};
