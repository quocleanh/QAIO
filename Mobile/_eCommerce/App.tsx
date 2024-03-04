/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import HomeScreen from "./screens/HomeScreen"; // Import the missing component
import { View } from 'react-native';   
import productModel from './models/productModel';  
import AsyncStorage from '@react-native-async-storage/async-storage';

 
// ...
type StackParamList = {
  Home: undefined;
  Login: undefined;
  Detail: {
    Product: productModel; // Replace ProductType with the actual type of your product
    //newParam: string; // Replace string with the actual type of newParam
  };
  // Other routes...
};
const Stack = createNativeStackNavigator(); // Add this line 
const Tab = createBottomTabNavigator();


function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: 'absolute',
        elevation: 0,
        backgroundColor: '#fff',
        height: 60,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            height: 80,
          },
          android: {
            elevation: 15,
          },
        }),
      },
    }}>
      <Tab.Screen name="Scan" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
             
          </View>
        ),
      }} />
      <Tab.Screen name="History" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
             
          </View>
        ),
      }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{
            position: 'absolute', // Add a position
            //top: Platform.OS === 'ios' ? 0 : -12, // Top position for IOS or Android
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20, // Add circular border radius
            shadowColor: 'black', // Add box shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: focused ? '#981b1e' : 'white', // Change background color when focused
            //width: 60, // Increase size of the icon
            //height: 60, // Increase size of the icon
            padding: 10,
            ...Platform.select({
              ios: {
                bottom: -5,
              },
              android: {
                bottom: 0,
              },
            }),
          }}>
             
            {/* <Text style={{ color: focused ? 'red' : 'black', fontSize: 12, }}>ScanScreen</Text> */}
          </View>
        ),
      }} />
      <Tab.Screen name="Account" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
           
            {/* <Text style={{ color: focused ? 'red' : 'black', fontSize: 12, }}>Account</Text> */}
          </View>
        ),
      }} />
      <Tab.Screen name="Search" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            
            {/* <Text style={{ color: focused ? 'red' : 'black', fontSize: 12, }}>Setting</Text> */}
          </View>
        ),
      }} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [usersData, setUsersData] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
      setUsersData(userData);
    };

    fetchUserData();
  }, []);
  return (



    <NavigationContainer>
      <Stack.Navigator initialRouteName={!isLoggedIn ? 'HomeTabs' : 'Login'} screenOptions={{ headerShown: false, headerTransparent: true }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
       
      </Stack.Navigator>
    </NavigationContainer>

  );

}

export default App;

