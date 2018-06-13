import React from 'react';

import { Container, Text, Content, Icon, Button, Form, Item, Label, Spinner, Input } from "native-base";

import styles from './styles';

export default class CusInputEmailReset extends React.Component {

    constructor(props) {
        super(props);
        this.state = { backgroundColor: '#FFFFFF32' };
    }

    onFocus = () => {
        this.setState({
            backgroundColor: '#FFFFFF'
        })
    }

    onBlur = () => {
        this.setState({
            backgroundColor: '#FFFFFF32'
        })
    }

    render() {
        const { hidden, label } = this.props;
        return (
            <Item regular style={[styles.formInputItem, { backgroundColor: this.state.backgroundColor }]}>
                <Label style={styles.InputLabelText}>{label} </Label>
                <Input secureTextEntry={hidden} style={styles.inputStyle} />
            </Item>
        );
    }
}
