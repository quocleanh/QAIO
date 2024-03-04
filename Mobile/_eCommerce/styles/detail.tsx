import { Dimensions, Platform, StyleSheet } from 'react-native';
import COLORS from '../consts/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const detail = StyleSheet.create({
  Variable: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    height: 55,

  },
  VariableImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 5,

  },
  VariableTitle: {
  },
  VariableSelected: {
      
  },
  VariableChoosed: {
    backgroundColor: COLORS.Primary,
    zIndex: 1,
    top: 0,
    right: 0,
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: COLORS.White,
    borderRadius: 5,
    position: 'absolute',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'transparent',
    color: COLORS.Primary,
  },
  buttonBuy: {
    borderTopWidth: 1, 
    marginBottom: 15,
    borderColor: COLORS.Primary,
    color: COLORS.Primary,
    padding: 20,
    borderRadius: 5,
    textAlign: 'center',
    borderWidth: 1, 
    lineHeight: 10,
    //width: '100%'
    width: (Dimensions.get('screen').width - 15)
  },
  buttonBuyActive: {
    color: COLORS.White,
    backgroundColor: COLORS.Primary
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlayHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Transparent,
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        paddingTop: 90,
      },
      android: {

      },
    }),
  },

  header_icon: {
    padding: 10,
    backgroundColor: COLORS.White_Opacity,
    borderRadius: 50,
    margin: 5,
    zIndex: 10,
    marginVertical: 15,

  },
  cart: {
    padding: 10,
    //backgroundColor: 'transparent',  
  },
  search: {
    //backgroundColor: 'transparent',  
    margin: 0,
  },
  ImageSliders: {
    flex: 1,
    height: 450,
    flexDirection: 'row',
    backgroundColor: COLORS.Secondary,
    alignContent: 'center',
    width: '100%',
    resizeMode: 'contain', // Chỉnh kích thước hình
  },
  countImages: {
    position: 'absolute',
    bottom: 35,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.White_Opacity,
    paddingHorizontal: 15,
    padding: 5,
    zIndex: 10,
    borderRadius: 50,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'absolute',
  },
  discount_percent: {
    fontSize: 20,
    color: COLORS.White,
    verticalAlign: 'bottom',
    alignContent: 'flex-end',
    textAlign: 'justify',
    lineHeight: 45,
    marginLeft: 15,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: COLORS.Primary,
  },
  view_detail_more_button: {
    color: COLORS.Primary,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    paddingTop: 20,
    backgroundColor: COLORS.White_Opacity,


  },
  view_detail_less_button: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default detail;
