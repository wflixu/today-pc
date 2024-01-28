import type {
  IConnection,
  IDatabase,
  ISchema,
  ITable,
} from "@/types/pgmate.interface";
import type { IInnerTreeNode } from "today-ui";
import { defineStore } from "pinia";
import http from "@/common/http";

export const useLayoutPgmateStore = defineStore({
  id: "layoutPg",
  state: () => ({
    showCreateDbWin: false,
  }),
  getters: {},
  actions: {
    createDbStart() {
      this.showCreateDbWin = true;
    },
    toggleShowDbCreate() {
      this.showCreateDbWin = !this.showCreateDbWin;
    },
  },
});

export const useSystemStore = defineStore("pgmate", {
  state: () => ({
    dbs: {} as { [key: string]: IDatabase[] },
    schemas: {} as { [key: string]: ISchema[] },
    tables: {} as { [key: string]: ITable[] },
    records: {} as { [key: string]: any[] },
    connections: [
      {
        name: "pg",
        host: "localhost",
        port: 5432,
        database: "",
        username: "postgres",
        password: "123",
      },
    ] as IConnection[],
    currentTableRecords: [] as unknown[],
    currentTableColumns: [] as unknown[],
    activeNode: null as IInnerTreeNode | null,
  }),
  getters: {
    curConnection(state): IConnection | undefined {
      if (state.activeNode) {
        let [conn] = state.activeNode.id.split("-");
        return this.connections.find((item: IConnection) => item.name == conn);
      }
    },
  },
  actions: {
    setCurTableRecords(records: any[]) {
      this.currentTableRecords = records;
    },
    delConnectionById(name: string) {
      this.connections = this.connections.filter((item) => item.name !== name);
    },
    addDbs(conn: string, dbs: IDatabase[]) {
      this.dbs[conn] = dbs;
    },
    addSchemas(dbId: string, schemas: ISchema[]) {
      this.schemas[dbId] = schemas;
    },
    addTables(schemaId: string, tables: ITable[]) {
      this.tables[schemaId] = tables;
    },
    // id = conn + db + schema + table
    addRecords(id: string, records: any[]) {
      this.records[id] = records;
    },
    async createDb(datname: string) {
      let conn = this.activeNode?.id ?? "xx";
      console.log(conn, datname);
      try {
        let res = await http.post("/pg/db", { conn, datname });
        if (res.code == 200) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async delDb(id: string) {
      try {
        let res = await http.delete(`/pg/db?id=${id}`);
        if (res.code == 200) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async openDb(id: string) {
      try {
        let res = await http.get(`/pg/db?id=${id}`);
        if (res.code == 200) {
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  persist: true,
});
