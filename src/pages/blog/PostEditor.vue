<template>
  <div class="post_editor">
    <div>
      <a-input
        type="text"
        :value="title"
        @input="onChangeTitle"
        placeholder="标题"
      />
    </div>
    <br />
    <textarea
      name=""
      id=""
      :cols="30"
      :rows="10"
      :value="post"
      @input="onInput($event)"
    ></textarea>
    <br />
    <a-button @click="save">保存</a-button>
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

    const route = useRoute();
    const router = useRouter();

    const updatePost = () => {
      let { id } = route.query;
      let param = {
        title: title.value,
        body: post.value,
      };
      axios.put(`/api/post/${id}`, param).then((res) => {
         if(!res.data.code){
            router.push(`/post`);
          }else {
            console.warn(res.data.msg)
          }
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
          if(!res.data.code){
            router.back();
          }else {
            console.warn(res.data.msg)
          }
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
        axios.get(`/api/post/${id}`).then((res) => {
          console.log(res.data);
          if (!res.data.code) {
            const { title: titlev, body, createdAt } = res.data.data;
            title.value = titlev;
            post.value = body;
          }
        });
      }
    });


    return {
      post,
      title,
      onChangeTitle,
      onInput,
      save,
    };
  },
});
</script>

<style scoped>
.post_editor {
  padding: 20px;
}
</style>