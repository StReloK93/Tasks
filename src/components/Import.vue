<template>
    <div>
        <input type="file" ref="jsonInput" @change="importProject" accept="application/JSON">
    </div>
</template>

<script setup lang="ts">
import importJson from './../modules/Import'
import { Ref, reactive, ref } from 'vue'

const jsonInput:Ref<HTMLInputElement> = ref()
    function importProject(){
	const files = jsonInput.value.files
	importJson(files, (result) => {
		console.log(result)
	})
}
</script>