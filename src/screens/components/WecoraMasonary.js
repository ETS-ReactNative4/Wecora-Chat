// @flow

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  FlatList, Dimensions
} from 'react-native';

import Constants from '../../global/Constants';
import WecoraButton from './WecoraButton'
import WecoraItem from './WecoraItem'
const Icon = Constants.Images.Icon

import Masonry from 'react-native-masonry-layout';
import FastImage from 'react-native-fast-image'
//import Masonry from 'react-native-masonry';

import { inject, observer } from 'mobx-react/native';

import ElevatedView from 'react-native-elevated-view'

const numColumns = 2;



@inject('App', 'Items') @observer
export default class WecoraMasonary extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  onPress = (item) => {
    const { Items, onItemPress } = this.props
    Items.setSelected(item)
    onItemPress(item)

  }

  _keyExtractor = (item, index) => item.id+"";
  _renderItem = ( item ) => (
    <View style={styles.itemContainer}>
      <WecoraItem
        onPress={() => { this.onPress(item) }}
        image={item.dummyImage}
        text={item.name}
        style={styles.item} />
    </View>
  );

  componentDidMount= () => {
    const { Items } = this.props
    const items = Items.list.map((item) => {
      return {
        dummyImage: item.dummyImage,
        name: item.name,
        key: item.id+"abc",
      }
    })
    this.refs.masonry.clear();
    this.refs.masonry.addItems(
      items
    );
    console.log("Mountx")
  }

  render() {
    const { Items } = this.props
    return (
      // <FlatList
      //   style={styles.list}
      //   data={Items.list.slice()}
      //   keyExtractor={this._keyExtractor}
      //   renderItem={this._renderItem}
      //   numColumns={numColumns} />


      // <Masonry
      //   sorted={true} // optional - Default: false
      //   columns={2}
      //   priority='balance'
      //   //customImageComponent={FastImage}
      //   bricks={[
      //     { key: 'jndsjkan', uri: 'https://images.unsplash.com/photo-1527884616203-22764be42a10?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=2400e68b875ad45a9805ff01b9fec0a4' },
      //     { key: 'jeqn', uri: 'https://images.unsplash.com/photo-1526399891524-4b2cdc830ffb?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=9489a72000147de93a705f0f1394a10f' },
      //     { key: 'qndkl', uri: 'https://images.unsplash.com/photo-1526940492648-319865408871?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=7d4097d6f7496c09b038ce2f97095800' },
      //     { key: 'qjksd', uri: 'https://images.unsplash.com/photo-1527521368495-00223c85e904?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=7846633ef4538b121c6e4eab31252c74' },
      //     { key: 'jskdn', uri: 'https://images.unsplash.com/photo-1526325837770-38d5783f75f8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=c8a94eb49263d0b8dadb278371314f56' },
      //     { key: 'jwkd', uri: 'https://images.unsplash.com/photo-1526720574804-e451998c487e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&h=300&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=820be9374df635ae2f1496f51612995b' },
      //     { key: 'keqn', uri: 'https://images.unsplash.com/photo-1526737511523-ba685f246e8c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=1600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=3dd3c7971d63aebc0dbeec6b4682232f' },
      //     { key: 'idow', uri: 'https://images.unsplash.com/photo-1528352309239-a5e782ba5aa8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=0b38f8eb5c3270c65b92f5bbe7171080' },
      //     { key: 'eonid', uri: 'https://images.unsplash.com/photo-1526487233521-e080483ce7b2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=898da5d4f2d7e6ee3222c95ac1d25f9e' },
      //   ]}
      // />

      <Masonry
        ref="masonry" // optional - Default: 2
        style={styles.list}
        renderItem={this._renderItem}
      // keyExtractor={this._keyExtractor}
      />
    )

  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 4
  },
  item: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  list: {
    marginHorizontal: 12,
    flex: 1,
  }
});






     // renderFooter: (data) => {
    //     return (
    //       <View key='brick-header' style={{backgroundColor: 'white', padding: 5, paddingRight: 9, paddingLeft: 9}}>
    //         <Text style={{lineHeight: 20, fontSize: 14}}>{data.key}</Text>
    //       </View>
    //     )
    //   }