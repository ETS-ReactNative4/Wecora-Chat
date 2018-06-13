'use strict';
import React from 'react';
import {
  StyleSheet,
  PropTypes,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from './styles';


export default class CusButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { textColor: '#E55A4F' }
  }

  onPress = () => {

  }
  onShowUnderlay = () => {
    this.setState({
      textColor: '#fff'
    })
  }
  onHideUnderlay = () => {
    this.setState({
      textColor: '#E55A4F'
    })
  }
  render() {
    return (

      <TouchableHighlight
        style={styles.button}
        onPress={this.props.onPress}
        underlayColor='#CC4A41'
        onShowUnderlay={this.onShowUnderlay}
        onHideUnderlay={this.onHideUnderlay}
      >
        <Text style={{ color: this.state.textColor }}> {this.props.text} </Text>
      </TouchableHighlight>


    )
  }
}





