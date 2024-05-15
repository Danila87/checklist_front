import axios from "axios";
import router from "../../router/index.js";

const state = {

    user: null

}

const getters = {

}

const mutations = {

    setUser(state, user_data) {
        state.user = user_data
    },

    clearUser(state) {
        state.user = null
    }

}

const actions = {

    async registerUser({state}, registration_data) {
        return await axios.post('/auth/register', registration_data)
    },

    authentication({commit, dispatch}, auth_data) {
        axios.post('/auth/login', auth_data)
            .then(async response => {

                localStorage.setItem('user_jwt', response.data.access_token)
                const user_data = await dispatch('decodeJwtLogin', response.data.access_token)
                commit('setUser', user_data)

                router.push({name: 'Main'})

                return true

            })
            .catch(response => console.log(response))
    },

    logOut({commit}) {
        commit('clearUser')
        localStorage.removeItem('user_jwt')
        router.push({name: 'Auth'})
    },

    decodeJwtLogin({}, jwt_token) {
        const tokenParts = jwt_token.split('.');
        return JSON.parse(atob(tokenParts[1]))
    }

}


export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}