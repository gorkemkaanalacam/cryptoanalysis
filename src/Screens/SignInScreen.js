import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import { Context } from '../Context/Provider';
import Style from '../Assets/Styles/Style';
import ConstantStyle from '../Assets/Styles/ConstantStyle';

export default SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    authContext: { signIn },
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
      <Button
        title="GİRİŞ YAP"
        color={ConstantStyle.inputColor}
        onPress={() => signIn({ username, password })}
      />
    </View>
  );
};
