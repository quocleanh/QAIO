//Render card product in HomeScreen, only structure, no data
//Data will be passed from HomeScreen to ProductCards
import React, { useEffect } from "react";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native"; // Added import statement for TouchableOpacity
import styles from "../styles/home";
import COLORS from "../consts/colors";
import Octicons from "react-native-vector-icons/Octicons";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import productModel from "../models/productModel";
 

const ProductCards = ({ product }: { product: productModel }) => {
 
  useEffect(() => {
    checkNetworkConnectivity();
  }, []);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const lineHeight = 15; // Adjust this value as needed 
  const [isConnected, setisConnected] = React.useState(false);
  // Define the shape of your navigation object
  type RootStackParamList = {
    Detail: { Product: productModel };
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
    <View style={styles.card}>
      <View style={[styles.fav_icon_border, { backgroundColor: isFavorite ? '#dc35455e' : '#ffffff5e' }]}>
        <Octicons name={isFavorite ? 'heart-fill' : 'heart'} style={styles.fav_icon}
          size={15} onPress={() => setIsFavorite(!isFavorite)} color={isFavorite === true ? COLORS.Primary : COLORS.White} />

      </View>
      <TouchableOpacity key={product.Code} onPress={() => navigation.navigate('Detail', { Product: product })}>
        <Image source={isConnected ? { uri: 'http://static.superstones.com.vn/products-test/hinh-gach/' + product.Code + '.jpg' } : require('../assets/img/no-image.png')}
          style={styles.cardImage} />
        <View style={styles.cardContent}>
           <Text numberOfLines={2} style={[styles.cardTitle, { minHeight: lineHeight * 2 }]}>{product.Name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={styles.cardPrice}>{product.Price.toLocaleString('en-US')}
              <Text style={styles.superscript}> đ</Text>
            </Text>
            <View style={{
              flexDirection: 'row',
              top: 5,
              justifyContent: 'space-between',
              backgroundColor: '#ff0000',
              borderRadius: 7,
            }}>
               {/* <Text style={styles.cardPriceSale}>{product.priceSale.toLocaleString('en-US')}
              <Text style={styles.superscript}>đ</Text>
            </Text> */}
              <Text style={{
                verticalAlign: 'middle',
                color: COLORS.White,
                fontSize: 12,
                fontWeight: 'bold',
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}>-30%</Text>
            </View>
           
          </View>
        </View>
      </TouchableOpacity>
    </View >
  );
};
export default ProductCards;