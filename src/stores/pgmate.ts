
import type {
  IConnection,
  IDatabase,
  ISchema,
  ITable,
} from "@/types/pgmate.interface";
import type { IInnerTreeNode } from "today-ui";
import { defineStore } from "pinia";


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
  }),
});
// export const useSystemStore = defineStore('system', {
//   state: () => ({
//
//   }),
//   getters: {},
//   actions: {
//     setCurTableRecords(records: any[],state) {
//       this.currentTableRecords = records;
//     },
//     delConnectionById(name: string) {
//       this.connections = this.connections.filter((item) => item.name !== name);
//     },
//     addDbs(conn:string, dbs:IDatabase[]){
//       this.dbs[conn] = dbs;
//     },
//     addSchemas(dbId:string, schemas:ISchema[]){
//       this.schemas[dbId] = schemas;
//     },
//     addTables(schemaId:string, tables:ITable[]){
//       this.tables[schemaId] = tables;
//     },
//     // id = conn + db + schema + table
//     addRecords(id:string, records: any[]) {
//        this.records[id] = records;
//     },

//     createDb() {

//     }
//   },
//   persist: {
//     enabled: true,
//   },
// });

export const useLayoutAdminStore = defineStore({
  id: "layoutAdmin",
  state: () => ({
    showCreateDbWin: false,
    activeNode: null as IInnerTreeNode | null,
  }),
  getters: {},
  actions: {
    createDbStart() {
      localStorage;
      this.showCreateDbWin = true;
    },
    async creatDb(name: string) {
      let conn = this.activeNode?.id ?? "xx";

      console.log(conn, name);
      try {
        // const res = await invoke<number>("create_db", { conn, db: name });
        // return res;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
