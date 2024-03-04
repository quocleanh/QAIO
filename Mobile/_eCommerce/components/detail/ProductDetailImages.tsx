//Render card product in HomeScreen, only structure, no data
//Data will be passed from HomeScreen to ProductCards
import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from "react-native"; // Added import statement for TouchableOpacity

import Octicons from "react-native-vector-icons/Octicons";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import COLORS from "../../consts/colors";
import CommonVarialbes from "../../consts/CommonVarialbes";



const ProductDetailImages = ({ image }: { image: string }) => {
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    checkNetworkConnectivity();
    const updateDimensions = () => {
      setScreenDimensions(Dimensions.get('window'));
    };
     // Thêm event listener để cập nhật kích thước màn hình khi nó thay đổi
     Dimensions.addEventListener('change', updateDimensions);
   

  }, []);
  const [isConnected, setisConnected] = React.useState(false);
  // Define the shape of your navigation object
  type RootStackParamList = {
    Detail: { image: string };
    // Add other screens here
  };
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const checkNetworkConnectivity = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      setisConnected(netInfo.isConnected || false);

    } catch (error) {
      setisConnected(false);
    }
  };
  useEffect
  return (
    <View >
      <Image source={{ uri: image }}
        style={{
          width: screenDimensions.width, 
          zIndex: 0,
          height: 450,
          resizeMode: 'cover', 
        }} />
    </View>
  );
};
export default ProductDetailImages;