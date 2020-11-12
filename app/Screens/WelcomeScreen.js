import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function WelcomeScreen( {navigation} ) {

    return (
        <ImageBackground style={styles.background}
        source={require("../assets/welcome-screen.jpg")}>

                <Image style={styles.logo}
                source={require("../assets/logo.png")}></Image>  

                <Button
                style={styles.startText}
                title="Start Now"
                onPress={() => navigation.navigate('Page1')}></Button>

            <View style={styles.startButton} onPress={() => navigation.push('Page1')}><Text style={styles.startText}>START</Text></View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent: 'flex-end',
        alignItems: "center",
    },

    logo:{
        //position: "absolute",
        marginTop:"auto",
        marginBottom: "auto",
    },

    startButton:{
        width:"100%",
        height: "8%",
        backgroundColor: "lightblue",
        alignItems: "center",
    },

    startText:{
        color: "white",
        fontSize : 45,
    }
})


