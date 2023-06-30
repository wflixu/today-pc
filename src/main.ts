import { createApp } from 'vue'
import {pinia} from './store';
import { router } from './router/index';
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
import 'virtual:windi.css'
import "./style.css";

import App from './App.vue'
import { useRouteGuardHook } from './router/guard';

const app = createApp(App);
app.use(pinia);
useRouteGuardHook(router)
app.use(router);
app.use(Antd);
app.mount('#app')
