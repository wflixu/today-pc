<template>
  <div>
    <h1>admin-dashboard</h1>
    <hr />

    <div>
      <a-button type="primary" @click="onTest">test</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const onTest = () => {
  fetch("http://127.0.0.1:8443/foo", {
    // redirect: "manual",
  })
    .then((response) => {
      console.log("response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("data:", data);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped></style>
