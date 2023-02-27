<script lang="ts">
import { onMounted, ref, toRefs, computed } from 'vue'

export default {
    name: 'AccountCategoryHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import { account_api_url } from '../../../config'
import Filter from '../../Filter.vue';
import { useRoute } from 'vue-router'
import Modal from '../../Modal.vue';
import AddCategory from './AddCategory.vue';
import * as accountActionTypes from '../../../store/module/account/constants/action';
import { useStore } from 'vuex'

const store = useStore();

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close account modal')
  let doc:any = document.getElementById('addaccountcategory')
  doc.close()
}

const props:any = defineProps({
  url: String
});

const { url } = toRefs(props);

// const routeName:any = computed(() => {
//     return useRoute().fullPath
// })

// const useAddApi:any = computed(() => {
//     return routeName.value.includes('expenditure') ? 'api/expenditurecategory/' : 'api/revenuecategory/';
// })

let isSearching:any = ref(false)

let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
    const search:any = searchText.value.toLowerCase();
    console.log('search', search)
    const request:any = `${account_api_url}${url.value}getall-category?keyword=${search}`;
    await store.dispatch(accountActionTypes.FetchCategory, request)
}

const close:any = async () => {
    isSearching.value = false
    searchText.value = ''
    const request:any = `${account_api_url}${url.value}getall-category`;
    await store.dispatch(accountActionTypes.FetchCategory, request)
}

const newUrl:any = url.value;

onMounted(() => {
    // store.commit('setPageTitle', 'Course List');
    // const request:any = `${account_api_url}${url.value}getall-category`;
    // store.dispatch(accountActionTypes.FetchCategory, request)
    console.log('AccountCategoryHeader mounted');
});

</script>

<template>
    <div class="main pt-20 grid gap-5 pb-[90px]">
        <!-- <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Category</h1>
        </div> -->
        <div class="filter flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
            <!-- <div class="status">
                <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">Categories</span>
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status">
                    </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Active
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Disabled</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">None</p></li>
                    </template>
                </Filter>
            </div> -->
            <div class="search">
                <Search>
                    <template #input>
                        <input @keyup.esc="close" v-model="searchText" class=" w-[306px] rounded text-sm p-1 focus:outline-none" type="text" placeholder="Search">
                        <span class="w-auto flex justify-end items-center text-grey p-2">
                            <SvgIcons v-if="!isSearching" name="search" @click="filter"  />
                            <SvgIcons v-else name="o-cancel" @click="close" class="transform scale-75" />
                        </span>
                    </template>
                </Search>
            </div>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addaccountcategory').showModal()" id="btn" class="py-3 bg-primary text-white px-7 rounded">
                            Add Category
                        </div>
                    </section>

                    <dialog id="addaccountcategory" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddCategory :url="newUrl" name="Add" @close="closeModal" />
                            <!-- End of Modal Content-->
                        </div>
                    </dialog>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped>

  dialog[open] {
    position: absolute !important;
    right: -48%;
    animation: appear .25s cubic-bezier(0.0, 0.0, 0.58, 1.0);
}

  dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
  }


@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-10rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
