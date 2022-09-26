import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:JSON.parse(localStorage.getItem('user')),
    token:localStorage.getItem('token')
  },
  getters: {
  },
  mutations: {
    // 清空用户状态
    cleraUserState(state){
      state.user=undefined
      state.token=undefined
      localStorage.clear()
    },

    // 当成功后存
    saveUserState(state,payload){
      state.user=payload.user
      state.token=payload.token
      // 存入localStorage
      localStorage.setItem('token',payload.token)
      localStorage.setItem('user',JSON.stringify(payload.user))

    }
  },
  actions: {
  },
  modules: {
  }
})
