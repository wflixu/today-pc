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
        <div class="mt-3 more">
          <a-button @click="onGotoSign" type="link">注册</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, type UnwrapRef } from "vue";
import { useRouter } from "vue-router";
import ikon from "@/assets/imgs/login-ikon.png?url";
import { useAuthStore } from "@/stores/auth";
import http from "./../../common/http";
interface FormState {
  username: string;
  password: string;
}

const formState: UnwrapRef<FormState> = reactive({
  username: "",
  password: "",
});
const router = useRouter();
const authStore = useAuthStore();
const onGotoSign = () => {
  router.push({ name: "Sign" });
};

const onClickSubmit = () => {
  console.log(formState);
  let { username, password } = formState;
  if (username && password) {
    http
      .post("/passport/login", { username, password })
      .then(({ code, data }) => {
        if (code == 200) {
          const { user, token } = data;
          authStore.setUser(user);
          authStore.setToken(token);
          const backRoute = window.localStorage.getItem("back-route");
          router.push({ path: backRoute ?? "/home" });
        }
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
      flex: 1;
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
      .more {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}
</style>
