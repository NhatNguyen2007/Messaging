import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useChatContext } from "stream-chat-expo";
import AuthContext from "../contexts/Authentication";

const UserListItem = ({user}: any) => {
    const { client } = useChatContext();
    const { userId } = useContext(AuthContext);
    const navigation = useNavigation();

    const onPress = async () => {
        if(!user.id || !userId){
            return;
        }
        const channel = client.channel("messaging", {members: [user.id, userId]});
        await channel.watch();

        navigation.navigate("Channel", {channel});
    };

    return (
        <Pressable onPress={onPress} style={styles.root}>
            <Image style={styles.image} source={{uri: user.image}}/>
            <Text>{user.name}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'gray',
        marginRight: 10,
    },
});

export default UserListItem;