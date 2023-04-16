<template>
  <div class="login">
    <div class="box">
      <div class="box-left">
        <img :src="ikon" alt="" srcset="" />
      </div>
      <div class="box-right">
        <div class="title">
          <span>today admin</span>
        </div>
        <div class="field">
          <div class="label">用户名</div>
          <div class="value">
            <a-input
              size="large"
              v-model:value="formState.username"
              placeholder="请输入用户名"
            />
          </div>
        </div>
        <div class="field">
          <div class="label">密码</div>
          <div class="value">
            <a-input-password
              size="large"
              v-model:value="formState.password"
              placeholder="请输入密码"
            />
          </div>
        </div>
        <a-button
          type="primary"
          class="w-full"
          size="large"
          @click="onClickSubmit"
          >登录</a-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, type UnwrapRef } from "vue";
import { useRouter } from "vue-router";
import ikon from "@/assets/imgs/login-ikon.png?url";
import { useAuthStore } from "@/store/auth";

interface FormState {
  username: string;
  password: string;
}

const formState: UnwrapRef<FormState> = reactive({
  username: "test",
  password: "666",
});
const router = useRouter();
const authStore = useAuthStore();
const onClickSubmit = () => {
  console.log(formState);
  let { username, password } = formState;
  if (username && password) {
    fetch("http://127.0.0.1:8443/passport/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      mode: "cors",
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        const { username, token } = res.data;
        authStore.setUsername(username);
        authStore.setToken(token);
        router.push({ path: "/admin/dashboard" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  background-image: url(./../../assets/imgs/bg-login.png);
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    width: 1200px;
    height: 641px;
    background: #ffffff;
    border-radius: 12px;
    opacity: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 80px 120px 120px 80px;
    gap: 120px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08),
      0px 2px 6px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 2px rgba(0, 0, 0, 0.04);
    &-left {
      width: 480px;
    }
    &-right {
      .title {
        height: 138px;
        display: flex;
        align-items: center;
        font-size: 48px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .field {
        margin-bottom: 16px;
        .label {
          height: 36px;
          display: flex;
          align-items: center;
          font-size: 20px;
          font-weight: normal;
        }
      }
      .w-full {
        margin-top: 20px;
      }
    }
  }
}
</style>
