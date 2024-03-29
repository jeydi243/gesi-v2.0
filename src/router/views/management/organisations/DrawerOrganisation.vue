<template>
    <div id="drawerOrganisation"
        class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
        tabindex="-1">
        <div class="flex justify-between items-center py-2 px-2 border-b dark:border-gray-400">

            <div class="row w-full text-2xl font-bold">Organisation </div>
            <button type="button"
                class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                @click.prevent.stop="close">
                <span class="sr-only">Close modal</span>
                <Icon icon="solar:close-square-bold" />
            </button>
        </div>
        <div class="p-4 h-full overflow-y-scroll">
            <Form class="col justify-between w-full space-y-4 mt-4 h-full" @submit="submitOrg" v-slot="{ isSubmitting }"
                :validation-schema="OrgSchema" :initial-values="initialOrgValue" @invalid-submit="onInvalidOrg">

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
                    <button class="btn-unstate" @click.prevent.stop="close">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <SpringSpinner :size="4" color="#FFF" class="text-white" v-if="isSubmitting" />
                        <Icon icon="material-symbols:add" color="white" width="20" height="20" v-else></Icon>
                        <span class="font-bold text-white">Create</span>
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
import { computed, onMounted } from 'vue'
import { useManagement } from '@/store/management'
import { SpringSpinner } from 'epic-spinners'
import { Field, Form, InvalidSubmissionContext, SubmissionContext } from "vee-validate"
import { Drawer } from 'flowbite';

let drawer: Drawer | null = null
const store = useManagement()
const Authstore = useAuth()
const user = computed(() => Authstore.getCurrentUser)
const { addOrg } = store
const orgs = computed(() => store.getOrgs)
const lookupsALL = computed(() => store.getLookups)
let initialOrgValue: IOrganization = {
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

// onMounted(() => {
//     drawer = new Drawer(document.getElementById('drawerOrganisation'), {
//         backdrop: true, placement: "right", edge: false,
//         edgeOffset: '',
//     })
//     drawer.hide()
// })
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
function close() {
    drawer = new Drawer(document.getElementById('drawerOrganisation'), {
        backdrop: true, placement: "right"
    })
    drawer?.hide()
    console.log('Close drawer please... ', drawer);
}
function toggle() {
    drawer = new Drawer(document.getElementById('drawerOrganisation'), {
        backdrop: true, placement: "right"
    })
    drawer?.toggle()
}
function edit(payload: IOrganization) {
    toggle()
    console.log('You send ', payload);
    initialOrgValue = payload

}
defineExpose({
    toggle, edit
})
</script>

<style scoped></style>