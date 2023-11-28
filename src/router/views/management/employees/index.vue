<template>
	<div>
		<UseOnline v-slot="{ isOnline }">
			<transition @leave="onLeaveTop" @before-enter="onBeforeEnter" @enter="onEnter">
				<div v-if="!isOnline" class="bg-red-500 text-white row text-center items-center"
					:class="{ 'bg-blue-600': isOnline }">
					<span class="ml-3 row items-center"> <box-icon type="regular" name="no-signal" color="white" size="sm"
							class="text-white"></box-icon> It's seems like your are offline. Try later </span>
				</div>
			</transition>
			<div class="row mb-5">
				<template v-for="(tab, indexTab) in tabsEmp" :key="indexTab">
					<a class="btn-tab2 align-middle items-center row" :class="{ 'btn-tab-active2': tab.current }"
						@click="changeTab(indexTab)">
						{{ filters.firstUpper(tab.name) }}
						<box-icon v-if="indexTab != 0" name="lock-alt" type="regular"
							:color="!tab.current ? 'gray' : 'blue'" size="sm" class="self-center text-center"></box-icon>
					</a>
				</template>
			</div>
			<router-view v-slot="{ Component, route }">
				<Transition name="fadeSlideX" mode="out-in">
					<div :key="route.name">


						<component :is="Component" />
					</div>
				</Transition>
			</router-view>
		</UseOnline>
	</div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useManagement } from "@/store/management"
import { UseOnline } from "@vueuse/components"
import { onLeaveTop, onEnter, onBeforeEnter, goto } from "@/utils/index"

const store = useManagement()
const currentTab = computed(() => tabsEmp.value.find((tab) => tab.current).name.toLowerCase())
const tabsEmp = ref([
	{ name: "Index", current: true, route: 'employees-index' },
	{ name: "Positions", current: false, route: 'fonctions-employees' },
	{ name: "Staff assignments", current: false, route: 'affectations-employees' },
])
function changeTab(index) {
	const currentTrue = tabsEmp.value.findIndex((tab) => tab.current == true)
	tabsEmp.value[currentTrue].current = false
	tabsEmp.value[index].current = true
	goto(tabsEmp.value[index].route)
}
async function refresh() {
	await store.getAllEmployees()
}
</script>

<style scoped></style>
