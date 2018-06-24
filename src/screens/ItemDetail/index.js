// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button, Image, ScrollView
} from 'react-native';
import { inject, observer } from 'mobx-react/native';

import NavButtons from '../../global/NavButtons';
import NavBar from '../../global/NavBar';
import Constants from '../../global/Constants';

import FastImage from 'react-native-fast-image'

@inject('Items') @observer
export default class ItemDetail extends Component {

  static navigatorStyle = NavBar.Default;

  constructor(props: {}) {
    super(props);
  }

  componentWillUnmount = () => {
    this.props.Items.clearSelected()
  }

  renderDetail = (title, text) => {
    return (<View style={{ margin: 24, flex: 1 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>)

  }

  render() {
    const { Items } = this.props;
    const { selectedItem } = Items
    //console.log(selectedItem)
    const { project, board, source, description, unit_cost, dummyImage,
      selling_price, quantity, unit_cost_currency, selling_price_currency } = selectedItem
    return (
      <View style={styles.container}>
        <View style={styles.image}>
        <Image style={{alignSelf: 'center'}} resizeMode={'cover'} source={require('../../../resources/images/wecora_icon_trans.png')}/>
            <FastImage
                style={StyleSheet.absoluteFill}
                source={{
                    uri: dummyImage
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
        <ScrollView>
        <View style={styles.details}>
          <View style={styles.rowShow}>
          {this.renderDetail('Project', project ? project.name ? project.name : project : '...' )}
          {this.renderDetail('Board', board ? board : '...')}
          </View>
          {this.renderDetail('Source', source)}
          {this.renderDetail('Description', description ? description : '...')}
          <View style={styles.rowShow}>
          {this.renderDetail('Unit Cost', unit_cost ? '$'+unit_cost +''+ unit_cost_currency : '...')}
          {this.renderDetail('Selling Price', selling_price ? '$'+selling_price +''+ selling_price_currency : '...')}
          </View>
          {this.renderDetail('Quantity', quantity ? quantity: '...')}
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.backgroundColor
  },
  image: {
    width: '100%',
    height: 177
  },
  details: {
    flex: 1
  },
  rowShow: {
    flexDirection: 'row', 
  },
  title: {
    fontSize: 14,
    opacity: Constants.Colors.textOpacity,
    marginBottom: 2
  },
  text: {
    fontSize: 16,

  }

});
