<template>
  <div class="post_list bg-gray-100">
    <div class="action flex justify-end mb-2 bg-white h-10 items-center px-4">
      <a-button @click="LinkEditor">新增</a-button>
    </div>
    <ul class="px-10  mt-10">
      <li
        class="post"
        v-for="item in postList"
        :key="item._id"
        @click="onDetail(item._id)"
      >
        <h2 class="font-semibold text-size-$18">{{ item.title }}</h2>
        <p>{{ item.body }}</p>
        <div class="flex justify-between">
          <span>{{ item.createdAt }}</span>
          <a-button size="small" type="danger" @click="deletePost(item)"
            >删除</a-button
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export interface Post {
  title: string;
  body: string;
  _id: string;
  [key: string]: any;
}

export default defineComponent({
  setup() {
    let post = ref('');
    let title = ref('');

    let postList = ref<Post[]>([]);
    const route = useRoute();
    const router = useRouter();

    const updatePost = () => {
      let { id } = route.query;
      let param = {
        title: title.value,
        body: post.value,
      };
      axios.put(`/api/post/${id}`, param).then((res) => {
        console.log(res);
      });
    };

    const save = () => {
      if (route.query?.id) {
        updatePost();
      } else {
        console.log(post.value);
        let param = {
          title: title.value,
          body: post.value,
        };
        axios.post('/api/post', param).then((res) => {
          console.log(res);
        });
      }
    };
    const onInput = (event: Event) => {
      post.value = (<HTMLInputElement>event.target).value;
    };
    const onChangeTitle = (event: InputEvent) => {
      title.value = (<HTMLInputElement>event.target).value;
    };

    onMounted(() => {
      let { id } = route.query;

      if (id) {
        axios.get(`/api/post/`).then((res) => {
          console.log(res.data);
          if (!res.data.code) {
            console.log(res.data);
            // const { title: titlev, body, createdAt } = res.data.data;
            // title.value = titlev;
            // post.value = body;
          }
        });
      }
      let param = {};

      axios.get('/api/post', param).then((res) => {
        console.log(res);
        if (res.status == 200) {
          postList.value = res.data.data?.list as Array<Post>;
        }
      });
    });

    const deletePost = (item: Post) => {
      axios.delete(`/api/post/${item._id}`).then((res) => {
        console.log(res);
      });
    };

    const onDetail = (id: string) => {
      console.log(id);
      router.push(`/post/${id}`);
    };
    const LinkEditor = () => {
      router.push(`/post/editor`);
    };

    return {
      post,
      title,
      onDetail,
      LinkEditor,
      onChangeTitle,
      onInput,
      save,

      postList,
      deletePost,
    };
  },
});
</script>

<style scoped lang="less">
.post_list {
  min-height: 100vh;
}
.post {
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px #aaa;
  }
}
</style>