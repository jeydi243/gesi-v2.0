<template>
  <div class="">
    <div class="grid grid-cols-4 gap-4 h-screen">
      <div class="col-span-1 bg-white p-2 h-full rounded-md ml-3 hover:shadow-lg transition-all duration-700">
        <div class="search">
          <input type="text" class="input" placeholder="Type something..." v-model="_searchClasse">
        </div>
        <div class="row-reverse h-10 w-full  align-middle items-center">
          <button type="button" @click="setisOpenAddDialog(true)">
            <PlusIcon class="h-5 w-5 text-teal-500" />
          </button>
        </div>
        <!-- Classes: {{ classesALL }} -->
        <!-- Classes2: {{ classesALL2.filter(d => d.code == _searchClasse) }} -->
        <div @click="changeClasse(classe)" v-for="(classe, key) in classesALL" :key="key" class="hover:bg-teal-100 pt-2 pl-2 pb-2 hover:bg-opacity- h-[55px] w-full cursor-default rounded-lg hover:outline-1 hover transition-all duration-1000">
          <p>
            <strong>{{ classe.name }}</strong>
          </p>
          <h1 class="text-xs">{{ classe.code }}</h1>
        </div>
      </div>
      <div class="col-span-3 bg-white p-2 h-full rounded-md ml-3">
        <div id="rowd">
          <div class="flex flex-row-reverse justify-between mb-2">
            <button @click="openDrawer" class="btn-primary" data-hs-overlay="#drawerOP">
              <PlusIcon class="h-5 w-5 text-white" />
              <span class="self-center ml-2"> Add {{ currentClasse?.name }} </span>
            </button>
            <div class="search">
              <input type="text" class="input" placeholder="Type something..." v-model="_searchLookups">
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
                            <input id="hs-table-checkbox-all" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500  dark:focus:ring-offset-gray-800" />
                            <label for="hs-table-checkbox-all" class="sr-only">Checkbox</label>
                          </div>
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                        <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th> -->
                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr v-for="lookups in lookupsALL">
                        <td class="py-3 pl-4 ">
                          <div class="flex items-center h-5">
                            <input id="hs-table-checkbox-1" type="checkbox" class="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                            <label for="hs-table-checkbox-1" class="sr-only">Checkbox</label>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{{ lookups.code }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ lookups.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ lookups.description }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ lookups.createdAt }}</td>
                        <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{{ lookups.updatedAt }}</td> -->
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a class="text-blue-500 hover:text-blue-700 cursor-pointer" @click="openDeleteDialog(true, lookups)">Delete</a>
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

      <div id="drawerOP" class="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r dark:bg-gray-800 dark:border-gray-700" tabindex="-1">
        <div class="flex justify-between items-center py-2 px-2 border-b dark:border-gray-400">

          <div class="row w-full text-2xl font-bold">Add Lookups </div>
          <button type="button" class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#drawerOP">
            <span class="sr-only">Close modal</span>
            <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor" />
            </svg>
          </button>
        </div>
        <div class="p-4 h-full">
          <Form class="col justify-between w-full space-y-4 mt-4 h-full" @submit="submitLookups" v-slot="{ isSubmitting, resetForm, values }" :validation-schema="lookupsSchema" :initial-values="initialLookupsValue" @invalid-submit="onInvalidLookups">
            <div class=" col items-center mb-5 justify-center bg-gray-100 w-full h-12 rounded-md my-auto border text-center select-none align-middle border-cyan-300 border-dashed">
              Classe: {{ currentClasse?._id }}
            </div>
            <Field name="name" v-slot="{ field, errorMessage }">
              <div class="relative group h-12 mb-2">
                <input v-bind="field" type="text" id="name" required class="input peer" />
                <label for="name" class="placeholder-label">Name </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
            <Field name="code" v-slot="{ field, errorMessage }">
              <div class="relative group h-12 mb-2">
                <input v-bind="field" type="text" id="code" required class="input peer" />
                <label for="code" class="placeholder-label peer-invalid:text-red-600">Code </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
            <Field name="description" v-slot="{ field, errorMessage }">
              <div class="relative group mb-2">
                <textarea v-bind="field" id="description" required class="input-textarea peer" rows="4"></textarea>
                <label for="description" class="placeholder-label">Description of lookups </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
            <Field name="parent_lookups_id" v-slot="{ field, errorMessage }">
              <div class="relative group h-12 mb-2">
                <input v-bind="field" id="parent_lookups_id" required class="input peer" />
                <label for="parent_lookups_id" class="placeholder-label">Parent of lookups </label>
                <p class="input-error">{{ errorMessage }}</p>
              </div>
            </Field>
            <Combobox v-model="selectedPerson">
              <div class="relative mt-1">
                <div class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                  <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDoubleDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </ComboboxButton>
                </div>
                <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" @after-leave="query = ''">
                  <ComboboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <div v-if="filteredPeople.length === 0 && query !== ''" class="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>

                    <ComboboxOption v-for="person in filteredPeople" as="template" :key="person" :value="person"
                                    v-slot="{ selected, active }">
                      <li class="relative cursor-default select-none py-2 pl-10 pr-4"
                          :class="{
                            'bg-teal-600 text-white': active,
                            'text-gray-900': !active,
                          }">
                        <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                          {{ person }}
                        </span>
                        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3"
                              :class="{ 'text-white': active, 'text-teal-600': !active }">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </TransitionRoot>
              </div>
            </Combobox>
            {{ values }}
            <div class="row h-1/2 w-full justify-between ">
              <button class="btn-unstate" @click.prevent.stop="closeDrawer()">Cancel</button>
              <button type="submit" class="btn-primary">
                <box-icon type="solid" name="file-plus" color="white"></box-icon>
                <span class="font-bold text-white">Add</span>
                <CirclesToRhombusesSpinner :size="5" color="#FFF" class="text-white" v-if="isSubmitting" />
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
    <TransitionRoot :show="isOpenAddDialog" as="template" enter="duration-500 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
                    leave-to="opacity-0">
      <Dialog @close="setisOpenAddDialog" class="relative z-50">
        <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        </TransitionChild>


        <div class="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm">
          <DialogPanel class="w-full max-w-md rounded bg-white min-w-min [250px] p-4">
            <DialogTitle class="row justify-center font-bold text-3xl">Add Classe</DialogTitle>
            <!-- <DialogDescription>Complete your order</DialogDescription> -->
            <p>

            <Form v-slot="{ isSubmitting, values, resetForm }" @submit="submitClasse" :validation-schema="classeSchema" :initial-values="initialClasseValues" @invalid-submit="onInvalidClasse">
              <fieldset class="border-2 border-green-50 rounded-lg px-2 py-4">
                <!-- <legend class="italic text-green-500 pr-3">Informations</legend> -->
                <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" :validate-on-change="true" />
                <ErrorMessage name="name" v-slot="{ message }">
                  <p class="input-error">{{ message }}</p>
                </ErrorMessage>
                <Field type="text" placeholder="Code" id="code" name="code" class="w-full form-input" />
                <ErrorMessage name="code" v-slot="{ message }">
                  <p class="input-error">{{ message }}</p>
                </ErrorMessage>

                <Field type="description" placeholder="Description" id="description" name="description" class="w-full form-input" />
                <ErrorMessage name="description" v-slot="{ message }">
                  <p class="input-error">{{ message }}</p>
                </ErrorMessage>
              </fieldset>
              <div class="row-reverse justify-between mt-4">
                <button type="submit" class="btn-primary" :disabled="isSubmitting">
                  <span v-if="!isSubmitting" class="row">
                    <PlusIcon class="h-5 w-5 text-white" />Add
                  </span>
                  <div v-else>
                    <CirclesToRhombusesSpinner :size="5" color="#FFF" class="text-white" />
                  </div>
                </button>
                <button class="btn-danger" @click.prevent="resetForm(); setisOpenAddDialog(false)" :disabled="isSubmitting">Cancel</button>
              </div>
            </Form>
            </p>
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
    <TransitionRoot :show="isOpenDeleteDialog" as="template" enter="duration-500 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
      <Dialog @close="setisOpenAddDialog" class="relative z-50">
        <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        </TransitionChild>


        <div class="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm">
          <DialogPanel class="w-full max-w-md rounded bg-white min-w-min [250px] p-4">
            <DialogTitle class="row justify-center font-bold text-3xl">Actions</DialogTitle>
            <DialogDescription class="row mt-7 mb-7">Do you want to delete this lookups ?</DialogDescription>
            <p>
            <div class="row-reverse">
              <button type="button" class="btn-danger" @click="deleteLookups">Delete lookups</button>
              <button type="button" class="btn-primary mr-4" @click="isOpenDeleteDialog = false">Cancel</button>
            </div>
            </p>
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup"
import { gsap } from "gsap"
import { chance } from "@/utils/index"
import { myfetch } from "@/api/myfetch";
import { useAuth } from "@/store/authentication";
import { IClasse } from '@/store/management'
import { useToast } from 'vue-toastification';
import { isLength } from "validator"
import { useConfig } from "@/store/config";
import { useManagement, ILookups } from '@/store/management';
import { ref, computed, watch } from "vue"
import { InvalidSubmissionContext, SubmissionContext } from 'vee-validate';
import { CirclesToRhombusesSpinner } from "epic-spinners"
import { Field, Form, ErrorMessage } from "vee-validate"
import { PlusIcon, CheckIcon, ChevronDoubleDownIcon } from "@heroicons/vue/solid";
import { Dialog, DialogPanel, DialogTitle, DialogDescription, TransitionRoot, TransitionChild, Combobox, ComboboxOptions, ComboboxButton, ComboboxOption } from '@headlessui/vue'
import api from "@/api/management"
import { instance } from "@/api/myaxios";
import { useAxios } from '@vueuse/integrations/useAxios'


let _searchLookups = ref<string>('')
let _searchClasse = ref<string>('')
let isFetching = ref(false)
const query = ref('')
const toast = useToast()
const store = useManagement()
const auth = useAuth()
const config = useConfig()
const user = computed(() => auth.getCurrentUser)
const isOpenDrawer = ref(false)
const isOpenAddDialog = ref(false)
const toDeleteLookup = ref<ILookups | null>(null)
const isOpenDeleteDialog = ref(false)
const currentClasse = ref<IClasse>()
const initialLookupsValue = {
  classe: currentClasse.value,
  parent_lookups_id: "",
  code: "code of new lookups",
  name: "New lookups",
  description: "description of new lookups"
}
const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
]
const { addLookups } = store
const classesALL = computed(() => store.getClasses(_searchClasse.value))
const lookupsALL = computed(() => store.getLookups(currentClasse.value?._id))
const filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) => {
      return person.toLowerCase().includes(query.value.toLowerCase())
    })
)
const lookupsSchema = yup.object({
  // classe_id?: yup.string().required().label("Classe ID"),
  code: yup.string().required().label("Code"),
  name: yup.string().required().label("Name"),
  description: yup.string().required().label("Description")
})
const classeSchema = {
  name(value) {
    return isLength(value, { min: 2, max: 20 }) ? true : "Name must be between 2 and 20 characters"
  },
  code(value) {
    return isLength(value, { min: 2, max: 20 }) ? true : "Code must be between 2 and 20 characters"
  },
  description(value) {
    return isLength(value, { min: 2 }) ? true : "description must be between 2 and 20 characters"
  },

}
const selectedPerson = ref(people[0])

const initialClasseValues = {
  name: '',
  code: '',
  description: chance.sentence({ words: 30 }),
}
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
}
function changeClasse(classe: IClasse) {
  currentClasse.value = classe
}
function onInvalidLookups(ctx: InvalidSubmissionContext) {
  console.log(ctx.errors);
}
function closeDrawer(val: boolean = false) {
  isOpenDrawer.value = val
  const drawerOP = document.getElementById('drawerOP');
  window.HSOverlay.close(drawerOP)
}
function openDrawer() {
  const drawerOP = document.getElementById('drawerOP');
  window.HSOverlay.open(drawerOP)
  isOpenDrawer.value = true
}
function openDeleteDialog(should: boolean = true, payload: null | ILookups) {
  isOpenDeleteDialog.value = should
  toDeleteLookup.value = payload
}
async function deleteLookups() {
  try {
    const { isFetching: f, error, data, response, statusCode } = await myfetch(api.getLookups).delete(toDeleteLookup).json()
    isFetching = f
    console.log({ data: data.value });
    console.log({ statusCode: statusCode.value });
    console.log({ error: error.value });
    console.log({ response: response.value });
    console.log({ isFetching });

    if ([200, 201].includes(statusCode.value!)) {
      toast.info(data.value)
      isOpenDeleteDialog.value = false
    } else {
      toast.error(data.value.message)

    }
  } catch (error) {
    console.log(error);

  }
}
async function submitLookups(values, { resetForm, setFieldError, setErrors }: SubmissionContext) {
  try {
    console.log(currentClasse.value?._id);
    const payload = {
      ...values, classe_id: currentClasse.value?._id, createdBy: user.value._id
    }
    const { isFetching, error, data, response, statusCode } = await myfetch(api.getLookups).post(payload).json()
    // const { data, isFinished, error } = await useAxios(api.getLookups, { method: 'POST', data: payload }, instance)

    console.log({ data: data.value });
    console.log({ statusCode: statusCode.value });
    console.log({ error: error.value });
    console.log({ response: response.value });

    // if (Object.keys(data).includes('validationerror')) {
    if ('validationerror' in data.value) {
      toast.error(`Can't add new lookups! Correct all error field before submit`)
      setFieldError(data.value.field, `${data.value.message}`)
      // setErrors({ data.value.field: "Error code", "description": 'test error' })
    } else {
      closeDrawer()
      resetForm()
      toast.success("Lookups added successfully !")
      return await addLookups(data.value)
    }
  } catch (error: any) {
    console.log(error)
    return false
  }
}
async function submitClasse(values) {
  try {
    var result = await store.addClasse(values)
    if (result) {
      setisOpenAddDialog()
      toast.success("Classe added successfully !")
    } else {
      toast.error(`Can't add new Classe`)
    }
  } catch (error: any) {
    console.log(error)
  }
}
async function onInvalidClasse(ctx: InvalidSubmissionContext) {
  const { errors } = ctx
  console.log(errors);
}

</script>

<style scoped></style>
