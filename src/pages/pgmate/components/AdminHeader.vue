<template>
  <div class="layout-admin-header">
    <a-button :icon="h(PlusCircleOutlined)" @click="onAdd">添加</a-button>

    <a-modal v-model:open="open" title="新建连接" @ok="handleOk">
      <a-form
        :model="formState"
        name="basic"
        ref="connFormRef"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="连接名称"
          name="name"
          :rules="[
            { required: true, message: 'Please input your connection name!' },
          ]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item
          label="Host"
          name="host"
          :rules="[{ required: true, message: 'Please input your host!' }]"
        >
          <a-input v-model:value="formState.host" />
        </a-form-item>
        <a-form-item
          label="Port"
          name="port"
          :rules="[{ required: true, message: 'Please input your port!' }]"
        >
          <a-input v-model:value="formState.port" />
        </a-form-item>
        <a-form-item label="初始数据库" name="database">
          <a-input v-model:value="formState.database" />
        </a-form-item>
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: 'Please input your 用户名' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: 'Please input your 密码' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
      </a-form>
    </a-modal>
    <WinCreateDb />
  </div>
</template>

<script setup lang="ts">
import { h, reactive, ref } from "vue";
import { PlusCircleOutlined } from "@ant-design/icons-vue";

import type { FormInstance } from "ant-design-vue";
import { useSystemStore } from "@/stores/pgmate";
import WinCreateDb from "./CreateDbWin.vue";
import type { IConnection } from "../../../types/pgmate.interface";

const open = ref(false);
const connFormRef = ref<FormInstance | null>(null);

const systemStore = useSystemStore();

const onAdd = () => {
  open.value = true;
};

const formState = reactive<IConnection>({
  name: ``,
  host: `localhost`,
  port: 5432,
  database: ``,
  username: `postgres`,
  password: ``,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleOk = () => {
  if (!connFormRef.value) {
    return;
  }
  connFormRef.value
    .validate()
    .then((res) => {
      console.log(res);
      systemStore.connections.push(res as IConnection);
      open.value = false;
      connFormRef.value?.resetFields();
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
.layout-admin-header {
  display: flex;
  height: 100%;
  align-items: center;
}
</style>
