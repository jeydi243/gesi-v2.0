<template>
  <div class="">
    <div class="grid grid-cols-4 gap-4 h-screen">
      <div class="col-span-1 bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
        <div class="search">
          <input type="text" autocomplete="off" class="fl-input-small" placeholder="Type something..."
            v-model="_searchClasse">
        </div>
        <div class="row-reverse h-10 w-full  align-middle items-center">
          <button type="button" @click.prevent.stop="setisOpenAddDialog(true)">
            <PlusIcon class="h-5 w-5 text-teal-500" />
          </button>
        </div>
        <!-- Classes: {{ classesALL }} -->
        <!-- Classes2: {{ classesALL2.filter(d => d.code == _searchClasse) }} -->
        <div @click.prevent.stop="changeClasse(classe)" v-for="(classe, key) in classesALL" :key="key"
          :class="{ 'bg-blue-50': classe._id == currentClasse?._id }"
          class="hover:bg-blue-100 pt-2 pl-2 pb-2 hover:bg-opacity- h-[55px] w-full cursor-default  hover:outline-1 hover transition-all duration-1000">
          <p>
            <strong>{{ classe.name }}</strong>
          </p>
          <h1 class="text-xs">{{ classe.code }}</h1>
        </div>
      </div>
      <div class="col-span-3 bg-white p-2 h-full rounded-md ml-3">
        <div id="rowd">
          <div class="flex flex-row-reverse justify-between mb-2">
            <button type="button" @click.prevent.stop="drawerLookup?.open(currentClasse)" class="btn-primary"
              data-hs-overlay="#drawerAddLookup" data-drawer-target="drawerAddLookup"
              data-drawer-toggle="drawerAddLookup">
              <PlusIcon class="h-5 w-5 text-white" />
              <span class="self-center ml-2"> Add lookup </span>
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
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Description</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created
                        </th>
                        <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th> -->
                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action
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
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{{ lookups.code }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ lookups.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ lookups.description }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ lookups.createdAt }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a class="text-blue-500 hover:text-blue-700 cursor-pointer"
                            @click.prevent.stop="openDeleteDialog(true, lookups)">Delete</a>
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

      <DrawerAddLookup ref="drawerLookup" :classeID="currentClasse?._id" />
      <DialogAddClasse ref="dialogClasse" />
      <DialogDeleteLookup ref="dialogDeleteLookup" :lookupID="toDeleteLookup?._id" />

    </div>
  </div>
</template>

<script setup lang="ts">
import DialogDeleteLookup from './DialogDeleteLookup.vue'
import DialogAddClasse from './DialogAddClasse.vue'
import DrawerAddLookup from './DrawerAddLookup.vue'
import { gsap } from "gsap"
import { myfetch } from "@/api/myfetch";
import { ref, computed, watch } from "vue"
import { useManagement } from '@/store/management';
import { PlusIcon, } from "@heroicons/vue/solid";
import { ILookups } from '@/models/lookup';
import { IClasse } from '@/models/classe';


let _searchLookups = ref<string>('')
let _searchClasse = ref<string>('')
const store = useManagement()
const isOpenAddDialog = ref(false)
const toDeleteLookup = ref<ILookups | null>(null)
const currentClasse = ref<IClasse>()
const classesALL = computed(() => store.getClasses(_searchClasse.value))
const lookupsALL = computed(() => store.getLookups(currentClasse.value?._id))

const drawerLookup = ref<InstanceType<typeof DrawerAddLookup> | null>(null)
const dialogClasse = ref<InstanceType<typeof DialogAddClasse> | null>(null)
const dialogDeleteLookup = ref<InstanceType<typeof DialogDeleteLookup> | null>(null)


watch(currentClasse, (newval, oldval) => {
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
  dialogClasse.value?.openDialog()
  console.log('After');
}
function changeClasse(classe: IClasse) {
  currentClasse.value = classe
}

function openDeleteDialog(should: boolean = true, payload: null | ILookups) {
  dialogDeleteLookup.value?.openDialog()
}

</script>

<style scoped></style>
