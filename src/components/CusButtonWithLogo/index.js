'use strict';
import React from 'react';
import {
  StyleSheet,
  PropTypes,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import styles from './styles';


export default class CusButtonWithLogo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { textColor: '#FFFFFF' }
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
        <View style={{ flex: 1,  flexDirection: 'row'}}>
          <Ionicons name="md-add" size={22} color={this.state.textColor} />
          <Text style={{ color: this.state.textColor, paddingLeft: 2, paddingTop: 2 }}> {this.props.text} </Text>
        </View>
      </TouchableHighlight>


    )
  }
}





