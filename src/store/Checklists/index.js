import axios from "axios";

const state = {

    all_checklists: [],
    checklist: {},
    checklist_operations: {},
    checklist_user: {}
}

const mutations= {

    setChecklists(state, data) {
        state.all_checklists = data
    },

    setCheckList(state, data){
        state.checklist = data.checklist
        state.checklist_operations = data.operations
        state.checklist_user = data.user
    }

}

const actions = {

    getAllChecklists({commit}) {
        axios.get('/api/checklist/')
            .then(response => {
                commit('setChecklists', response.data)
            })
            .catch(response => {
                console.log(response)
            })
    },

    getChecklist({commit}, checkListId) {
        axios.get(`/api/checklist/{id_checklist}?checklist_id=${checkListId}`)
            .then(response => {
                commit('setCheckList', response.data)
            })
            .catch(response => {
                console.log(response)
            })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}