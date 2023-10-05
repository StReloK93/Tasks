import { defineStore } from 'pinia'
import { reactive, watch, computed } from 'vue'
import { getStorageKey, setStorageKey } from '../modules/SessionStorage'
import { ITask, iProject } from '../Interfaces'
import Swal from '../modules/Swal'
export const useProjectStore = defineStore('project', () => {
    const base: iProject = { name: null, tasks: [], filter: null }
    const project: iProject = reactive(JSON.parse(getStorageKey('project', JSON.stringify(base))))

    watch(project, (current) => {
        setStorageKey('project', JSON.stringify(current))
    })

    function exitProject() {
        project.name = base.name
        project.tasks = base.tasks
        project.filter = base.filter
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
        const filterText = filter.toLowerCase()

        return tasks.reduce(function (filtered, task) {
            const lowerCaseTaskName = task.name?.toLowerCase()

            if(['', null].includes(filterText)) filtered.push(task)
            
            else if (lowerCaseTaskName.includes(filterText)) {
                // task.children = deepFilter(filterText, task.children)
                filtered.push(task)
            }
            
            return filtered

        }, [])

    }

    const filteredTasks = computed(() => {
        return deepFilter(project.filter, project.tasks)
    })

    return { project, filteredTasks, createTask, deleteTask, editTask, exitProject }
})