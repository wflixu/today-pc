import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router';
import "ant-design-vue/dist/antd.css";
import "./style.css";
import Antd ,{ Layout,Menu,Button,Upload} from 'ant-design-vue';

const app = createApp(App);
app.use(router);
// app.use(Antd);
app.use(Layout);
app.use(Menu);
app.use(Button);
app.use(Upload);
app.mount('#app')
