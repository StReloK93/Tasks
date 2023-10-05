<template>
    <div class="grid grid-rows-[60px,1fr] h-full py-2">
		<Header />
		<main class="overflow-y-auto overflow-hidden py-4 mt-2">
			<aside class="">
				<div class="text-gray-600 text-xl">
					Tasks list
				</div>
				<div class="border-b inline-block my-3 px-2">
					<input type="text" v-model="projectStore.project.filter" class=" py-1 bg-transparent outline-none" placeholder="filter">
					<i class="fa-light fa-magnifying-glass text-sm"></i>
				</div>
			</aside>
			<button @click="projectStore.createTask(projectStore.project.tasks)" class="round-button absolute bottom-4 right-4">
				<i class="fa-sharp fa-regular fa-plus"></i>
			</button>
			<Task
				v-for="(task, index) in projectStore.filteredTasks"
				:task="task"
				:key="index"
				:tasklist="projectStore.project.tasks"
				@delete="(task) => projectStore.deleteTask(projectStore.project.tasks, task)"
			/>
		</main>
    </div>
</template>
<script setup lang="ts">
import { useProjectStore } from '../store/useProjectStore'
import Header from './../components/Header.vue'
const projectStore = useProjectStore()
import Task from '../components/Task.vue'
</script>