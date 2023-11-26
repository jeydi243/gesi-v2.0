<template>
    <div>
        <MyModal v-show="showModalAddContact" @close="showModalAddContact = false">
            <template #header>
                <h1 class="text-4xl">Add Contact</h1>
            </template>
            <Form class="flex flex-col justify-between" @submit="addContact" v-slot="{ isSubmitting }"
                :validation-schema="contactSchema" :initial-values="contactValue" @invalid-submit="onInvalidContact">
                <div class="flex sm:flex-col md:flex-row md:justify-between">
                    <div class="w-full">
                        <Field name="name" placeholder="Name of contact" class="form-input mb-2 w-full"></Field>
                        <ErrorMessage name="name" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                    </div>
                </div>
                <div class="">
                    <Field name="email" placeholder="School from" class="form-input mb-2 w-full"></Field>
                    <ErrorMessage name="email" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <Field placeholder="Phone number comma separated" id="telephone" name="telephone"
                    class="w-full form-input" />
                <ErrorMessage name="telephone" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                </ErrorMessage>
                <Field name="relationship" placeholder="Describe your experience in this field of education"
                    class="form-textarea mb-4"></Field>
                <ErrorMessage name="relationship" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                </ErrorMessage>
                <!-- <span class="text-red-700 text-base">{{ error }}</span> -->

                <div class="flex flex-row h-1/2 w-full items-center justify-between mt-5">
                    <button class="btn-unstate" @click.prevent.stop="toogle">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <span class="font-bold text-white" v-if="!isSubmitting">Add</span>
                        <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
                    </button>
                </div>
            </Form>
        </MyModal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { parseISO } from "date-fns"
import { isLength } from 'validator'
import MyModal from "@/components/mymodal.vue"

const { employeeID, action } = defineProps(['employeeID', 'action'])
const showModal = ref<boolean>(false)
const contactSchema = ref({
    name(value) {
        return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 20"
    },
    telephone(value) {
        return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 20"
    },
    email(value) {
        return isEmail(value) ? true : "Un email valide est attendu"
    },
    relationship(value) {
        return isLength(value, { min: 3, max: 20 }) ? true : "Le minimum de caracteres est 3 et le maximum 20"
    },
})
const contactValue = ref({
    name: chance.last(),
    telephone: chance.phone({ country: "fr", mobile: true }),
    email: chance.email(),
    relationship: "Father",
})
function onInvalidContact({ values, results, errors }) {
  console.log("Invalid experience ", errors)
}
function toogle() {
    showModal.value = !showModal.value
}
defineExpose({
    toogle
})
</script>

<style scoped></style>