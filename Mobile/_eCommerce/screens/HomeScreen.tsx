import React, { useEffect, useState } from 'react';
import { Alert, View, RefreshControl, Text, ScrollView, TextInput, Image, TouchableOpacity, FlatList, Dimensions, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from '@rneui/themed';
import COLORS from '../consts/colors';
import styles from '../styles/home';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
///data
import products from '../data/home/products';
import ProductCards from '../components/ProductCards';
import TabsList from '../components/home/TabsList';
import productModel from '../models/productModel';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageNumber, setPageNumber] = useState(12);
  const [productsData, setProductsData] = useState<productModel[]>([]);
  useEffect(() => {
    return () => {
      setRefreshing(false);
      fetchDataProduct(pageIndex, pageNumber, -1);
    };
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setPageIndex(pageIndex + 1);
    setPageNumber(pageNumber + 12);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);


  const fetchDataProduct = async (pageIndex: number, pageNumber: number, type: number) => {
    const data = await products(pageIndex, pageNumber, type);
    setProductsData([...data]);
  };
  const handleTabPress = async (code: number) => {
    setRefreshing(true);
    const data = await products(pageIndex, pageNumber, code);
    setProductsData([]);
    setRefreshing(false);
  };

  function openScanner(): void {
    Alert.alert("", "Chức năng đang được phát triển");
  }

  return (
    <View style={{}}>
    <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
     
      <View style={{ backgroundColor: COLORS.Primary, height: 200, paddingTop: 30, margin: 0 }}>
        <View style={styles.header}>
          <View style={{padding: 10}}>
            <Image source={require('../assets/img/logo-white.png')}
              style={styles.logo}>
            </Image>
          </View>
          <View style={styles.iconheader}>
            <Badge
              status="primary"
              value={0}
              containerStyle={{ position: 'absolute', top: -10, right: -10 }}
            />
            <MaterialIcon name="shopping-cart" style={{ marginTop: 0 }} size={25} color={COLORS.Primary} >

            </MaterialIcon>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 0 }}>
          <View style={styles.searchContainer}>
            <MaterialIcon name="search" style={{ marginTop: 15, marginLeft: 15 }} size={25} color={COLORS.Primary} />
            <TextInput placeholder="Search" style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }} />
          </View>
          <View style={styles.sortBTN}>
            <MaterialCommunityIcons name="line-scan" size={25} color={COLORS.White} onPress={openScanner} />
          </View>
        </View>
      </View>
      

        <TabsList onTabPress={handleTabPress} />
         
      </ScrollView>
    </View>
  );
};
export default HomeScreen;
