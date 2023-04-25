import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { EventRegister } from 'react-native-event-listeners'
import Entypo from "react-native-vector-icons/Entypo"
import Home from "./Home.js"
import Settings from "./Settings.js"
import { useEffect } from 'react';

const Tab = createBottomTabNavigator()

export default function MyTabs() {
  const [darkApp, setDarkApp] = useState(false);
  const appTheme = darkApp ? DarkTheme : DefaultTheme;

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      'changeThemeEvent', 
      data => {
        setDarkApp(data);
      },
  ); 
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);
  return (
    <NavigationContainer theme={appTheme} >
      <Tab.Navigator
          tabBarOptions={{
          activeTintColor: "#f55",
          inactiveTintColor:"#444",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName
          if (route.name === "Home") {
            iconName = "home"
          }
          else if (route.name === "Settings") {
            iconName = "md-information"
          }
          return <Entypo name={iconName} size={size} color={color}/>
          },
          
        })}  
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
  },
})