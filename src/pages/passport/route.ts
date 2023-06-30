import LayoutBasic from '@/layout/basic/LayoutBasic.vue';
import type { RouteRecordRaw } from 'vue-router';
import Login from './Login.vue';
import Sign from './Sign.vue';


export const passportRoute: RouteRecordRaw = {
  path: '/passport',
  component: LayoutBasic,
  children: [
    {
      path: 'login',
      name: 'Login',
      component: Login,
    },
    {
      path: 'sign',
      name: 'Sign',
      component: Sign,
    },
  ],
};

export default passportRoute;
