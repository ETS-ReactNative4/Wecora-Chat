// @flow

import { observable, action, flow } from 'mobx';
import GeneralApi from '../services'
import Constants from '../global/Constants';
const stateObs = Constants.Global.state


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

    create = flow(function* (name) {
        this.createState = stateObs.LOADING
        try {
            const resp = yield GeneralApi.createBoard(this.parent.id, name)
            this.createState = stateObs.DONE

            //console.log(resp.data)
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