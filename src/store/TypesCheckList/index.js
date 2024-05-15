import axios from "axios";

const getters = {

}

const state = {

    typesCheckList : [],
    typesCheckListOperations : [],
    operationsByType: []

}

const actions = {

    getTypes ({commit}) {

        axios.get('/api/checklist/type_checklist/getAll')
            .then(response => {
                commit('setTypes', response.data)
            })
            .catch(response => {
                console.log(response)
            })
    },

    getTypesOperations({commit}) {

        axios.get('/api/checklist/type_checklist/all_by_operations')
            .then(response => {
                commit('setOperations', response.data)
            })
            .catch(response => {
                console.log(response)
        })
    },

    getOperationsByType({commit}, type_id) {
        axios.get(`/api/checklist/type_checklist/${type_id}/operations`)
            .then(response => {
                commit('setOperationByType', response.data.operations)
            })
            .catch(response => {
                console.log(response)
            })
    },

    async saveType({}, typeCheckList) {
        return await axios.post('/api/checklist/type_checklist', typeCheckList)
    },

    async updateType({}, typeCheckList) {
        return await axios.patch(`/api/checklist/type_checklist/${typeCheckList.id}`,{"type_name": typeCheckList.type_name})
    },

    async removeType({}, type_id) {
        return await axios.delete(`/api/checklist/type_checklist/${type_id}`)
    },

    async setOperationByType({}, payload) {
        return await axios.post('/api/checklist/type_checklist/operations/insert', payload)
    },

    async deleteOperationByType({}, payload) {
        console.log(payload)
        return await axios.delete('/api/checklist/type_checklist/operations/delete', {data: payload})
    }

}

const mutations = {

    setTypes(state, types) {
        state.typesCheckList = types
    },

    setOperations(state, operations) {
        state.typesCheckListOperations = operations
    },

    setOperationByType(state, operations) {
        state.operationsByType = operations
    },

    clearOperationsByType(state) {
        state.operationsByType = []
    }

}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}