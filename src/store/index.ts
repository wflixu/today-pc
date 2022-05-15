
import { createPinia, defineStore } from 'pinia'


export const pinia = createPinia();

export const useMainStore = defineStore('main', {
     state: ()=>{
         return {
             title:'Today is the day!'
         }
     }
  })