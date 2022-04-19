<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';

export default {
    name: 'TopicsList',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import CourseDetails from './CourseDetails.vue';
import Switch from '../../switch.vue';
import pagination from '../../pagination.vue'
import Modal from '../../Modals.vue';
import * as actionTypes from '../../../store/module/courses/constants/action';
import { api_url } from '../../../config/index'
import AddCourse from './AddCourse.vue';  

const route = useRoute();

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})

const total_count:any = computed(() => {
    return store.state.courses.newCurriculumBatch.length;
})

let pageIndex: any = ref(1);

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    // const request:any = `${api_url}api/course/search-courses/${pageIndex.value}/{pageSize}`;
    // console.log('url', request)
    // await store.dispatch(courseActionTypes.FetchCourses, request)
}

const totalPages:any = computed(() => {
    // (totalCount.value % 10 != 0) ? `Math.floor(${totalCount.value} / 10) + 1` : `${totalCount.value} / 10`;
    console.log(total_count.value)
    let total:any
    if (total_count.value % 10 != 0) {
        total = Math.floor(total_count.value / 10) + 1;
    } else {
        total = total_count.value / 10;
    }
    return total
})

const setId:any = (id:any) => {
    console.log('studentid', id)
    const request:any = `${api_url}api/student/${id}`;
    console.log('request forid', request)
    // store.dispatch(actionTypes.FetchEditStudent, request)
}

const toggle:any = (status:any) => {
    if (status == 0) {
        return status = 1
    } else {
        return status = 0
    }
}

const showCurriculum = ref(false);

const showEdit = ref(false);

const showDelete = ref(false);

const showDetails = ref(false);

const store = useStore();

const newCurriculumBatch:any = computed(():any => {
    return store.state.courses.newCurriculumBatch
})

onMounted( async () => {
    // store.commit('setPageTitle', 'Course List');
    console.log('uploaded topics list mounted');
	const id:any = route.params.id;
	const request:any = `${api_url}api/curriculum/get-curriculum/${id}`
	await store.dispatch(actionTypes.FetchCurriculum, request)
    // const request:any = `${api_url}api/course/search-courses/{pageIndex}/{pageSize}`;
    // await store.dispatch(courseActionTypes.FetchCourses, request)
});
</script>

<template>
    <div class="main grid">
        <!-- {{ newCurriculumBatch }} -->
        <div class="title flex justify-between items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Course List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ total_count }}</p>
        </div>
        <div class="table mb-28">
            <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                <table class="overflow-x-scroll items-center w-full">
                    <thead class="bg-table-head">
                        <tr class="justify-items-center">
                            <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                            S/N
                            </th>
                            <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                            Title
                            </th>
                            <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                            Sub Title
                            </th>
                            <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Remarks</th>
                            <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Duration</th>
                            <th class="px-3 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Error</th>
                            <th class="px-3 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody id="students" class="bg-white">
                        <tr v-for="curriculum in newCurriculumBatch" :key="curriculum.id">
                            <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                                {{ newCurriculumBatch.indexOf(curriculum) + 1 }}
                            </td>
                            <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                                {{ curriculum.title }}
                            </td>
                            <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ curriculum.subTitle }}
                            </td>
                            <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <!-- {{ curriculum.remarks }} -->
                            </td>
                            <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {{ curriculum.duration }}
                            </td>
                            <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <!-- {{ curriculum.error }} -->
                            </td>
                            <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <SvgIcons name="delete" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>



<style scoped>
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggler {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgb(227, 227, 227);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .toggler::before {
        @apply absolute w-5 h-5 -left-[4px] -bottom-[4px] bg-primary;
        content: '';
    }

    input:checked + .toggler {
        @apply bg-primary bg-opacity-[38%];
    }

    input:checked + .toggler:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    .toggler.round {
        border-radius: 34px;
    }

    .toggler.round:before {
        border-radius: 50%;
    }

    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }

</style>
