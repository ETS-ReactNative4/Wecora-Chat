const React = require("react-native");
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
    
    InputLabelText: {
        color: "#FFFFFF",
        alignSelf: 'flex-start',
        fontSize: 12,
        marginLeft: 6
    },

    formInputItem: {
        padding: 5,
        flexDirection: 'column',
        marginTop: 10,
        justifyContent: "center",
        height: (deviceHeight / 12),
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: '#FFFFFF32',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    inputStyle: {
        width: deviceWidth - (deviceWidth / 12) * 2,
        color: "#FFFFFF",
        fontSize: 14
    }
};
