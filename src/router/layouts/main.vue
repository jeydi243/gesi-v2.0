<template>
	<div class="row" v-bind="$attrs">
		<SideBar class="flex w-[15%] h-full bg-gray-900" />
		<main class="col w-[85%] h-full relative bg-gray-100 overflow-auto">
			<Header />
			<BreadCrumbs v-if="showBraedCrumbs" />
			<div class="h-[90%] w-full bg-gray-100 px-6 py-6 overflow-auto">
				<Transition name="fade" mode="out-in">
					<slot></slot>
				</Transition>
			</div>
			<Footer />
		</main>
	</div>
</template>

<script>
import router from "@/router";
import Header from "@/components/header";
import SideBar from "@/components/side";
import BreadCrumbs from "@/components/breadcrumbs";
import Footer from "@/components/footer";

export default {
	components: { SideBar, Footer, Header, BreadCrumbs },
	data() {
		return {
			isMenuCondensed: false,
			showBraedCrumbs: false,
		};
	},
	// props: { typeLayout: String },
	created: () => {
		document.body.removeAttribute("data-layout", "horizontal");
		document.body.removeAttribute("data-topbar", "dark");
		document.body.removeAttribute("data-layout-size", "boxed");
	},
	methods: {
		toggleMenu() {
			document.body.classList.toggle("sidebar-enable");

			if (window.screen.width >= 992) {
				// eslint-disable-next-line no-unused-vars
				router.afterEach((routeTo, routeFrom) => {
					document.body.classList.remove("sidebar-enable");
					document.body.classList.remove("vertical-collpsed");
				});
				document.body.classList.toggle("vertical-collpsed");
			} else {
				// eslint-disable-next-line no-unused-vars
				router.afterEach((routeTo, routeFrom) => {
					document.body.classList.remove("sidebar-enable");
				});
				document.body.classList.remove("vertical-collpsed");
			}
			this.isMenuCondensed = !this.isMenuCondensed;
		},
		toggleRightSidebar() {
			document.body.classList.toggle("right-bar-enabled");
		},
		hideRightSidebar() {
			document.body.classList.remove("right-bar-enabled");
		},
	},
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}



main {
	overflow-y: scroll;
}
</style>

