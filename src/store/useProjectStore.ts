import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useProjectStore = defineStore('project', () => {
    const project = reactive({
        name: null,
        tasks: [],
    })

    watch(project, (current)=> {
        console.log(current)
    })
    return { project }
})