// @flow

import { observable, action, flow } from 'mobx';
import GeneralApi from '../services'
import Constants from '../global/Constants';
const stateObs = Constants.Global.state
const itemType = Constants.Global.itemType


class Store {

    @observable createState = stateObs.START;
    @observable listState = stateObs.START;
    @observable errors = undefined;
    @observable parent = undefined;
    @observable parentType = itemType.USER;
    @observable list = []
    @observable selectedItem = undefined


    fetchList = flow(function* (parent, parentType) {
        if (this.parent !== parent) {
            this.parent = parent
            this.list = []
            this.listState = stateObs.LOADING

            var reslist
            try {
                //console.log(parentType)
                switch (parentType) {
                    case itemType.USER:
                        resp = yield GeneralApi.fetchUserItems()
                        reslist = resp.data.items
                        break;
                    case itemType.BOARD:
                        resp = yield GeneralApi.fetchBoardItems(this.parent.id)
                        //console.log(resp)
                        reslist = resp.data.ideas.map(idea => {
                            return ({
                                quantity: idea.quantity,
                                ...idea.item,
                                board: idea.board.name,
                                project: idea.board.project.name
                            })
                        })
                        break;
                    case itemType.LABEL:
                        resp = yield GeneralApi.fetchLabelItems(this.parent.id)
                        reslist = resp.data.items
                        break;
                    case itemType.PROJECT:
                        resp = yield GeneralApi.fetchProjectItems(this.parent.id)
                        reslist = resp.data.items
                        break;
                    case itemType.QUERY:
                        resp = yield GeneralApi.fetchQueryItems(this.parent)
                        reslist = resp.data.items
                        break;
                    default:
                        break

                }
                this.listState = stateObs.DONE
                this.list = reslist.map((obj) => {
                    return ({
                        ...obj, dummyImage: 'https://images.unsplash.com/photo-1526922289011-a875fbd2fb0d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=31f596b4bb5ed1b8233c6b723019f96c'//'https://source.unsplash.com/random'
                    })
                })
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
            const resp = yield GeneralApi.createItem(this.parent.id, name)
            this.createState = stateObs.DONE

            //console.log(resp.data)
            this.list.replace([resp.data, ...this.list])
        } catch (error) {
            this.createState = stateObs.ERROR
            //console.log(error.message)
        }
    })



    @action reset() {
        this.createState = stateObs.START
    }

    @action setSelected(selectedItem) {
        this.selectedItem = selectedItem
    }
    @action clearSelected() {
        this.selectedItem = undefined
    }
}

export default new Store();