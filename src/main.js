import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import VueSweetalert2 from 'vue-sweetalert2';
import router from './router'
import store from './store'
import './registerServiceWorker'
import './css/bulma.css'
import './css/main.css'

Vue.use(VeeValidate);
Vue.use(VueSweetalert2);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
