<template>
    <MyModal v-show="showModal" @close="showModal = false">
        <template #header>
            <h1 class="text-4xl">Delete position</h1>
        </template>
        <div class="col">
            <span class="my-5 text-2xl"> Do you really want to delete this position and it related relationship ? </span>
            <div class="row justify-between">
                <button class="btn-unstate" @click="toggle">Cancel</button>
                <button class="btn-danger text-red bg-red-100" @click="deletePosition">Delete</button>
            </div>
        </div>
    </MyModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast, goto, chance } from "@/utils/index"
import MyModal from "@/components/mymodal.vue"
import { useEmployee } from '@/store/employee';


const showModal = ref(false)
const { positionID } = defineProps(['positionID', 'action'])
const store = useEmployee()


function toggle() {
    showModal.value = !showModal.value
    console.log('showModal: ', showModal.value);

}
async function deletePosition() {
    const result = await store.deletePosition(positionID)
    if (result) {
        toggle()
    } else {
        toast.error("Can't delete this position")
    }
}

defineExpose({
    toggle
})
</script>

<style scoped></style>