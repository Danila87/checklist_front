import { createStore } from 'vuex'

import Toast from './Toast/index.js'
import Operations from './Operations/index.js'
import TypesCheckList from "./TypesCheckList/index.js";
import CreateChecklist from "./CreateChecklist/index.js";
import Checklists from "./Checklists/index.js"
import User from "./User/index.js";
export default createStore({

  state: {

  },

  getters: {

  },

  mutations: {

  },

  actions: {

  },

  modules: {
    Toast,
    Operations,
    TypesCheckList,
    CreateChecklist,
    Checklists,
    User
  }

})
