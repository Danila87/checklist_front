import axios from 'axios'

const state = {
    operations: [],
}

const getters = {
    getOperationsCount(state) {
        return state.operations.length
    }
}

const mutations = {
    setOperations(state, operations) {
        state.operations = operations
    }
}

const actions = {

    async saveOperation({ commit }, operation) {

        if (operation['id'] !== undefined) {

            let data = {
                "name_operation": operation['name_operation'],
                "hint": operation['hint']
            }

            return await axios.patch(`/api/checklist/operations/${operation['id']}`, data)

        } else {

            return await axios.post('/api/checklist/operations', operation)

        }

    },

    async getOperations({ state, commit }) {

        await axios.get('/api/checklist/operations/getAll')
            .then(response => {
                commit('setOperations', response.data)
            })
            .catch(response => {
                console.log(response)
            })

    },

    async removeOperation({}, operation_id) {

       return await axios.delete(`/api/checklist/operations/${operation_id}`)

    },

}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}