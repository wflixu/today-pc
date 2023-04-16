<template lang="">
  <div>
    <a-upload
      v-model:file-list="fileList"
      name="file"
      :multiple="true"
      action="/api/upload"
      :headers="headers"
      @change="handleChange"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Click to Upload
      </a-button>
    </a-upload>
    <div>
      <a-table :dataSource="uploadedFileList" :columns="columns">
        <template #action="{ record }">
          <a :href="record.url" target="_blank">查看</a>
          <a-button size="small" @click="onClickDetele(record)">删除</a-button>
        </template>
      </a-table>
    </div>
    <div>
      <img />
    </div>
  </div>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import axios from "axios";
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}
interface Attach {
  _id: string;
  filename: string;
  url: string;
  [key: string]: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const handleChange = (info: FileInfo) => {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    let cur = reactive({});

    const fileList = ref([]);
    const getFiles = async () => {
      let response = await axios.get("/api/file");
      let res = response.data;

      if (res) {
        return res as Attach[];
      } else {
        return null;
      }
    };
    let uploadedFileList = ref<Attach[]>([]);
    onMounted(() => {
      getFiles().then((data) => {
        if (data) {
          console.log("data:", data);
          uploadedFileList.value = data.map((item) => {
            return {
              ...item,
              url: "http://127.0.0.1:7001/api/file/" + item._id,
            };
          });
        }
      });
    });

    const columns = [
      {
        title: "id",
        dataIndex: "_id",
        key: "_id",
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
      axios
        .delete("/api/upload", {
          data: {
            id: record._id,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (!res.data.code) {
            getFiles().then((data) => {
              if (data) {
                uploadedFileList.value = data;
              }
            });
          }
        });
    };
    return {
      fileList,
      uploadedFileList,
      columns,
      onClickDetele,
      headers: {
        authorization: "authorization-text",
      },
      handleChange,
      cur,
    };
  },
});
</script>
<style lang=""></style>
