<script setup lang="ts">
import SvgIcons from './SvgIcons.vue'
</script>

<template>
	<div class="grid min-h-screen">
		<div class="bg-primary fixed w-1/5 flex px-2 lg:px-6 py-3 logo h-[76px]">
			<img src="../assets/Walure-logo-white.png" alt="walure-logo">
		</div>
		<div class="grid mt-28">
			<ul>
				<li>
					<router-link class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" to="/dashboard">
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
				<li>					   
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="course-management" /> <!-- course icon -->
								</div>
								<p class="text-[15px]">
									Course Management
								</p>
							</div>
							<div class="">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>
						</button>        
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li>
										<router-link to="/dashboard/course-management/course-category">Course Category</router-link>
									</li>
									<li>
										<router-link to="/dashboard/course-management/courses">Courses</router-link>
									</li>
									<li class="pb-3">
										<router-link to="/dashboard/course-management/course-applicant">Course Applicant</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>					   
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2">
							<div class="flex items-center gap-3 py-4">
								<div>
									<SvgIcons name="education" /> <!-- student icon -->
								</div>
								<p class="text-[15px]">
									Student Management
								</p>
							</div>
							<div>
								<SvgIcons class="ml-2" name="chevron-right" /> <!-- right icon -->
							</div>
						</button>        
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="text-primary"><router-link to="/dashboard/student-management">Student</router-link></li>
									<li class="pb-3"><router-link to="/dashboard/batch">Batch</router-link></li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>					   
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="talent-management" /> <!-- talent icon -->
								</div>
								<p class="text-[15px]">
									Talent Management
								</p>
							</div>
							<div class="">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>
						</button>        
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li>
										<router-link to="/dashboard/talent-management/instructors">Instructors</router-link>
									</li>
									<li class="pb-3">
										<router-link to="/dashboard/batch">Talent Pool</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="service-management" /> <!-- service icon -->
								</div>
								<p class="text-[15px]">
									Service Management
								</p>
							</div>
							<div class="">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>
						</button>        
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li>
										<router-link to="/dashboard/talent-management/instructors">Project</router-link>
									</li>
									<li>
										<router-link to="/dashboard/talent-management/instructors">Outsourcing</router-link>
									</li>
									<li class="pb-3">
										<router-link to="/dashboard/batch">Consultancy</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="user-management" /> <!-- user icon -->
								</div>
								<p class="text-[15px]">
									User Management
								</p>
							</div>
							<div class="">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>
						</button>        
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li>
										<router-link to="/dashboard/talent-management/instructors">Users</router-link>
									</li>
									<li class="pb-3">
										<router-link to="/dashboard/batch">Roles (Permission)</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li>
				<li>
					<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/enumeration">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="enumeration" /> <!-- enumeration icon -->
							</div>
							<p class="text-[15px]">
								Enumeration
							</p>
						</div>
					</a>
				</li>
				<li>
					<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/contact-us">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="contact" /> <!-- contact icon -->
							</div>
							<p class="text-[15px]">
								Contact Us
							</p>
						</div>
					</a>
				</li>
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="ipos" /> <!-- ipos icon -->
								</div>
								<p class="text-[15px]">
									Ipos
								</p>
							</div>
							<div class="">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>
						</button>        
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li>
										<router-link to="/dashboard/talent-management/instructors">Contact Us</router-link>
									</li>
									<li>
										<router-link to="/dashboard/talent-management/instructors">Demo Requests</router-link>
									</li>
									<li class="pb-3">
										<router-link to="/dashboard/batch">Quote Requests</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
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
</style>