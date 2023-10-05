<template>
    <main>
        <form @submit.prevent="task.editState = true" class="px-1 my-1.5 py-1 bg-white shadow-sm w-80 flex items-center">
            <div>
                <button type="button" @click="task.favorite = !task.favorite" class="mini-button">
                    <i v-if="task.favorite" class="fa-solid fa-star text-orange-600"></i>
                    <i v-else class="fa-light fa-star text-orange-600"></i>
                </button>
            </div>
            <div class="flex-grow">
                <input type="text" ref="inputName" @focusout="task.editState = true" v-model="task.name"
                    class="outline-none w-full disabled:bg-transparent text-gray-700 py-1 px-2"
                    :class="{ 'shadow-inner bg-gray-50': task.editState == false }" :disabled="task.editState" />
            </div>
            <div class="relative flex">
                <button v-if="task.editState" @click="editTask(task)" class="mini-button text-pink-600">
                    <i class="fa-duotone fa-pen-nib"></i>
                </button>
                <button v-else type="submit" class="mini-button text-gray-600">
                    <i class="fa-duotone fa-pen-nib fa-beat-fade"></i>
                </button>
                <button type="button" @click="projectStore.deleteTask(tasklist, task)" class="mini-button text-pink-600">
                    <i class="fa-duotone fa-trash"></i>
                </button>

                <button v-if="task.children.length" @click="task.toggle = !task.toggle" type="button" class="mini-button text-pink-600 relative">
                    <i class="fa-sharp fa-light fa-chevron-down inline-block transition-all"
                        :class="{ 'rotate-180': task.toggle }"></i>
                        <span class="absolute rounded-full text-[10px] bottom-0 right-0 bg-pink-600 inline-flex w-4 h-4 text-white items-center justify-center">
                            {{ task.children.length }}
                        </span>
                </button>

                <button type="button" @click="createTask(task)"
                    class="mini-button absolute -right-14 text-pink-600 bg-white shadow-sm">
                    <i class="fa-regular fa-plus"></i>
                </button>
            </div>
        </form>
        <div class="pl-8" v-if="task.toggle">
            <Task v-for="(taskchild, index) in task.children" :task="taskchild" :tasklist="task.children" :key="index" />
        </div>
    </main>
</template>

<script setup lang="ts">
import Task from './Task.vue'
import { ITask } from '../Interfaces'
import { useProjectStore } from '../store/useProjectStore'
import { ref } from 'vue';
const projectStore = useProjectStore()
const emit = defineEmits(['delete'])
const { task, tasklist } = defineProps<{
    task: ITask,
    tasklist: ITask[],
}>()

function createTask(task){
    task.toggle = true
    projectStore.createTask(task.children)
}
const inputName = ref()

function editTask(current: ITask) {
    current.editState = false
    setTimeout(() => {
        inputName.value.focus()
    })
}
</script>