// @flow

import { observable, action, flow, configure, runInAction, computed } from 'mobx';
import GeneralApi from '../services'
import Constants from '../global/Constants';
import App from './App'
const stateObs = Constants.Global.state
configure({ enforceActions: true });

class Store {

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
                const list = yield GeneralApi.fetchBoards(this.parent.id)
                this.listState = stateObs.DONE
                this.list = list.data.boards.sort((a, b) =>
                    a.name.localeCompare(b.name))

                //console.log(this.list)
            } catch (error) {
                this.listState = stateObs.ERROR
                //console.log(error.message)
            }
        }
    })

    @action
    setList = async (parent, id) => {
        const list = await GeneralApi.fetchBoards(parent.id)
        runInAction(() => {
            this.parent = parent
            this.list = []
            this.listState = stateObs.LOADING
            try {

                this.listState = stateObs.DONE
                this.list = list.data.boards.sort((a, b) =>
                    a.name.localeCompare(b.name))

                //console.log(this.list)
            } catch (error) {
                this.listState = stateObs.ERROR
                //console.log(error.message)
            }

        })
        return this.list.find((board) => board.id == id)
    }

    setCount = flow(function* (id, count = 0)  {
        const i = this.list.findIndex((board) => board.id == id)
        if(i > -1){
            var board = {...this.list[i]}
            board.unread_count = count
            this.list[i] = board
        }
    })

    create = flow(function* (name) {
        this.createState = stateObs.LOADING
        try {
            const resp = yield GeneralApi.createBoard(this.parent.id, name)
            this.createState = stateObs.DONE

            //console.log(resp.data)
            App.navigateToScreen(resp.data, Constants.Screens.CHATS_SCREEN)
            this.list = [resp.data, ...this.list].sort((a, b) =>
                a.name.localeCompare(b.name))
        } catch (error) {
            this.createState = stateObs.ERROR
            //console.log(error.message)
        }
    })

    @action reset() {
        this.createState = stateObs.START
    }
}

export default new Store();