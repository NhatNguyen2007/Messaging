import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useEffect, useState, useContext } from 'react';
import { StreamChat } from 'stream-chat';
import { 
  OverlayProvider, 
  Chat, 
  ChannelList, 
  Channel, 
  MessageList,
  MessageInput, 
} from 'stream-chat-expo';
import { Text } from 'react-native';

import AuthContext from './contexts/Authentication';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = "nrxbatsww478";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userId, setUserId] = useState('');

  useEffect(() => {
    return () => {client.disconnectUser()};
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{userId: userId, setUserId: setUserId}}>
          <OverlayProvider>
            <Chat client={client}>
              <Navigation colorScheme='dark'/>
            </Chat>
            {/* <Chat client={client}>
              
              {selectedChannel ? (
                <Channel channel={selectedChannel}>
                  <MessageList />
                  <MessageInput />
                  <Text style={{marginTop: 50}} onPress={() => setSelectedChannel(null)}>GO BACK</Text>
                </Channel>
              ) : (
                <ChannelList onSelect={onChannelPressed}/>
              )}

            </Chat> */}
          </OverlayProvider>
          <StatusBar />
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
