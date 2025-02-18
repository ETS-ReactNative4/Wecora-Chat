import React, { Component } from 'react'
import ShareExtension from 'react-native-share-extension'

import userDefaults from 'react-native-user-defaults'
import { AppRegistry } from 'react-native';
//import Share from './share.ios'
//import App from './src/app';
var RNFS = require('react-native-fs');


//AppRegistry.registerComponent('WecoraShare', () => Share);

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image
} from 'react-native'

export default class Share extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOpen: true,
      type: '',
      value: '',
      err: ''
    }
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      this.setState({
        type,
        value
      })

      if (type.includes("json")) {
        const millis = new Date().getTime()
        userDefaults.set("data", millis + "=>>=>" + value, "group.com.wecoraShare", (err, data) => {
          if (!err) {
            this.onClose()
            ShareExtension.openURL(`wecora://${'=parseHTML=?JSON='}`)
            //this.setState({ type: value })
          }
        })
      }
      else {
        const appGroupPath = await RNFS.pathForGroup('group.com.wecoraShare')
        const millis = new Date().getTime()
        const filename = millis + '.JPG'
        const destination = `${appGroupPath}/${filename}`
        await RNFS.copyFile(value, destination)
        userDefaults.set("data", millis + "=>>=>" + destination, "group.com.wecoraShare", (err, data) => {
          if (!err) {
            this.onClose()
            ShareExtension.openURL(`wecora://${destination}`)
            this.setState({ type: data })
          }
        })
      }


    } catch (err) {
      this.setState({ err })
    }
  }

  onClose = () => {
    ShareExtension.close()
  }

  closing = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <View style={{ backgroundColor: '#E55A4F', flex: 1, paddingTop: 15, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>{this.state.type} : {this.state.value}</Text> */}
        {
          // this.state.err.message &&

          // <Image style={{ height: 200, width: 400, resizeMode: 'stretch', margin: 5, flex: 1 }} source={{ uri: this.state.err.message }} />
        }
      </View>
    )
  }
}