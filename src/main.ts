import { createApp } from 'vue'
import {pinia} from './store';
import { router } from './router';
import Antd ,{ Layout,Menu,Button,Upload} from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
import 'virtual:windi.css'
import "./style.css";

import App from './App.vue'

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Antd);
app.mount('#app')
