<template>
  <div>
    <a-modal
      v-model:open="open"
      title="新建数据库"
      @ok="handleOk"
      @cancel="handleCancel"
    >
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
          label="数据库名称"
          name="name"
          :rules="[
            { required: true, message: 'Please input your connection name!' },
          ]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>
    <context-holder />
  </div>
</template>

<script setup lang="ts">
import { useLayoutAdminStore } from "@/stores/pgmate";
import type { IConnection, IDatabase } from "@/types/pgmate.interface";
import type { FormInstance } from "ant-design-vue";
import { reactive, ref, watch } from "vue";
import { message } from "ant-design-vue";
const [messageApi, contextHolder] = message.useMessage();
const layoutStore = useLayoutAdminStore();
const open = ref(false);
const connFormRef = ref<FormInstance | null>(null);
const formState = reactive<IDatabase>({
  name: ``,
  id: "",
});
const onFinish = (values: any) => {
  console.log("Success:", values);
};

watch(
  () => layoutStore.showCreateDbWin,
  (val) => {
    console.log(val);
    open.value = val;
  }
);

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const handleCancel = () => {
  layoutStore.showCreateDbWin = false;
};
const handleOk = () => {
  if (!connFormRef.value) {
    return;
  }
  connFormRef.value
    .validate()
    .then((res) => {
      console.log(res);
      layoutStore.creatDb(res.name).then((res: any) => {
        if (res === 0) {
          open.value = false;
          connFormRef.value?.resetFields();
        } else if (res == 4) {
          messageApi.error("数据库已经存在");
        } else {
          message.error("错误！");
        }
      });
      //   systemStore.connections.push(res as IConnection);
      //   open.value = false;
      //   connFormRef.value?.resetFields();
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped></style>
