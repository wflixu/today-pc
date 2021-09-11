<template>
  <div>
    <h2>用户管理</h2>
    <div class="searchbox">
      <div class="left"></div>
      <div class="right">
        <a-button type="primary" @click="onAddUser">新增</a-button>
      </div>
    </div>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #action="{ record }">
        <div class="table_actions">
          <a-button type="link" size="small" @click="onDeteleRecord(record)">查看</a-button>
          <a-button type="link" size="small" @click="onDeteleRecord(record)">编辑</a-button>
          <a-button type="link" size="small" @click="onDeteleRecord(record)">删除</a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>
 <script lang="ts">
import { ref, defineComponent, reactive, onMounted } from 'vue';

import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'User',
  props: {},
  setup: () => {
    const router = useRouter();
    let dataSource = ref([]);
    axios
      .get('/api/user')
      .then((res) => {
        let { code, data, msg } = res.data;
        console.log(res);
        if (code) {
          console.log(msg);
        }
        dataSource.value = data.list;
        console.log(dataSource);
      })
      .catch((err) => {
        console.log(err);
      });

    const onDeteleRecord = (record: any) => {
      console.log(record);

      axios
        .delete('/api/user', {
          data: {
            id: record._id,
          },
        })
        .then((res) => {});
    };

    const onAddUser = () => {
      router.push('/sign');
    };

    return {
      dataSource,
      onDeteleRecord,
      onAddUser,

      columns: [
        {
          title: '姓名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '电话',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '角色',
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      ],
    };
  },
});
</script>
 <style scoped lang="less">
.table_actions {
  display: flex;
}
.searchbox {
  display: flex;
  height: 48px;
  align-items: center;
  .left {
    flex: 1;
  }
}
</style>