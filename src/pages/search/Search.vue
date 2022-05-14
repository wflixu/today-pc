<template>
    <div class="page">
        <div class="box">
            <div class="search-input">
                <input type="text" :value="keyword" placeholder="请输入关键字" @input="onInput" @keyup.enter="onEnter">
                <div class="search-selector " @click="showEngineList = true">
                    <template v-if="currentEngine">
                        <img :src="currentEngine.img" :alt="currentEngine.name" class="logo curr">
                    </template>
                    <div class="arrow">
                        <svg class="arrow-icon" width="10" height="6" viewBox="0 0 10 6" fill="#999"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.34919 5.71075C5.15303 5.91082 4.83089 5.91082 4.63494 5.71075L0.627304 1.61875C0.317409 1.30233 0.541867 0.768799 0.984877 0.768799L9.0045 0.7688C9.44751 0.7688 9.6714 1.30233 9.36117 1.61875L5.34919 5.71075Z">
                            </path>
                        </svg>
                    </div>
                </div>
                <ul class="engine-list" v-if="showEngineList">
                    <template v-for="item in engineList">
                        <li class="item" :class="{ 'active': engine == item.id }" @click="onClickEngine(item)">
                            <img :src="item.img" :alt="item.name" class="logo">
                            <span class="title">{{ item.name }}</span>
                            <img v-if="engine == item.id" class="icon-checked"
                                src="https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/icon-checked.9de545ad.svg">
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed, onMounted, reactive, ref, } from 'vue';
import { Engine } from './type'
import baidu from './../../assets/search/logo-baidu.png';
import bing from './../../assets/search/logo-bing.png';
import npm from './../../assets/search/logo-npm.png';
import github from './../../assets/search/logo-github.png';
import toutiao from './../../assets/search/logo-toutiao.png';


let keyword = ref('');

let engine = ref('baidu');

let storage = window.localStorage.getItem('engine');
if (storage) {
    engine.value == storage;
}

let showEngineList = ref(false)

const engineList = ref<Engine[]>([
    {
        name: '百度',
        img: baidu,
        target: `https://www.baidu.com/s?wd=`,
        id: 'baidu'
    },
    {
        name: '必应',
        img: bing,
        target: `https://cn.bing.com/search?q=`,
        id: 'bing'
    },
    {
        name: 'NPM',
        img: npm,
        target: `https://www.npmjs.com/search?q=`,
        id: 'npm'
    },
    {
        name: 'github',
        img: github,
        target: `https://github.com/search?q=`,
        id: 'github'
    },
    {
        name: '头条',
        img: toutiao,
        target: `https://so.toutiao.com/search?dvpf=pc&source=input&keyword=`,
        id: 'toutiao'
    },
]);
let currentEngine = computed(() => {
    return engineList.value.find(item => {
        return item.id == engine.value
    })
})
const onClickEngine = (item: any) => {
    console.warn(item);

    engine.value = item.id;
    window.localStorage.setItem('engine', item.id);
    showEngineList.value = false;
}
const onInput = (evt: any) => {
    keyword.value = evt.target?.value;
}
const onEnter = () => {
    if (keyword.value.trim().length < 1) {
        return;
    }

    if (currentEngine) {
        let url = currentEngine?.value?.target + keyword.value;
        window.open(url, '_blank');
    }

}




</script>

<style scoped lang="less">
.page {
    position: relative;
    background-image: url('./../../assets/bg.jpg');
    background-size: cover;
    height: 100vh;

    .box {
        margin-top: 15vh;
        display: flex;
        justify-content: center;
    }

    .search-input {
        height: 40px;
        width: 40vw;
        position: relative;

        input {
            width: 100%;
            height: 100%;
            padding-left: 72px;
            padding-right: 40px;
            font-size: 20px;
        }

        .search-selector {
            height: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            user-select: none;
            cursor: pointer;
            padding-bottom: 1px;
            padding-left: 0.5rem;
            display: flex;
            flex-direction: row;
            align-items: center;

            .logo {
                height: 32px;
                background: rgba(255, 255, 255, 0.3);
            }

            .arrow {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                flex-basis: 2.5rem;
                width: 1.5rem;
                height: 1.5rem;
                transition: transform .15s linear;
                color: #C9CDD4;
            }
        }

        .engine-list {
            display: flex;
            flex-direction: row;
            z-index: 750;
            flex-wrap: wrap;
            justify-content: flex-start;
            position: absolute;
            top: 60px;
            left: 0;
            background-color: #fff;
            border-radius: 2px;
            width: 40vw;
            padding: 8px 8px 0 8px;

            .item {
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 90px;
                height: 90px;
                border-radius: 2px;
                font-size: .8333333333rem;
                color: var(--color-primary);
                margin-right: 8px;
                margin-bottom: 8px;

                img {
                    width: 36px;
                    height: auto;
                    margin-bottom: 6px;
                }

                // .title {
                //     padding-top: 4px;
                // }

                &:hover {
                    background-color: #E8F3FF;
                }

                &.active {
                    font-weight: 500;
                    background-color: #E8F3FF;
                    color: #1E80FF;
                }

                .icon-checked {
                    position: absolute;
                    right: 4px;
                    top: 4px;
                    background-size: 100%;
                    width: 14px;
                    height: 14px;
                }

            }
        }
    }
}
</style>