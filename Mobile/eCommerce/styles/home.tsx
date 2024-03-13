
import { Dimensions, StyleSheet } from 'react-native';
import COLORS from '../consts/colors';
import HomeScreen from '../screens/HomeScreen';
const home = StyleSheet.create({
  bg_light: {
    backgroundColor: COLORS.White,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: COLORS.Transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: 50,
    alignItems: 'center',
    // shadow
    shadowColor: COLORS.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
    elevation: 5,
    
  },
  scan_icon: {
    width: 30,
    height: 30,
    justifyContent: 'center'
  },
  search_box: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 2,
    height: 40,
    backgroundColor: COLORS.White_Opacity,
    borderColor: COLORS.Primary,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    paddingEnd: 5,

    alignItems: 'center',
  },
  search_button: {
    color: COLORS.White,
    fontSize: 14,
    right: 0,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: COLORS.Primary,
  },

  banner: {
    width: Dimensions.get('screen').width,
    backgroundColor: COLORS.Transparent,
    flexDirection: 'column',
    flex: 1,
    borderRadius: 10,
  },
   bannerItem: {
    borderRadius: 30,
    width: Dimensions.get('screen').width - 20,
    //backgroundColor: COLORS.White,
},
  category: {
    backgroundColor: COLORS.White,
    marginTop: 0,
  },
  vouchers: {
    backgroundColor: COLORS.White,
    paddingHorizontal: 10,
  },
  voucher_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 10,
    alignContent: 'center',
    alignItems: 'center',
  },

  sales: {
    backgroundColor: COLORS.Light,
    height: 200,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sales_header: {
    height: 50,

  },

  flashsale: {
    backgroundColor: COLORS.White,
    paddingHorizontal: 10,
  },
  flashsale_header: {
    height: 50,
    backgroundColor: COLORS.Red,
  },
  countdown_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 2,
    backgroundColor: COLORS.Primary,
    color: COLORS.White,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  product_recommend: {
    backgroundColor: COLORS.White,
    paddingHorizontal: 10,
    minHeight: 200,
    flex: 1,

    width: (Dimensions.get('screen').width - 20) / 2,  
  },

});
export default home;