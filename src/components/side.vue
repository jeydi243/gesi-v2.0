<template>
	<div class="relative left-0 top-0 flex flex-col justify-center items-center overflow-hidden text-gray-400 select-none">
		<div class="col place-items-center w-full mt-1 relative">
			<!-- <button @click="add" class="btn-primary">add</button>
			<button @click="rem" class="btn-unstate">remove</button> -->
			<!-- <div id="jog" :class="`bg-red-500 rounded-md h-8 w-10 relative z-0 transition-all duration-500 ease-in-out`"></div> -->
			<TransitionGroup name="fadeSlideY">
				<template v-for="(item, index) in sideMenus">
					<details v-if="item.children" class="flex row w-full items-start" open>
						<summary class="flex row items-start justify-start select-none w-full router-link">
							<Icon height="20" color="white" width="20" :icon="item.icon" class="mr-2" /> {{ item.text }}
						</summary>
						<template v-for="(sub, index2) in item.children">
							<div id="contentList" class="col place-items-start w-full  relative pl-[10px] bg-opacity-5">
								<router-link :to="`${item.to}${sub.to}`" class="router-link-sub relative z-1"
									:class="{ 'router-link-active': item.active }">
									<Icon :icon="sub.icon" color="white" width="20" class="mr-2" /> {{ sub.text }}
								</router-link>
							</div>
						</template>
					</details>
					<router-link v-else :to="item.to" @click="config.changeActive(item.to)"
						@hover="item.mouseHover = !item.mouseHover" :id="item.text" :ref="item.text" :data-index="index"
						:key="index" class="router-link relative z-1 flex row"
						:class="{ 'router-link-active': item.active }">
						<Icon :icon="item.icon" color="white" height="20" width="20" />
						<span class="ml-2 text-sm font-medium">{{ item.text }}</span>
					</router-link>
				</template>
			</TransitionGroup>
		</div>
	</div>
</template>

<script setup lang="ts">
import { beforeEnterList, enterList, leaveList } from "@/utils/index"
import { Icon } from '@iconify/vue'
import { useElementBounding } from "@vueuse/core"
import { computed, ref, watch } from "vue"
import { useConfig } from "@/store/config"
const config = useConfig()
const sideMenus = computed(() => config.sideMenus)
const sideActive = computed(() => config.sideActive)
const fg = ref(null)
const jh = ref(null)
const results = ref(null)

watch(sideActive, function (newval, oldval) {
	// const jog = document.getElementById("jog")
	if (newval != oldval) {
		const el = document.getElementById(newval!.text)
		const { left, top } = useElementBounding(el)
		// console.log(left.value, top.value)
		// jog.style.top = `${top.value}px`
		// jog.style.left = `${left.value}px`
		// fg.value = top.value
		// jh.value = left.value
		// jog.classList.add(`top-[${top.value}px]`)
		// jog.classList.add(`left-[${left.value}px]`)
	}
})

function rem() {
	config.rem()
}
</script>

<style lang="css" scoped>
details>summary::-webkit-details-marker {
	display: none;
}

/* details[open]>summary {
	@apply border-teal-400 border-l-2 transition-all duration-1000 translate-x-1;
} */

details[open]>#contentList {
	@apply transition-all duration-1000 translate-x-1;
}
</style>
