<script lang="ts">
import { onMounted, ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'CategoryList',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Switch from '../../switch.vue';
import pagination from '../../pagination.vue'
import Modal from '../../Modals.vue';
import DeleteModal from '../../DeleteModal.vue';
import * as accountActionTypes from '../../../store/module/account/constants/action';
// import { useRoute } from 'vue-router'
import { account_api_url } from '../../../config/index';
import AddCategory from './AddCategory.vue';

const categories:any = computed(() => {
    return store.getters.getCategory.value.payload;
})

const total_count:any = computed(() => {
    return store.getters.getCategory.value.totalCount;
})

// const routeName:any = computed(() => {
//     return useRoute().fullPath
// })

// const useAddApi:any = computed(() => {
//     return routeName.value.includes('expenditure') ? '/api/expenditurecategory' : '/api/revenuecategory';
// })

const props:any = defineProps({
  url: String
});

const { url } = toRefs(props);

let pageIndex: any = ref(1);

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${account_api_url}${url.value}/getall_category?pageIndex=${pageIndex.value}`;
    console.log('url', request)
    await store.dispatch(accountActionTypes.FetchCategory, request)
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

const editCategory:any = async (category:any) => {
    console.log('category', category.id)
    const editingCategory:any = category;
    const request:any = `${account_api_url}${url.value}/get_category/${category}`;
    console.log('request for the', request)
    await store.dispatch(accountActionTypes.FetchEditCategory, category)
    // console.log('student', student)
    // console.log('student', student.value)
}

let categoryitemtodelete:any = ref('')

const sendId:any = (id:any) => {
    console.log('batchid', id)
    categoryitemtodelete.value = id
    console.log('categoryitemtodelete', categoryitemtodelete.value)
    return categoryitemtodelete
}

const deleteCategory:any = async (category:any) => {
    console.log('category category', category);

    const request:any = `${account_api_url}${url.value}/delete-category/${category}`;

    console.log('requestData', request)
    await store.dispatch(accountActionTypes.RemoveExpenditureCategory, request)
    closeModal()
    const fetchrequest:any = `${account_api_url}${url.value}/getall_category`;
    console.log('url', fetchrequest)
    await store.dispatch(accountActionTypes.FetchCategory, fetchrequest)
}

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const showEdit = ref(false);

const showDelete = ref(false);

const showDetails = ref(false);

const store = useStore();

onMounted( async () => {
    // store.commit('setPageTitle', 'Course List');
    console.log('ECategory List mounted', url.value);
    const request:any = `${account_api_url}${url.value}getall_category`;
    console.log('url', request)
    await store.dispatch(accountActionTypes.FetchCategory, request)
});
</script>

<template>
    <div class="main grid">
        <div class="title flex justify-end pr-3 items-center mb-10">
            <!-- <h1 class="text-2xl font-semibold text-black">Category List</h1> -->
            <!-- {{ category }} -->
            <p class="text-xl font-medium text-primary">Total : {{ total_count }}</p>
        </div>
        <div class="table">
            <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                <table class="overflow-x-scroll border items-center w-full">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-6 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle pr-4 py-3 text-xs items-center whitespace-nowrap font-medium text-gray-500 text-left">
                        Category
                        </th>
                        <th class="px-4 align-middle flex justify-end xl:pr-32 pr-14 py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                    </tr>
                    </thead>

                    <tbody id="students" class="bg-white">
                    <tr v-for="(category) in categories" :key="category.id">
                            <td class="border-t-0 pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ pageIndex == 1 ? (categories.indexOf(category) + 1) : ((pageIndex - 1) * 10) + (categories.indexOf(category) + 1) }}
                            </td>
                            <td class="border-t-0 pr-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                                {{ category.name }}
                            </td>
                            <td class="border-t-0 pl-3 flex justify-end align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                                <div class="flex w-2/5 items-center">
                                    <button
                                    type="button"
                                    @click="showEdit = !showEdit" @click.prevent="editCategory(category)"
                                    class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full py-2 text-sm text-left"
                                    >
                                        <SvgIcons name="edit" />
                                    </button>
                                    <Modal :show="showEdit" @close="showEdit = !showEdit">
                                        <AddCategory name="Edit" @close="showEdit = !showEdit"  />
                                    </Modal>

                                    <button
                                    type="button"
                                    @click="showDelete = !showDelete" @click.prevent="sendId(category.id)"
                                    class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                    >
                                        <SvgIcons name="delete" />
                                    </button>
                                    <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteCategory(categoryitemtodelete)">
                                            <template #title>
                                                Delete Category
                                            </template>
                                            <template #info>
                                                Are you sure you want to remove course category?
                                            </template>
                                            <template #delete>
                                                Yes, Delete Category
                                            </template>
                                    </DeleteModal>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex items-center pt-6 px-6 mb-40 text-xs text-gray-700 justify-between">
                    <div class="">
                        Page {{ pageIndex }} of {{ totalPages }}
                    </div>
                    <div class="">
                        <pagination
                            :totalPages=totalPages
                            @pageChanged="onPageChange"
                        />
                    </div>
                </div>
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

    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }

</style>
