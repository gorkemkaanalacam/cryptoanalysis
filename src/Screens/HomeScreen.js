import React, { useContext } from 'react';
import { SafeAreaView, Text, Button, View } from 'react-native';
import { Context } from '../Context/Provider';

export default HomeScreen = () => {
  const {
    authContext: { signOut },
  } = useContext(Context);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20,
      }}
    >
      <Button
        title="Sign out"
        onPress={() => signOut()}
        color={ConstantStyle.inputColor}
      />
    </View>
  );
};
