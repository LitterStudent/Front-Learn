import Vue from 'vue';
import App from './app.vue';

Vue.prototype.$EventBus = new Vue();

new Vue({
    render:h=>h(App)
}).$mount('#app')