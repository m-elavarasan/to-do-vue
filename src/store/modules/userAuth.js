import { login,logout } from "@/services/authService";
export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    updateUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async LOGIN({ commit }, { data, onSuccess, onFail }) {
      return login(data.userMail, data.userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          commit("setUser", user);
          onSuccess(user);
          return user;
        })
        .catch((error) => {
          onFail(error.message);
        });
    },
     LOGOUT({ commit }, {  onSuccess, onFail }) {
      return logout()
      .then(() => {
      commit("setUser", null)
      onSuccess()
      localStorage.removeItem("user")
      })
      .catch((error) => {
        onFail(error)
      })
    }   
  },
};
