const React = require("react-native");
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#E55A4F"
  },
  logoView: {
    alignSelf: 'center',
    marginTop: ( deviceHeight / 2 ) - 72
  },
  logo: {
    width: 144,
    height: 144
  },
  versionText: {
    color: "#FFFFFF",
    lineHeight: 16,
    fontSize: 14,
    opacity: 0.54
  },
  versionView: {
    alignSelf: 'center',
    marginTop: ( deviceHeight / 2 ) - 144
  }
};
