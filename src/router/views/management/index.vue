<template>
  <div>
    <!-- <div class="flex border-b border-gray-200 mb-2 select-none">
      <TransitionGroup :css="false" @before-enter="beforeEnterList" @enter="enterList" @leave="leaveList" mode="out-in">
        <a v-for="({ current, name }, indexTab) in tabsGestion" :key="indexTab" :data-index="indexTab" class="btn-tab first-letter:uppercase" :class="{ 'btn-tab-active': current }" @click="changeTab(indexTab)">{{ name }}</a>
      </TransitionGroup>
    </div> -->
    <div class="contentTab h-full w-full">
      <!-- <router-view v-slot="{ Component, route }">
        <Transition name="fadeSlideX" mode="out-in">
          <div :key="route.hash">
            <component :is="Component" />
          </div>
        </Transition>
      </router-view> -->
      <router-view v-slot="{ Component }">
            <Transition name="fadeSlideX" mode="out-in">
              <component :is="Component" />
            </Transition>
          </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { beforeEnterList, enterList, leaveList } from "@/utils/index"
import { useRouter } from "vue-router"
const router = useRouter()
const currentTab = computed(() => tabsGestion.value.find((tab) => tab.current)!.name.toLowerCase())
const tabsGestion = ref([
  { name: "contents", current: true },
  { name: "filieres", current: false },
  { name: "documents", current: false },
  { name: "employees", current: false },
  { name: "academique", current: false },
])
onMounted(() => {
  // if (currentTab.value == "employees" || currentTab.value == "contents") {
  //router.push(`${currentTab.value}-index`)
  // } else {
  // 	goto(`${currentTab.value}-index`)
  // }
})

watch(currentTab, function (newval, oldval) {
  // if (newval != oldval && newval != "employees") {
  //router.push(`${newval}-index`)
  // } else if (newval == oldval && ["employees", "contents"].includes(newval)) {
  // 	goto(`${newval}-list`)
  // } else {
  // 	goto(`${newval}-list`)
  // }
})

function changeTab(indexTab) {
  var currentTrue = tabsGestion.value.findIndex((tab) => tab.current == true)
  tabsGestion.value[currentTrue].current = false
  tabsGestion.value[indexTab].current = true
}
</script>
