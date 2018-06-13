const React = require("react-native");
const { Dimensions, StyleSheet } = React;
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  
  button: {
    alignItems: 'center',
    backgroundColor: '#E55A50',
    padding: 10,
    marginTop: 10,
    position: 'absolute',
    bottom: 0,
    width: deviceWidth
  }
 
});

