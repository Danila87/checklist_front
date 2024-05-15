import axios from 'axios'
import moment from "moment-timezone";

const state = {

    operationsByType: [],
    data: null,
}

const getters = {
    creation_time: state => {
        return moment().tz('Asia/Irkutsk').format('LT')
    }
}

const mutations = {

    setOperations(state, operations) {
        state.operationsByType = operations
    },

    setData(state, template) {
        state.data = template
    },

    updateWorkingBefore(state, payload) {
        state.data.operations[payload.index].working_before = payload.newValue;
    },

    updateWorkingAfter(state, payload) {
        state.data.operations[payload.index].working_after = payload.newValue;
    },

    updateComment(state, payload) {
        state.data.operations[payload.index].comment = payload.newValue;
    },

    setCreationTime(state) {

        let now = new Date
        state.data.checklist.creation_time = Math.floor(now.getTime() / 1000)
    },

    setFinishTime(state) {

        let now = new Date
        state.data.checklist.finish_time = Math.floor(now.getTime() / 1000)
    }

}

const actions = {

    getOperations({commit}, type_id) {
        axios.get(`/api/checklist/type_checklist/${type_id}/operations`)
            .then(response => {

                commit('setOperations', response.data.operations.filter(operation => operation.status === 1))

                axios.get(`/api/checklist/type_checklist/${type_id}/create_template`)
                    .then(response => {
                        commit('setData', response.data)
                        commit('setCreationTime', {time: 1})
                    })
                    .catch(response => {
                        alert('Произошла ошибка при получении шаблона')
                    })

            })
            .catch(response => {
                alert('Возникла ошибка')
            })
    },

    async saveChecklist({state, commit}, user_id) {
        commit('setFinishTime')
        state.data.checklist.user_id = user_id

        return axios.post('/api/checklist/', state.data)
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}