<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px]">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Students</h1>
            <button class="flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold">Add Student</p>
                <span class="bg-blue-600 p-1 flex justify-center text-white rounded-md">
                    <SvgIcons name="plus" /> <!-- plus icon -->
                </span>
            </button>
        </div>
        <div class="filter flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
            <div class="status">
                <select class="pl-5 pr-52 py-3 bg-transparent rounded border text-sm" name="status" id="status">
                    <span>
                        <Search />
                    </span>
                    <option value="">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div class="search">
                <Search />
            </div>
        </div>
    </div>
</template>
