<template>
    <div class="page">
        <div class="actions">
            <div class="left">

            </div>
            <div class="right">
                <a-button @click="onAdd">
                    添加
                </a-button>
            </div>

        </div>
        <div>
            <a-table :columns="columns" :pagination="pagination" :loading="loading" :data-source="dataSource"
                @change="handleTableChange">
                <template #bodyCell="{ column, record, text }">
                    <template v-if="column.key == 'file'">
                        {{ text.id   }} -- {{ text.filename }}
                    </template>
                    <template v-else-if="column.key !== 'action'">
                        {{ text }}
                    </template>
                    <template v-else="column.key === 'action'">
                        <span>
                            <a @click="onDelete(record)">删除</a>
                            <a-divider type="vertical" />
                            <a :href="viewUrl(record.id)" target="_blank">查看</a>
                            <a-divider type="vertical" />
                        </span>
                    </template>
                </template>
            </a-table>
        </div>
        
        <NewApp ref="newAppRef" v-model="open" @finish="onFinishAdd"/>
       
    </div>
</template>

<script setup lang="ts">
import http, { apiHost } from '@/common/http';
import { computed, reactive, ref } from 'vue';
import type { TablePaginationConfig, TableProps } from 'ant-design-vue';
import { usePagination } from '../hooks';
import NewApp from './NewApp.vue';
import { lastValueFrom } from 'rxjs';
import { curl } from '@/common/http';

const open = ref(false);
const newAppRef = ref<typeof NewApp | null>(null);

const onAdd = () => {
    // open.value = true;
    newAppRef.value?.show();
    console.log(open.value)
}
const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
} = usePagination('/release/page');

const pagination = computed(() => ({
    total: 200,
    current: current.value,
    pageSize: pageSize.value,
}));

const viewUrl = (id:number) =>{
    return `${apiHost}/release/update/${id}`
}


const columns = [
    {
        dataIndex: 'id',
        key: 'id',
        title: "id"
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Version',
        dataIndex: 'version',
        key: 'version',
    },
    {
        title: 'Notes',
        key: 'notes',
        dataIndex: 'notes',
    },
    {
        title: 'Date',
        key: 'date',
        dataIndex: 'date',
    },
    {
        title: 'FileId',
        key: 'file',
        dataIndex: 'chunk',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

const handleTableChange: TableProps['onChange'] = (
    paginaton: TablePaginationConfig,
) => {
    console.log(pageSize, current)
    // run({
    //     results: pag.pageSize,
    //     page: pag?.current,
    //     sortField: sorter.field,
    //     sortOrder: sorter.order,
    //     ...filters,
    // });
};
const onFinishAdd = () =>{
    run()
}

const onDelete = async (record:any) =>{
    const res = await lastValueFrom(curl.delete(`/release/${record.id}`)) 
    if(res.code == 200) {
        run();
    }
}
</script>

<style scoped>
.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>