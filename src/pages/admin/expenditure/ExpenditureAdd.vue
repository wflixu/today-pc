<template>
    <div class="expenditure-add">
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="数量">
                <a-input-number v-model:value="formState.count" style="width: 100%"  />
            </a-form-item>
            <a-form-item label="种类">
                <a-select v-model:value="formState.kind" :options="options">

                </a-select>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">添加</a-button>
                <a-button style="margin-left: 10px">Cancel</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import http from '../../../common/http';

interface FormState {
    count: number;
    kind: number;
}

const options = [
    {
        label: '天然气',
        value: 1,
    },
    {
        label: '电',
        value: 2,
    },
    {
        label: '水',
        value: 3,
    },
]
const formState: UnwrapRef<FormState> = reactive({
    count: 0,
    kind: 1,
});
const resetForm = () => {
    formState.count = 0;
    formState.kind = 1;
}
const onSubmit = () => {
    console.log('submit!', toRaw(formState));
    http.post('/expend/', { ...toRaw(formState) }).then((res: any) => {
        if (res.code == 200) {
            resetForm()

        }
    }).catch(err => {

    })
};
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };



</script>

<style scoped>
.expenditure-add {

    border: 1px solid #ddd;

    border-radius: 4px;
    margin: 80px 0;
    padding: 40px 20px;
}
</style>