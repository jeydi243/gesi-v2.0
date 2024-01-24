<template>
    <div class="col">
        <div class="card row w-full mb-4 justify-between">
            <span class="text-4xl font-bold border-0 border-l-4 border-l-yellow-400 pl-2">Affectations</span>
            <div class="row">
                <button @click.prevent="getAllEmployees" class="btn-primary mr-1">
                    <Icon icon="heroicons:arrow-path-20-solid" color="white" height="20" width="20" />
                </button>
                <button type="button" class="btn-primary" @click="drawerAffectation?.toggle">
                    <Icon icon="heroicons:user-plus-20-solid" color="white" height="20" width="20" />
                    <span class="self-center ml-2">Affecter</span>
                </button>
            </div>
        </div>

        <!-- {{ assignementsALL }} -->

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Employee
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Position
                        </th>
                        <th scope="col" class="px-6 py-3">
                            From
                        </th>
                        <th scope="col" class="px-6 py-3">
                            To
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="{ employee_id, position_id, from, to } in assignementsALL"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6">
                            <a class="cursor-pointer" @click.prevent.stop="showDetails(employee_id._id)">{{ employee_id.last_name }}</a>
                        </th>
                        <td class="px-6 py-4">
                            {{ position_id.title }}
                        </td>
                        <td class="px-6 py-4">
                            {{ new Date(from).toLocaleDateString() }}
                        </td>
                        <td class="px-6 py-4">
                            {{ new Date(to).toLocaleDateString() }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <DrawerAffectation ref="drawerAffectation" />
        <DrawerDetailsEmp ref="drawerDetailsEmp" />

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import DrawerAffectation from './DrawerAffectation.vue'
import DrawerDetailsEmp from './DrawerDetailsEmp.vue'
import { useEmployee } from '@/store/employee'

const drawerAffectation = ref<InstanceType<typeof DrawerAffectation> | null>(null)
const drawerDetailsEmp = ref<InstanceType<typeof DrawerDetailsEmp> | null>(null)
const store = useEmployee()
const { getAllEmployees } = store

const assignementsALL = computed(() => store.getAssignements)

function showDetails(employeeID) {
    drawerDetailsEmp.value?.toggle({ employeeID })
}
</script>

<style scoped></style>