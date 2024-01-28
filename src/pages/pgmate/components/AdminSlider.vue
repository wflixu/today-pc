<template>
  <div class="admin-slider">
    <div class="conn-list" @contextmenu="onContextMenu">
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

import { useLayoutPgmateStore } from "@/stores/pgmate";
import http from "@/common/http";
const fileTreeRef = ref();

const systemStore = useSystemStore();
const layoutStore = useLayoutPgmateStore();
const deletingNode = ref<IInnerTreeNode>();

const onContextMenu = (event: MouseEvent) => {
  event.preventDefault();
};

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
    systemStore.activeNode = node.value;
    deleteDb(node.value.id);
  }
  if (key == "create-db") {
    systemStore.activeNode = node.value;
    layoutStore.toggleShowDbCreate();
  }
};

const unsubscribe = systemStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now();
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(", ")}].`);

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      if (name == "createDb") {
        let connection = systemStore.curConnection;
        if (connection) {
          onConnect(connection);
        }
      }
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      );
    });

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      );
    });
  }
);

const deleteDb = (id: string) => {
  systemStore.delDb(id).then((res) => {
    console.log(res);
    if (systemStore.curConnection) {
      onConnect(systemStore.curConnection);
    }
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
  systemStore
    .openDb(id)
    .then((res) => {
      console.log(res);
      const treeData = fileTreeRef.value.treeFactory.treeData.value;
      const currrentNode = (treeData ?? []).find((item: any) => {
        return item.id == id;
      });
      if (currrentNode) {
        (res as { schema_name: string }[]).forEach(({ schema_name }) => {
          fileTreeRef.value.treeFactory.insertBefore(currrentNode, {
            label: schema_name,
            id: `${currrentNode.id}-${schema_name}`,
            isLeaf: true,
            contextMenu: [{ label: "打开", key: "open-schema" }],
          });
        });
      }
      systemStore.addSchemas(
        id,
        (res as { schema_name: string }[]).map(({ schema_name }) => {
          return {
            id: `${currrentNode.id}-${schema_name}`,
            name: schema_name,
          };
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
  // invoke("open_db", { name, db })
  //   .then((res) => {
  //     console.log(res);
  //     const treeData = fileTreeRef.value.treeFactory.treeData.value;
  //     const currrentNode = (treeData ?? []).find((item: any) => {
  //       return item.id == id;
  //     });
  //     if (currrentNode) {
  //       (res as string[]).forEach((item) => {
  //         fileTreeRef.value.treeFactory.insertBefore(currrentNode, {
  //           label: item,
  //           id: `${currrentNode.id}-${item}`,
  //           isLeaf: true,
  //           contextMenu: [{ label: "打开", key: "open-schema" }],
  //         });
  //       });
  //     }
  //     systemStore.addSchemas(
  //       id,
  //       (res as string[]).map((item) => {
  //         return {
  //           id: id + item,
  //           name: item,
  //         };
  //       })
  //     );
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
  http
    .post("/pg/connect", connection)
    .then(({ code, data }) => {
      if (code != 200) {
        return;
      }
      const treeData = fileTreeRef.value.treeFactory.treeData.value;
      const currrentNode = (treeData ?? []).find((item: any) => {
        return item.id == connection.name;
      });
      fileTreeRef.value.treeFactory.treeData.value = treeData.filter(
        (item: IInnerTreeNode) => {
          return item.parentId != connection.name;
        }
      );
      if (currrentNode) {
        (data as unknown as IDatabase[]).forEach(({ datname }) => {
          fileTreeRef.value.treeFactory.insertBefore(currrentNode, {
            label: datname,
            id: `${connection.name}-${datname}`,
            isLeaf: true,
            contextMenu: [
              { label: "打开", key: "open" },
              { label: "删除数据库", key: "del-db" },
            ],
          });
        });
        systemStore.addDbs(connection.name, data as unknown as IDatabase[]);
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
