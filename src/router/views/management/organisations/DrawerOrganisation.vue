<template>
    <div id="drawerOrganisation"
        class="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed top-0 left-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-r dark:bg-gray-800 dark:border-gray-700"
        tabindex="-1">
        <div class="flex justify-between items-center py-2 px-2 border-b dark:border-gray-400">

            <div class="row w-full text-2xl font-bold"> Add Organisation </div>
            <button type="button"
                class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#drawerOrganisation">
                <span class="sr-only">Close modal</span>
                <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                        fill="currentColor" />
                </svg>
            </button>
        </div>
        <div class="p-4 h-full overflow-y-scroll">
            <Form class="col justify-between w-full space-y-4 mt-4 h-full" @submit="submitOrg"
                v-slot="{ isSubmitting, values }" :validation-schema="OrgSchema" :initial-values="initialOrgValue"
                @invalid-submit="onInvalidOrg">
                {{ values }}
                <Field as="select" name="organization_parent_id" v-slot="{ field, errorMessage }"
                    class="fl-select-small peer bg-gray-50">
                    <option value="" selected>Choose parent Organisation</option>
                    <option v-for="{ _id: id, name } in orgs" :key='id' :value="id"> {{ name }}</option>
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
                    <textarea v-bind="field" id="message" rows="4" class="fl-textarea"
                        placeholder="Write down a description."></textarea>
                </Field>
                <!-- {{ lookupsALL() }} -->
                <Field as="select" name="lookup_id" v-slot="{ errorMessage }" class="fl-select-small peer bg-gray-50">
                    <!-- <option value="" selected>Choose type of organization</option> -->
                    <option v-for="lookup in lookupsALL()" :value="lookup._id">{{ lookup.name }}</option>
                    <!-- <span>{{ errorMessage }}</span> -->
                </Field>
                <!-- {{ values }} -->
                <div class="footer row h-1/2 w-full justify-between ">
                    <button class="btn-unstate" @click.prevent.stop="closeDrawer()"
                        data-hs-overlay="#drawerOrganisation">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <SpringSpinner :size="4" color="#FFF" class="text-white" v-if="isSubmitting" />
                        <Icon icon="material-symbols:add" color="white" width="20" height="20" v-else></Icon>
                        <span class="font-bold text-white">New org</span>
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import api from "@/api/management"
import * as yup from "yup"
import { Icon } from "@iconify/vue";
import { toast } from '../../../../utils/index';
import { myfetch } from "@/api/myfetch";
import { useAuth } from '@/store/authentication'
import { computed } from 'vue'
import { useManagement } from '@/store/management'
import { SpringSpinner } from 'epic-spinners'
import { Field, Form, InvalidSubmissionContext, SubmissionContext } from "vee-validate"

const store = useManagement()
const Authstore = useAuth()
const { addOrg } = store
const orgs = computed(() => store.orgs)
const lookupsALL = computed(() => store.getLookups)
const user = computed(() => Authstore.getCurrentUser)
const initialOrgValue = {
    code: '',
    name: '',
    description: '',
    organization_parent_id: '',
    lookup_id: '',
}
const OrgSchema = yup.object({
    code: yup.string().required().label("Code"),
    name: yup.string().required().label("Name"),
    description: yup.string().required().label("Description"),
    organization_parent_id: yup.string().max(100).nullable().label("Parent Org ID"),
    lookup_id: yup.string().required().min(2).label("Lookup ID"),
})


async function submitOrg(values, { resetForm, setFieldError }: SubmissionContext) {
    try {
        // console.log("submitLookups....");
        const payload = {
            ...values, createdBy: user.value._id
        }
        const { error, data, response, statusCode } = await myfetch(api.getOrgs).post(payload).json()

        if (response.value?.ok) {
            toast.success("Organization added successfully! ")
            closeDrawer()
            resetForm()
            await addOrg(data.value)
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
function onInvalidOrg({ errors }: InvalidSubmissionContext) {
    console.log('Invalid: ', errors);
}
function closeDrawer() {
    const drawerOrg = document.getElementById('drawerOrganisation');
    window.HSOverlay.close(drawerOrg)
}
</script>

<style scoped></style>