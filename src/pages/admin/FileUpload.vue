
<template >
  <div>
    <div class="actions">
      <a-upload v-model:file-list="fileList" name="file" :multiple="true" :action="uploadUrl" :headers="headers"
        @change="handleChange">
        <a-button>
          <upload-outlined></upload-outlined>
          Click to Upload
        </a-button>
      </a-upload>
      <a-button @click="onCheck"> Check</a-button>
    </div>

    <div>
      <a-table :dataSource="uploadedFileList" :columns="columns">
        <template #action="{ record }">
          <div class="table-actions">
            <a :href="url(record.id)" target="_blank">下载</a>
            <a-button size="small" @click="onClickDetele(record)">删除</a-button>
          </div>

        </template>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "vue";
import http, { apiHost, type IRes } from "@/common/http";
import { lastValueFrom } from "rxjs";
import { curl } from "@/common/http";
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}
interface Attach {
  id: string;
  filename: string;
  mine: string;
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

    const fileList = ref([]);
    const getFiles = async () => {
      let res = await lastValueFrom( curl.get<IRes<any>>("/chunk/list"));
      if (res.code == 200) {
        return res.data as Attach[];
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
              url: window.location.origin + item.url,
            };
          });
        }
      });
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
      curl.delete<IRes<any>>(`/chunk/${record.id}`)
        .subscribe((res) => {
          if (res.code == 200) {
            getFiles().then((data) => {
              if (data) {
                uploadedFileList.value = data;
              }
            });
          }
        });
    };
    const url = (id: string): string => {
      return `${apiHost}/chunk/down/?id=${id}`;
    };

    const onCheck = async () => {
      const res = await lastValueFrom(curl.get<IRes<any>>('/chunk/check'))
      if (res.code == 200) {
        alert(res.data)
      }
    }
    const uploadUrl = apiHost + '/chunk/upload'
    return {
      fileList,
      uploadedFileList,
      columns,
      onClickDetele,
      url,
      uploadUrl,
      headers: {
        Authorization: window.localStorage.getItem('token') ?? '',
      },
      handleChange,
      onCheck
    };
  },
});
</script>
<style >
.actions {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
}

.table-actions {
  display: flex;
  gap: 18px;
  align-items: center;
}
</style>
