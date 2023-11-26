<template>
    <MyModal v-show="showModalDeleteEmployee" @close="showModalDeleteEmployee = false">
        <template #header>
            <h1 class="text-4xl">Delete employee</h1>
        </template>
        <div class="col">
            <span class="my-5 text-2xl"> Do you really want to delete this employee ? </span>
            <div class="row justify-between">
                <button class="btn-unstate" @click="toogle">Cancel</button>
                <button class="btn-danger text-red bg-red-100" @click="deleteEmployee">Delete</button>
            </div>
        </div>
    </MyModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useManagement } from "@/store/management"
const { employeeID, action } = defineProps(['employeeID', 'action'])
import { toast, goto, chance } from "@/utils/index"
const showModal = ref(false)
const store = useManagement()
function toogle() {
    showModal.value = !showModal.value
}
async function deleteEmployee() {
    goto("employees-list")
    const result = await store.deleteEmployee(employeeID)
    if (result) {
    } else {
        toast.error("Can't delete this employee")
    }
}

defineExpose({
    toogle
})
</script>

<style scoped></style>