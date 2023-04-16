<template>
  <div class="sign bg-white w-full min-h-full">
    <div class="box my-40 mx-auto w-96 rounded p-9">
      <a-form
        layout="inline"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item>
          <a-input v-model:value="formState.username" placeholder="Username">
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="formState.password"
            type="password"
            placeholder="Password"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formState.username === '' || formState.password === ''"
          >
            Sign in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, type UnwrapRef } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import type { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

interface FormState {
  username: string;
  password: string;
}

interface IRole {
  _id: string;
  name: string;
  [prop: string]: any;
}

export default defineComponent({
  setup() {
    //  获取角色

    let role = ref<IRole>();

    axios.get("/api/role").then((res) => {
      console.log(res);
      if (!res.data.code) {
        role.value = res.data.data.list[0];
      }
      // if (!res.data.code) {
      //   router.push('/login');
      // } else {
      //   console.log('######');
      //   console.log(res.data);
      // }
    });

    const formState: UnwrapRef<FormState> = reactive({
      username: "lx",
      password: "123",
    });
    const router = useRouter();
    const route = useRoute();
    const handleFinish = (values: FormState) => {
      console.log(values, formState);
      let data = {
        password: formState.password,
        username: formState.username,
        role: role.value?._id,
      };
      // 注册
      axios
        .post("/api/user", data)
        .then((res) => {
          if (!res.data.code) {
            router.push("/login");
          } else {
            console.log("######");
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    return {
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>

<style scoped></style>
