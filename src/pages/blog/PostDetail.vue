<template>
  <div class="page bg-gray-100">
    <article  class="post">
      <H2 class="font-semibold text-4xl  mb-8">{{ post.title }}</H2>
      <section class="text-lg">
        {{ post.body }}
      </section>
    </article>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const post = reactive({
      title: '',
      body: '',
    });

    onMounted(() => {
      console.log(route.params);
      const { id } = route.params;
      axios.get(`/api/post/${id}`).then((res) => {
        console.log(res.data);
        if (!res.data.code) {
          const { title, body, createdAt } = res.data.data;

          (post.title = title), (post.body = body);
        }
      });
    });

    const clickEdit = () => {
      const { id } = route.params;
      router.push(`/post/editor?id=${id}`);
    };

    return {
      post,
      clickEdit,
    };
  },
});
</script>

<style scoped lang="less">
  .page {
    min-height: 100vh;
    .post {
      width:1200px;
      margin: 20px auto;
      background-color: white;
      border: 1px solid #ddd;
      box-shadow: 0 0 5px #ddd;
      border-radius: 4px;
      padding: 40px;
    }
  }
</style>