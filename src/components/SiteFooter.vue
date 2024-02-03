<template>
  <footer
    id="b_footer"
    class="b_footer"
    role="contentinfo"
    aria-label="页脚"
    data-bm="26"
  >
    <ul>
     
      <li class="b_footerItems_icp">
        <a
          id="sb_ICPFilingText"
          href="https://beian.miit.gov.cn"
          h="ID=SERP,5041.1"
          >陕ICP备2021006128号-1</a
        >
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.b_footer {
 
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: rgba(200,200,200, 0.7);
  ul {
    display: flex;
    height: 28px;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
  }
}
</style>
