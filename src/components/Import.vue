<template>
    <input type="file" id="inputFile" ref="jsonInput" @change="importProject" accept="application/JSON" hidden>
    <label for="inputFile">
        <div class="default-button w-full !bg-gray-300 !text-gray-800 hover:!bg-stone-300 active:!bg-gray-200">
            Import Project <i class="fa-light fa-arrow-up-to-line ml-2"></i>
        </div>
    </label>
</template>

<script setup lang="ts">
import importJson from './../modules/Import'
import { Ref, ref } from 'vue'
import { useProjectStore } from './../store/useProjectStore'
const projectStore = useProjectStore()
const jsonInput:Ref<HTMLInputElement> = ref()
    function importProject(){
	const files = jsonInput.value.files
	importJson(files, (result) => {
        projectStore.project.name = result.name
        projectStore.project.tasks = result.tasks
        projectStore.project.filter = result.filter
	})
}
</script>