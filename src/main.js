import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import router from './router'
import store from './store'
import './registerServiceWorker'
import './css/bulma.css'
import './css/main.css'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
