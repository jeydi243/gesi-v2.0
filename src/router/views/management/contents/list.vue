<template>
  <div>
    <div class="row w-full justify-end mb-2">
      <button @click="goto('contents-add')" class="btn-primary"><box-icon name="plus" color="white"></box-icon>Add Content</button>
    </div>
    <div class="justify-start items-start flex-wrap row space-x-2 space-y-4">
      {{ contents[0] }}

      <dialog class="dialog" id="dialog">Le contenu du dialog</dialog>
      <button onclick="modal.showModal()">Open Dialog</button>
      <!-- <TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave"> -->
      <div class="grid grid-cols-4 gap-2 justify-center items-center">
        <article v-for="(content, index) in contents" :key="index" class="overflow-hidden rounded-lg bg-white border border-gray-100 shadow-sm">
          <img alt="Office" :src="`http://localhost:9000/resources/file/63ca5b2fc06b465a191c4f9d`" class="h-[50px] w-full object-cover" />

          <div class="p-2 sm:p-3">
            <a href="#">
              <h3 class="text-lg font-medium text-gray-900">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </a>

            <p class="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque dignissimos.
              Molestias explicabo corporis voluptatem?
            </p>

            <a href="#" @click="goto('contents-details',21151 /*content.id*/)" class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
              Find out more
              <span aria-hidden="true" class="block transition group-hover:translate-x-0.5"> &rarr; </span>
            </a>
            <router-link :to="{ name: 'teachers-details' }" tag="div">
              <p class="ml-2 text-sm text-black">By {{ chance.name() }}</p>
            </router-link>
          </div>
          <footer class="flex items-center justify-start leading-none bottom-0 left-0 p-2 h-[20%] w-full">
            <img @click="goto('teachers-details', content!.authors![0])" class="block avatar rounded-full" :src="`https://mdbcdn.b-cdn.net/img/new/avatars/${rand(20)}.webp`" />
            <router-link :to="{ name: 'teachers-details' }" class="flex cursor-pointer items-center no-underline hover:underline text-black">
              <p class="ml-2 text-sm text-black">By {{ chance.name() }}</p>
            </router-link>

            <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
              <span class="ml-2">{{ chance.name() }}</span>
              <i class="fa fa-heart"></i>
            </a>
          </footer>
        </article>

        <!-- <article v-for="(item, index) in 10" :key="index" :data-index="index" class="content-card">
						<section class="bg-yellow-50 h-[25%] w-full relative top-0 left-0">
							<button class="absolute top-2 right-3 z-4 rounded-full w-10 h-10 items-center" type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
								<box-icon name="dots-vertical-rounded" size="sm" color="white"></box-icon>
							</button>
							<UseImage :src="`@/assets/img/contents/${index + 1}.jpg`" height="50px" width="100px" class="w-full h-[50px] object-cover">
								<template #loading>
									<div class="w-full h-full">
										<box-icon name="error-alt"></box-icon>
									</div>
								</template>

								<template #error>
									<div class="w-full h-full">Error</div>
								</template>
							</UseImage>
							<div class="w-full m-1 h-8 backdrop-blur-sm bg-white/30 z-4 absolute bottom-0 left-0 rounded-md"></div>
						</section>

						<header class="flex items-center justify-between relative top-16 left-0 p-2 h-[50%] w-full">
							<h1 class="text-lg row items-center">
								<span class="no-underline text-sm hover:cursor-pointer text-blue-700 italic">{{ rand(20) }} Leçons</span>
							</h1>
							<p class="text-grey-darker text-sm">{{ chance.date({ string: true }) }}</p>
						</header>
						<section class="flex items-center justify-between top-20 left-0 p-2 h-[30%] w-full text-base">
							{{ chance.sentence() }}
						</section>
						<footer class="flex items-center justify-start leading-none bottom-0 left-0 p-2 h-[20%] w-full mt-2">
							<img class="block avatar rounded-full" :src="`https://mdbcdn.b-cdn.net/img/new/avatars/${rand(20)}.webp`" />
							<router-link :to="{ name: 'teachers-details' }" class="flex cursor-pointer items-center no-underline hover:underline text-black">
								<p class="ml-2 text-sm text-black">By {{ chance.name() }}</p>
							</router-link>

							<a class="no-underline text-grey-darker hover:text-red-dark" href="#">
								<span class="hidden">Like</span>
								<i class="fa fa-heart"></i>
							</a>
						</footer>
					</article> -->
      </div>
      <!-- </TransitionGroup> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { UseImage } from "@vueuse/components"
import { computed } from "vue"
import { useContents } from "@/store/contents";
import { useTeachers } from "@/store/teachers";
import { onBeforeEnter, onEnter, onLeave, goto, chance } from "@/utils/index"
import api_resources from "@/api/resources"
const store = useContents()
const contents = computed(() => store.contents)
function rand(max: number) {
	return Math.floor(Math.random() * max)
}
</script>

<style lang="scss" scoped></style>
