<template>
  <div class="sign">
    <div class="box">
      <div class="box-left">
        <img :src="ikon" alt="" srcset="" />
      </div>
      <div class="box-right">
        <div class="title">
          <span>用户注册</span>
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
        <div class="field">
          <div class="label">电话号码</div>
          <div class="value">
            <a-input
              size="large"
              v-model:value="formState.phone"
              placeholder="请输入电话号码"
            />
          </div>
        </div>
        <div class="field">
          <div class="label">验证码</div>
          <div class="value">
            <a-input
              size="large"
              :max-length="4"
              v-model:value="formState.code"
              placeholder="请输入验证码"
            />
            <a-button
              @click="onClickGetCode"
              :disabled="!codeButtonActive"
              class="ml-3"
              type=""
              >获取验证码</a-button
            >
          </div>
        </div>
        <a-button
          type="primary"
          class="w-full"
          size="large"
          @click="onClickSubmit"
          >注册</a-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, unref, type UnwrapRef } from "vue";
import { useRouter } from "vue-router";
import ikon from "@/assets/imgs/login-ikon.png?url";
import { useAuthStore } from "@/store/auth";
import http, { type IRes } from "./../../common/http/index";
import { message } from "ant-design-vue";
interface FormState {
  username: string;
  password: string;
  phone: string;
  code: string;
}

const formState: UnwrapRef<FormState> = reactive({
  username: "",
  password: "",
  phone: "",
  code: "",
});

const isCode = ref(false);

const codeButtonActive = computed(() => {
  return !isCode.value && !!formState.phone;
});

const onClickGetCode = () => {
  if (unref(codeButtonActive)) {
    http.post("/passport/sms", { phone: formState.phone }).then((res: any) => {
      if (res.code == 200) {
        isCode.value = true;
      }
    });
  }
};

const router = useRouter();

const onClickSubmit = () => {
  console.log(formState);
  let { username, password, code, phone } = formState;

  if (username && password) {
    http
      .post("/passport/sign", {
        username,
        password,
        phone,
        code,
      })
      .then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          router.push({ path: "/passport/login" });
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="less">
.sign {
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
        margin-bottom: 8px;
        .label {
          height: 36px;
          display: flex;
          align-items: center;
          font-size: 20px;
          font-weight: normal;
        }
        .value {
          display: flex;
        }
      }
      .w-full {
        margin-top: 20px;
      }
    }
  }
}
</style>
