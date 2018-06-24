// @flow

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    ActivityIndicator,
    TextInput, Image,
    Platform, Keyboard, TouchableOpacity
} from 'react-native';
import { inject, observer, } from 'mobx-react/native';
import CounterView from '../components/Counter';
import WecoraTop from '../components/WecoraTop';
import WecoraChat from '../components/WecoraChat';
import WecoraButton from '../components/WecoraButton';
import ActionSheet from '../components/ActionSheet';
import WecoraItem from '../components/WecoraItem';
import NavButtons from '../../global/NavButtons';
import NavBar from '../../global/NavBar';
import ImagePicker from 'react-native-image-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Constants from '../../global/Constants';
const stateObs = Constants.Global.state
const Icon = Constants.Images.Icon
import ElevatedView from 'react-native-elevated-view'
import Boards from '../../stores/Boards';

const modalProps = {
    title: 'Invite Client',
    icon: 'wecora_message',
    inputLabel: 'Client email address',
    buttonText: 'Send Invite',
    buttonIcon: 'wecora_send',
    storeToObserve: 'Chats',
    startMessage: undefined,
    loadMessage: 'Sending invite',
    errorMessage: 'Something Went Wrong',
    successMessage: 'Invitation has been sent to',
    actionSuccess: { text: 'Send another invite' },
    actionFailed: { text: 'Try Again' },
    email : true
}

const topParams = {
    icon: 'wecora_msg',
    text: 'There are no clients in this project to chat with',
    textDes: undefined,
    action: 'INVITE A CLIENT',
}

@inject('Boards', 'Projects', 'Chats', 'Items') @observer
export default class ChatScreen extends Component {
    static navigatorStyle = NavBar.Default;

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            selectedImageSource: undefined,
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        Icon.getImageSource('dot-3', 18).then((menu) => {
            this.props.navigator.setButtons({
              rightButtons: [
                { id: 'menu', icon: menu },
              ]
            });
          });
      
    }
    onNavigatorEvent = (event: { id: string }) => {
        if (event.id == 'willAppear') {
            //console.log('will apper')
            if (this.props.Items.selectedItem) {

                let source = { uri: this.props.Items.selectedItem.dummyImage };
                this.setState({
                    ...this.state,
                    selectedImageSource: source
                });
                this.props.Items.clearSelected()
            }
        }
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'menu') {
                this.ActionSheet.showActionSheet()
            }
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
    }

    _keyboardDidShow = () => {
        setTimeout(() => {
            this.listview.scrollToEnd({ animated: true })
        }, 50);

    }


    componentWillMount = () => {
        const { Chats, item } = this.props
        Chats.fetchList(item)
    }

    _renderFooter = () => {
        const { Chats } = this.props;
        if (Chats.listState == stateObs.LOADING) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size={'large'} color={Constants.Colors.loginBackgroundColor} />
                </View>
            )
        }
        else return null
    };
    imageResult = (resp) => {

        if (resp.didCancel) {
            //console.log('User cancelled image picker');
        }
        else if (resp.error) {
            //console.log('ImagePicker Error: ', resp.error);
        }
        else {

            let source = { uri: 'data:image/jpeg;base64,' + resp.data };

            this.setState({
                ...this.state,
                selectedImageSource: source
            });

        }

    }

    resetState = () => {
        this.setState({
            message: '',
            selectedImageSource: undefined,
        })
    }
    _keyExtractor = (item, index) => item.id + "";
    _renderItem = ({ item }) => (
        <WecoraChat
            comment={item}
            style={styles.item} />
    );

    render() {
        const { Boards, Chats, navigator } = this.props;
        const { selectedImageSource, message } = this.state

        var options = {
            title: 'Select Image',
            mediaType: 'photo',
            quality: 0.6,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        return (
            <View style={styles.container}>
                {Chats.listState == stateObs.DONE &&
                    Chats.list.length == 0 &&
                    <View style={styles.top}>
                        <WecoraTop icon={topParams.icon}
                            text={topParams.text}
                            textDes={topParams.textDes}
                            action={topParams.action ? {
                                text: topParams.action.toUpperCase(),
                                onPress: () => Constants.Global.openAddModal(this.props.navigator, true, modalProps.title, modalProps)
                            } : undefined} />
                    </View>
                }


                <View style={styles.list}>
                    <FlatList
                        data={Chats.list.slice()}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ref={list => { this.listview = list }}
                        onContentSizeChange={() => {
                            this.listview.scrollToEnd({ animated: true })
                        }}
                        ListFooterComponent={this._renderFooter}
                    />
                </View>
                <View>
                    <View style={styles.inputBar}>
                        <TextInput
                            placeholder={'Type a message'}
                            underlineColorAndroid='transparent'
                            onChangeText={(message) => { this.setState({ message }) }}
                            value={message}
                            multiline={true}
                            blurOnSubmit={false}
                            autoFocus={false}
                            ref={input => { this.textInput = input }}
                            style={styles.input} />
                        <View style={styles.inputButtons}>
                            <TouchableOpacity
                                onPress={() => this.imageActionSheet.showActionSheet()}>
                                <Icon style={styles.inputIconCam} name={'wecora_camera'} />
                            </TouchableOpacity>

                            <WecoraButton
                                style={styles.inputSend}
                                fab
                                iconName={'wecora_send'}
                                dark
                                disable={this.state.message.length < 1}
                                onPress={() => {
                                    Chats.createComment(message, selectedImageSource)
                                    this.resetState()

                                }} />
                        </View>
                    </View>
                    {selectedImageSource &&

                        <View style={styles.selectedImage}>
                            <Image source={selectedImageSource}
                                style={{ height: 160 }} />
                            <View style={styles.bin}>
                                <WecoraButton
                                    fab
                                    iconName={'wecora_bin'}
                                    transparent
                                    dark
                                    onPress={() => {
                                        this.resetState()
                                    }} />
                            </View>
                        </View>
                    }
                </View>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['VIEW BOARD', 'INVITE CLIENT']}
                    onPress={(index) => {
                        if (index == 1) {
                            navigator.push({
                                ...Constants.Screens.ITEMS_SCREEN,
                                title: "Boards",
                            });
                        }
                        if (index == 2) {
                            setTimeout(() => {
                                Constants.Global.openAddModal(navigator, true,
                                    modalProps.title, modalProps)
                            }, 500);

                        }
                    }} />

                <ActionSheet
                    ref={o => this.imageActionSheet = o}
                    options={['ADD FROM WECORA ITEM LIBRARY',
                        'ADD FROM PHOTO LIBRARY', 'ADD FROM CAMERA']}
                    onPress={(index) => {
                        setTimeout(() => {
                            switch (index) {
                                case 1:
                                    Constants.Global.openSearchModal(navigator, true,
                                        'ADD FROM ITEM LIBRARY', {})

                                    break;
                                case 2:
                                    ImagePicker.launchImageLibrary(options, (resp) => {
                                        this.imageResult(resp)
                                    })
                                    break;
                                case 3:
                                    ImagePicker.launchCamera(options, (resp) => {
                                        this.imageResult(resp)
                                    })
                                    break;
                                default:
                                    break;
                            }
                        }, 500);
                    }} />
                {Platform.OS == 'ios' && <KeyboardSpacer />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.Colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        flex: 3
    },
    selectedImage: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
        marginVertical: 10
    },
    item: {
        width: '100%'
    },
    loading: {
    },
    fab: {
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 16,
        bottom: 16,
    },
    inputButtons: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputBar: {
        width: '100%',
        height: 56,
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    },
    input: {
        flex: 5,
        height: 72,
        fontSize: 16,
    },
    inputIconCam: {
        fontSize: 22
    },
    inputSend: {
    },
    bin: {
        position: 'absolute',
        alignSelf: 'center',
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        backgroundColor: '#000',
        opacity: 0.54,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
