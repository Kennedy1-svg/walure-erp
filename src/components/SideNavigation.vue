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
				<!-- <li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="user-management" /> 
								</div>
								<p class="text-left text-[15px]">
									User Management
								</p>
							</div>
							<div class="flex justify-end">
								<SvgIcons name="chevron-right" /> 
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/user-management/users">Users</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/user-management/roles">Roles (Permission)</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</li> -->
				<!-- <li>
					<a class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" href="/dashboard/#enumeration">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="enumeration" /> 
							</div>
							<p class="text-[15px]">
								Enumeration
							</p>
						</div>
					</a>
				</li> -->
				
				<li>
					<div class="dropdown">
						<button class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2 gap-3">
							<div class="flex items-center gap-4 py-4">
								<div>
									<SvgIcons name="account-management" /> <!-- user icon -->
								</div>
								<p class="text-left text-[15px]">
									Account Management
								</p>
							</div>
							<div class="flex justify-end">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/account-management/revenue">Revenue</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/account-management/expenditure">Expenditure</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/account-management/income-statement">Income Statement</router-link>
									</li>
									<li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/account-management/payroll">Payroll</router-link>
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
									<SvgIcons name="user-group" /> <!-- user icon -->
								</div>
								<p class="text-left text-[15px]">
									HR Department
								</p>
							</div>
							<div class="flex justify-end">
								<SvgIcons name="chevron-right" /> <!-- right icon -->
							</div>
						</button>
						<div class="hidden dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2">
							<div>
								<ul class="grid px-14 text-sm gap-6 pt-3">
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/employee-data">Employee Data</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/employee-birthday">Employee Birthday</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/employee-portal">Employee Portal</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/leave-management">Leave Management</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/recruitment">Recruitment</router-link>
									</li>
									<li class="hover:text-primary">
										<router-link active-class="active" to="/dashboard/human-resource/performance-management">Performance Management</router-link>
									</li>
									<!-- <li class="hover:text-primary pb-3">
										<router-link active-class="active" to="/dashboard/human-resource/payroll">Payroll</router-link>
									</li> -->
								</ul>
							</div>
						</div>
					</div>
				</li>
			
					<li>
					<router-link active-class="active" class="flex items-center justify-between hover:bg-primary-accent hover:text-primary lg:px-6 px-2" to="/dashboard/department">
						<div class="flex items-center gap-3 py-4">
							<div>
								<SvgIcons name="department" />  <!-- dashboard icon -->
							</div>
							<p class="text-[15px]">
								Department
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