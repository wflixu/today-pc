<template>
    <a-modal v-model:open="show" title="添加应用" @ok="handleOk" @cancel="onCancel">
        <a-form :model="formState" name="basic" ref="formRef" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
            autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="应用名" name="name" :rules="[{ required: true, message: '请输入应用名!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="版本" name="version" >
                <a-input v-model:value="formState.version" />
            </a-form-item>
            <a-form-item label="发版笔记" name="notes" >
                <a-input v-model:value="formState.notes" />
            </a-form-item>
            <a-form-item label="更新信息" name="file_id" >
                <a-input-number v-model:value="formState.file_id" />
            </a-form-item>
        </a-form>

    </a-modal>
</template>

<script setup lang="ts">
import http, { type IRes } from '@/common/http';
import type { FormInstance } from 'ant-design-vue';
import { isRef, reactive, ref, toRefs, watch } from 'vue';

const formRef = ref<FormInstance>();

const emit = defineEmits<{
    (event: 'finish'): void,
}>()


const show = ref(false)

interface FormState {
    name: string;
    version: string;
    notes: string;
    file_id: number;
}

const formState = reactive<FormState>({
    name: '',
    version: "",
    notes: "",
    file_id: 0
});



const onFinish = (values: any) => {
    console.log('Success:', values);

};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};



const handleOk = async () => {
    console.log('handleOk')
    if (!formRef.value) {
        return;
    }
    const data = await formRef.value.validate();
    if (data) {
        const res = await http.post<IRes<any>>('/release/add', {
            ...data
        })
        if (res.code == 200) {
            emit('finish')
            show.value = false;
        }

    }


    show.value = false;

}
const onCancel = () => {

}

defineExpose({
    show: () => {
        show.value = true;
    },
    hidden: () => {
        show.value = false;
    }
})


</script>

<style scoped></style>