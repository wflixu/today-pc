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
        <a-menu-item v-for="menu in menus" :key="menu.key">
          <div>
            <user-outlined />
            <span>{{ menu.title }}</span>
          </div>
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
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        class="overflow-x-auto"
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

import adminRoute from "@/pages/admin/route";
import type { IMenu } from "@/pages/admin/type";

export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    console.log(adminRoute);

    const menus = ref<IMenu[]>([]);
    if (adminRoute.children) {
      menus.value = adminRoute.children.map((item) => {
        return {
          title: item.meta?.title ?? item.path,
          key: item.path,
        } as IMenu;
      });
    }

    const router = useRouter();
    const route = useRoute();
    const handleClick = (e: any) => {
      console.log("click", e);
      router.push(`/admin/${e.key}`);
    };
    return {
      menus,
      handleClick,
      selectedKeys: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
    };
  },
});
</script>

<style scoped></style>
