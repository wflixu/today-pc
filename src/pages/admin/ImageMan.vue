<template>
  <div class="page">
    <div class="flex-1 mb-2">
      <a-upload
        v-model:file-list="fileList"
        name="file"
        :multiple="true"
        :action="actionUrl"
        :headers="headers"
        @change="handleChange"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          Click to Upload
        </a-button>
      </a-upload>
      <a-button type="primary" @click="refreshList">刷新</a-button>
    </div>

    <div>
      <a-table :dataSource="uploadedFileList" :columns="columns">
        <template #action="{ record }">
          <a :href="record.url" link target="_blank">查看</a>
          <a-button class="ml-2" size="small" @click="onClickDetele(record)"
            >删除</a-button
          >
        </template>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive, ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import  { apiHost } from "@/common/http";
import type { Attach } from "./type";
import { curl } from "@/common/http";
import { lastValueFrom } from "rxjs";
const authStore = useAuthStore();

const fileList = ref<Attach[]>([]);
let uploadedFileList = ref<Attach[]>([]);
const getFiles = async () => {
  let res = await  lastValueFrom(curl.get("/chunk/imgs"));

  if (res.code === 200) {
    uploadedFileList.value = res.data.map((item: Attach) => {
      return {
        ...item,
        url: apiHost + "/chunk/show" + "?id=" + item.id,
      };
    });
  }
};

const refreshList = () => {
  getFiles();
};

const handleChange = (info: FileInfo) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    getFiles();
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};

onMounted(() => {
  getFiles();
});

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "文件名",
    dataIndex: "filename",
    key: "filename",
  },
  {
    title: "操作",
    dataIndex: "action",
    slots: { customRender: "action" },
  },
];

const onClickDetele = (record: Attach) => {
  curl.delete(`/chunk/${record.id}`).subscribe((res) => {
    console.log(res.data);
    if (res.code == 200) {
      getFiles();
    }
  });
};
const actionUrl = apiHost + "/chunk/upload";
const headers = {
  Authorization: authStore.token,
};
</script>
<style lang="postcss">
.flex-1 {
  display: flex;
  justify-content: space-between;
}
</style>
