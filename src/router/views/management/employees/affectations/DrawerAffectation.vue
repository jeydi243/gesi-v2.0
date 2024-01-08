<template>
    <div id="drawerAffectation"
        class="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r dark:bg-gray-800 dark:border-gray-700"
        tabindex="-1">
        <div class="flex justify-between items-center py-2 px-2 border-b dark:border-gray-400">
            <div class="row w-full text-2xl font-bold"> Assignement of </div>
            <button type="button"
                class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#drawerAffectation">
                <span class="sr-only">Close modal</span>
                <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                        fill="currentColor" />
                </svg>
            </button>
        </div>
        <div class="p-4 h-full">
            <Form class="col justify-between w-full space-y-4 mt-4 h-full" @submit="submitAffectation"
                v-slot="{ isSubmitting }" :validation-schema="affectationSchema" :initial-values="initialLookupsValue"
                @invalid-submit="onInvalidAffectation">

                <!-- <Field as="select" name="classe_id" v-slot="{ errorMessage }"
                    class="fl-select2-small peer text-black bg-gray-100">
                    <option selected class="text-black">Choisis une fonction</option>
                    <option v-for="{ id, name } in positions(orgID)" :key='id' :value="id" class="text-black">
                        {{ name }}</option>
                    <p>{{ errorMessage }}</p>
                </Field> -->
                <Field name="positionID" id="positionID" as="select" class="form-select block w-full"
                    v-slot="{ errorMessage }">
                    <label for="positionID">Position</label>
                    <option value="CD" selected>Manager IT</option>
                    <option v-for="{ id, name } in positions(orgID)" :key='id' :value="id" class="text-black">
                        {{ name }}</option>
                    <p>{{ errorMessage }}</p>
                </Field>

                <Combobox >
                    <div class="relative mt-1 bg-gray-50">
                        <div
                            classe="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <ComboboxLabel>Employee</ComboboxLabel>
                            <ComboboxInput @change="query = $event.target.value"
                                :displayValue="(person) => person.last_name"
                                class="w-full border-none py-2 pl-3 pr-10 text-sm border-b-2 rounded-lg border border-gray-500 leading-5 bg-gray-100 text-gray-900 focus:ring-0" />
                            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                                <Icon icon="akar-icons:chevron-vertical" class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </ComboboxButton>
                        </div>
                        <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
                            @after-leave="query = ''">

                            <ComboboxOptions>
                                <div v-if="filteredEmployee.length === 0 && query !== ''"
                                    class="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Aucun employée trouvé
                                </div>
                                <ComboboxOption v-for="person in filteredEmployee" :key="person._id" :value="person"
                                    as="template" v-slot="{ active, selected }">
                                    <li class="flex flex-row ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                                        :class="{
                                            'bg-[#4e35bc] text-white': active,
                                            'bg-white text-black': !active,
                                        }">
                                        <Icon icon="ic:outline-check" v-show="selected" />
                                        {{ person.last_name }}
                                    </li>
                                </ComboboxOption>
                            </ComboboxOptions>
                        </TransitionRoot>
                    </div>
                </Combobox>
                Myselect
                <MySelect />
                <Field name="file" v-slot="{ field, errorMessage }">
                    <div class="relative">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="small_size">Proof
                            Document</label>
                        <input v-bind="field" class="fl-input-file" id="small_size" type="file">
                        <span>{{ errorMessage }}</span>
                    </div>
                </Field>
                <div class="row h-1/2 w-full justify-between ">
                    <button class="btn-unstate" @click.prevent.stop="toggle()">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <Icon type="solid" icon="ic:sharp-plus" color="white" />
                        <span class="font-bold text-white">Add</span>
                        <CirclesToRhombusesSpinner :size="3" color="#FFF" class="text-white" v-if="isSubmitting" />
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from "@/api/management"
import { Icon } from '@iconify/vue'
import { toast } from '@/utils/index';
import { ref, computed } from 'vue'
import { useManagement } from '@/store/management'
import { CirclesToRhombusesSpinner } from 'epic-spinners'
import { Field, Form, InvalidSubmissionContext, SubmissionContext } from "vee-validate"
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOptions, ComboboxOption, TransitionRoot, ComboboxButton } from '@headlessui/vue'
import { myfetch } from '@/api/myfetch';
import { useEmployee } from "@/store/employee";
import MySelect from '@/components/my-select.vue'

const storeMgt = useManagement()
const storeEmp = useEmployee()
const orgID = ref<string>('1452')
const showDrawer = ref(false)
const initialLookupsValue = ref([])
const affectationSchema = ref([])
const employees = computed(() => storeEmp.getEmployees)
const positions = computed(() => storeEmp.positionsInOrg)

const { addAffectation } = storeEmp
let selectedEmployeeID = ref<string | null>(null)
let query = ref('')
let filteredEmployee = computed(() =>
    query.value === ''
        ? employees.value
        : employees.value.filter((person) =>
            person.last_name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.value.toLowerCase().replace(/\s+/g, ''))
        )
)
function toggle() {
    showDrawer.value = !showDrawer.value
}
function onInvalidAffectation(ctx: InvalidSubmissionContext) {
    showDrawer.value = !showDrawer.value
}
async function submitAffectation(values, { resetForm, setFieldError }: SubmissionContext) {
    try {
        const payload = {
            ...values, createdBy: user.value._id
        }
        const { error, data, response, statusCode } = await myfetch(api.getAffectations).post(payload).json()
        // const { data, isFinished, error } = await useAxios(api.getLookups, { method: 'POST', data: payload }, instance)
        if (response.value?.ok) {
            toast.success("Organization added successfully! ")
            resetForm()
            await addAffectation(data.value)
        } else {
            if ('validationerror' in data.value) {
                toast.error(`Can't add new org! Correct all error field before submit`)
                setFieldError(data.value.field, `${data.value.message}`)
            }
        }
        console.log({ data: data.value });
        console.log({ statusCode: statusCode.value });
        console.log({ error: error.value });
        console.log({ response: response.value });
    } catch (error) {
        console.log(error)
        return false
    }
}

defineExpose({ showDrawer })
</script>

<style scoped></style>