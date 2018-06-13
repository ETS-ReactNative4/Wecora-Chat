import React from 'react';

import { Container, Text, Content, Icon, Button, Form, Item, Label, Spinner, Input } from "native-base";

import styles from './styles';

const defaultColor='#FFFFFF32'
const pressedColor='#FFFFFF64'
const labelColor='#FFFFFF'
const inputColor='#FFFFFF'

export default class CusInput extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = { backgroundColor: props.defaultColor ? props.defaultColor : defaultColor,
        labelColor : props.labelColor ? props.labelColor : labelColor, 
        inputColor : props.inputColor ? props.inputColor : inputColor };
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
        const { hidden, label, ref, onChangeText, value } = this.props;
        return (
            <Item regular style={[styles.formInputItem, { backgroundColor: this.state.backgroundColor }]}>
                <Label style={[styles.InputLabelText, { color: this.state.labelColor }]}>{label} </Label>
                <Input secureTextEntry={hidden} ref={ref ? ref : () => { }} 
                onChangeText={onChangeText ? onChangeText : () => { }} value={value ? value : console.log("") } 
                onBlur={this.onBlur} onFocus={this.onFocus} style={[styles.inputStyle, {color: this.state.inputColor}]} />
            </Item>
        );
    }
}
