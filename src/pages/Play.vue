<template>
    <div>
      <h2>tsx in vue3</h2>
      <Foo name="bar"/>
      <h3>{{title}}</h3>
    </div>
</template>

<script lang="ts">
import Foo from './../components/foo';
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex';


export default defineComponent({
    name:'page-play',
    components:{
      Foo,
    },
    computed:{
      
    },
    setup () {
        let store = useStore();
        console.log(store.state.title);
        let title = ref(store.state.title);
        return {
         title,
        }
    }
})
</script>

<style scoped>

</style>

