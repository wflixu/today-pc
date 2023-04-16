import LayoutBasic from '@/layout/basic/LayoutBasic.vue';
import type { RouteRecordRaw } from 'vue-router';
import Login from './Login.vue';


export const passportRoute: RouteRecordRaw = {
  path: '/passport',
  component: LayoutBasic,
  children: [
    {
      path: 'login',
      component: Login,
    },
  ],
};

export default passportRoute;
