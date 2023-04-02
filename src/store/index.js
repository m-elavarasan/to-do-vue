import { createStore } from 'vuex'
import userAuth from './modules/userAuth'

const store = createStore({
  modules: {
    userAuth,
  },
})

export default store
