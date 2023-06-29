<template>
  <div class="t-home min-h-full">
    <div class="boxs bg-gray-50 rounded w-64 mx-auto">
      <div class="card" @click="onClick('/admin')">
        <h3>控制台</h3>
        <p>管理系统</p>
      </div>
      <div class="card" @click="onClick('/test')">
        <h3>api测试</h3>
        <p>api测试</p>
      </div>
      <div class="card" @click="onClick('/post')">
        <h3>blog</h3>
        <p>blog</p>
      </div>
      <div class="card" @click="onClick('/passport/login')">
        <h3>login</h3>
        <p>login</p>
      </div>
      <div class="card" @click="onClick('/sign')">
        <h3>sign-</h3>
        <p>sign-</p>
      </div>
      <div class="card" @click="onClick('/search')">
        <h3>search</h3>
        <p>My Search</p>
      </div>
    </div>
    <SiteFooter />
  </div>
</template>
<script lang="ts">
import { useAuthStore } from "@/store/auth";
import { ref, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import SiteFooter from "./../components/SiteFooter.vue";

export default defineComponent({
  name: "app-home",
  props: {},
  components: {
    SiteFooter,
  },
  setup: () => {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();
    if (!authStore.token) {
      router.push("/passport/login");
    }
    let onClick = (key: string) => {
      router.push(key);
    };
    return {
      onClick,
    };
  },
});
</script>
<style scoped lang="less">
.t-home {
  position: relative;
  background-image: url("./../assets/bg.jpg");
  background-size: cover;
}
.boxs {
  position: absolute;

  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400px;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
}
.boxs:hover {
  box-shadow: 0 5px 5px #999;
  transition: all 0.2s ease-in-out;
}

.card {
  border: 1px solid #ddd;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 5px 10px #999;
    transition: all 0.2s ease-in-out;
  }
  h3 {
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    text-align: center;
  }
  p {
    text-align: center;
    line-height: 20px;
    padding: 5px;
  }
}
</style>
