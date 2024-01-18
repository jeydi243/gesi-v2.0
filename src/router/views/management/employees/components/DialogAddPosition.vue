<template>
    <div id="modal-position" tabindex="-1" aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Add new position
                    </h3>
                    <button @click="toggle" type="button"
                        class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <Form class="col justify-between w-full space-y-4 mt-4 h-full" @submit="submitPosition"
                        v-slot="{ isSubmitting, values, resetForm }" :validation-schema="PositionSchema"
                        :initial-values="initialPosition" @invalid-submit="onInvalidPosition">
                        {{ values }}
                        <Field name="title" v-slot="{ field, errorMessage }">
                            <div class="relative">
                                <input v-bind="field" type="text" id="title" class="fl-input-small peer" placeholder=" " />
                                <label for="title" class="fl-label">Title</label>
                                <p class="input-error">{{ errorMessage }}</p>
                            </div>
                        </Field>
                        <Field name="job_description" v-slot="{ field, errorMessage }">
                            <div class="relative">
                                <input v-bind="field" type="text" id="job_description" class="fl-input-small peer"
                                    placeholder=" " />
                                <label for="job_description" class="fl-label">Job description</label>
                                <p class="input-error">{{ errorMessage }}</p>
                            </div>
                        </Field>
                        <Field name="status" v-slot="{ field, errorMessage }">
                            <div class="relative">
                                <input v-bind="field" type="text" id="status" class="fl-input-small peer" placeholder=" " />
                                <label for="status" class="fl-label">status</label>
                                <p class="input-error">{{ errorMessage }}</p>
                            </div>
                        </Field>
                        <!-- <Field as="select" name="org_id" v-slot="{ errorMessage }" class="fl-select-small peer bg-gray-50">
                            <option v-for="{ _id: id, name } in orgs" :key='id' :value="id">
                                {{ name }}</option>

                        </Field> -->
                        <Field as="div" class="bg-red-500 w-full h-10" name="org_id" v-slot="{ field }">
                            <div class="relative">
                                <select v-bind="field" class="peer p-2 pe-9 text-black outline-none block w-full bg-gray-100 border-none focus:border-solid focus:border-b-2 focus:border-blue-500 text-sm focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none focus:pt-6
                                        focus:pb-2
                                        [&:not(:placeholder-shown)]:pt-6
                                        [&:not(:placeholder-shown)]:pb-2
                                        autofill:pt-6">
                                    <option selected>Open this select dmenu</option>
                                    <option v-for="{ _id: id, name } in orgs" :key='id' :value="id">
                                        {{ name }}</option>
                                </select>
                                <label class="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                                        peer-focus:text-xs
                                        peer-focus:-translate-y-1.5
                                        peer-focus:text-gray-500
                                        peer-[:not(:placeholder-shown)]:text-xs
                                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                                        peer-[:not(:placeholder-shown)]:text-gray-500">Departement</label>
                            </div>
                        </Field>
                        <!-- <Field as="select" name="report_to" v-slot="{ errorMessage }"
                            class="fl-select-small peer bg-gray-50">
                            <option v-for="{ _id: id, name } in positions" :key='id' :value="id">
                                {{ name }}</option>

                        </Field> -->
                        <Field as="div" class="bg-red-500 w-full h-10" name="report_to" v-slot="{ field, errorMessage }">
                            <div class="relative">
                                <select v-bind="field" class="peer p-2 pe-9 text-black outline-none block w-full bg-gray-100 border-none focus:border-solid focus:border-b-2 focus:border-blue-500 text-sm focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none focus:pt-6
                                        focus:pb-2
                                        [&:not(:placeholder-shown)]:pt-6
                                        [&:not(:placeholder-shown)]:pb-2
                                        autofill:pt-6">
                                    <option selected>Open this select dmenu</option>
                                    <option v-for="{ _id: id, name } in positions" :key='id' :value="id">
                                        {{ name }}</option>
                                </select>
                                <label class="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                                        peer-focus:text-xs
                                        peer-focus:-translate-y-1.5
                                        peer-focus:text-gray-500
                                        peer-[:not(:placeholder-shown)]:text-xs
                                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                                        peer-[:not(:placeholder-shown)]:text-gray-500">Report to</label>
                            </div>
                            <p class="input-error">{{ errorMessage }}</p>
                        </Field>
                        <!-- <Field as="select" name="employment_type" v-slot="{ errorMessage }"
                            class="fl-select-small peer bg-gray-50">
                            <option v-for="{ _id: id, name } in employment_types" :key='id' :value="id">
                                {{ name }}</option>

                            <label for="employment_type">Employment Type</label>
                        </Field> -->
                        <Field as="div" class="bg-red-500 w-full h-10" name="employment_type" v-slot="{ field }">
                            <div class="relative">
                                <select v-bind="field" class="peer p-2 pe-9  outline-none block w-full bg-gray-100 border-none focus:border-solid focus:border-b-2 focus:border-blue-500 text-sm focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none focus:pt-6
                                        focus:pb-2
                                        [&:not(:placeholder-shown)]:pt-6
                                        [&:not(:placeholder-shown)]:pb-2
                                        autofill:pt-6">
                                    <option selected>Open this select dmenu</option>
                                    <option v-for="{ _id: id, name } in employment_types" :key='id' :value="id">
                                        {{ name }}</option>
                                </select>
                                <label class="absolute top-0 start-0 p-2 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                                        peer-focus:text-xs
                                        peer-focus:-translate-y-1.5
                                        peer-focus:text-gray-500
                                        peer-[:not(:placeholder-shown)]:text-xs
                                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                                        peer-[:not(:placeholder-shown)]:text-gray-500">Employment Type</label>
                            </div>
                        </Field>
                        <div class="row w-full justify-between">
                            <Field name="startDate" v-slot="{ field, errorMessage }">
                                <div class="relative">
                                    <input v-bind="field" type="date" id="startDate" class="fl-input-small peer"
                                        placeholder=" " />
                                    <label for="startDate" class="fl-label">Start Date</label>
                                    <p class="input-error">{{ errorMessage }}</p>
                                </div>
                            </Field>
                            <Field name="endDate" v-slot="{ field, errorMessage }">
                                <div class="relative">
                                    <input v-bind="field" type="date" id="endDate" class="fl-input-small peer"
                                        placeholder=" " />
                                    <label for="endDate" class="fl-label">End Date</label>
                                    <p class="input-error">{{ errorMessage }}</p>
                                </div>
                            </Field>
                        </div>

                        <div class="flex justify-between mt-5">
                            <button type="button" class="btn-unstate" @click="resetForm(); toggle()">Cancel</button>
                            <button type="submit" class="btn-primary">
                                <Icon icon="material-symbols:add" height="20" width="20" /> Add
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { parseISO } from "date-fns"
import { isLength } from 'validator'
import { Field, Form, InvalidSubmissionContext, SubmissionContext } from "vee-validate"
import { Modal } from 'flowbite';
import { toast } from '@/utils/index';
import { useAuth } from '@/store/authentication';
import { myfetch } from "@/api/myfetch";
import api from "@/api/management"
import * as yup from "yup"
import { useManagement } from '@/store/management';
import { useEmployee } from '@/store/employee';

let modal: Modal | null = null
const { classeID, action } = defineProps(['classeID', 'action'])
const Authstore = useAuth()
const store = useManagement()
const storeEmp = useEmployee()
const user = computed(() => Authstore.getCurrentUser)
const orgs = computed(() => store.getOrgs)
const positions = computed(() => storeEmp.getPositions)
const employment_types = computed(() => store.getLookups(classeID))
const showModal = ref<boolean>(false)
const { addPosition } = storeEmp
onMounted(() => {
    modal = new Modal(document.getElementById('modal-position'))
})

const initialPosition = {
    title: '',
    org_id: '',
    job_description: '',
    report_to: '',
    employment_type: '',
    status: '',
    startDate: '',
    endDate: ''
}
const PositionSchema = yup.object({
    title: yup.string().required().label("Title"),
    status: yup.string().required().label("Status"),
    org_id: yup.string().required().label("Departement"),
    endDate: yup.date().required().label("End date"),
    report_to: yup.string().nullable().label("Manager"),
    job_description: yup.string().required().label("Job description"),
    employment_type: yup.string().required().label("Employment type"),
    startDate: yup.date().required().label("Start Date"),
})



function toggle() {
    modal?.toggle()

}

function onInvalidPosition(ctx: InvalidSubmissionContext) {
    // showDrawer.value = !showDrawer.value
    console.log(ctx.errors);

}
function removeEmptyKeys(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === "") {
            delete obj[key];
        }
    }
    return obj;
}
async function submitPosition(values, { resetForm, setFieldError }: SubmissionContext) {
    try {
        const payload = {
            ...values, createdBy: user.value._id
        }
        const { error, data, response, statusCode } = await myfetch(api.getPositions).post(payload).json()
        // const { data, isFinished, error } = await useAxios(api.getLookups, { method: 'POST', data: payload }, instance)
        if (response.value?.ok) {
            toast.success("Position added successfully! ")
            resetForm()
            toggle()
            await addPosition(data.value)
        } else {
            if ('validationerror' in data.value) {
                toast.error(`Can't add new position! Correct all error field before submit`)
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


defineExpose({
    toggle
})
</script>

<style scoped></style>