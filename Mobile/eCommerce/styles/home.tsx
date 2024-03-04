
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
    paddingVertical: 10,
    height: 60,
    alignItems: 'center',
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
    paddingHorizontal: 10,
    width: Dimensions.get('screen').width - 190,
    marginHorizontal: 10,
    paddingEnd: 5,

    alignItems: 'center',
  },
  search_button: {
    color: COLORS.White,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: COLORS.Primary,
  },

  banner: {
    height: 123,
    width: Dimensions.get('screen').width - 40,
    backgroundColor: COLORS.Transparent,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',

  },
  category: {
    // backgroundColor: COLORS.Pink,
    marginTop: 0,
  },
  vouchers: {
    
    backgroundColor: COLORS.White,
    marginTop: 10,
  },
  voucher_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  

});
export default home;