<template>
    <div>
        <MyModal v-show="showModalUpdateDoc" @close="showModalUpdateDoc = false">
            <template #header>
                <h1 class="text-4xl">Change Document</h1>
            </template>

            <Form class="flex flex-col justify-between w-full mt-2" @submit="changeDocument" v-slot="{ isSubmitting }"
                :validation-schema="docSchema" @invalid-submit="invalidFile">
                <!-- <div class="mb-3 w-96">
						<input class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
					</div> -->
                <Field v-slot="{ handleChange, handleBlur }" name="myfile" class="w-full">
                    <input type="file" @change="handleChange" accept=".pdf" @blur="handleBlur" class="w-full form-file" />
                </Field>
                <ErrorMessage name="myfile" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                </ErrorMessage>
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
import { useManagement } from "@/store/management"
import { useToast } from 'vue-toastification';

const showModalUpdateDoc = ref(false)
const store = useManagement()
const toast = useToast()
const { employeeID } = defineProps(['employeeID'])
function invalidFile({ values, result, errors }) {
    console.log("Invalid File ", errors)
}
async function changeDocument(values) {
    const formdata = new FormData()
    formdata.append("file", values["myfile"])
    try {
        const result = store.changedoc(employeeID, formdata)
        if (result) {
            toogle()
            toast.success("Changed dox successfully...")
        } else {
            toast.error("Impossible de changer le document")
        }
    } catch (err) {
        console.log(err)
    }
}
const docSchema = ref({
    myfile(value) {
        if (value instanceof File || value instanceof Blob) {
            return true
        }
        return "Vous devez choisir un fichier texte"
    },
})
function toogle() {
    showModalUpdateDoc.value = !showModalUpdateDoc.value
}


defineExpose({
    toogle
})
</script>

<style scoped></style>