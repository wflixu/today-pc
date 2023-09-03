<template>
  <div class="admin-slider">
    <div class="conn-list">
      <t-file-tree
        ref="fileTreeRef"
        :data="fileTreeData"
        @operate="handleContextMeun"
      >
      </t-file-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref, watch } from "vue";
import { useSystemStore } from "../../../stores/pgmate";
import type {
  IConnection,
  IDatabase,
  ITable,
} from "../../../types/pgmate.interface";

import type { IInnerTreeNode } from "today-ui";

import { useLayoutAdminStore } from "@/stores/pgmate";
const fileTreeRef = ref();

const systemStore = useSystemStore();
const layoutStore = useLayoutAdminStore();
const deletingNode = ref<IInnerTreeNode>();

const invoke = async (type: string, params: any) => {
  return [];
};
const isEmpty = computed(() => {
  return systemStore.connections.length < 1;
});

const fileTreeData = ref<Partial<IInnerTreeNode>[]>([]);

watch(
  () => systemStore.connections,
  (val) => {
    if (Array.isArray(val)) {
      fileTreeData.value = val.map((item) => {
        return {
          ...item,
          label: item.name,
          id: item.name,
          children: [],
          contextMenu: [
            { label: "连接", key: "connect" },
            { label: "新建数据库", key: "create-db" },
            { label: "删除连接", key: "del-conn" },
          ],
        };
      });
      console.log(JSON.stringify(fileTreeData.value));
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
const expandedKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);

const handleContextMeun = ({ key, node }: any) => {
  console.log(key, unref(node));
  if (key == "connect") {
    console.log(unref(node));
    onConnect(unref(node) as IConnection);
  }
  if (key == "open") {
    openDatabase(node.value.id);
  }
  if (key == "open-schema") {
    openSchema(node.value.id);
  }
  if (key == "open-table") {
    openTable(node.value.id);
  }
  if (key == "del-conn") {
    deleteConnection(node.value.id);
  }
  if (key == "del-db") {
    deletingNode.value = node.value;
    deleteDb(node.value.id);
  }
  if (key == "create-db") {
    layoutStore.activeNode = node.value;
    layoutStore.createDbStart();
  }
};

const deleteDb = (id: string) => {
  let [conn, db] = id.split("-");
  invoke("del_db", { conn, db })
    .then((res) => {
      console.log(res);
      if (res === 0) {
        deleteTreeNode(id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteTreeNode = (id: string) => {
  fileTreeRef.value.treeFactory.removeNode(deletingNode.value);
  deletingNode.value = undefined;
};
const deleteConnection = (name: string) => {
  systemStore.delConnectionById(name);
};

const openTable = (id: string) => {
  console.log("open-table:", id);

  const [name, db, schema, table] = id.split("-");
  const params = { name, db, schema, table };
  getTableColumn(params)
    .then((res) => {
      invoke("open_table", params).then((res) => {
        systemStore.currentTableRecords = res as any[];
        systemStore.addRecords(id, res as any[]);
        console.log(res);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getTableColumn = async (params: any) => {
  return invoke("open_table_describe", params)
    .then((res: any) => {
      systemStore.currentTableColumns = (res ?? []).map((item: any) => {
        return {
          key: item.column_name,
          title: item.column_name,
          dataIndex: item.column_name,
        };
      });
    })
    .catch((err) => {
      console.warn("获取表信息失败");
    });
};

const openDatabase = (id: string) => {
  const [name, db] = id.split("-");
  invoke("open_db", { name, db })
    .then((res) => {
      console.log(res);
      const treeData = fileTreeRef.value.treeFactory.treeData.value;
      const currrentNode = (treeData ?? []).find((item: any) => {
        return item.id == id;
      });
      if (currrentNode) {
        (res as string[]).forEach((item) => {
          fileTreeRef.value.treeFactory.insertBefore(currrentNode, {
            label: item,
            id: `${currrentNode.id}-${item}`,
            isLeaf: true,
            contextMenu: [{ label: "打开", key: "open-schema" }],
          });
        });
      }
      systemStore.addSchemas(
        id,
        (res as string[]).map((item) => {
          return {
            id: id + item,
            name: item,
          };
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

const openSchema = (id: string) => {
  const [name, db, schema] = id.split("-");

  invoke("open_schema", { name, db, schema })
    .then((res) => {
      const treeData = fileTreeRef.value.treeFactory.treeData.value;
      const currrentNode = (treeData ?? []).find((item: any) => {
        console.log("item --level:", item.level);
        return item.id == id;
      });
      if (currrentNode) {
        (res as ITable[]).forEach((item) => {
          fileTreeRef.value.treeFactory.insertBefore(currrentNode, {
            label: item.table_name,
            id: `${currrentNode.id}-${item.table_name}`,
            isLeaf: true,
            contextMenu: [{ label: "打开", key: "open-table" }],
          });
        });
      }

      systemStore.addTables(
        id,
        (res as ITable[]).map((item) => {
          return {
            ...item,
            id: `${id}-${item.table_name}`,
          };
        })
      );
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const onConnect = (connection: IConnection) => {
  console.log(connection);

  invoke("create_conn", {
    name: connection.name,
    host: connection.host,
    port: connection.port,
    database: connection.database,
    username: connection.username,
    password: connection.password,
  })
    .then((res) => {
      console.log(res);
      const treeData = fileTreeRef.value.treeFactory.treeData.value;
      const currrentNode = (treeData ?? []).find((item: any) => {
        return item.id == connection.name;
      });
      if (currrentNode) {
        (res as IDatabase[]).forEach(({ name }) => {
          fileTreeRef.value.treeFactory.insertBefore(currrentNode, {
            label: name,
            id: `${connection.name}-${name}`,
            isLeaf: true,
            contextMenu: [
              { label: "打开", key: "open" },
              { label: "删除数据库", key: "del-db" },
            ],
          });
        });
        systemStore.addDbs(connection.name, res as IDatabase[]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped lang="postcss">
.admin-slider {
  margin: 4px;
  color: #666;
  line-height: 1.2em;
  background-color: white;
}

.tree-title {
  width: calc(100% - 36px);
  display: inline-flex;
}
.conn-list {
  height: 60vh;
  padding: 8px;
}
.menu-list {
  min-height: 60px;
  width: 160px;
  background-color: white;
  padding: 4px 0px;
  .menu-item {
    padding: 0 12px;
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid #aaa;
    &:hover {
      background-color: antiquewhite;
      cursor: pointer;
    }
  }
}
</style>
