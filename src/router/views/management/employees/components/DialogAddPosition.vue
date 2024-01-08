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
                        v-slot="{ isSubmitting }" :validation-schema="PositionSchema" :initial-values="initialPosition"
                        @invalid-submit="onInvalidPosition">

                        <div class="flex justify-end">
                            <button type="button" class="btn-primary">Add</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
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

const Authstore = useAuth()
const store = useManagement()
const user = computed(() => Authstore.getCurrentUser)
let modal: Modal | null = null
const { employeeID, action } = defineProps(['employeeID', 'action'])
const showModal = ref<boolean>(false)
const { addPosition } = store
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
    report_to: yup.string().required().label("Manager"),
    job_description: yup.string().required().label("Job description"),
    employment_type: yup.string().required().label("Employment type"),
    startDate: yup.date().required().label("Start Date"),
})


function onInvalidContact({ values, results, errors }) {
    console.log("Invalid experience ", errors)
}
function toggle() {
    modal?.toggle()
    showModal.value = !showModal.value
}

function onInvalidPosition(ctx: InvalidSubmissionContext) {
    // showDrawer.value = !showDrawer.value
}
async function submitPosition(values, { resetForm, setFieldError }: SubmissionContext) {
    try {
        const payload = {
            ...values, createdBy: user.value._id
        }
        const { error, data, response, statusCode } = await myfetch(api.getPositions).post(payload).json()
        // const { data, isFinished, error } = await useAxios(api.getLookups, { method: 'POST', data: payload }, instance)
        if (response.value?.ok) {
            toast.success("Organization added successfully! ")
            resetForm()
            await addPosition(data.value)
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


defineExpose({
    toggle
})
</script>

<style scoped></style>