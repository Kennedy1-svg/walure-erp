<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'InstructorHeader',
})
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import * as courseActionTypes from '../../../store/module/courses/constants/action';

const store = useStore();

onMounted(() => {
    // store.commit('setPageTitle', 'Course List');
    console.log('InstructorHeader mounted');
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Instructors</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold">Add Instructor</p>
                <Modal>
                    <template #button>
                        <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                            <SvgIcons name="plus" /> <!-- plus icon -->
                        </span>
                    </template>
                    <template #content>
                        <AddCourse />
                    </template>
                </Modal>
            </button>
        </div>
        <div class="filter flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
            <div class="status">
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
            </div>
            <div class="search">
                <Search />
            </div>
        </div>
    </div>
</template>
