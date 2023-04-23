import firestoreService from "@/services/toDoService";

export default {
  state: {
    tasks: null,
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    setTasks(state, data) {
      state.tasks = data;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const data = await firestoreService.getData("tasks");
        commit("setTasks", data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    },
  },
};
