<template>
    <div id="drawerDetailsEmp"
        class="fixed top-0 right-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-between items-center py-2 px-2 border-b dark:border-gray-400">
            <div class="row w-full text-lg font-bold"> Employee </div>
            <button type="button" @click.prevent="close"
                class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800">
                <span class="sr-only">Close modal</span>
                <Icon icon="solar:close-square-bold" />
            </button>
        </div>
        <div class="p-4 h-full w-full overflow-y-auto">
            <div id="col justify-center text-center align-center w-full">
                <div class="col">
                    <img src="https://randomuser.me/api/portraits/med/men/75.jpg" alt="" class="rounded-md self-center">
                </div>
                <span class="text-center mb-2 block">

                    {{ selectedEmployee?.first_name }}
                    {{ selectedEmployee?.last_name }}
                </span>
                <div class="row justify-center">
                    <button type="button" class="row block self-center bg-teal-500 py-1 rounded-full mb-2 align-center items-center px-3">
                        <Icon icon="solar:phone-rounded-bold-duotone" color="#004040" class="align-center text-center " />
                        Contact
                    </button>
                </div>


                <!-- <span class="font-bold mb-2">{{ selectedEmployee?.email }}</span> -->
            </div>
            <div class="mb-5">
                <span class="border-l-2 border-green-300 pl-1 font-bold text-lg bg-teal-50 w-full block mb-2">Skills</span>
                <a href="#" v-for="(skill, index) in selectedEmployee?.skills?.split(',')" :key="index"
                    class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">{{
                        skill }}</a>
            </div>
            <div class="mb-5">
                <span
                    class="border-l-2 border-green-300 pl-1 font-bold text-lg bg-teal-50 w-full block mb-2">Biography</span>

                <p class="pl-4">
                    {{ selectedEmployee?.biography }}
                </p>

            </div>
            <div>
                <span class="border-l-2 border-green-300 pl-1 font-bold text-lg bg-teal-50 w-full block">Experiences</span>
                <br>
                <ol class="relative border-s border-gray-200 dark:border-gray-700 pl-2">
                    <li class="mb-10 ms-4">
                        <div
                            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                        </div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February
                            2022</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Application UI code in Tailwind CSS
                        </h3>
                        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages
                            including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce &
                            Marketing pages.</p>

                    </li>
                    <li class="mb-10 ms-4" v-for="({ from, company }, index) in selectedEmployee?.experiences" :key="index">
                        <div
                            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                        </div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ from
                        }}</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ company }}</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components
                            are first designed in Figma and we keep a parity between the two versions even as we update the
                            project.</p>
                    </li>

                </ol>
            </div>
            <div>
                <span class="border-l-2 border-green-300 pl-1 font-bold text-lg bg-teal-50 w-full block">Educations</span>
                <br>
                <ol class="relative border-s border-gray-200 dark:border-gray-700 pl-2 mb-5">
                    <li class="mb-10 ms-4" v-for="({ from, company }, index) in selectedEmployee?.experiences" :key="index">
                        <div
                            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                        </div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ from
                        }}</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ company }}</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components
                            are first designed in Figma and we keep a parity between the two versions even as we update the
                            project.</p>
                    </li>
                </ol>
            </div>

            <!-- {{ selectedEmployee }} -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted } from 'vue'
import { useManagement } from '@/store/management'
import { useEmployee } from "@/store/employee";
import { Drawer } from 'flowbite'
import { useAuth } from "@/store/authentication";

const storeEmp = useEmployee()
const employees = computed(() => storeEmp.getEmployees)
const positionsALL = computed(() => storeEmp.getPositions)
const Authstore = useAuth()
const user = computed(() => Authstore.getCurrentUser)
let selectedEmployeeID = ref<string | null>(null)
let selectedEmployee = computed(() => storeEmp.employees.find(emp => emp._id == selectedEmployeeID.value))

let drawer: Drawer | null = null;

function toggle(payload) {
    selectedEmployeeID.value = payload.employeeID
    drawer?.toggle()
}
function close() {
    drawer?.hide()
}

onMounted(() => {
    drawer = new Drawer(document.getElementById('drawerDetailsEmp'))
})

defineExpose({ toggle, close })

</script>

<style scoped></style>