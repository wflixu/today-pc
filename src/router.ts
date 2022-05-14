
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import FileUpload from './pages/FileUpload.vue';
import Admin from './pages/Admin.vue';
import Play from './pages/Play.vue';
import Tailwind from './pages/Tailwind.vue';

import Login from './pages/Login.vue';
import Sign from './pages/Sign.vue';

import Test from './pages/Test.vue'

import PostEditor from './pages/blog/PostEditor.vue';
import PostList from './pages/blog/PostList.vue';
import PostDetail from './pages/blog/PostDetail.vue';

import PostPage from './pages/Post.vue';

import Chart from './pages/chart/Chart.vue';

import User from './pages/User.vue';
import RobustList from './pages/robust/RobustList.vue';
import Robust from './pages/robust/Robust.vue';
import Training from './pages/robust/Training.vue';


import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import ImageManVue from './pages/ImageMan.vue';
import SearchVue from './pages/search/Search.vue';



export const routes: Array<any> = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/robust',
        component: Robust,
        children: [
            {
                path: '',
                component: RobustList
            },
            {
                path: 'train',
                component: Training
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/search',
        component: SearchVue
    },
    {
        path: '/sign',
        component: Sign
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/post',
        component: PostList
    },
    {
        path: '/post/editor',
        component: PostEditor
    },
    {
        path: '/post/:id',
        component: PostDetail
    },
    {
        path: '/admin',
        component: Admin,
        children: [
            {
                path: 'image', component: ImageManVue,
                title: '图片管理'
            },
            {
                path: 'file', component: FileUpload,
                title: '文件上传'
            },
            { path: 'play', component: Play, title: 'play' },
            { path: 'tailwind', component: Tailwind, title: 'tailwind' },
            {
                path: 'about',
                title: 'About',
                component: About,
            },
            {
                path: 'chart',
                title: 'Chart',
                component: Chart,
            },
            {
                path: 'users',
                title: 'Users',
                component: User,
            },
        ]
    },
];

// keep it simple for now.
export const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})
