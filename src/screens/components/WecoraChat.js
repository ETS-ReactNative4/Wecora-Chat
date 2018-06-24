// @flow

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Platform, Image
} from 'react-native';

import FastImage from 'react-native-fast-image'

import Constants from '../../global/Constants';
import WecoraButton from './WecoraButton'
const Icon = Constants.Images.Icon

import { inject, observer } from 'mobx-react/native';

import ElevatedView from 'react-native-elevated-view'

@inject('App', 'Account') @observer
export default class WecoraChat extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    renderImageView = () => {
        const { comment, Account } = this.props
        if (comment.attachments &&
            comment.attachments[0] && 
            comment.attachments[0].image &&
            comment.attachments[0].image.thumb) { 
            return (
                <View style={styles.image}>
                <Image style={{alignSelf: 'center'}} resizeMode={'cover'} source={require('../../../resources/images/wecora_icon_trans.png')}/>
            <FastImage
                style={StyleSheet.absoluteFill}
                source={{
                    uri: comment.attachments[0].image.large,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            </View>

            )
        }
        else return null
    }

    render() {

        const { comment, Account } = this.props
        const isMine = Account.current.account_id == comment.commentor_account_id
        const isIos = Platform.OS == 'ios'
        return (
            <View>
                {!isMine ?
                    <View style={styles.talkBubble}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <View style={styles.circle}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>{comment.comment_by.charAt(0)}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', width: '85%' }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>

                                <ElevatedView elevation={0} style={isIos ? styles.talkBubbleTriangleIos : styles.talkBubbleTriangle} />
                                    <ElevatedView elevation={0} style={styles.talkBubbleSquare}>
                                        {this.renderImageView()}
                                        <Text style={styles.talk}>{comment.comment} </Text>
                                    </ElevatedView>
                                   
                                </View>
                                <View style={styles.chatInfo}>
                                    <Text style={styles.chatInfoName}>{comment.comment_by} </Text>
                                    <Text style={styles.chatInfoName}>{comment.created_at} </Text>
                                </View>
                            </View>
                        </View>
                    </View> :
                    <View style={[styles.talkBubbleRev, { opacity: comment.loading ? 0.2: 1}]}>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', justifyContent: 'flex-end' }}>
                        <ElevatedView elevation={0} style={styles.talkBubbleTriangleRev} />
                            <ElevatedView elevation={0} style={styles.talkBubbleSquareRev}>
                                {this.renderImageView()}
                                <Text style={styles.talkRev}>{comment.comment} </Text>
                            </ElevatedView>
                            
                        </View>
                        <View style={styles.chatInfoRev}>
                            {/* <Text style={styles.chatInfoName}>{comment.comment_by} </Text> */}
                            <Text style={styles.chatInfoNameRev}>{comment.created_at} </Text>
                        </View>
                    </View>
                }
            </View>

        );
    }


}

const styles = StyleSheet.create({
    talkContainer: {

    },
    talkBubbleRev: {
        width: '85%',
        margin: 4,
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
    },
    talkRev: {
        padding: 16,
        fontSize: 16,
        color: '#fff',

    },
    chatInfoRev: {
        marginVertical: 4,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    talkBubbleSquareRev: {
        backgroundColor: '#E55A4F',
        borderRadius: 2,
        flex: 9,
    },
    talkBubbleTriangleRev: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderBottomColor: '#E55A4F',
        transform: [
            { rotate: '180deg' }
        ],
        left: 0.75,
        shadowOpacity: 0,
    },
    chatInfoNameRev: {
        fontSize: 10,
        opacity: 0.7,
        paddingHorizontal: 4
    },


    /////// non rev //////////

    talkBubbleSquare: {
        backgroundColor: '#fff',
        borderRadius: 2,
        flex: 9,
        left: 3,
    },
    talkBubbleTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 15,
        borderLeftWidth: 15,
        borderTopColor: 'transparent',
        borderLeftColor: '#fff',
        transform: [
            { rotate: '180deg' }
        ],
        left: 5
    },
    talkBubbleTriangleIos: {
        shadowOpacity: 0.1,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 15,
        borderTopWidth: 15,
        borderRightColor: 'transparent',
        borderTopColor: '#fff',
        transform: [
            { rotate: '90deg' }
        ]
    },
    chatInfoName: {
        fontSize: 10,
        opacity: 0.7,
        paddingHorizontal: 4
    },
    talkBubble: {
        margin: 4,
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
    },

    talk: {
        padding: 16,
        opacity: Constants.Colors.textOpacity,
        fontSize: 16
    },
    chatInfo: {
        marginVertical: 4,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    circle: {
        marginLeft: 8,
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        top: 0,
        opacity: 0.54
    },
    icon: {
        marginTop: 10,
        fontSize: 80,
        color: Constants.Colors.loginBackgroundColor
    },
    /// Common
    image: {
        height: 160,
        width: '100%'
    }
});
