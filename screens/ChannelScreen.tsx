import { useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text } from "react-native";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

const ChannelScreen = () => {
    const route = useRoute();

    const channel = route.params?.channel;

    if(!channel){
        return <Text>Channel not found!</Text>
    }

    return (
        <Channel channel={channel}>
            <MessageList />
            <MessageInput />
        </Channel>
    );
};

export default ChannelScreen;