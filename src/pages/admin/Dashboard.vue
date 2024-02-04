<template>
  <div>
    <h1>admin-dashboard</h1>
    <hr />

    <div>
      <a-button type="primary" @click="onTest">test</a-button>
      <a-button @click="onLogout"> 登出</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { curl } from '@/common/http';
import  { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const onLogout = () =>{
    authStore.cleanToken()
}
const onTest = () => {
  curl.get('/expend/', { params: { kind: 3 } }).subscribe(res => {
    console.log(res)
  },
    error => {
      console.log(error)
    }
  )
};
</script>

<style scoped></style>
