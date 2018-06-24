import React, { Component } from 'react';

import {
    TextInput, Text, View,
    StyleSheet, Platform
} from "react-native";

import Constants from '../../global/Constants';


const defaultColor = Constants.Colors.inputDefaultColor
const pressedColor = Constants.Colors.inputPressedColor
const labelColor = Constants.Colors.inputlabelColor
const inputColor = Constants.Colors.inputTextColor

export default class WecoraInput extends Component {


    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: props.defaultColor ? props.defaultColor : defaultColor,
            labelColor: props.labelColor ? props.labelColor : labelColor,
            inputColor: props.inputColor ? props.inputColor : inputColor
        };
    }

    focus() {
        this.textInput.focus();
    }

    onFocus = () => {
        this.setState({
            backgroundColor: this.props.pressedColor ? this.props.pressedColor : pressedColor
        })
    }

    onBlur = () => {
        this.setState({
            backgroundColor: this.props.defaultColor ? this.props.defaultColor : defaultColor
        })
    }

    render() {
        const { hidden, label, onChangeText, keyboardType,
            value, returnKeyType, onSubmitEditing } = this.props;
        return (
            <View style={[styles.formInputItem, { backgroundColor: this.state.backgroundColor }]}>
                <Text style={[styles.inputLabelText, { color: this.state.labelColor }]}>{label} </Text>
                <TextInput secureTextEntry={hidden}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    underlineColorAndroid='transparent'
                    onChangeText={onChangeText}
                    blurOnSubmit={ false }
                    onBlur={this.onBlur} onFocus={this.onFocus}
                    ref={(input) => this.textInput = input}
                    style={[styles.inputStyle, { color: this.state.inputColor }]} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    inputLabelText: {
        alignSelf: 'flex-start',
        fontSize: 12,
        opacity: Constants.Colors.textOpacity
    },
    formInputItem: {
        flexDirection: 'column',
        height: 50,
        justifyContent: 'center',
        marginBottom: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 2,
    },
    inputStyle: {
        color: "red",
        fontSize: 14,
        height: 30,
        flex: 1,
        paddingBottom: 0
    }
});
