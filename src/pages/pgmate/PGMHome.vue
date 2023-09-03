<template>
  <a-layout class="layout-pg">
    <a-layout-header class="admin-header"><AdminHeader /> </a-layout-header>
    <a-layout class="admin-body">
      <a-layout-sider class="body-sider">
        <admin-slider />
      </a-layout-sider>
      <a-layout-content class="body-content"> </a-layout-content>
    </a-layout>
    <a-layout-footer class="cover admin-footer">
      <AdminFooter></AdminFooter>
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import AdminSlider from "./components/AdminSlider.vue";
import AdminFooter from "./components/AdminFooter.vue";
import AdminHeader from "./components/AdminHeader.vue";
</script>

<style scoped lang="postcss">
.layout-pg {
  height: 100%;
  .admin-header {
    height: 60px;
    background-color: #3ba0e9;
    border-bottom: 1px solid #aaa;
    padding-inline: 16px;
  }
  .admin-body {
    .body-sider {
      text-align: center;
      background-color: #3ba0e9;
    }
    .body-content {
      min-height: 120px;
      background-color: transparent;
      overflow-y: hidden;
    }
  }
  .admin-footer {
    text-align: center;
    color: white;
    height: 28px;
    background-color: #7dbcea;
    padding: 0 18px;
  }
}
</style>
