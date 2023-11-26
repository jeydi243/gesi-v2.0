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
const showModal = ref(false)
import { parseISO } from "date-fns"
import MyModal from "@/components/mymodal.vue"

const { employeeID, action } = defineProps(['employeeID', 'action'])
const educationSchema = ref({
    end(value) {
        return isDate(parseISO(value)) ? true : "End date must be provided"
    },
    name(value) {
        return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
    },
    start(value) {
        return isDate(parseISO(value)) ? true : "Start date must be provided"
    },
    from_school(value) {
        return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
    },
    description(value) {
        return isLength(value, { min: 3, max: 200 }) ? true : "Le minimum de caracteres est 2 et le maximum 200"
    },
})
const educationValue = ref({
    from_school: "Catalyst",
    name: "Master of science",
    start: "2018-05-05",
    end: "2020-02-02",
    description: "La description des cours",
})
function onInvalidEducation({ values, results, errors }: InvalidSubmissionContext) {
    console.log("Invalid education", errors)
}
function toggle(payload?: any) {
    educationValue.value = payload
    showModal.value = !showModal.value
}
async function addEducation(values) {
    const result = await store.addEducation(route.params.id, values)
    if (result) {
        closeModal()
        toast(`Added ${values.name} to education`)
    } else {
        toast.error("Impossible d'ajouter une education a cette employee")
    }
}
async function updateEducation(updatedEducation) {
    try {
        const result = await store.updateEducation(route.params.id, educationValue.value.id, updatedEducation)
        if (result) {
            closeModal()
            toast.success(`Update education with id ${educationValue.value.id}`)
        } else {
            toast.error("Can't update education for this employee")
        }
    } catch (error: any) {
        console.log(error)
    }
}

defineExpose({
    toggle
})
</script>

<style scoped></style>