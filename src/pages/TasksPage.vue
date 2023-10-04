<template>
    <div class="pt-2">
		<header class="bg-white shadow-sm py-2 px-3 flex justify-between items-center">
			<main>
				<p class="text-xs text-gray-400">
					Project name
				</p>
				<div>
					<input type="text" v-model="projectStore.project.name" disabled class="disabled:bg-transparent text-xl">
				</div>
			</main>
			<button class="default-button" @click="projectStore.project.name = null">
				Exit project
			</button>
		</header>
		<button class="round-button absolute bottom-4 right-4">
			<i class="fa-sharp fa-regular fa-plus"></i>
		</button>
    </div>
</template>

<script setup lang="ts">
import { useProjectStore } from '../store/useProjectStore';

const projectStore = useProjectStore()
</script>