import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  title: undefined,
  dialog: false,
  records: undefined,
  l_title: '',
  l_color: '',
  editDialog : false,
  deleteDialog : false,
  deleteRefresh :  false

}
const types = {
  SET_TITLE: 'SET_TITLE',
  GET_RECORDS: 'GET_RECORDS',
  SET_DIALOG: 'SET_DIALOG',
  SET_EDITDIALOG : 'SET_EDITDIALOG',
  SET_DELETEDIALOG : 'SET_DELETEDIALOG',
  SET_DELETEEVENT : 'SET_DELETEEVENT',
  SET_TITLE_L: 'SET_TITLE_L',
  SET_TITLE_C: 'SET_TITLE_C'
}
const mutations = {
  [types.SET_TITLE] :(state, {title}) => {
    state.title = title
  },
  [types.GET_RECORDS]: (state, {records}) => {
    state.records = records
  },
  [types.SET_DIALOG]: (state, {dialog}) => {
    state.dialog = dialog
  },
  [types.SET_EDITDIALOG]: (state, {editDialog}) => {
    state.editDialog = editDialog
  },
  [types.SET_DELETEDIALOG]: (state, {deleteDialog}) => {
    state.deleteDialog = deleteDialog
  },
  [types.SET_DELETEEVENT]: (state, {deleteRefresh}) => {
    state.delete  = deleteRefresh
  },
  [types.SET_TITLE_L]: (state,{l_title}) => {
    state.l_title = l_title
  },
  [types.SET_TITLE_C]: (state,{l_color}) => {
    state.l_color = l_color
  }

}

const actions = {

  setTitle : ({commit}, payload) => {
    commit(types.SET_TITLE, payload)
  },
  setDialog : ({commit}, payload) => {
    commit(types.SET_DIALOG, payload)
  },
  setEditDialog : ({commit}, payload) => {
    commit(types.SET_EDITDIALOG, payload)
  },
  setDeleteDialog : ({commit}, payload) => {
    commit(types.SET_DELETEDIALOG, payload)
  },
  setDeleteEvent : ({commit}, payload) => {
    commit(types.SET_DELETEEVENT, payload)
  },
  setTitleL : ({commit}, payload) => {
    commit(types.SET_TITLE_L, payload)
  },
  setColor : ({commit}, payload) => {
    commit(types.SET_TITLE_C, payload)
  },
  setRecord : ({commit}, payload) => {
    commit(types.GET_RECORDS, payload)
  }
}

const getters = {
  record: state => state.records
}



export default new Vuex.Store({

  state,
  mutations,
  actions,
  getters

})
