const React = require("react-native");
const { Dimensions } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Expo from 'expo';

export default {
    container: {
        height: deviceHeight,
        // backgroundColor: "#E55A4F"
        flex: 1,
        backgroundColor: '#E55A4F',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5'
    },
    contentStyle: {
        height: deviceHeight - 56 - Expo.Constants.statusBarHeight,
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
        color: "#404040",
        textAlign: 'center',
        opacity: 0.54,
        alignSelf: 'center',
        fontSize: 18,
        padding: 10,
        lineHeight: 30,
        marginLeft: (deviceWidth / 12) * 2,
        marginRight: (deviceWidth / 12) * 2
    },
    InputLabelText: {
        color: "#000000",
        opacity: 0.54,
        alignSelf: 'flex-start'
    },
    projectListBox: {
        marginTop: 5,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        marginLeft: 16,
        width: deviceWidth - 32,
        height: (deviceHeight / 12),
        marginRight: 16,
    },
    errorLabelText: {
        color: "#E55A50",
        alignSelf: 'flex-start',
        fontSize: 14,
        lineHeight: 20,
        paddingLeft: 3
    },
    formView: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'column'
    },
    cardBody: {
        flex: 1,
        flexDirection: 'row',
        width: deviceWidth - 32
    },
    formInputItem: {
        padding: 5,
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        marginTop: 10,
        justifyContent: "center",
        height: (deviceHeight / 12),
        marginLeft: (deviceWidth / 12),
        marginRight: (deviceWidth / 12)
    },
    labelTextItem: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        marginLeft: (deviceWidth / 12),
        marginRight: (deviceWidth / 12)
    },
    buttonResetStyle: {
        marginTop: 10,
        backgroundColor: '#E55A4F',
        justifyContent: 'center',
        marginLeft: (deviceWidth / 12),
        width: deviceWidth - (deviceWidth / 12) * 2,
        marginRight: (deviceWidth / 12),
    },
    buttonCreateNewProject: {
        marginTop: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        marginLeft: (deviceWidth / 12) * 1,
        width: deviceWidth - (deviceWidth / 12) * 2,
        marginRight: (deviceWidth / 12) * 1,
    },
    buttonAddNewProject: {
        marginTop: 20,
        justifyContent: 'center',
        width: deviceWidth
    },
    buttonCreateNewProjectText: {
        fontSize: 16
    },
    buttonTextStyle: {
        color: '#FFFFFF'
    },
    inputStyle: {
        width: deviceWidth - (deviceWidth / 12) * 2,
        color: "#000000",
        fontSize: 16,
        lineHeight: 20
    }
};
