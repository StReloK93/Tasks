<template>
    <section class="flex justify-center items-center h-full">
        <form @submit.prevent="createProject" class="py-7 px-7 bg-white w-96 shadow rounded-sm">
            <div class="text-center">
                <img src="/images/olcha.png" class="inline w-16">
            </div>
            <h3 class="text-2xl text-center my-3 text-rose-600 font-bold">
                Olcha TZ
            </h3>
            <div>
                <label for="nameproject" class="text-sm text-gray-400">Project name</label>
                <input type="text" class="default-input mb-3" id="nameproject" v-model="projectName" required>
            </div>
            <main class="text-sm">
                <div class="w-full mb-2">
                    <button type="submit" class="default-button w-full">
                        Create Project <i class="fa-solid fa-pen-nib ml-2"></i>
                    </button>
                </div>
                <div class="w-full">
                    <Import />
                </div>
            </main>
        </form>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProjectStore } from './../store/useProjectStore'
import Import from '../components/Import.vue'
const projectStore = useProjectStore()
const projectName = ref(null)

function createProject(){
    projectStore.project.name = projectName.value
    projectName.value = null
}
</script>