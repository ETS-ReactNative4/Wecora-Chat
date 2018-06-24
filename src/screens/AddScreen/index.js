// @flow

import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import NavButtons from '../../global/NavButtons';
import NavBar from '../../global/NavBar';
import Constants from '../../global/Constants';
const stateObs = Constants.Global.state

import WecoraInput from '../components/WecoraInput';
import WecoraButton from '../components/WecoraButton';
import WecoraTop from '../components/WecoraTop';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import Icon from 'react-native-vector-icons/FontAwesome';
const Icon = Constants.Images.Icon


type Props = {
    withCancelButton: boolean,
}

type State = {
    username: string,
    password: string,
}

@inject('App', 'Account', 'Projects', 'Boards', 'Chats') @observer
export default class AddScreen extends Component {
    static navigatorButtons = NavButtons.Login;
    static navigatorStyle = NavBar.Default;

    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            text: '',
            valid: true
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidMount() {
        this.handleVisibilityOfNavButtons();
    }

    componentWillUpdate = (nextProps) => {

        if (nextProps[nextProps.storeToObserve].createState == stateObs.DONE
            && !nextProps.actionSuccess.text) {
            setTimeout(() => {
                nextProps[nextProps.storeToObserve].reset()
                this.dismiss()
            }, 2000);
        }
    }

    onNavigatorEvent = (event: { id: string }) => {
        const { withCancelButton, storeToObserve } = this.props;

        switch (event.id) {
            case 'cancel':
                this.props[storeToObserve].reset()
                this.dismiss();
                break;
            case 'backPress':
                this.props[storeToObserve].reset()
                if (withCancelButton) this.dismiss();
                break;
            default:
        }
    }

    handleVisibilityOfNavButtons = () => {
        const { navigator, withCancelButton, withAccountsButton } = this.props;

        if (!withCancelButton) {
            navigator.setButtons({ leftButtons: [] })
        }
    }

    dismiss = () => {
        const { navigator } = this.props;

        navigator.dismissModal();
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validEmail = (text) => {

       
        if (this.props.email) {
            var valid = this.validateEmail(text)
            this.setState({ text, valid })
        } else {
            this.setState({ text, valid: true })
        }
    }

    getForm = () => {
        const { Account, navigator } = this.props
        const { icon, inputLabel, buttonText, email,
            buttonIcon, onChangeText, storeToObserve } = this.props

        //console.log(this.props)
        return (

            <View style={styles.form}>

                <View style={styles.wecoraInputContainer}>
                    <View style={styles.input}>
                        <WecoraInput label={inputLabel} hidden={false}
                            defaultColor='#FFFFFF'
                            pressedColor='#EBEBEB'
                            labelColor='#000'
                            inputColor='#000'
                            keyboardType={email ? 'email-address': undefined}
                            onChangeText={(text) => this.validEmail(text)} />
                    </View>{
                        !this.state.valid &&
                        <Text style={styles.errorText}><Icon style={styles.errorText} name="wecora_error" /> Not a valid email address</Text>
                    }
                </View>

            </View>
        )
    }

    getState = () => {
        const { storeToObserve, startMessage,
            loadMessage, errorMessage,
            successMessage, actionText,
            actionSuccess, actionFailed } = this.props

        switch (this.props[storeToObserve].createState) {
            case stateObs.START:
                return {
                    icon: this.props.icon,
                    text: startMessage,
                    action: undefined
                }
            case stateObs.LOADING:
                return {
                    icon: 'spin6',
                    text: loadMessage,
                    action: undefined
                }
            case stateObs.DONE:
                return {
                    icon: 'wecora_good',
                    text: successMessage + ' "' + this.state.text + '"',
                    action: {
                        text: actionSuccess.text,
                        onPress: () => this.props[storeToObserve].reset()
                    }
                }
            case stateObs.ERROR:
                return {
                    icon: 'wecora_error',
                    text: errorMessage,
                    action: {
                        text: actionFailed.text,
                        onPress: () => this.props[storeToObserve].reset()
                    }
                }
            default:
                return {
                    icon: this.props.icon,
                    text: startMessage,
                    action: actionText
                }

        }

    }

    render() {
        const { Account, navigator } = this.props;
        const { icon, inputLabel, buttonText,
            buttonIcon, onChangeText, storeToObserve } = this.props
        const screenState = this.getState()
        return (

            <View style={styles.container}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    keyboardOpeningTime={0}
                    extraHeight={Platform.select({ android: 100 })}>
                    <View style={styles.icon_container}>
                        <WecoraTop icon={screenState.icon} text={screenState.text} action={screenState.action} />
                    </View>

                    {this.props[storeToObserve].createState == stateObs.START
                        ? this.getForm() : <View style={styles.holder} />}

                </KeyboardAwareScrollView>
                {
                    this.state.valid && this.props[storeToObserve].createState == stateObs.START &&
                    <View style={styles.button}>
                        <WecoraButton
                            text={buttonText.toUpperCase()}
                            iconName={buttonIcon}
                            dark
                            isLarge
                            onPress={() => this.props[storeToObserve].create(this.state.text)}
                        />
                    </View>
                }
                 {Platform.OS == 'ios' && <KeyboardSpacer />
                    }
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.Colors.backgroundColor,
    },
    errorText: {
        color: Constants.Colors.errorText,
        fontSize: 14,
        marginHorizontal: 16
    },
    icon_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginHorizontal: 16,
        marginVertical: 5
    },

    button: {

    },
    form: {
        flex: 1,
        justifyContent: 'space-between'
    },
    holder: {
        flex: 0.4
    }
})

