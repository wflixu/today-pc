import LayoutBasic from '@/layout/basic/LayoutBasic.vue';
import type { RouteRecordRaw } from 'vue-router';
import Search from './Search.vue';

export const searchRoute: RouteRecordRaw = {
  path: '/search',
  component: LayoutBasic,
  children: [
    {
      path: '',
      name:"searchDefault",
      component: Search,
    },
  ],
};

export default searchRoute;
