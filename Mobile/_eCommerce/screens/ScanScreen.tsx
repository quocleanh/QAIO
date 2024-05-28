import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, Text, ScrollView, Modal, Pressable, Alert, Vibration } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Sound from 'react-native-sound';
import scan from '../styles/scan';
import { Badge, Button, Card, Icon, } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../consts/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/scan';
const ScanScreen = () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const [modalVisible, setModalVisible] = useState(false);
    const [scannedData, setScannedData] = useState<string[]>([]);


    function closeModal(): void {
        Alert.alert('Thông báo', 'Bạn có chắc dừng quét?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            { text: 'Dừng', onPress: () => setModalVisible(!modalVisible) },
        ]);

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.White }}>
            <ScrollView>
                <View style={[scan.containerFlex, { backgroundColor: '#fff' }]}>
                    <Text style={styles.H1}>Scan Screen</Text>
                    <View style={styles.iconheader}>
                        <Badge badgeStyle={styles.Badge}
                            status="primary"
                            value={0}
                            containerStyle={{ position: 'absolute', top: -10, right: -10, }}
                        />
                        <MaterialCommunityIcons
                            onPress={() => setModalVisible(true)}
                            name="qrcode-scan" style={{}} size={25} color={COLORS.White} >
                        </MaterialCommunityIcons>
                    </View>
                    <View> 
                        <FlatList scrollEnabled={false}
                            data={scannedData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <Text>{item}</Text>}
                        /> 
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.closeModal}>
                            <Icon name="close"
                                size={35} color={COLORS.Primary}
                                onPress={() => closeModal()} />
                        </View>
                        <View style={styles.modalView}>

                            <RNCamera
                                style={{ flex: 1, width: '100%', top: 0, left: 0, right: 0, bottom: 0, position: 'absolute', }}
                                type={RNCamera.Constants.Type.back}
                                captureAudio={false}
                                onBarCodeRead={async (e) => {
                                    setScannedData(prevData => [...prevData, e.data]);
                                    Vibration.vibrate(); // Rung điện thoại
                                    await delay(500);
                                    //setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.overlayContainer}>
                                    <Image
                                        style={styles.overlayImage}
                                        source={require('../assets/img/qr-code.png')}
                                    />
                                </View>
                            </RNCamera>

                        </View>
                    </View>
                </Modal> 
            </ScrollView>
        </SafeAreaView>

    );
};

export default ScanScreen;


