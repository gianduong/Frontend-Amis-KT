import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import vueDebounce from "vue-debounce";
import VueRouter from 'vue-router'
import VTooltip from 'v-tooltip'
import Store from "./components/Store/Store.vue"
import EmployeeList from "./components/Employee/EmployeeList.vue"
import Money from "./components/Accountant/Money.vue"
Vue.config.productionTip = false;
Vue.use(VTooltip);
Vue.use(vueDebounce, {
  listenTo: "input",
});
//1. Định nghĩa các path:
const routes = [
  { path: '/Store', component: Store },
  { path: '/EmployeeList', component: EmployeeList },
  { path: '/app/CA/CAProcess', component: Money },
]
//2. Khởi tạo router:
const router = new VueRouter({
  routes // short for `routes: routes`
})

//3. Khai báo sử dụng Vue-Router:
Vue.use(VueRouter)
new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
