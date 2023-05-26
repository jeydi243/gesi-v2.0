<template>
  <div id="app" class="h-screen w-screen">
    <div class="row h-full w-full relative" v-bind="$attrs">
      <SideBar class="flex w-[15%] h-full bg-gray-900 relative transition-all duration-700 ease-out" v-if="isMain" />

      <main class="col h-full relative bg-gray-100 overflow-auto transition-all duration-700 ease-out" :class="{ 'w-full': !isMain, 'w-[85%]': isMain }">
        <MyHeader v-if="isMain" />
        <!-- {{ $route.path }} -->
        <BreadCrumbs v-if="showBreadCrumbs && isMain" class="transition-all duration-700 ease-out delay-500" />
        <div class="pima w-full h-full bg-gray-100 overflow-auto transition-all duration-700 ease-out delay-200" :class="{ 'px-6 py-6 h-[90%]': isMain }">
          <router-view v-slot="{ Component }">
            <Transition name="fadeSlideX" mode="out-in">
              <component :is="Component" />
            </Transition>
          </router-view>
        </div>
        <Footer v-if="isMain" />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import Footer from "@/components/footer.vue"
import SideBar from "@/components/side.vue"
import MyHeader from "@/components/myheader.vue"
// import Splitting from "splitting"
import BreadCrumbs from "@/components/breadcrumbs.vue"
import { gsap } from "gsap"
import { useConfig } from "@/store/config"
import { ref, onMounted, computed, onUpdated } from "vue"
const results = ref(null)
const store = useConfig()
const layout = computed(() => store.layout)
const isMain = computed(() => store.layout != "auth")
const sideMenus = computed(() => store.sideMenus)
let showBreadCrumbs = ref(false)

onUpdated(() => {
  animeMe()
})
onMounted(() => {
  // results.value = Splitting({
  //   target: "[data-splitting]",
  //   by: "chars",
  //   key: null,
  //   matching: "span",
  // })

  store
    .init()
    .then(() => {
      console.info("%c[STORE] Ok", "color: #0080ff; font-weight: bold;")
    })
    .catch((er: any) => {
      console.log("Impossible d'initier le store", er)
    })

  animeMe()
})
function animeMe() {
  // console.log(results.value[0].el)
  // results.value.forEach(({ el, chars }, i) => {
  // 	console.log({ el })
  // 	gsap.fromTo(el, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 2, delay: i * 0.15 })
  // 	chars.forEach((e, index) => gsap.fromTo(e, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 2, delay: index * 0.15 }))
  // })
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fadeSlideX-enter-active {
  animation: fadein 0.7s ease;
}

.fadeSlideX-leave-active {
  animation: fadeout 0.7s ease;
}

.fadeSlideY-enter-active {
  animation: fadeinY 0.7s ease;
}

.fadeSlideY-leave-active {
  animation: fadeoutY 0.7s ease;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
    z-index: 1;
  }

  to {
    opacity: 0;
    z-index: 0;
    transform: translateX(10px);
  }
}

@keyframes fadeinY {
  from {
    opacity: 0;
    z-index: 1;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    z-index: 0;
    transform: translateY(0px);
  }
}

@keyframes fadeoutY {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translateY(10px);
  }
}

.pima::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.pima::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.pima::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
.pima::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* ::-webkit-scrollbar-corner
	::-webkit-scrollbar-track-piece
	::-webkit-scrollbar-track
	::-webkit-scrollbar-thumb
	::-webkit-scrollbar-button
	::-webkit-scrollbar */
</style>
