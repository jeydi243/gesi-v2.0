<template>
    <div id="drawerAffectation"
        class="fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r dark:bg-gray-800 dark:border-gray-700"
        tabindex="-1">
        <div class="flex justify-between items-center py-2 px-2 border-b dark:border-gray-400">
            <div class="row w-full text-lg font-bold"> Assignement of </div>
            <button type="button" @click="close"
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
                v-slot="{ isSubmitting }" :validation-schema="assignmentSchema" :initial-values="initialAssignmentValue"
                @invalid-submit="onInvalidAffectation">
                <!-- {{ positionsALL() }} -->
                <Field as="div" class="bg-red-500 w-full h-10" name="position_id" v-slot="{ field }">
                    <div class="relative">
                        <select v-bind="field" class="peer p-2 pe-9 text-black outline-none block w-full bg-gray-100 border-none focus:border-solid focus:border-b-2 focus:border-blue-500 text-sm focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none focus:pt-6
                                        focus:pb-2
                                        [&:not(:placeholder-shown)]:pt-6
                                        [&:not(:placeholder-shown)]:pb-2
                                        autofill:pt-6">
                            <option selected>Select position</option>
                            <option v-for="{ _id: id, title } in positionsALL()" :key='id' :value="id">
                                {{ title }}</option>
                        </select>
                        <label class="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                                        peer-focus:text-xs
                                        peer-focus:-translate-y-1.5
                                        peer-focus:text-gray-500
                                        peer-[:not(:placeholder-shown)]:text-xs
                                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                                        peer-[:not(:placeholder-shown)]:text-gray-500">Position</label>
                    </div>
                </Field>
                <Field as="div" class="bg-red-500 w-full h-10" name="employee_id" v-slot="{ field }">
                    <div class="relative">
                        <select v-bind="field" class="peer p-2 pe-9 text-black outline-none block w-full bg-gray-100 border-none focus:border-solid focus:border-b-2 focus:border-blue-500 text-sm focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none focus:pt-6
                                        focus:pb-2
                                        [&:not(:placeholder-shown)]:pt-6
                                        [&:not(:placeholder-shown)]:pb-2
                                        autofill:pt-6">
                            <option selected>Select employee</option>
                            <option v-for="{ _id: id, first_name, last_name } in employees" :key='id' :value="id">
                                {{ first_name }}{{ last_name }}</option>
                        </select>
                        <label class="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                                        peer-focus:text-xs
                                        peer-focus:-translate-y-1.5
                                        peer-focus:text-gray-500
                                        peer-[:not(:placeholder-shown)]:text-xs
                                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                                        peer-[:not(:placeholder-shown)]:text-gray-500">Employee</label>
                    </div>
                </Field>

                <Field name="file" v-slot="{ field, errorMessage }">
                    <div class="relative">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="small_size">
                            Document
                        </label>
                        <input v-bind="field" class="fl-input-file" id="small_size" type="file">
                        <span>{{ errorMessage }}</span>
                    </div>
                </Field>
                <div class="row w-full justify-between">
                    <Field name="from" v-slot="{ field, errorMessage }">
                        <div class="relative mr-1">
                            <input v-bind="field" type="date" id="from" class="fl-input-small peer" placeholder=" " />
                            <label for="from" class="fl-label">From Date</label>
                            <p class="input-error">{{ errorMessage }}</p>
                        </div>
                    </Field>
                    <Field name="to" v-slot="{ field, errorMessage }">
                        <div class="relative">
                            <input v-bind="field" type="date" id="to" class="fl-input-small peer" placeholder=" " />
                            <label for="to" class="fl-label">To Date</label>
                            <p class="input-error">{{ errorMessage }}</p>
                        </div>
                    </Field>
                </div>
                <div class="row h-1/2 w-full justify-between ">
                    <button class="btn-unstate" @click.prevent.stop="close">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <Icon type="solid" icon="ic:sharp-plus" color="white" height="20" width="20" />
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
import { ref, computed, onMounted } from 'vue'
import { useManagement } from '@/store/management'
import { CirclesToRhombusesSpinner } from 'epic-spinners'
import { Field, Form, InvalidSubmissionContext, SubmissionContext } from "vee-validate"
import { myfetch } from '@/api/myfetch';
import { useEmployee } from "@/store/employee";
import MySelect from '@/components/my-select.vue'
import { Drawer } from 'flowbite'
import { useAuth } from "@/store/authentication";
import * as yup from "yup"

const storeMgt = useManagement()
const storeEmp = useEmployee()
const orgID = ref<string>('1452')
const showDrawer = ref(false)
const initialAssignmentValue = ref({
    position_id: '',
    employee_id: "",
    from: '',
    to: ''
})
const assignmentSchema = ref({
    position_id: yup.string().required().label("Position"),
    employee_id: yup.string().required().label("Employee"),
    from: yup.string().required().label("From date"),
    to: yup.string().nullable().label("From date")
})
const employees = computed(() => storeEmp.getEmployees)
const positionsALL = computed(() => storeEmp.getPositions)
const Authstore = useAuth()
const user = computed(() => Authstore.getCurrentUser)

const { addAffectation } = storeEmp
let selectedEmployeeID = ref<string | null>(null)
let query = ref('')
let drawer: Drawer | null = null;
function toggle() {
    drawer?.toggle()
}
function close() {
    drawer?.hide()
}
function onInvalidAffectation(ctx: InvalidSubmissionContext) {
    showDrawer.value = !showDrawer.value
}

async function submitAffectation(values, { resetForm, setFieldError }: SubmissionContext) {
    try {
        const payload = {
            ...values, createdBy: user.value._id
        }
        const { error, data, response, statusCode } = await myfetch(api.getAssignments).post(payload).json()
        // const { data, isFinished, error } = await useAxios(api.getLookups, { method: 'POST', data: payload }, instance)
        if (response.value?.ok) {
            toast.success("Assignment added successfully! ")
            resetForm()
            await addAffectation(data.value)
            toggle()
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
onMounted(() => {
    drawer = new Drawer(document.getElementById('drawerAffectation'))
})

defineExpose({ showDrawer, toggle })

</script>

<style scoped></style>