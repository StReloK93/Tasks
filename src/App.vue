<template>
	<section class="container mx-auto relative h-screen">
		<StartPage v-if="projectStore.project.name == null"/>
		<TasksPage v-else />
	</section>
</template>

<script setup lang="ts">
import { useProjectStore } from './store/useProjectStore'
import StartPage from './pages/StartPage.vue'
import TasksPage from './pages/TasksPage.vue'
const projectStore = useProjectStore()

</script>