<script lang="ts">
export default {
  name: 'SideNavigation',
}
</script>

<script setup lang="ts">
import SvgIcons from './SvgIcons.vue'
</script>

<template>
	<div class="grid min-h-screen">
		<div class="bg-primary fixed w-1/5 flex px-2 lg:px-6 py-3 logo h-[76px]">
			<img class="" src="../assets/Walure-logo-white.png" alt="walure-logo">
			<!-- <img class="xl:hidden" src="../assets/walure.png" alt="walure-logo"> -->
		</div>
		<div class="grid mt-28">
			<ul>
				<li>
					<router-link active-class="active" class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" to="/dashboard">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="menu" />  <!-- dashboard icon -->
							</div>
							<p class="text-[15px]">
								Dashboard
							</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
    .dropdown:focus-within .dropdown-menu {
    display: block !important;
    transform: translate(0) scale(1);
    visibility: visible;
    }

	.active {
		@apply text-primary;
	}
</style>