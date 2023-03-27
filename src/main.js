import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
//导入全局样式表
import "./assets/css/global.css";
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
    router,
    // store,
    render: (h) => h(App),
}).$mount("#app");
