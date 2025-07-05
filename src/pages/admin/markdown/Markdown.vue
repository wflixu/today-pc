<template>
    <div class="markdown">
        <div class="editor">
            <textarea name="" v-model="source"></textarea>
        </div>
        <div class="render">
           <img :src="imgSrc" alt="" srcset="">
        </div>
    </div>
</template>

<script setup lang="ts">
import http from '@/common/http';
import { onMounted, ref } from 'vue';
const imgSrc = ref('');
const source = ref('')
function uploadImage(imageFile:File) {  
  const formData = new FormData();  
  formData.append('image'+ Date.now(), imageFile);  
  http.post('/chunk/upload', formData)  
  .subscribe(res => {  
     console.log(res)
  })  
}
onMounted(() => {
    document.addEventListener('paste', function ( e: ClipboardEvent) {
        console.log(e)
        for (const item of e.clipboardData?.items) {
            console.log(item)
            if(item.kind == 'file' && item.type == 'image/png'){
                const imageFile = item.getAsFile();  
                console.log(imageFile)
                uploadImage(imageFile)
            }
        }
        // e.clipboardData contains the data that is about to be pasted.
        // if (e.clipboardData.types.indexOf('text/html') > -1) {
        //     var oldData = e.clipboardData.getData('text/html');
        //     var newData = '<b>Ha Ha!</b> ' + oldData;

        //     // Since we are canceling the paste operation, we need to manually
        //     // paste the data into the document.
        //     pasteClipboardData(newData);

        //     // This is necessary to prevent the default paste action.
        //     e.preventDefault();
        // }
    });
})

</script>

<style scoped>
.markdown {
    height: 80vh;
    display: flex;
    background-color: antiquewhite;

    .editor,
    .render {
        flex: 1;
    }

    textarea {
        height: 100%;
        width: 100%;
    }

    .render {
        border-left: 1px solid #999
    }
}</style>