
import { StyleSheet } from 'react-native';
import COLORS from '../consts/colors';

const home = StyleSheet.create({
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
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo:{},
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
    fontSize: 16, fontWeight: 'bold', color: COLORS.Grey
  },
  iconheader: {

    marginTop: 10,
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