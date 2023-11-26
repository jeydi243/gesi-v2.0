<template>
    <div>
        <MyModal v-show="showModal" @close="toggle">
            <template #header>
                <h1 class="text-4xl">Add Experience</h1>
            </template>
            <Form class="flex flex-col justify-between" @submit="addExperience" v-slot="{ isSubmitting }"
                :validation-schema="experienceSchema" :initial-values="experienceValue"
                @invalid-submit="onInvalidExperience">
                <div class="flex sm:flex-col md:flex-row md:justify-between">
                    <div class="w-full">
                        <Field name="position" placeholder="Position at company" class="form-input mb-2 w-full"></Field>
                        <ErrorMessage name="position" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                    </div>
                </div>
                <div class="">
                    <Field name="company" placeholder="Name of company" class="form-input mb-2 w-full"></Field>
                    <ErrorMessage name="company" v-slot="{ message }">
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
                <!-- <span class="text-red-700 text-base">{{ error }}</span> -->

                <div class="flex flex-row h-1/2 w-full items-center justify-between">
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
import MyModal from "@/components/mymodal.vue"
const { employeeID, action } = defineProps(['employeeID', 'action'])
const showModal = ref(false)
import { parseISO } from "date-fns"

const experienceSchema = ref({
    position(value) {
        return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
    },
    start(value) {
        return isDate(parseISO(value)) ? true : "Start date must be provided"
    },
    end(value) {
        return isDate(parseISO(value)) ? true : "End date must be provided"
    },
    company(value) {
        return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
    },
    description(value) {
        return isLength(value, { min: 3, max: 200 }) ? true : "Le minimum de caracteres est 2 et le maximum 200"
    },
})
const experienceValue = ref({
    company: "Google",
    position: "Frontend developer",
    start: "2018-05-05",
    end: "2020-02-02",
    description: "La description de ton experience",
})
function onInvalidExperience({ values, result, errors }) {
    console.log("Invalid experience", errors)
}
function toogle() {
    showModal.value = !showModal.value
}
async function addExperience(values) {
    const result = await store.addExperience(route.params.id, values)
    if (result) {
        closeModal()
        toast(`Added ${values.name} to experience ${result}`)
    } else {
        toast.error("Impossible d'ajouter une experience a cette employee", result)
    }
}
async function launchUpdateExperience(experienceID) {
  const ud = userData.value["experiences"].find((exp) => exp.id == experienceID)
  experienceValue.value = ud
  showModalUpdateExper.value = true
}
async function updateExperience(updatedExperience) {
    try {
        const result = await store.updateExperience(route.params.id, experienceValue.value.id, updatedExperience)
        if (result) {
            closeModal()
            toast.success(`Update Experience with id ${experienceValue.value.id}`)
        } else {
            toast.error("Can't update experience for this employee")
        }
    } catch (error: any) {
        console.log(error)
    }
}
defineExpose({
    toogle
})
</script>

<style scoped></style>