import { createApp } from 'vue'
import {pinia} from './stores/';
import { router } from './router/index';
import Antd from 'ant-design-vue';
import TodayUI from 'today-ui';

import 'today-ui/dist/style.css';
import 'ant-design-vue/dist/reset.css';

import "./style.css";

import App from './App.vue'
import { useRouteGuardHook } from './router/guard';

const app = createApp(App);
app.use(Antd);
app.use(TodayUI);
app.use(pinia);
useRouteGuardHook(router)
app.use(router);
app.mount('#app')
