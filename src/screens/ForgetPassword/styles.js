const React = require("react-native");
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Expo from 'expo';

export default {
    container: {
        flex: 1,
        height: deviceHeight,
        backgroundColor: "#E55A4F"
    },
    specialContainer: {
        flex: 1,
        height: deviceHeight,
        backgroundColor: "#F5f5f5"
    },
    contentStyle: {

        height: deviceHeight - 56 - Expo.Constants.statusBarHeight,     // 56 is Header Height for Android
        backgroundColor: "#F5F5F5"
    },
    spinner: {
        marginTop: (deviceHeight / 2) - 216
    },
    emailPngView: {
        alignSelf: 'center',
        marginTop: (deviceHeight / 3) - 182
    },
    emailPngStyle: {
        width: 182,
        height: 182
    },
    HeadingText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: "#404040",
        fontSize: 18,
        marginTop: 15,
        opacity: 0.54,
        marginLeft: (deviceWidth / 12) * 2,
        marginRight: (deviceWidth / 12) * 2
    },
    InputLabelText: {
        padding: 2,
        color: "#000000",
        opacity: 0.54,
        alignSelf: 'flex-start',
        fontSize: 14
    },
    errorLabelText: {
        color: "#E55A50",
        alignSelf: 'flex-start',
        fontSize: 14,
        lineHeight: 20,
        paddingLeft: 3
    },
    formView: {
        justifyContent: "space-between",
        marginTop: 10
    },
    formInputItem: {
        padding: 5,
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        marginTop: 16,
        justifyContent: "center",
        marginLeft: 16,
        marginRight: 16
    },
    labelTextItem: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        marginLeft: (deviceWidth / 12),
        marginRight: (deviceWidth / 12)
    },
    buttonResetStyle: {
        marginTop: 16,
        backgroundColor: '#E55A50',
        justifyContent: 'center',
        width: deviceWidth,
    },
    buttonGeneralError: {
        flex: 1,
        marginTop: 30,
        marginLeft: (deviceWidth / 12) * 2,
        width: deviceWidth - (deviceWidth / 12) * 4,
        marginRight: (deviceWidth / 12) * 2,
        alignItems: 'center',
        backgroundColor: '#FFFFFF00',
    },
    buttonGeneralErrorText: {
        color: '#E55A4F',
        fontSize: 16
    },
    buttonTextStyle: {
        color: '#FFFFFF'
    },
    inputStyle: {
        color: "#000000",
        fontSize: 16
    }
};
