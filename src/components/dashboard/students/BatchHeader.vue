<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import AddBatch from './AddToBatch.vue';

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Batch</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold">Add Batch</p>
                <Modal>
                    <template #button>
                        <span class="bg-blue-600 p-1 flex justify-center text-white rounded-md">
                            <SvgIcons name="plus" /> <!-- plus icon -->
                        </span>
                    </template>
                    <template #content>
                        <AddBatch />
                    </template>
                </Modal>
            </button>
        </div>
        <div class="filter bg-white rounded-t-lg justify-between items-center py-5">
            <div class="filter-items text-grey grid grid-cols-4 gap-3 bg-white rounded-t-lg px-11 py-5">
                <div class="startdate">
                    <Filter>
                        <template #info>
                            Start date
                        </template>
                        <template #input>
                            <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status">
                        </template>
                    </Filter>
                </div>
                <div class="enddate">
                    <Filter>
                        <template #info>
                            End date
                        </template>
                        <template #input>
                            <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status">
                        </template>
                    </Filter>
                </div>
                <div class="status">
                    <Filter>
                        <template #info>
                            Status
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
                <div class="courses">
                    <Filter>
                        <template #info>
                            Courses
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
            </div>
            <div class="search-items flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
                <div class="status">
                    <button class="px-10 py-4 bg-gray-300 text-grey rounded-md">
                        Apply Filter
                    </button>
                </div>
                <div class="search">
                    <Search>
                        <template #input>
                            <input class="rounded text-sm p-1 focus:outline-none" type="text" placeholder="Enter title and BatchNo..">
                        </template>
                    </Search>
                </div>
            </div>
        </div>
    </div>
</template>
