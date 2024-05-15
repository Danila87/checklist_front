const getters = {

}

const state = {
    messagesStack: [],
}

const actions = {

}

const mutations = {
    addMessage(state, msg) {
        state.messagesStack.push({text: msg.text, color: msg.color})
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}