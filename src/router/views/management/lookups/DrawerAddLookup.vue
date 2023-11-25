<template>
    <div id="drawerOP"
        class="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r dark:bg-gray-800 dark:border-gray-700"
        tabindex="-1">
        <div class="flex justify-between items-center py-2 px-2 border-b dark:border-gray-400">

            <div class="row w-full text-2xl font-bold"> Add Lookups </div>
            <button type="button"
                class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#drawerOP">
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
            <Form class="col justify-between w-full space-y-4 mt-4 h-full" @submit="submitLookups"
                v-slot="{ isSubmitting, values }" :validation-schema="lookupsSchema" :initial-values="initialLookupsValue"
                @invalid-submit="onInvalidLookups">
                <div
                    class=" col items-center mb-5 justify-center bg-gray-100 w-full h-12 rounded-md my-auto border text-center select-none align-middle border-cyan-300 border-dashed">
                    Classe: {{ currentClasse?._id }}
                </div>
                <Field as="select" name="classe_id" v-slot="{ field, errorMessage }" class="fl-select-small peer">
                    <option v-for="{ _id: id, name } in classesALL" :key='id' :value="id"
                        :selected="id == currentClasse?._id">
                        {{ name }}</option>

                </Field>
                <Field name="name" v-slot="{ field, errorMessage }">
                    <div class="relative">
                        <input v-bind="field" type="text" id="name" class="fl-input-small peer" placeholder=" " />
                        <label for="name" class="fl-label">Nom</label>
                        <p class="input-error">{{ errorMessage }}</p>
                    </div>
                </Field>
                <Field name="code" v-slot="{ field, errorMessage }">
                    <div class="relative">
                        <input v-bind="field" type="text" id="code" class="fl-input-small peer" placeholder=" " />
                        <label for="code" class="fl-label">Code</label>
                        <p class="input-error">{{ errorMessage }}</p>
                    </div>
                </Field>
                <Field name="description" v-slot="{ field, errorMessage }">
                    <label for="message"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea v-bind="field" id="message" rows="4" class="fl-textarea"
                        placeholder="Write your thoughts here..."></textarea>
                </Field>
                <Field as="select" name="parent_lookup_id" v-slot="{ field, errorMessage }" class="fl-select-small peer">
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>

                </Field>
                <!-- {{ values }} -->
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
</template>

<script setup lang="ts">
import api from "@/api/management"
import { myfetch } from "@/api/myfetch";
import * as yup from "yup"
import { useToast } from 'vue-toastification';
import { PlusIcon, CheckIcon, ChevronDoubleDownIcon } from "@heroicons/vue/solid";
import { CirclesToRhombusesSpinner } from "epic-spinners"
import { Field, Form, ErrorMessage, InvalidSubmissionContext, SubmissionContext } from "vee-validate"
import { ref, computed } from 'vue'
import { useManagement } from "@/store/management";
import { useAuth } from "@/store/authentication";

const auth = useAuth()
const user = computed(() => auth.getCurrentUser)
const toast = useToast()
const store = useManagement()
const classesALL = computed(() => store.getClasses())
const currentClasse = computed(() => store.currentClasse)
const lookupsSchema = yup.object({
    code: yup.string().required().label("Code"),
    name: yup.string().required().label("Name"),
    classe_id: yup.string().max(100).nullable().label("Classe ID"),
    parent_lookup_id: yup.string().nullable().label("Parent Lookup"),
    description: yup.string().required().label("Description")
})
const isOpenDrawer = ref(false)
const initialLookupsValue = {
    classe_id: null,
    parent_lookup_id: null,
    code: "code of new lookups",
    name: "New lookups",
    description: "description of new lookups"
}
const { addLookups, getAllLookups } = store
function closeDrawer(val: boolean = false) {
    isOpenDrawer.value = val
    const drawerOP = document.getElementById('drawerOP');
    window.HSOverlay.close(drawerOP)
}
function onInvalidLookups(ctx: InvalidSubmissionContext) {
    console.log(ctx.errors);
}
async function submitLookups(values, { resetForm, setFieldError }: SubmissionContext) {
    try {
        // console.log("submitLookups....");
        const payload = {
            ...values, classe_id: currentClasse.value?._id, createdBy: user.value._id
        }
        const { isFetching, error, data, response, statusCode } = await myfetch(api.getLookups).post(payload).json()
        // const { data, isFinished, error } = await useAxios(api.getLookups, { method: 'POST', data: payload }, instance)
        if (response.value?.ok) {
            toast.success("Lookups added successfully! ")
            closeDrawer
            resetForm()
            await addLookups(data.value)
        } else {
            if ('validationerror' in data.value) {
                toast.error(`Can't add new lookups! Correct all error field before submit`)
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
    closeDrawer
})
</script>

<style scoped></style>