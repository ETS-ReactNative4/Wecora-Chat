// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';

import NavButtons from '../../global/NavButtons';
import NavBar from '../../global/NavBar';
import Constants from '../../global/Constants';
import CounterView from '../components/Counter';

@inject('App', 'Account', 'Counter') @observer
export default class SplashScreen extends Component {
    //static navigatorButtons = NavButtons.WithSideMenu;
    static navigatorStyle = NavBar.Hidden;

    constructor(props: {}) {
        super(props);

        const { App, navigator } = this.props;
        App.rootNavigator = navigator;

        //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentWillMount = () => {
        const { Account, navigator } = this.props;
        
        setTimeout(() => {
            var screen = Account.authorized ?  
            {...Constants.Screens.PUSHED_SCREEN } : 
            {...Constants.Screens.SIGNIN_SCREEN} 
            this.props.navigator.resetTo(screen)
        }, 1000);
    }

    // onNavigatorEvent = (event: {}) => {
    //     if (event.id === 'menu') {
    //         this.props.navigator.toggleDrawer({
    //             side: 'left',
    //             animated: true
    //         });
    //     }
    // }

    render() {
        const { Account, Counter } = this.props;

        return (
            <View style={styles.container}>
            <View style={styles.icon_container}>
                    <Image style={styles.icon}
                        source={require('../../../resources/images/wecora_icon_trans.png')} />
                </View>
                <Text style={styles.icon_text}>Wecora v1.0.0 </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.Colors.loginBackgroundColor,
    },
    icon_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 120,
        width: 120,
    },
    icon_text: {
        alignSelf: 'center',
        color: Constants.Colors.textLight,
        opacity: Constants.Colors.textOpacity,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 30
    },
});
