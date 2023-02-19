import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import AuthContext from "../contexts/Authentication";
import { Title } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');

    const { setUserId } = useContext(AuthContext);

    const { client } = useChatContext();

    const connectUser = async (username: string, fullname: string) => {
        await client.connectUser(
          {
            id: username,
            name: fullname,
            // image: 'https://i.imgur.com/fR9Jz14.png', 
          },
          client.devToken(username),
        );
        console.log("User connected");
  
        // create a channel
        // const channel = client.channel('livestream', 'live', {name: 'live'});
        // await channel.create();

        setUserId(username);
    };

    const signUp = () =>{
        connectUser(username, fullname);
    };

    return (
        <SafeAreaView style={styles.root}>
            <Title style={styles.titleText}>Welcome!</Title>
            <View style={styles.inputContainer}>
                <TextInput 
                value={username} 
                onChangeText={setUsername}
                placeholder="User ID"
                placeholderTextColor="gray"
                style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput 
                value={fullname} 
                onChangeText={setFullname}
                placeholder="Display Name"
                placeholderTextColor="gray"
                style={styles.input}
                />
            </View>

            <Pressable onPress={signUp} style={styles.button}>
                <Text style={styles.textbtn}>Sign up</Text>
            </Pressable>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        // backgroundColor: 'white',
        // padding: 10,
        // marginVertical: 10,
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15,
        backgroundColor: '#e8e0ed',
        paddingLeft: 15,
    },
    button: {
        backgroundColor: '#5c396f',
        marginVertical: 10,
        borderRadius: 10,
        width: width / 2,
        height: height / 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10,
    },
    textbtn: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default SignupScreen;