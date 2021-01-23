import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { Context } from '../Context/Provider';

export default HomeScreen = () => {
  const {
    authContext: { signOut },
  } = useContext(Context);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
};
