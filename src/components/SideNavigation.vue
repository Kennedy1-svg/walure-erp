<script setup lang="ts">
import SvgIcons from './SvgIcons.vue'
</script>

<template>
<div class="grid border-r">
	<div class="bg-primary flex px-2 lg:px-6 py-3 logo h-[76px]">
		<img src="../assets/Walure-logo-white.png" class="h1/5" alt="walure-logo">
	</div>
	<div class="grid">
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="menu" />  <!-- dashboard icon -->
				</div>
				<p class="text-[15px]">
					Dashboard
				</p>
			</div>
		</a>
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/courses-management">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="course-management" /> <!-- course icon -->
				</div>
				<p class="text-[15px]">
					Course Management
				</p>
			</div>
			<div>
				<SvgIcons name="chevron-right" /> <!-- right icon -->
			</div>
		</a>
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/student-management">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="education" /> <!-- student icon -->
				</div>
				<p class="text-[15px]">
					Student Management
				</p>
			</div>
			<div>
				<SvgIcons name="chevron-right" /> <!-- right icon -->
			</div>
		</a>
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/talent-management">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="talent-management" /> <!-- talent icon -->
				</div>
				<p class="text-[15px]">
					Talent Management
				</p>
			</div>
			<div>
				<SvgIcons name="chevron-right" /> <!-- right icon -->
			</div>
		</a>
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/service-management">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="service-management" /> <!-- service icon -->
				</div>
				<p class="text-[15px]">
					Service Management
				</p>
			</div>
			<div>
				<SvgIcons name="chevron-right" /> <!-- right icon -->
			</div>
		</a>
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/user-management">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="user-management" /> <!-- user icon -->
				</div>
				<p class="text-[15px]">
					User Management
				</p>
			</div>
			<div>
				<SvgIcons name="chevron-right" /> <!-- right icon -->
			</div>
		</a>
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/enumeration">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="enumeration" /> <!-- enumeration icon -->
				</div>
				<p class="text-[15px]">
					Enumeration
				</p>
			</div>
		</a>
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/contact">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="contact" /> <!-- contact icon -->
				</div>
				<p class="text-[15px]">
					Contact Us
				</p>
			</div>
		</a>
		<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/ipos">
			<div class="flex items-center gap-4 py-4">
				<div>
					<SvgIcons name="ipos" /> <!-- ipos icon -->
				</div>
				<p class="text-[15px]">
					Ipos
				</p>
			</div>
			<div>
				<SvgIcons name="chevron-right" /> <!-- right icon -->
			</div>
		</a>
	</div>
</div>
</template>
