<template>
    <div class="">
        <div class="grid grid-cols-4 gap-4 h-screen">
            <div class="col-span-1 bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
                <div class="search relative">
                    <input type="text" name="fff" class="fl-input-small" placeholder="" v-model="_searchPosition">
                    <label for="fff" class="fl-label">Search</label>
                </div>
                <div class="row h-10 w-full  align-middle items-center justify-between">
                    <span class=" text-xl"> Organisations</span>
                    <button type="button" @click="setisOpenAddDialog(true)">
                        <PlusIcon class="h-5 w-5 text-teal-500" />
                    </button>
                </div>
                <!-- Positions: {{ positionsALL }} -->
                <!-- Positions2: {{ positionsALL2.filter(d => d.code == _searchPosition) }} -->
                <div @click="changePosition(position)" v-for="(position, key) in positionsALL" :key="key"
                    :class="{ 'bg-blue-50': position._id == currentPosition?._id }"
                    class="hover:bg-blue-100 pt-2 pl-2 pb-2 hover:bg-opacity- h-[55px] w-full cursor-default  hover:outline-1 hover transition-all duration-1000">
                    <p>
                        <strong>{{ position.name }}</strong>
                    </p>
                    <h1 class="text-xs">{{ position.code }}</h1>
                </div>
            </div>
            <div class="col-span-3 bg-white p-2 h-full rounded-md ml-3">
                <div id="rowd">
                    <div class="flex flex-row-reverse justify-between mb-2">
                        <button :v-if="currentPosition?._id" class="btn-primary" data-hs-overlay="#drawerOP">
                            <PlusIcon class="h-5 w-5 text-white" />
                            <span class="self-center ml-2"> Add position </span>
                        </button>
                        <div class="search w-[300px]">
                            <input type="text" class="fl-input-small w-[300px]" placeholder="Type name of lookup..."
                                v-model="_searchLookups">
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
                                                    Name</th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Description</th>
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
                                            <tr v-for="lookups in lookupsALL">
                                                <td class="py-3 pl-4 ">
                                                    <div class="flex items-center h-5">
                                                        <input id="hs-table-checkbox-1" type="checkbox"
                                                            class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                        <label for="hs-table-checkbox-1" class="sr-only">Checkbox</label>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                                    {{ lookups.code }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{
                                                    lookups.name }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{
                                                    lookups.description }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{
                                                    lookups.createdAt }}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a class="text-blue-500 hover:text-blue-700 cursor-pointer"
                                                        @click="openDeleteDialog(true, lookups)">Delete</a>
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

            <!-- <DrawerAddLookup ref="drawerLookup" :positionID="currentPosition?._id" />
            <DialogAddPosition ref="dialogPosition" />
            <DialogDeleteLookup ref="dialogDeleteLookup" :lookupID="toDeleteLookup?._id" /> -->

        </div>


    </div>
</template>
  
<script setup lang="ts">
// import DialogDeleteLookup from './lookups/DialogDeleteLookup.vue'
// import DialogAddPosition from './lookups/DialogAddPosition.vue'
// import DrawerAddLookup from './lookups/DrawerAddLookup.vue'
import { gsap } from "gsap"
import { myfetch } from "@/api/myfetch";
import { IPosition } from '@/store/management'
import { ref, computed, watch } from "vue"
import { useManagement, ILookups } from '@/store/management';
import { PlusIcon, } from "@heroicons/vue/solid";


let _searchLookups = ref<string>('')
let _searchPosition = ref<string>('')
const store = useManagement()
const isOpenAddDialog = ref(false)
const toDeleteLookup = ref<ILookups | null>(null)
const currentPosition = ref<IPosition>()
const positionsALL = computed(() => store.getPositions(_searchPosition.value))
const lookupsALL = computed(() => store.getLookups(currentPosition.value?._id))

// const drawerLookup = ref<InstanceType<typeof DrawerAddLookup> | null>(null)
// const dialogPosition = ref<InstanceType<typeof DialogAddPosition> | null>(null)
// const dialogDeleteLookup = ref<InstanceType<typeof DialogDeleteLookup> | null>(null)


watch(currentPosition, (newval, oldval) => {
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
function setisOpenAddDialog(value: boolean = false) {
    isOpenAddDialog.value = value
    console.log('Before');
    // dialogPosition.value?.openDialog()
    console.log('After');
}
function changePosition(position: IPosition) {
    currentPosition.value = position
}

function openDeleteDialog(should: boolean = true, payload: null | ILookups) {
    // dialogDeleteLookup.value?.openDialog()
}

</script>
  
<style scoped></style>
  