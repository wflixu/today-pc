
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import FileUpload from './pages/FileUpload.vue';
import Admin from './pages/Admin.vue';
import Play from './pages/Play.vue';
import Tailwind from './pages/Tailwind.vue';

import Login from './pages/Login.vue';


import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
const routes: Array<any> = [
    { path: '/', redirect: '/admin' },
    {
        path:'/home',
        component: Home
    },
    {
        path:'/login',
        component: Login
    },
    {
        path: '/admin', 
        component: Admin,
        children: [
            { path: 'file', component: FileUpload },
            { path: 'play', component: Play },
            { path: 'tailwind', component: Tailwind },
            {
                path: 'about',
                component: About,
            },
        ]
    },
];

// keep it simple for now.
export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})
