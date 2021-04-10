import { Sizing } from "../../styles";

const { StyleSheet } = require('react-native');

const styles = StyleSheet.create({
  underline: {
    height: 50,
    borderBottomColor: 'black',
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizing.sw / 2,
    alignSelf: 'center'
  },
});

export default styles;
