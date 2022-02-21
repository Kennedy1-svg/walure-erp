<script setup lang="ts">
import SvgIcons from '../components/SvgIcons.vue';
</script>

<template>
<div class="flex bg-white shadow-md py-2 justify-end items-center px-16">
	<div class="border text-grey flex justify-around gap-8 items-center rounded px-3 py-2">
		<div class="icon border rounded-full ">
			<SvgIcons class="m-2" name="user-avatar" /> <!-- avatar icon -->
		</div>
		<div class="text-black">
			<p class="text-sm">Admin</p>
			<p class="text-xs">Walure Capital</p>
		</div>
		<div class="icon">
			<SvgIcons name="chevron-down" /> <!-- chevron down icon -->
		</div>
	</div>
</div>
</template>
