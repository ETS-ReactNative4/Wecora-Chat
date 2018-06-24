// @flow

import { observable, action, flow } from 'mobx';
import GeneralApi from '../services'
import Constants from '../global/Constants';
import Account from './Account'
const stateObs = Constants.Global.state
import Pusher from 'pusher-js/react-native';
import pusherConfig from '../pusher.json';
var binaryToBase64 = require('binaryToBase64');

class Store {

    @observable commentState = stateObs.START;
    @observable createState = stateObs.START;
    @observable listState = stateObs.START;
    @observable errors = undefined;
    @observable parent = undefined;
    @observable list = []
    


    fetchList = flow(function* (parent) {
        if (this.parent !== parent) {
            this.parent = parent
            this.list = []
            this.listState = stateObs.LOADING
            try {
                const list = yield GeneralApi.fetchChats(this.parent.id)
                this.listState = stateObs.DONE
                this.list = list.data.comments.reverse()
                //console.log(this.list)
            } catch (error) {
                this.listState = stateObs.ERROR
                //console.log(error.message)
            }
        }
    })

    updateChat = flow(function* (parent) {
        try {
            const resp = yield GeneralApi.fetchChats(this.parent.id)
            this.list = resp.data.comments.reverse()
        } catch (error) {
            //console.log(error.message)
        }
    })

    create = flow(function* (email) {
        this.createState = stateObs.LOADING
        try {
            const resp = yield GeneralApi.inviteClient(this.parent.id, email)
            this.createState = stateObs.DONE
            //console.log(resp.data)
        } catch (error) {
            this.createState = stateObs.ERROR
            //console.log(error.message)
        }
    })

    createComment = flow(function* (comment, attachment) {
        var id = new Date().getMilliseconds()
        this.commentState = stateObs.LOADING
        const dummy = {
            id,
            comment,
            attachments: data,
            commentor_account_id: Account.current.account_id,
            loading: id
        }
        try {
            var data = []
            
            this.list.push(dummy)

            if (attachment && attachment.uri){
                data = [attachment.uri]
                if(!attachment.uri.includes(';base64,')){
                    data = yield GeneralApi.urlTobase64(attachment.uri)
                    data = ['data:image/jpeg;base64,'+binaryToBase64(data.data)]
                }
            } 

            const resp = yield GeneralApi.createComment(this.parent.id, comment, data)
            this.commentState = stateObs.DONE

            //console.log(resp.data)
            var i = this.list.findIndex(msg => msg.id == dummy.id)
        
            this.list[i] = resp.data
        } catch (error) {
            this.commentState = stateObs.ERROR
            //console.log(error.message)
        }
    })

    @action reset() {
        this.createState = stateObs.START
    }

    @action subscribeChat() {
        var pusher = new Pusher(pusherConfig.key, pusherConfig);
        //console.log(Account.current.account_id)
        var chatChannel = pusher.subscribe('comments_' + Account.current.account_id); // (2)
        chatChannel.bind('pusher:subscription_succeeded', () => { // (3)
            //console.log('subscription suceeded')
            chatChannel.bind('reload', (data) => {
                if (this.parent && data.commentor_id != Account.current.account_id && data.board_id == this.parent.id) {
                    this.updateChat(this.parent.id)
                }
            });
        });
    }



}

export default new Store();