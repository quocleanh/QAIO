import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, View } from 'react-native';
import { LogBox } from "react-native";

import { Text } from 'react-native-elements';
import { Image } from '@rneui/themed';
import COLORS from './consts/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens here
import HomeScreen from './screens/HomeScreen';
import LiveScreen from './screens/LiveScreen';
import DetailScreen from './screens/DetailScreen';
import WelcomeScreen from './screens/WelcomeScreen';

//import icon
const homeActive = require('./assets/icon/home-active.png');
const home = require('./assets/icon/home.png');
const liveActive = require('./assets/icon/live-active.png');
const live = require('./assets/icon/live.png');
const messageActive = require('./assets/icon/message-active.png');
const message = require('./assets/icon/message.png');
const cartActive = require('./assets/icon/cart-active.png');
const cart = require('./assets/icon/cart.png');
const accountActive = require('./assets/icon/account-active.png');
const account = require('./assets/icon/account.png');

// Create the application stack
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const [usersData, setUsersData] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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
              height: 50,
            },
            android: {
              elevation: 15,
            },
          }),
        },
      }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={focused ? homeActive : home} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? COLORS.Primary : COLORS.Secondary }}>Trang chủ</Text>
              </View>
            </View>
          ),
        }} />
        <Tab.Screen name="Live" component={LiveScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
              <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={focused ? liveActive : live} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? COLORS.Primary : COLORS.Secondary }}>Live</Text>
              </View>
            </View>
          ),
        }} />
        <Tab.Screen name="Message" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={focused ? messageActive : message} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? COLORS.Primary : COLORS.Secondary }}>Tin nhắn</Text>
                <Text style={{ fontSize: 9, color: COLORS.White, position: 'absolute', elevation: 1, top: 5, right: 5, backgroundColor: COLORS.Primary, borderRadius: 50, paddingVertical: 2, paddingHorizontal: 5, fontWeight: '700' }}>99+</Text>
              </View>
            </View>
          ),
        }} />
        <Tab.Screen name="Cart" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ position: 'relative', flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={focused ? cartActive : cart} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? COLORS.Primary : COLORS.Secondary }}>Giỏ hàng</Text>
                <Text style={{ fontSize: 9, color: COLORS.White, position: 'absolute', elevation: 1, top: 5, right: 5, backgroundColor: COLORS.Primary, borderRadius: 50, paddingVertical: 2, paddingHorizontal: 5, fontWeight: '700' }}>99+</Text>

              </View>
            </View>
          ),
        }} />
        <Tab.Screen name="Account" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={focused ? accountActive : account} style={{ width: 25, height: 25 }} />
                <Text style={{ color: focused ? COLORS.Primary : COLORS.Secondary }}>Tài khoản</Text>
              </View>
            </View>
          ),
        }} />
      </Tab.Navigator>
    );
  }
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
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
  ])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName={!isLoggedIn ? 'Home' : 'HomeTabs'}
    //     screenOptions={{ headerShown: false, headerTransparent: true }}>
    //     <Stack.Screen name="HomeTabs" component={HomeTabs} />
    //     <Stack.Screen name="Detail" component={DetailScreen} /> 
    //     <Stack.Screen name="Welcome" component={WelcomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer> 
  );
};

export default App;