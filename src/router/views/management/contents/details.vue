<template>
  <div class="">
    Details d'un Content <br />
    {{ route.params.id }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {onMounted} from "vue"

const showButton = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const route = useRoute()


// onMounted(() => {
//     showButton!.addEventListener('click', () => {
//         favDialog!.showModal();
//     });
// })
</script>

<style lang="css" scoped>
#favDialog::backdrop {
    background-color: rgb(161, 17, 17);
    z-index: 500;
}
</style>
