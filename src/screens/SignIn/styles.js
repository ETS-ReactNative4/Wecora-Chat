const React = require("react-native");
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
    container: {
        backgroundColor: "#E55A4F"
    },
    spinner: {
        marginTop: (deviceHeight / 2) - 216
    },
    logoView: {
        alignSelf: 'center',
        marginTop: (deviceHeight / 2) - 216
    },
    logo: {
        width: 144,
        height: 144
    },
    InputLabelText: {
        color: "#FFFFFF",
        alignSelf: 'flex-start',
        fontSize: 12,
        marginLeft: 6
    },
    ForgotPasswordText: {
        color: "#FFFFFF"
    },
    formView: {
        flex: 1,
        justifyContent: "space-between",
        marginTop: 75
    },
    formInputItem: {
        padding: 5,
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        justifyContent: "center",
        height: (deviceHeight / 12),
        marginLeft: (deviceWidth / 12),
        marginRight: (deviceWidth / 12),
        backgroundColor: '#FFFFFF32',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    buttonLoginStyle: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        marginLeft: 16,
        marginRight: 16,
        width: deviceWidth - 32
    },
    buttonForgotPasswordStyle: {
        marginTop: 30,
        justifyContent: 'center',
        marginLeft: (deviceWidth / 12),
        width: deviceWidth - (deviceWidth / 12) * 2,
        marginRight: (deviceWidth / 12),
    },
    inputStyle: {
        width: deviceWidth - (deviceWidth / 12) * 2,
        color: "#FFFFFF",
        fontSize: 14
    }
};
