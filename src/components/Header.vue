<template>
    <header class="bg-white shadow-sm py-2 px-4 flex justify-between items-center">
        <main>
            <p class="text-xs text-gray-400 leading-none">
                Project name
            </p>
            <form @submit.prevent="projectNameToggle = true" class="flex items-center">
                <main class="flex-grow mr-2">
                    <input type="text" ref="inputName" @focusout="projectNameToggle = true"
                        v-model="projectStore.project.name"
                        class="outline-none w-full disabled:bg-transparent text-gray-700 p-1 text-xl"
                        :class="{ 'shadow-inner bg-gray-50': projectNameToggle == false }" :disabled="projectNameToggle" />
                </main>
                <button v-if="projectNameToggle" @click="editProjectName()" class="mini-button text-pink-600">
                    <i class="fa-duotone fa-pen-nib"></i>
                </button>
                <button v-else type="submit" class="mini-button text-gray-600">
                    <i class="fa-duotone fa-pen-nib fa-beat-fade"></i>
                </button>
            </form>
        </main>
        <main>
            <button @click="Export(projectStore.project)" class="default-button mx-6 !bg-gray-300 !text-gray-800 hover:!bg-stone-300 active:!bg-gray-200">
                <i class="fa-duotone fa-download  mr-3"></i>
                Export project
            </button>
            <button class="default-button" @click="projectStore.exitProject">
                <i class="fa-regular fa-arrow-right-from-bracket mr-3"></i> Exit project
            </button>
        </main>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProjectStore } from '../store/useProjectStore'
import Export from '../modules/Export'
const projectStore = useProjectStore()
const projectNameToggle = ref(true)
const inputName = ref()

function editProjectName(){
    projectNameToggle.value = false
    setTimeout(() => {
        inputName.value.focus()
    })
}
</script>