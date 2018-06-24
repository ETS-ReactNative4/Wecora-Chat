// @flow

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

import Constants from '../../global/Constants';
import WecoraButton from './WecoraButton'
import WecoraBadge from './WecoraBadge'
import FastImage from 'react-native-fast-image'
const Icon = Constants.Images.Icon
import ElevatedView from 'react-native-elevated-view'

export default class WecoraItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        const { text, icon, badge, image } = this.props

        return (
            <ElevatedView elevation={2} style={styles.card}>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.props.onPress}
                    underlayColor={Constants.Colors.itemPressedColor}>
                    <View>
                        {image &&
                            <FastImage
                                style={{height: 90, width: '100%'}}
                                source={{
                                    uri: image
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        }

                        <View style={styles.buttonView}>
                            <Text style={styles.text}>{text}</Text>
                            {(!!icon || !!badge) && <WecoraBadge style={styles.badge} icon={icon} badge={badge} />}
                        </View>
                    </View>
                </TouchableHighlight>

            </ElevatedView>
        );
    }


}

const styles = StyleSheet.create({
    card: {
        width: '95%',
        margin: 4,
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
    button: {

    },
    buttonView: {
        marginVertical: 8,
        marginHorizontal: 12,
        flexDirection: 'row',
    },
    text: {
        flex: 8,
        color: Constants.Colors.textBlack,
        opacity: Constants.Colors.textOpacity,
        fontSize: 16,
        alignSelf: 'center'
    },
    badge: {
        flex: 2,
        alignSelf: 'center'
    }
});
