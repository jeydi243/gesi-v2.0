<template>
    <TransitionRoot :show="openAddClasseDialog" as="template" enter="duration-500 ease-out" enter-from="opacity-0"
        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <Dialog @close="setisOpenAddDialog" class="relative z-50">
            <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
            </TransitionChild>


            <div class="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm">
                <DialogPanel class="w-full max-w-md rounded bg-white min-w-min [250px] p-4">
                    <DialogTitle class="row justify-center font-bold text-3xl">Add Classe</DialogTitle>
                    <!-- <DialogDescription>Complete your order</DialogDescription> -->
                    <p>

                    <Form v-slot="{ isSubmitting, values, resetForm }" @submit="submitClasse"
                        :validation-schema="classeSchema" :initial-values="initialClasseValues"
                        @invalid-submit="onInvalidClasse">
                        <fieldset class="border-2 border-green-50 rounded-lg px-2 py-4">
                            <!-- <legend class="italic text-green-500 pr-3">Informations</legend> -->
                            <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input"
                                :validate-on-change="true" />
                            <ErrorMessage name="name" v-slot="{ message }">
                                <p class="input-error">{{ message }}</p>
                            </ErrorMessage>
                            <Field type="text" placeholder="Code" id="code" name="code" class="w-full form-input" />
                            <ErrorMessage name="code" v-slot="{ message }">
                                <p class="input-error">{{ message }}</p>
                            </ErrorMessage>

                            <Field type="description" placeholder="Description" id="description" name="description"
                                class="w-full form-input" />
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
                            <button class="btn-danger" @click.prevent="resetForm(); setisOpenAddDialog(false)"
                                :disabled="isSubmitting">Cancel</button>
                        </div>
                    </Form>
                    </p>
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { myfetch } from "@/api/myfetch";
import * as yup from "yup"
import { useToast } from 'vue-toastification';
import { isLength, isDate, isEmail } from "validator"
import { PlusIcon, CheckIcon, ChevronDoubleDownIcon } from "@heroicons/vue/solid";
import { Dialog, DialogPanel, DialogTitle, DialogDescription, TransitionRoot, TransitionChild, Combobox, ComboboxOptions, ComboboxButton, ComboboxOption } from '@headlessui/vue'
import { CirclesToRhombusesSpinner } from "epic-spinners"
import { Field, Form, ErrorMessage, InvalidSubmissionContext } from "vee-validate"

const openAddClasseDialog = ref(false)
const toast = useToast()
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
const initialClasseValues = {
    name: '',
    code: '',
    description: chance.sentence({ words: 30 }),
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