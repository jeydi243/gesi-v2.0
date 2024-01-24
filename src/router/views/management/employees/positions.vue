<template>
    <div class="">
        <div class="grid grid-cols-4 gap-4 h-screen">
            <div class="col-span-1 bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
                <div class="search relative">
                    <input type="text" name="fff" class="fl-input-small" placeholder="" v-model="_searchOrg">
                    <label for="fff" class="fl-label">Search</label>
                </div>
                <div class="row h-10 w-full  align-middle items-center justify-between">
                    <span class=" text-base">Organisations</span>
                    <button type="button" data-hs-overlay="#drawerOrganisation">
                        <PlusIcon class="h-5 w-5 text-teal-500" />
                    </button>
                </div>
                <!-- Positions: {{ positionsALL }} -->
                <!-- Positions2: {{ positionsALL2.filter(d => d.code == _searchPosition) }} -->
                <!-- {{ orgsALL }} -->
                <div @click="changeOrganization(org)" v-for="(org, key) in orgsALL" :key="key"
                    :class="{ 'bg-blue-50': org._id == currentOrg?._id }"
                    class="hover:bg-blue-100 pt-2 pl-2 pb-2 hover:bg-opacity- h-[55px] w-full cursor-default  hover:outline-1 hover transition-all duration-1000">
                    <p>
                        <strong>{{ org.name }}</strong>
                    </p>
                    <h1 class="text-xs">{{ org.code }}</h1>
                </div>
            </div>
            <div class="col-span-3 bg-white p-2 h-full rounded-md ml-3">
                <div id="rowd">
                    <div class="flex flex-row-reverse justify-between mb-2">
                        <button :v-if="currentOrg?._id" class="btn-primary" @click="dialogPosition?.toggle">
                            <PlusIcon class="h-5 w-5 text-white" />
                            <span class="self-center ml-2"> New position </span>
                        </button>
                        <div class="search w-[300px]">
                            <input type="text" class="fl-input-small w-[300px]" placeholder="Type name of position..."
                                v-model="_searchPosition">
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <div class="-m-1.5 overflow-x-auto">
                            <div class="p-1.5 min-w-full inline-block align-middle">
                                <div class=" rounded-lg overflow-hidden dark:border-gray-700">
                                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead class="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" class="py-3 pl-4">
                                                    <div class="flex items-center h-5">
                                                        <input id="hs-table-checkbox-all" type="checkbox"
                                                            class="border-gray-200 rounded text-blue-600 focus:ring-blue-500  dark:focus:ring-offset-gray-800" />
                                                        <label for="hs-table-checkbox-all" class="sr-only">Checkbox</label>
                                                    </div>
                                                </th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Code</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Title</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Department</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Job Description</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Created
                                                </th>
                                                <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th> -->
                                                <th scope="col"
                                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr v-for="position in positionsinOrg">
                                                <td class="py-3 pl-4 ">
                                                    <div class="flex items-center h-5">
                                                        <input id="hs-table-checkbox-1" type="checkbox"
                                                            class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                        <label for="hs-table-checkbox-1" class="sr-only">Checkbox</label>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                                    {{ position.code }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{
                                                    position.title }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{
                                                    position.org_id.name }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{
                                                    position.job_description }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{
                                                    new Date(position.createdAt).toLocaleDateString() }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a class="text-blue-500 hover:text-blue-700 cursor-pointer"
                                                        @click="openDeleteDialog(true, position)">Delete</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <DrawerAddLookup ref="drawerLookup" :positionID="currentPosition?._id" />-->
            <DialogAddPosition ref="dialogPosition" />
            <DialogDeletePosition ref="dialogDeletePosition" :positionID="toDeletePosition?._id" />

        </div>


    </div>
</template>
  
<script setup lang="ts">
// import DrawerAddLookup from './lookups/DrawerAddLookup.vue'
import DialogDeletePosition from './components/DialogDeletePosition.vue'
import DialogAddPosition from './components/DialogAddPosition.vue'
import { gsap } from "gsap"
import { ref, computed, watch } from "vue"
import { useManagement } from '@/store/management';
import { PlusIcon, } from "@heroicons/vue/solid";
import { useEmployee } from "@/store/employee";
import { IPosition } from "@/models/position";


let _searchPosition = ref<string>('')
let _searchOrg = ref<string>('')
const store = useManagement()
const storeEmployee = useEmployee()
const toDeletePosition = ref<IPosition | null>(null)
const currentOrg = ref<IOrganization>()
const positionsALL = computed(() => storeEmployee.getPositions(_searchPosition.value))
const positionsinOrg = computed(() => storeEmployee.positionsInOrg(currentOrg.value?._id))
const orgsALL = computed(() => store.getOrganisations(_searchOrg.value))

// const drawerLookup = ref<InstanceType<typeof DrawerAddLookup> | null>(null)
const dialogPosition = ref<InstanceType<typeof DialogAddPosition> | null>(null)
const dialogDeletePosition = ref<InstanceType<typeof DialogDeletePosition> | null>(null)


watch(currentOrg, (newval, oldval) => {
    if (newval != oldval)
        gsap.fromTo(
            "#rowd",
            {
                opacity: 0,
                y: -10,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                // ease: Elastic.easeIn.config(0.5, 0.3),
            }
        )
})

function changeOrganization(position: IOrganization) {
    currentOrg.value = position
}
function openDeleteDialog(should: boolean = true, payload: null | IPosition) {
    toDeletePosition.value = payload
    dialogDeletePosition.value?.toggle()
    console.log('Log here ', payload);

}

</script>
  
<style scoped></style>
  