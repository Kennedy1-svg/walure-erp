<script lang="ts">
export default {
  name: 'Category',
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import CategoryHeader from './CategoryHeader.vue'
import CategoryList from './CategoryList.vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/courses/constants/action'
import { api_url } from '../../../config'

const store = useStore();
const route = useRoute();

const routeName:any = computed(() => {
    return useRoute().fullPath
})

const useAddApi:any = computed(() => {
    return routeName.value.includes('expenditure') ? 'api/expenditurecategory/' : 'api/revenuecategory/';
})

// const activeTab:any = ref(0)
// const tabs:any = [
// 	"Add Topics",
// 	"Upload Topics",
// ]

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
<div class="grid w-full">
	<!-- {{ useAddApi }} -->
	<CategoryHeader :url="useAddApi" />
	<CategoryList :url="useAddApi" />
	<!--actual component start-->
	<!-- {{ curriculum }} -->
	<!--actual component end-->
</div>
</template>