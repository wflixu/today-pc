export interface IConnection {
    name:string,
    host:string,
    port:number,
    database:string,
    username:string,
    password:string,
}

export interface IDatabase {
    id: string,
    name:string,
}
export interface ISchema {
    id:string,
    name:string,
}
export interface ITable {
    table_name:string,
    table_catalog:string,
    table_schema:string,
}

export interface ITreeNode {

}