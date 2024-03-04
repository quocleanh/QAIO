
import { Dimensions, StyleSheet } from 'react-native';
import COLORS from '../consts/colors';
const { height } = Dimensions.get('window');

const scan = StyleSheet.create({

    scrollView: {

    },
    containerFlex: {
        flex: 1, 
        flexDirection: 'row', // Display items in a row
        alignItems: 'center', // Center items vertically
        padding: 20,
    },
    H1: {
        fontSize: 30,
        top: 5,
        flex: 1,
        flexDirection: 'row',
        color: COLORS.Secondary,
      
    },
    iconheader: {
        width: 50,
        height: 50, 
         right: 20,
        color: COLORS.White, 
        backgroundColor: COLORS.Primary,
        alignItems: 'center',
        borderRadius: 15,
        position: 'relative', 
        verticalAlign: 'middle',
        justifyContent: 'center',
    },
    Badge: {
        backgroundColor: COLORS.Secondary,
        height: 25, width: 25,
        borderRadius: 10,
        flex: 1,

    },
    absoluteFill: {},
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayImage: {
        width: 200,
        height: height * 0.3,
        resizeMode: 'contain',
        position: 'absolute',
        top: '50%', // Đưa hình ảnh về giữa theo chiều dọc
        left: '50%', // Đưa hình ảnh về giữa theo chiều ngang
        transform: [{ translateX: -100 }, { translateY: -100 }], // Dịch chuyển hình ảnh về trung tâm
    },
    scanButton: {
        backgroundColor: COLORS.Primary,
        borderRadius: 5,
        padding: 15,
        width: '100%',
        alignItems: 'center',
        top: 20,
        position: 'absolute',
    },
    scanButtonText: {},

    buttonClose: {},
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)', // This will make the background semi-transparent
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden', // This is needed to prevent text and other items to be cut of from the modal
        height: height * 0.6, // This will cover 60% of the screen height
        width: '100%',
        paddingTop: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    closeModal: {
        color: COLORS.White,
        width: 50,
        height: 50,
        verticalAlign: 'middle',
        alignContent: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 340,
        right: 0,
        zIndex: 1,
        borderTopRightRadius: 20,
    },

});

export default scan;