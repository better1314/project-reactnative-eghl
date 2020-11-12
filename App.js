import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Button, Image,TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { firebase } from './src/firebase/config'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App( {navigation} ) {
return (
  <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'Register') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                } else if (route.name === 'Login') {
                  iconName = focused ? 'ios-log-in' : 'ios-log-in';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'lightblue',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Register" component={Register} />
            <Tab.Screen name="Login" component={Login} />
          </Tab.Navigator>
      </NavigationContainer>
);
  
}

function Home( {navigation} ){
  return(
    <ImageBackground style={styles.background}
        source={require("./app/assets/welcome-screen.jpg")}>

          <View style={styles.logoContainer}>
            <Image style={styles.logo}
                  source={require("./app/assets/logo.png")}></Image>  
          </View>
            
        </ImageBackground>
  );
}


function Register ( {navigation} ){
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onRegisterPress = () => {
      if (password !== confirmPassword) {
        alert("Passwords don't match.")
        return
    }
    console.log("until here")
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            console.log(uid)
            const data = {
                id: uid,
                email,
                fullName,
            };
            navigation.navigate('Login')
        })
        .catch((error) => {
            alert(error)
    });

    }

  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
            style={styles.logo}
            source={require('./app/assets/logo.png')}
        />
        <TextInput
            style={styles.input}
            placeholder='Full Name'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder='E-mail'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Confirm Password'
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}>
            <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
    </KeyboardAwareScrollView>
</View>
  );    
}

function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLoginPress = () => {
    firebase.auth().setPersistence(
      firebase.auth.Auth.Persistence.LOCAL
    );
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
            .doc(uid)
            .get()
            .then(firestoreDocument => {
                if (!firestoreDocument.exists) {
                    alert("User does not exist anymore.")
                    return;
                }
                const user = firestoreDocument.data()
                navigation.navigate('Home')
            })
            .catch(error => {
                alert(error)
            });
    })
    .catch(error => {
        alert(error)
    })
  }

  return (
    <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('./app/assets/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
    </View>
  )
}

function Shop(){

}

function Logout(){

}

const styles = StyleSheet.create({
  background:{
      flex:1,
      justifyContent: 'flex-end',
      alignItems: "center",
  },

  logoContainer:{
    marginTop:"55%",
    marginBottom: "auto",
  },

  logo:{
      //position: "absolute",
      marginTop:"auto",
      marginBottom: "auto",
      marginLeft: "auto",
      marginRight: "auto",
  },
/////////Registration Page
container: {
  flex: 1,
  alignItems: 'center'
},

input: {
  height: 48,
  borderRadius: 5,
  overflow: 'hidden',
  backgroundColor: 'white',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 30,
  marginRight: 30,
  paddingLeft: 16
},
button: {
  backgroundColor: '#788eec',
  marginLeft: 30,
  marginRight: 30,
  marginTop: 20,
  height: 48,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: 'center'
},
buttonTitle: {
  color: 'white',
  fontSize: 16,
  fontWeight: "bold"
},
footerView: {
  flex: 1,
  alignItems: "center",
  marginTop: 20
},
footerText: {
  fontSize: 16,
  color: '#2e2e2d'
},
footerLink: {
  color: "#788eec",
  fontWeight: "bold",
  fontSize: 16
}
})