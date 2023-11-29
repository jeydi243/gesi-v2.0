<template>
    <TransitionRoot :show="isOpenDeleteDialog" as="template" enter="duration-500 ease-out" enter-from="opacity-0"
        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <Dialog @close="closeDialog" class="relative z-50">
            <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
            </TransitionChild>


            <div class="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm">
                <DialogPanel class="w-full max-w-md rounded bg-white min-w-min [250px] p-4">
                    <DialogTitle class="row justify-center font-bold text-3xl">Actions</DialogTitle>
                    <DialogDescription class="row mt-7 mb-7">Do you want to delete this org ?</DialogDescription>
                    <p>
                    <div class="row-reverse">
                        <button type="button" class="btn-danger" @click="deleteOrgs">Delete org</button>
                        <button type="button" class="btn-primary mr-4" @click="isOpenDeleteDialog = false">Cancel</button>
                    </div>
                    </p>
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup lang="ts">
import api from "@/api/management"
import * as yup from "yup"
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, DialogDescription, TransitionRoot, TransitionChild, Combobox, ComboboxOptions, ComboboxButton, ComboboxOption } from '@headlessui/vue'
import { myfetch } from "@/api/myfetch";
import { useToast } from 'vue-toastification';
import { useManagement } from "@/store/management";

const toast = useToast()
const store = useManagement()
const isOpenDeleteDialog = ref(false)
const { getAllOrgs } = store
const { orgID } = defineProps(['orgID'])
let deleteOrgID = ref('')
async function deleteOrgs() {
    try {
        const { isFetching: f, error, data, response, statusCode } = await myfetch(api.getOrgs + '/' + orgID).delete().json()
        console.log({ data: data.value });
        console.log({ statusCode: statusCode.value });
        console.log({ error: error.value });
        console.log({ response: response.value });

        if (response.value?.ok) {
            toast.success(`Orgs with ID ${orgID} deleted successfully !`)
            isOpenDeleteDialog.value = false
            await getAllOrgs()
        } else {
            toast.error(data.value.message)
        }
    } catch (error) {
        console.log(error);

    }
}
function closeDialog() {
    isOpenDeleteDialog.value = false;
}
function openDialog(orgID: string) {
    console.log('Why...DELETE', orgID);
    deleteOrgID.value = orgID
    isOpenDeleteDialog.value = true;
}

defineExpose({
    closeDialog, openDialog
})
</script>
  
<style scoped></style>