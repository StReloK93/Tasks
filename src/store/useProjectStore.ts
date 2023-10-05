import { defineStore } from 'pinia'
import { reactive, watch, computed, toRaw } from 'vue'
import { getStorageKey, setStorageKey } from '../modules/SessionStorage'
import { ITask, iProject } from '../Interfaces'
import Swal from '../modules/Swal'
export const useProjectStore = defineStore('project', () => {
    const base: iProject = { name: "", tasks: [], filter: "", onlyFavorite: false }
    const project: iProject = reactive(JSON.parse(getStorageKey('project', JSON.stringify(base))))

    watch(project, (current) => {
        setStorageKey('project', JSON.stringify(current))
    })

    function exitProject() {
        project.name = base.name
        project.tasks = base.tasks
        project.filter = base.filter
        project.onlyFavorite = base.onlyFavorite
    }

    function createTask(tasklist: ITask[]) {
        const task: ITask = {
            name: 'task name',
            favorite: false,
            editState: true,
            children: [],
            toggle: false
        }
        tasklist.push(task)
    }

    function editTask(currentTask: ITask) {
        currentTask.editState = false
    }

    function deleteTask(tasklist: ITask[], currentTask: ITask) {

        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "Data cannot be recovered!",
            icon: 'warning',
        }).then((result) => {
            if (result.isConfirmed) {
                const index = tasklist.findIndex((task) => task == currentTask)
                tasklist.splice(index, 1)
            }
        })

    }


    function deepFilter(filter: string, tasks: ITask[]) {
        const emptyFilter = ['', null].includes(filter)
        const filterText = emptyFilter ? "" : filter?.toLowerCase()

        return tasks.reduce((filtered, task) => {
            const lowerCaseTaskName = task.name?.toLowerCase()

            if (emptyFilter) filtered.push(task)

            else if (lowerCaseTaskName.includes(filterText)) {
                const newTask = reactive({ ...task, children: deepFilter(filterText, task.children) })
                filtered.push(newTask)
            }

            return filtered

        }, [])

    }

    function favoriteFilter(favorite: boolean, tasks: ITask[]) {

        return tasks.reduce((filtered, task) => {
            if (favorite && task.favorite == true) {
                const newTask = reactive({ ...task, children: favoriteFilter(favorite, task.children) })
                filtered.push(newTask)
            }
            if (favorite == false) filtered.push(task)
            return filtered

        }, [])

    }

    const filteredTasks = computed(() => {
        const textFiltered = deepFilter(project.filter, project.tasks) as ITask[]
        return favoriteFilter(project.onlyFavorite, textFiltered)
    })

    return { project, filteredTasks, createTask, deleteTask, editTask, exitProject }
})