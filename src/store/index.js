import { createStore } from 'vuex'
import userAuth from './modules/userAuth'
import toDoStore from './modules/toDoStore'
const store = createStore({
  modules: {
    userAuth,
    toDoStore
  },
})

export default store
