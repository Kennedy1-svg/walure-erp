<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import AddStudent from './AddStudents.vue';

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Students</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold">Add Student</p>
                <Modal>
                    <template #button>
                        <span class="bg-blue-600 p-1 flex justify-center text-white rounded-md">
                            <SvgIcons name="plus" /> <!-- plus icon -->
                        </span>
                    </template>
                    <template #content>
                        <AddStudent />
                    </template>
                </Modal>
            </button>
        </div>
        <div class="filter flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
            <div class="status">
                <!-- <div class="relative">
                    <button class="border p-3 flex items-center justify-between rounded-md shadow-inner w-full">
                        <span class="pl-5 pr-56">Status</span>

                        <SvgIcons name="chevron-down" />
                    </button>
                    <div class="absolute bg-white rounded-md shadow-lg py-4 w-full">
                        <ul class="list-reset text-grey">
                            <li class="px-5 py-3">
                                <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status"><br>
                            </li>
                            <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                                Active
                            </p></li>
                            <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Disabled</p></li>
                            <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">None</p></li>
                        </ul>
                    </div>
                </div> -->
                <Filter>
                    <template #info>
                        Status
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status">
                    </template>
                </Filter>
            </div>
            <div class="search">
                <Search />
            </div>
        </div>
    </div>
</template>
