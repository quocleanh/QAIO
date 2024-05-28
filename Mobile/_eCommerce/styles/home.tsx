
import { StyleSheet } from 'react-native';
import COLORS from '../consts/colors';
import HomeScreen from '../screens/HomeScreen';
const home = StyleSheet.create({
  scrollView: {

  },


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 16,
    top: 0,
    height: '100%',
    verticalAlign: 'middle',
  },
  customBadge: {
    backgroundColor: "#00AFD7",
    color: "white"
  },
  header: {
    
    marginTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    padding:20,
    height: 60,
  },
  search: {
    flexDirection: 'row',
    marginTop: 20,
    // add your styles for the 'search' view here
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.Light,
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',

  },
  sortBTN: {
    height: 50,
    width: 50,
    color: COLORS.White,
    backgroundColor: COLORS.Grey,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,

  },
  categoryContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.Grey
  },
  categoryText_Active: {
    borderBottomColor: COLORS.Primary,
    color: COLORS.Primary,
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  iconheader: {
    right: 10,
    marginTop: 10,
  },
  FlatList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    alignItems: 'center',

  },
  card: { 
    height: 270,
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginBottom: 10,
    padding: 0,
    flexDirection: 'column-reverse', 
    flex: 1,
    marginHorizontal: 5,
  },


  cardImage: {
    padding: 30,
    height: 190,
    width: '100%',
    borderRadius: 10,
    zIndex: 1,
    position: 'relative',
    resizeMode: 'cover',
    backgroundColor: '#e8e8e87d'
  },
  fav_icon_border: {
    width: 25,
    height: 25,
    zIndex: 10,
    top: 20,
    right: 20,
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#ffffff6b',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fav_icon: {
    color: COLORS.Primary,
    backgroundColor: 'transparent',
    alignContent: 'center',
    justifyContent: 'center'
  },
  fav_icon_faved: {


  },
  cardContent: {},

  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    flexWrap: 'wrap',

  },
  img: {
  },
  cardPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
    color: COLORS.Primary,
    alignContent: 'flex-start',
    position: 'relative',
  },
  cardPriceSale: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: COLORS.Secondary,
    textAlign: 'right',
    alignContent: 'flex-end',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  superscript: {
    fontSize: 10, // Adjust the font size as needed
    position: 'absolute',
    top: -100,
    direction: 'rtl',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '100%',
    borderRadius: 10,

  },
  main: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',

  },
  text: {
    fontSize: 18,
    color: '#rgba(96,100,109, 1)',
  },
});

export default home;