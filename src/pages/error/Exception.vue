<template>
  <div>
    <a-empty
      :image="errorMeta.url"
      :description="errorMeta.description"
      class="cover"
    ></a-empty>
  </div>
</template>

<script setup lang="ts">
import result403 from "@/assets/svg/result-403.svg?url";
import result404 from "@/assets/svg/result-404.svg?url";
import result500 from "@/assets/svg/result-500.svg?url";
import resultWifi from "@/assets/svg/result-wifi.svg?url";
import { computed } from "vue";
import { useRoute } from "vue-router";

const resultMap: Record<string, { url: string; description: string }> = {
  result403: {
    url: result403,
    description: "服务器拒绝请求",
  },
  result404: {
    url: result404,
    description: "页面不见了",
  },
  result500: {
    url: result500,
    description: "服务器发生了错误",
  },
  resultwifi: {
    url: resultWifi,
    description: "请检查网络",
  },
};
const route = useRoute();
console.log(route.params.pathMatch);
const errorMeta = computed(() => {
  let key: string = route.params.pathMatch[0] ?? "";
  let resultMessage = resultMap["result" + key] ?? {
    url: result404,
    description: "页面不见了",
  };
  return resultMessage;
});
</script>

<style>
.cover > .ant-empty-image {
  display: flex;
  justify-content: center;
}
</style>
