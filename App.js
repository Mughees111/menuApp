import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import { retrieveItem } from './src/utils/functions';
import { apiRequest } from './src/utils/apiCalls';
import { urls } from './src/utils/Api_urls';



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
        name="More" component={More} />
    </BottomTabs.Navigator>
  )
}



export default function App() {

  const [loggined, setLoggined] = useState('2')
  const [loaded] = useFonts({
    PBo: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    PRe: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    PMe: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    PSBo: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PLi: require('./assets/fonts/Poppins/Poppins-Light.ttf'),

  })

  function checkLogin(token) {
    apiRequest(urls.API + "check_login")
      .then(data => {
        if (data.action == 'success') {
          setLoggined('1')
        }
        else {
          setLoggined('0')
        }
      })
  }

  useEffect(() => {


    retrieveItem('login_data')
      .then((data) => {
        if (data) {
          checkLogin(data.token)
          // setLoggined('1')
        }
        else setLoggined('0')

      })
  })



  if (!loaded) return null
  if (loggined == '2') {
    return (
      <Loader />
    )
  }
  return (
    <AuthProvider>
      <NavigationContainer>

        {loggined == '0' ?
          (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
              <Stack.Screen name="MoreStack" component={MoreStack} />
            </Stack.Navigator>
          )
          : (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
              <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
              <Stack.Screen name="MoreStack" component={MoreStack} />
            </Stack.Navigator>
          )
        }

      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  barLabel: {
    fontFamily: "PRe",
    fontSize: 11,
  },
});
