<template>
    <div>
        <ListOrganisations />
        <DrawerOrganisation ref="drawerOrg" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ListOrganisations from './ListOrganisation.vue'
import DrawerOrganisation from './DrawerOrganisation.vue'

const drawerOrg = ref<InstanceType<typeof DrawerOrganisation> | null>(null)
</script>

<style scoped></style>