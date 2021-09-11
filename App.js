import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View , StatusBar} from 'react-native';
import { DashboardIcon, MenuBtmIcon, MoreIcon, RestMenuIcon, ResturentBtmIcon } from './src/components/Svgs';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './src/screens/Dashboard';
import Reservation from './src/screens/Reservation';
import Resturent from './src/screens/Resturent';
import MyMenu from './src/screens/MyMenu';
import More from './src/screens/More';
import QRCode from './src/screens/QRCode';
import BookPhotographer from './src/screens/BookPhotographer';
import Login from './src/screens/Login';

import { Provider as AuthProvider } from "./src/Context/DataContext";
import Loader from './src/utils/Loader';
import { retrieveItem ,storeItem} from './src/utils/functions';
import { apiRequest } from './src/utils/apiCalls';
import { urls } from './src/utils/Api_urls';
import { loggedInObservable } from './Common';

import { createStackNavigator } from '@react-navigation/stack';

const BottomTabs = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator()

function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="QRCode" component={QRCode} />
      <Stack.Screen name="BookPhotographer" component={BookPhotographer} />
    </Stack.Navigator>
  )
}

function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator
      inactiveColor="#4A5160"
      activeColor="#F58B44"
      barStyle={{
        backgroundColor: '#fff'
      }}
      shifting={false}
    // labeled={false}
    >
      <BottomTabs.Screen
        options={{
          tabBarLabel: (<Text style={styles.barLabel}>Dashboard</Text>),
          tabBarIcon: ({ color, focused }) => (
            <DashboardIcon style={{ marginTop: -7 }} color={color} />
          )
        }}
        name="Dashboard" component={Dashboard} />


      <BottomTabs.Screen
        options={{
          tabBarLabel: (<Text style={styles.barLabel}>Reservation</Text>),
          tabBarIcon: ({ color, focused }) => (
            <RestMenuIcon style={{ marginTop: -7 }} color={color} />
          )
        }}
        name="Reservation" component={Reservation} />

      <BottomTabs.Screen
        options={{
          tabBarLabel: (<Text style={styles.barLabel}>Restaurant</Text>),
          tabBarIcon: ({ color, focused }) => (
            <ResturentBtmIcon style={{ marginTop: -7 }} color={color} />
          )
        }}
        name="Resturent" component={Resturent} />

      <BottomTabs.Screen
        options={{
          tabBarLabel: (<Text style={styles.barLabel}>My Menu</Text>),
          tabBarIcon: ({ color, focused }) => (
            <MenuBtmIcon style={{ marginTop: -7 }} color={color} />
          )
        }}
        name="MyMenu" component={MyMenu} />

      <BottomTabs.Screen

        options={{
          tabBarLabel: (<Text style={styles.barLabel}>More</Text>),

          tabBarIcon: ({ color, focused }) => (
            <MoreIcon style={{ marginTop: -7 }} color={color} />
          )
        }}
        name="More" component={MoreStack} />
    </BottomTabs.Navigator>
  )
}



export default function App() {

  
  const [loaded] = useFonts({
    PBo: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PRe: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PMe: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    PSBo: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PLi: require('./assets/fonts/Poppins/Poppins-Light.ttf'),

  })



  const [loggedIn, setLoggedIn] = useState(0)
    
    useEffect(()=>{



        checkLoggedIn()
        loggedInObservable.subscribe((v)=>{
            setLoggedIn(v)
        })
    },[]);

    const checkLoggedIn = () =>{

      retrieveItem("login_data").then((data)=>{
          if(data)
          {

            checkWithServer(data)
          }
          else{
                
              setLoggedIn(2)
              
          }
      })
    }

    const checkWithServer = (data) =>
    {
      
        
        if(data)
            var token = data.token;
        else
            var token = "khali";
        var body_data = {token:token};

        console.log(body_data);
        
        fetch(urls.API + 'check_login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body_data),
        }).then((response) => response.json())
        .then((responseJson) => {
            
            if (responseJson.action == "success") {
              
                storeItem("login_data", responseJson.data).then(() => {

                   setLoggedIn(1)
                });
            }
            else {
                setLoggedIn(2)
            }
        }).catch((error) => {
            setLoggedIn(2)
        });
    }
   


	if(loggedIn==0 || !loaded)
	{
        console.log("Did come here")
		return (
			<View style={{
				flex: 1,
				alignItems: 'center',
				backgroundColor: '#f7f7f7'
			}}>
				<Image source={require("./assets/splash.png")} style={{width:'100%', height:'100%'}} />
			</View>
		);
	}


  const AuthStack = createStackNavigator()
  const AuthStackNavigator = ({navigation,routes})=> {
    return (
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
       
         <AuthStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
       
      </AuthStack.Navigator>
    )
  }
  



  
  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
    <StatusBar hidden={false} barStyle={"dark-content"} backgroundColor="#fff" />
    <SafeAreaView style={{ backgroundColor: '#fff',flex:1 }}>
      <AuthProvider>
        <NavigationContainer>
          

              <Stack.Navigator screenOptions={{ headerShown: false }} >

                {
                  loggedIn==2?
                  <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthStackNavigator} />
                  :
                  <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
                }
                
              </Stack.Navigator>
        

        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  barLabel: {
    fontFamily: "PRe",
    fontSize: 11,
  },
});
