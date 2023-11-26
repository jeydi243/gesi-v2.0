<template>
    <div>
        <MyModal v-show="showModalUpdateEducation" @close="showModalUpdateEducation = false">
            <template #header>
                <h1 class="text-4xl">Update Education</h1>
            </template>
            <Form class="flex flex-col justify-between" @submit="updateEducation" v-slot="{ isSubmitting }"
                :validation-schema="educationSchema" :initial-values="educationValue" @invalid-submit="onInvalidEducation">
                <div class="flex sm:flex-col md:flex-row md:justify-between">
                    <div class="w-full">
                        <Field name="name" placeholder="Position at company" class="form-input mb-2 w-full"></Field>
                        <ErrorMessage name="position" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                    </div>
                </div>
                <div class="">
                    <Field name="from_school" placeholder="Name of school" class="form-input mb-2 w-full"></Field>
                    <ErrorMessage name="from_school" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <div class="">
                    <Field name="start" type="date" placeholder="Start date" class="form-input mb-2 w-full"></Field>
                    <ErrorMessage name="start" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <div class="">
                    <Field name="end" type="date" placeholder="End date" class="form-input mb-2 w-full"></Field>
                    <ErrorMessage name="end" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <Field name="description" as="textarea" placeholder="Describe your experience in this field of education"
                    class="form-textarea mb-4"></Field>
                <ErrorMessage name="description" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                </ErrorMessage>
                <span class="text-red-700 text-base">{{ error }}</span>

                <div class="flex flex-row h-1/2 w-full items-center justify-between">
                    <button class="btn-unstate" @click.prevent.stop="toogle">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <span class="font-bold text-white" v-if="!isSubmitting">Update</span>
                        <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
                    </button>
                </div>
            </Form>
        </MyModal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { employeeID, action } = defineProps(['employeeID', 'action'])
const showModal = ref(false)
function toogle() {
    showModal.value = !showModal.value
}


defineExpose({
    toogle
})
</script>

<style scoped></style>