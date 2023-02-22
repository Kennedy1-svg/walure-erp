<script lang="ts">
export default {
  name: 'ExpenditureList',
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import ExpenditureHeader from './ExpenditureHeader.vue'
import ExpenditureList from './ExpenditureList.vue'
// import ProjectHeader from '../services/ProjectHeader.vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/courses/constants/action'
import { api_url } from '../../../config'

const store = useStore();
const route = useRoute();

const activeTab:any = ref(0)
const tabs:any = [
	"Add Topics",
	"Upload Topics",
]

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
<div class="grid w-full ustify-center">
	<ExpenditureHeader />
	<ExpenditureList />
	<!--actual component start-->
	<!-- {{ curriculum }} -->
	<!--actual component end-->
</div>
</template>