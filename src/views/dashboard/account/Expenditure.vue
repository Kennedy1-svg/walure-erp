<script lang="ts">
export default {
  name: 'Expenditure',
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import Expenditure from '../../../components/dashboard/account/Expenditure.vue'
import Category from '../../../components/dashboard/account/Category.vue'
// import UploadTopic from './UploadTopics.vue'
import alert from '../../../components/alerts.vue';
import SvgIcons from '../../../components/SvgIcons.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/account/constants/action'
import { api_url } from '../../../config'

const store = useStore();
const route = useRoute();

const alertState:any = computed(() => store.getters.getExpenditureAlertStatus.value)
const alertText:any = computed(() => store.getters.getExpenditureAlertText.value)

const activeTab:any = ref(0)
const tabs:any = [
	"Expenditure List",
	"Category",
]

const status:any = computed(() => {
    let answer:any
    if (alertText.value.includes('successfully')) {
        answer = true
    } else {
        answer = false
    }
    return answer
})

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
	<div class="grid pt-[50px] px-[35px] pb-[90px]">
        <alert :class="[alertState ? '' : 'hidden']"  class="fixed z-60 top-40 bg-white p-2 right-0" name="result">
            <template #icon>
                <p v-if="status" class="bg-green-accent rounded-full border p-2">
                    <SvgIcons class="text-white" name="tick" />
                </p>
                <p v-else class="">
                    <SvgIcons class="text-red" name="exclamation" />
                </p>
            </template>
            <template #info>
                <p class="text-sm">
                    {{ alertText }}
                </p>
            </template>
            <template #button></template>
        </alert>
		<div class="top flex justify-between items-center">
			<h1 class="font-semibold text-2xl">Expenditure</h1>
		</div>
		<!--actual component start-->
		<!-- {{ curriculum }} -->
		<div class="w-full relative grid justify-items-center bgwhite">
			<ul class="flex w-full justify-start items-center my-4">
				<template v-for="(tab, index) in tabs" :key="index">
					<li class="cursor-pointer py-2 xl:pr-14 pr-10 xl:pl-4 pl-2 xl:text-2xl text-gray-500"
						:class="activeTab===index ? 'text-grey font-semibold border-b-2 border-primary' : ''" @click="activeTab = index"
						v-text="tab"></li>
				</template>
			</ul>
				<hr class="w-full -mt-4 align-middle" />

			<div class="rounded-md max-h-screen text-center w-full mx-auto overflow-auto">
				<div v-show="activeTab===0">
					<Expenditure />
				</div>
				<div v-show="activeTab===1">
					<Category />
				</div>
			</div>
		</div>
		<!--actual component end-->
	</div>
</template>