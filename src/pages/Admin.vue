<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <a-menu
                theme="dark"
                mode="inline"
                @click="handleClick"
                v-model:selectedKeys="selectedKeys"
            >
                <a-menu-item key="about">
                    <user-outlined />
                    <span>about</span>
                </a-menu-item>
                <a-menu-item key="file">
                    <video-camera-outlined />
                    <span>fileupload</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined />
                    <span>nav 3</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <menu-unfold-outlined
                    v-if="collapsed"
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px',
                }"
            >
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
    components: {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
    },
    setup() {

        const router = useRouter()
        const route = useRoute()
        const handleClick = (e: any) => {
            console.log('click', e);
            router.push(`/admin/${e.key}`)
        };
        return {
            handleClick,
            selectedKeys: ref<string[]>(["1"]),
            collapsed: ref<boolean>(false),
        };
    },
});
</script>

<style scoped>
</style>