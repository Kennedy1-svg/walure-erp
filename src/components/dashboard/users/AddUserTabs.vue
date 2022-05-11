<script lang="ts">
export default {
  name: 'AddUserTabs',
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import AddUser from './AddUser.vue'
import SvgIcons from '../../SvgIcons.vue';
import UploadUser from './UploadUser.vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/users/constants/action'
import * as mutationTypes from '../../../store/module/users/constants/mutation'
import { api_url } from '../../../config'

const store = useStore();
const route = useRoute();

const activeTab:any = ref(0)
const tabs:any = [
	"Single User",
	"Bulk Users",
]

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    store.commit(mutationTypes.SetNewUser, {})
    emits('close')
    // formEl.reset()
}

// const curriculum:any = computed(():any => {
// 	return store.getters.getCurriculum.value.payload
// })

// onMounted( async() => {
// 	const id:any = route.params.id;
// 	const request:any = `${api_url}api/curriculum/get-curriculum/${id}`
// 	await store.dispatch(actionTypes.FetchCurriculum, request)
// })

</script>

<template>
<div class="flex justify-center">
	<!--actual component start-->
	<!-- {{ curriculum }} -->
	<div class="w-full relative grid bg-white">
        <div class="flex justify-between px-10 py-[53px] items-center ">
            <p class="text-2xl">Add User</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
		<ul class="flex justify-start items-center my-4">
			<template v-for="(tab, index) in tabs" :key="index">
				<li class="cursor-pointer py-2 xl:px-24 px-20 xl:text-2xl text-gray-500"
					:class="activeTab===index ? 'text-grey border-b-2 border-primary' : ''" @click="activeTab = index"
					v-text="tab"></li>
			</template>
		</ul>
			<hr class="w-[37%] xl:w-[48%] -mt-4 align-middle" />

		<div class="bg-white rounded-md px-6 max-h-screen py-10 pr-12 text-center w-full mx-auto overflow-auto">
			<div v-show="activeTab===0">
				<AddUser />
			</div>
			<div v-show="activeTab===1">
				<UploadUser />
			</div>
		</div>

		<!-- <ul class="flex justify-center w-full items-center my-4">
			<template v-for="(tab, index) in tabs" :key="index">
				<li class="cursor-pointer py-3 px-4 rounded transition"
					:class="activeTab===index ? 'bg-green-500 text-white' : ' text-gray-500'" @click="activeTab = index"
					v-text="tab"></li>
			</template>
		</ul> -->
		
		<!-- <div class="flex gap-4 justify-center border-t p-4">
			<button
				class="py-2 px-4 border rounded-md border-blue-600 text-blue-600 cursor-pointer uppercase text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow"
				@click="activeTab--" v-show="activeTab>0"
				>Back</button>
			<button
				class="py-2 px-4 border rounded-md border-blue-600 text-blue-600 cursor-pointer uppercase text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow"
				@click="activeTab++" v-show="activeTab<tabs.length-1"
				>Next</button>
		</div> -->
	</div>
	<!--actual component end-->
</div>
</template>