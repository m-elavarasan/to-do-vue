import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import PrimeVue from 'primevue/config';
import firebaseConfig from "@/firebaseConfig";
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).use(PrimeVue).mount("#app");
