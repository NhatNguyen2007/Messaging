import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ChannelList } from 'stream-chat-expo';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import AuthContext from '../contexts/Authentication';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { userId } = useContext(AuthContext);

  const filters = {
    members: {
      $in: [userId],
    }
  };

  const onChannelPressed = (channel: any) => {
    navigation.navigate("Channel", {channel});
  }

  return (
    <ChannelList onSelect={onChannelPressed} filters={filters}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
