import LayoutBasic from '@/layout/basic/LayoutBasic.vue';
import type { RouteRecordRaw } from 'vue-router';

import PgmHome from './PGMHome.vue';

export const pgMateRoute: RouteRecordRaw = {
  path: '/pgmate',
  component: LayoutBasic,
  children: [
    {
        path:'',
        component:PgmHome
    },
    {
        path:'home',
        component:PgmHome
    }
  ],
};

export default pgMateRoute;
