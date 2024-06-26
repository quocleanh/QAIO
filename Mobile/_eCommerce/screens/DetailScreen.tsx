import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView, Alert, Platform, StatusBar, FlatList, Animated, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import productModel from '../models/productModel'; // Corrected import
import COLORS from '../consts/colors';
import styles from '../styles/detail';
import { Badge, Button, ListItem } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import ProductDetailImages from '../components/detail/ProductDetailImages';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import ProductRelatedComponent from '../components/detail/ProductRelatedComponent';
import Footer from '../components/_Footer';
import Toast from 'react-native-toast-message';
<<<<<<< Updated upstream
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
>>>>>>> Stashed changes

const DetailScreen: React.FC = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const route = useRoute();
  const [totalItemCart, settotalItemCart] = useState(0);
<<<<<<< Updated upstream

  const { Product } = route.params as { Product: productModel };
  Product.Images = Product.Images || []; // Initialize Product.Images as an empty array if it is undefined
  Product.Description = 'Đá Granite là loại đá tự nhiên được hình thành từ núi lửa <br/> Độ cứng 7, độ dày 2cm <br/>  Bề mặt bóng đẹp, chống trầy xước '
  const percenDiscount = Product?.SalePrice ? Math.round((Product.Price - Product.SalePrice) / Product.Price * 100) : 0;
  const descSplit = Product.Description.split('<br/>');
  const image = 'http://static.superstones.com.vn/products-test/hinh-gach/' + Product.Code + '.jpg';
  Product.Images.push(image);
  const listVariables = [{
    'Name': 'Kích thước',
    'List':
      [
        { id: 'Size_01', name: '60 x 60 cm' },
        { id: 'Size_02', name: '60 x 120 cm' },
        { id: 'Size_03', name: '120 x 120 cm' }
      ]
  },
  {
    'Name': 'Màu sắc',
    'List':
      [
        { id: 'Color_09', name: 'Đỏ campuchia' },
        { id: 'Color_08', name: 'Xanh Malaysia' },
        { id: 'Color_07', name: 'Vàng Tung Của' },
        { id: 'Color_06', name: 'Trắng Ma Rốc' },
        { id: 'Color_05', name: 'Đen Nam Phi' }
      ]
  }
  ];
=======
  const { Product } = route.params as { Product: productModel };
  Product.Images = Product.Images || []; // Initialize Product.Images as an empty array if it is undefined
  Product.Description = 'Đá Granite là loại đá tự nhiên được hình thành từ núi lửa <br/> Độ cứng 7, độ dày 2cm <br/>  Bề mặt bóng đẹp, chống trầy xước '
>>>>>>> Stashed changes

  //const refRBSheetVariable = React.createRef() || null;
  const refRBSheetVariable = useRef<RBSheet>(null);
  const refRBSheetProductContent = useRef<RBSheet>(null);

  const [totalImages, setTotalImages] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<number>(1);
  const navigation = useNavigation();
  
  const rankkingList = [1, 2, 3, 4, 5];
<<<<<<< Updated upstream
=======

  let ProductImages = [] as string[];
  const percenDiscount = Product?.SalePrice ? Math.round((Product.Price - Product.SalePrice) / Product.Price * 100) : 0;
  const descSplit = Product.Description.split('<br/>');
  const listVariables = [{
    'Name': 'Kích thước',
    'List':
      [
        { id: 1, name: '60 x 60 cm' },
        { id: 2, name: '60 x 120 cm' },
        { id: 3, name: '120 x 120 cm' }
      ]
  }, {
    'Name': 'Màu sắc',
    'List':
      [
        { id: 9, name: 'Đỏ campuchia' },
        { id: 8, name: 'Xanh Malaysia' },
        { id: 7, name: 'Vàng Tung Của' },
        { id: 6, name: 'Trắng Ma Rốc' },
        { id: 5, name: 'Đen Nam Phi' }
      ]
  }];
>>>>>>> Stashed changes


  // State for selected information   
  interface SelectedVariable {
    variableType: string;
<<<<<<< Updated upstream
    id: string;
    name: string;
  }
  const [selectedVariables, setSelectedVariables] = useState<SelectedVariable[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleVariablePress = (variableType: string, id: string, name: string) => {
    setSelectedVariables((prevSelectedVariables) => {
=======
    id: number;
    name: string;
  }
  const [selectedVariables, setSelectedVariables] = useState<SelectedVariable[]>([]);
  const image = 'http://static.superstones.com.vn/products-test/hinh-gach/' + Product.Code + '.jpg';

  const [quantity, setQuantity] = useState<number>(1);

  // Handle selection for all variable types
  const handleVariablePress = (variableType: string, id: number, name: string) => {
    setSelectedVariables((prevSelectedVariables) => {
      // Remove previous selections of the same type
>>>>>>> Stashed changes
      const filteredVariables = prevSelectedVariables.filter(
        (variable) => variable.variableType !== variableType
      );

<<<<<<< Updated upstream
      return [...filteredVariables, { variableType, id: id.toString(), name }];
    });
  };
  useEffect(() => { 
     
    cartCount();
  }, []);

  const cartCount = async () => {
    const _cartListString = await AsyncStorage.getItem('@cart');
    let _cartList = [];
    if (_cartListString) {
      _cartList = JSON.parse(_cartListString);
    }
    settotalItemCart(_cartList.length);
  }
  
  async function addToCart(): Promise<void> {
    const _sku = selectedVariables.map((selected) => selected.id).join('|');
    const _quantity = quantity;
    //
    const _cart = {
      sku: _sku,
      quantity: _quantity,
      //product: Product
    };
    const _cartString = JSON.stringify(_cart);
    const _cartListString = await AsyncStorage.getItem('@cart');
    let _cartList = [];
    if (_cartListString) {
      _cartList = JSON.parse(_cartListString);
    }
    _cartList.push(_cartString);
    await AsyncStorage.setItem('@cart', JSON.stringify(_cartList));
    settotalItemCart(_cartList.length);
    //delay 1s
    //đóng RBSheet

    refRBSheetVariable.current?.close();
    navigation.navigate('Cart');
  };
  const buyNow = () => {
    const totalVariableType = listVariables.length;
    const totalSelectedVariableType = selectedVariables.length;
    const sku = selectedVariables.map((selected) => selected.id).join('|');

    if (totalVariableType === totalSelectedVariableType) {
      addToCart();
      
    } else {
      refRBSheetVariable.current?.open();
    };

  };
  function handleQuantity(_quantity: number) {
    if (quantity + _quantity >= 0) {
      setQuantity(quantity + _quantity);
    }
=======
      return [...filteredVariables, { variableType, id, name }];
    });
    // Add the current selection
    console.log(selectedVariables)

  };
  const onRefresh = React.useCallback(async () => {
    addToCart();
    setTimeout(() => setRefreshing(false), 1500);
  }, []);
  useEffect(() => {
    console.log(selectedVariables);
    //Kiểm tra tồn tại
    ProductImages.push(image);
    setTotalImages(ProductImages.length);
    setRefreshing(false);
  }, []);

  function addToCart(): void {

  }
  const buyNow = () => {

>>>>>>> Stashed changes

  }

  return (
<<<<<<< Updated upstream
  <View style={{
=======
    <><View style={{
>>>>>>> Stashed changes
      flex: 1,
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          marginTop: -60,
        },
        android: {
          elevation: 5,
        },
      }),
    }}>
      <StatusBar backgroundColor={COLORS.Primary} barStyle="dark-content" />
<<<<<<< Updated upstream
      <ScrollView >
=======
      <ScrollView

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
>>>>>>> Stashed changes
        <View style={{ position: 'relative', flex: 1, flexDirection: 'column' }}>
          <View style={styles.overlayHeader}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.header_icon}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <MaterialCommunityIcons name="chevron-left" size={30} color={COLORS.Primary} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
              <View style={[styles.header_icon, styles.search]}>
                <TouchableOpacity>
<<<<<<< Updated upstream
                
=======
>>>>>>> Stashed changes
                  <MaterialIcons name="search" size={30} color={COLORS.Secondary} />
                </TouchableOpacity>
              </View>
              <View style={[styles.header_icon, styles.cart]}>
<<<<<<< Updated upstream
                <TouchableOpacity>
                  <MaterialCommunityIcons name="cart-outline" size={30} color={COLORS.Secondary} />
                  <Badge status="warning" value={  <Text>{totalItemCart}</Text>} containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
=======
                <TouchableOpacity onPress={() => refRBSheetVariable.current?.open()}>
                  <MaterialCommunityIcons name="cart-outline" size={30} color={COLORS.Secondary} />
                  <Badge status="warning" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
>>>>>>> Stashed changes
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{
            //marginTop: 60,
            ...Platform.select({
              ios: {
                paddingTop: 60,
              },
              android: {
                paddingTop: 0,
              },
            }),
          }}>
            <FlatList
              scrollEnabled={true}
              style={{ flex: 1, flexDirection: 'row', borderRadius: 5, }}
              data={Product.Images ? Product.Images : null}
              horizontal // Chỉ định là list ngang
              pagingEnabled={true} // Cho phép trượt ngang từng item
              showsHorizontalScrollIndicator={true} // Ẩn thanh cuộn ngang
              decelerationRate={1} // Tốc độ cuộn
              snapToInterval={0.1} // Khoảng cách giữa các item
              renderItem={({ item }) => <ProductDetailImages image={item.toString()} />}
              bounces={false} // Bật tắt scroll qua đầu
              centerContent={true} // Căn giữa nội dung
              indicatorStyle='white'
              canCancelContentTouches={true} // Cho phép scroll khi vuốt từ ngoài vào 
              keyExtractor={(item, index) => index.toString()} />
            <View style={styles.countImages}>
              <Text>{currentImage}/{totalImages}</Text>
            </View>
          </View>
          <View style={{
            position: 'relative', flex: 1, flexDirection: 'column',
            backgroundColor: COLORS.Transparent,
            ...Platform.select({
              ios: {},
              android: {
                elevation: 4,
              },
            }),
            left: 0, right: 0, zIndex: 100, marginTop: -30,
          }}>
            <View style={{ backgroundColor: COLORS.White, padding: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
              <Text style={{ width: '100%', flex: 1, fontSize: 21, color: COLORS.Secondary, marginTop: 10 }}>{Product.Name} {Product.Code} </Text>
              <View>
                <Text>
                  <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}> 4.5: </Text>
                  {rankkingList.map((item, index) => (
                    <View key={index} style={{ marginTop: -3 }}>
                      <Icon name="star" size={20} color={index < 5 ? COLORS.Primary : COLORS.Secondary} />
                    </View>
                  ))}
                  <Text> (404)</Text>
                  <Text style={{ paddingHorizontal: 25, marginHorizontal: 25 }}> Đã bán 2234</Text>
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontSize: 32, color: COLORS.Secondary, fontWeight: 'bold' }}>{Product?.SalePrice.toLocaleString('en-US')} đ</Text>
                <Text style={{ fontSize: 20, color: COLORS.Secondary, verticalAlign: 'bottom', alignContent: 'flex-end', textAlign: 'justify', lineHeight: 45, marginLeft: 15, textDecorationStyle: 'dashed', textDecorationLine: 'line-through' }}>{Product?.Price.toLocaleString('en-US')} đ</Text>
                <Badge status="error" value={percenDiscount + '%'}
                  containerStyle={{ bottom: 0, marginHorizontal: 10, marginVertical: 15 }} />
              </View>
              <View>
<<<<<<< Updated upstream
                <TouchableOpacity onPress={buyNow} style={styles.Variable}>
                  <Image
                    source={{ uri: Product.Images[0].toString() }} // Corrected source
=======
                <TouchableOpacity onPress={() => refRBSheetVariable.current?.open()} style={styles.Variable}>
                  <Image
                    source={{ uri: 'http://static.superstones.com.vn/products-test/hinh-gach/' + Product.Code + '.jpg' }} // Corrected source
>>>>>>> Stashed changes
                    style={styles.VariableImage} />
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'baseline', paddingHorizontal: 30 }}>

                    <Text style={styles.VariableSelected}>
                      {selectedVariables.length > 0 ?
                        selectedVariables.map((selected) => (
                          <View key={selected.name} style={{ paddingHorizontal: 10 }}>
                            <Text style={[styles.VariableTitle, { fontWeight: '600' }]}>{selected.variableType}</Text>
                            <Text style={{ /* Bổ sung styles cho Text */ }}>
                              {selected.variableType !== '' ? selected.name : 'Chưa chọn'}
                            </Text>
                          </View>
                        ))
                        :
                        <View>
                          <Text style={styles.VariableTitle}>Chưa chọn</Text>
                          <Text style={{ /* Bổ sung styles cho Text */ }}>...</Text>
                        </View>
                      }
                    </Text>

                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={25}
                      color={COLORS.Secondary} />
                  </View>
                </TouchableOpacity>

              </View>
              <View style={{}}>
                <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold', paddingBottom: 10 }}>Đặc điểm nổi bật</Text>
                <FlatList
                  scrollEnabled={false}
                  data={descSplit.filter(item => item && item.trim() !== '')}
                  renderItem={({ item }) => <Text style={{
                    fontSize: 15,
                    color: COLORS.Secondary,
                    fontWeight: 'normal'
                  }}>
                    <MaterialIcons name="check-circle" size={15} color={COLORS.Primary} /> {item.trim()}
                    {item.trim()}</Text>} />
              </View>

            </View>
            <View style={{ flex: 1, marginVertical: 15, backgroundColor: COLORS.White, padding: 10, }}>
              <View style={[{ flexDirection: 'row', flex: 1, }]}>
                <Button
                  title="Thêm vào giỏ hàng"
                  buttonStyle={{ marginRight: 5, flex: 1, backgroundColor: COLORS.Primary, borderRadius: 5, width: (Dimensions.get('window').width - 30) / 2 }}
                  onPress={() => {
<<<<<<< Updated upstream
                    buyNow()
=======
                    addToCart()
>>>>>>> Stashed changes
                  }} />
                <Button
                  title="Mua ngay"
                  buttonStyle={{ marginLeft: 5, flex: 1, backgroundColor: COLORS.Primary, borderRadius: 5, width: (Dimensions.get('window').width - 30) / 2 }}
<<<<<<< Updated upstream
                  onPress={() => { buyNow() }} />
=======
                  onPress={() => { addToCart() }} />
>>>>>>> Stashed changes
              </View>

              <View style={{ marginTop: 5, flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Button
                  title="Tư vấn mua hàng"
                  titleStyle={{ color: COLORS.Primary, fontWeight: 'bold' }}
                  buttonStyle={{
                    width: Dimensions.get('window').width - 20,

                    backgroundColor: COLORS.White,
                    borderColor: COLORS.Primary,
                    borderWidth: 1,
                    borderRadius: 5
                  }}
                  onPress={() => { }} />
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: COLORS.White, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 0 }}>
              <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>Yên tâm mua sắm</Text>
              <ListItem bottomDivider containerStyle={{ paddingVertical: 10 }}>
                <FontAwesome5Icon name="truck" size={25} color={COLORS.Primary} />
                <ListItem.Content>
                  <ListItem.Title>Giao hàng toàn quốc</ListItem.Title>
                  <ListItem.Subtitle>Đảm bảo hàng chính hãng</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider containerStyle={{ paddingVertical: 10 }}>
                <FontAwesome5Icon name="shield-alt" size={25} color={COLORS.Primary} />
                <ListItem.Content>
                  <ListItem.Title>Bảo hành 12 tháng</ListItem.Title>
                  <ListItem.Subtitle>Đổi trả trong 7 ngày</ListItem.Subtitle>
                </ListItem.Content>
                <Icon name="chevron-right" size={25} color={COLORS.Secondary} />
              </ListItem>
              <ListItem containerStyle={{ paddingTop: 10, paddingBottom: 10 }}>
                <FontAwesome5Icon name="headset" size={25} color={COLORS.Primary} />
                <ListItem.Content>
                  <ListItem.Title>Hỗ trợ 24/7</ListItem.Title>
                  <ListItem.Subtitle>Hotline: 1900 1234</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>
            <View style={{ flex: 1, backgroundColor: COLORS.White, paddingHorizontal: 10, paddingVertical: 10, marginTop: 15 }}>
              <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>Thông số kỹ thuật</Text>
              <ListItem bottomDivider containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}>
                <ListItem.Content style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ListItem.Title>Thương hiệu</ListItem.Title>
                  <ListItem.Subtitle>Superstones</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}>
                <ListItem.Content style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ListItem.Title>Chất liệu</ListItem.Title>
                  <ListItem.Subtitle>Đá Granite</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}>
                <ListItem.Content style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ListItem.Title>Độ dày</ListItem.Title>
                  <ListItem.Subtitle>2cm</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}>
                <ListItem.Content style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ListItem.Title>Độ cứng</ListItem.Title>
                  <ListItem.Subtitle>7</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem bottomDivider containerStyle={{ paddingVertical: 10, paddingHorizontal: 0 }}>
                <ListItem.Content style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ListItem.Title>Độ dày</ListItem.Title>
                  <ListItem.Subtitle>2cm</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <Text style={{ width: '100%', padding: 14, textAlign: 'center', verticalAlign: 'middle' }}>
                Xem thêm
                <MaterialIcons name="keyboard-arrow-down" size={15} color={COLORS.Primary} />
              </Text>

            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.White, paddingHorizontal: 10, paddingVertical: 10, marginTop: 15 }}>
            <Text style={{ marginBottom: 15, fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>Mô tả sản phẩm</Text>
            <View style={{ height: 150, overflow: 'hidden' }}>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus aut odio, eaque deserunt accusantium excepturi eos perspiciatis rem explicabo quaerat similique quo porro magni vel molestias dignissimos minima fugiat iure!
              </Text>
              <Image source={{ uri: 'http://static.superstones.com.vn/products-test/hinh-gach/' + Product.Code + '.jpg' }} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />

            </View>
            <View style={{ width: '100%' }}>

              <View style={{ marginTop: -20, paddingTop: 15, backgroundColor: COLORS.White_Opacity, height: 50 }}>
                <TouchableOpacity
                  onPress={() => refRBSheetProductContent.current?.open()}>
                  <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold', textAlign: 'center' }}>Xem thêm</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={{ flex: 1, backgroundColor: COLORS.White, paddingHorizontal: 10, paddingVertical: 10, marginTop: 15 }}>
            <Text style={{ marginBottom: 15, fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>Đánh giá khách hàng</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>4.5</Text>
                {rankkingList.map((item, index) => (
                  <View key={index} style={{ marginTop: -3 }}>
                    <Icon name="star" size={20} color={index < 5 ? COLORS.Primary : COLORS.Secondary} />
                  </View>
                ))}
                <Text> (404)</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>Xem tất cả</Text>
                <Icon name="chevron-right" size={25} color={COLORS.Secondary} />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', paddingVertical: 15 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignContent: 'flex-start' }}>
                {rankkingList.map((item, index) => (
                  <View key={index} style={{ marginTop: -3 }}>
                    <Icon name="star" size={20} color={index < 5 ? COLORS.Primary : COLORS.Secondary} />
                  </View>
                ))}
                <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>Cực kì hài lòng</Text>

              </View>
              <View>
                <Text numberOfLines={2} lineBreakMode='clip'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum at facere voluptatum ducimus? Voluptate recusandae neque molestias illo. Neque illo enim asperiores magni ipsum assumenda quia nesciunt debitis quod distinctio.</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: COLORS.Secondary, fontWeight: 'bold' }}>Nguyễn Văn A</Text>
                <Text> - 10/10/2021</Text>
              </View>
            </View>
          </View>
          <ProductRelatedComponent product={Product} />
        </View>
        <View style={{ flex: 1, backgroundColor: COLORS.White, paddingHorizontal: 10, paddingVertical: 10, marginTop: 15 }}>
          <Footer />
        </View>
      </ScrollView>

      <RBSheet
        keyboardAvoidingViewEnabled={true}
        ref={refRBSheetVariable}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={600}
        openDuration={250}
        onClose={() => {
<<<<<<< Updated upstream
          selectedVariables.splice(0, selectedVariables.length);

        }}
        onOpen={() => {
          setQuantity(1);
=======
          console.log();
        }}
        onOpen={() => {

          console.log();
>>>>>>> Stashed changes
        }}
        customStyles={{
          wrapper: {
            backgroundColor: COLORS.Black_Opacity
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 15 }}>

          <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 130, paddingBottom: 15 }}>
            <Image source={{ uri: 'http://static.superstones.com.vn/products-test/hinh-gach/' + Product.Code + '.jpg' }} style={{ width: 130, height: 130 }}></Image>
            <View>
              <View style={{ flex: 1, flexDirection: 'column', paddingHorizontal: 15, }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }} lineBreakMode='clip' numberOfLines={2}>{Product.Name}</Text>
                {selectedVariables.map((selected) => (
                  <Text style={{ fontSize: 15, color: COLORS.Secondary, }}>{selected.variableType}: {selected.name}</Text>
                ))}
                <Text style={{ fontSize: 25, color: COLORS.Secondary, fontWeight: 'bold' }}>{Product?.SalePrice.toLocaleString('en-US')} đ</Text>
                <View style={{ flex: 1, flexDirection: 'row', padding: 0, margin: 0, backgroundColor: COLORS.Transparent }}>
                  <Text style={{ fontSize: 20, color: COLORS.Secondary, textDecorationStyle: 'dashed', textDecorationLine: 'line-through' }}>{Product?.Price.toLocaleString('en-US')} đ</Text>
                  <Badge status="warning" value="-30%" textProps={{}} textStyle={{ fontSize: 12, }} containerStyle={{ padding: 5 }} />
                </View>
              </View>
            </View>
          </View>
          <ScrollView>
            <View style={{ paddingVertical: 15, flex: 1, flexDirection: 'column' }}>
              {listVariables.map((variable) => (
                <View key={variable.Name}>
                  <Text style={{ fontSize: 20, paddingVertical: 15 }}>{variable.Name}: </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {variable.List.map((item) => (
                      <TouchableOpacity
                        onPress={() => handleVariablePress(variable.Name, item.id, item.name)}
                        key={item.id}
                        style={{
                          borderColor: selectedVariables.some((selectedItem) => selectedItem.id === item.id)
                            ? COLORS.Primary
                            : 'rgba(198, 198, 198, 0.61)',
                          backgroundColor: selectedVariables.some((selectedItem) => selectedItem.id === item.id)
                            ? COLORS.Primary
                            : COLORS.White,
                          borderWidth: 1,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 5,
                          paddingVertical: 7,
                          marginHorizontal: 5,
                          borderRadius: 5,
                          alignContent: 'center',
                          marginBottom: 15,
                          position: 'relative',
                        }}
                      >
                        <Text
                          style={{
<<<<<<< Updated upstream
                            color: selectedVariables.some((selectedItem) => selectedItem.id === item.id)
                              ? COLORS.White
                              : COLORS.Secondary,
                            fontSize: 15,
                            textAlign: 'center',
                            fontWeight: '600',
                          }}
                        >
                          {item.name}
                        </Text>
                        {selectedVariables.some((selectedItem) => selectedItem.id === item.id) && (
                          <MaterialCommunityIcons
                            name="check"
                            size={20}
                            color={COLORS.White}
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              backgroundColor: COLORS.Primary,
                              padding: 5,
                              borderRadius: 5,
                            }}
                          />
=======
                            position: 'relative',
                            paddingHorizontal: 5,
                            paddingVertical: 5,
                            color: selectedVariables.some((selectedItem) => selectedItem.id === item.id)
                              ? COLORS.White
                              : COLORS.Primary,
                            textAlign: 'left',
                          }}
                          numberOfLines={1}
                          lineBreakMode="tail"
                        >
                          {item.name}
                        </Text>
                        {selectedVariables.some((selectedItem) => selectedItem.id === item.id) ? (
                          <MaterialIcons style={styles.VariableChoosed} name='check'></MaterialIcons>
                        ) : (
                          <></>
>>>>>>> Stashed changes
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>


                </View>
              ))}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ height: 60, lineHeight: 60 }}   >Số lượng</Text>
                </View>
<<<<<<< Updated upstream
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { handleQuantity(-1) }}>
                    <MaterialCommunityIcons name="minus-circle-outline" size={30} color={COLORS.Secondary} />
                  </TouchableOpacity>
                  <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 20, color: COLORS.Secondary }}>{quantity}</Text>
                  </View>
                  <TouchableOpacity onPress={() => { handleQuantity(1) }}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={30} color={COLORS.Secondary} />
                  </TouchableOpacity>
=======
                <View></View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Text style={{ height: 60, lineHeight: 60, verticalAlign: 'middle' }}>
                    <MaterialCommunityIcons size={40} name='minus-circle-outline'></MaterialCommunityIcons>
                  </Text>

                  <TextInput keyboardType='numeric' returnKeyType='send'>
                    {quantity}
                  </TextInput>

                  <Text style={{ height: 60, lineHeight: 60, verticalAlign: 'middle' }}>
                    <MaterialCommunityIcons size={40} name='plus-circle-outline'></MaterialCommunityIcons>
                  </Text>
>>>>>>> Stashed changes
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ paddingTop: 10, flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: 0, marginBottom: 65, height: 65, }}>
            <TouchableOpacity onPress={buyNow}>
              <Text style={[styles.buttonBuy, styles.buttonBuyActive]}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
        </View>

      </RBSheet>
<<<<<<< Updated upstream

   
      <Toast />
    </View>

=======
      <RBSheet
        ref={refRBSheetProductContent}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height - 100}
        openDuration={250}
        onClose={() => {
          console.log("Sheet closed");
        }}
        onOpen={() => {
          console.log("Sheet opened");
        }}
        customStyles={{
          wrapper: {
            backgroundColor: COLORS.Black_Opacity
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View style={{ flex: 1, backgroundColor: COLORS.White, paddingHorizontal: 10, paddingVertical: 10, marginTop: 15 }}>
          <Text>{Product.Description}</Text>
        </View>
      </RBSheet>
    </View><Toast /></>
>>>>>>> Stashed changes

  );
};
export default DetailScreen;
