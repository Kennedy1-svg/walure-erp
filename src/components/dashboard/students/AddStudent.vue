<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';

const route = useRouter()

let isChecked:any = ref(false);

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const addStudent:any = () => {
    console.log('hi');
    // route.push('/dashboard/student-management')
}
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add Student</p>
            <SvgIcons name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm grid my10">
            <div class="grid gap-1 mb-4">
                <label for="batch" class="font-semibold">
                    Select from batch available*
                </label>
                
                <div class="relative">
                    <button class="border p-3 rounded shadow-inner w-full">
                        <span class="float-left">Show options</span>

                        <svg class="h-4 float-right fill-current text-white" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129">
                        <g>
                            <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
                        </g>
                        </svg>
                    </button>
                    <div class="rounded shadow-md my-2 relative pin-t pin-l">
                        <ul class="list-reset">
                            <li class="p-2"><input class="border-2 rounded h-8 w-full"><br></li>
                            <li><p class="py-2 px-4 hover:bg-gray-50 block text-black hover:bg-grey-light cursor-pointer">
                                Project class
                            </p></li>
                            <li><p class="py-2 px-4 hover:bg-gray-50 block text-black hover:bg-grey-light cursor-pointer">Gold class</p></li>
                            <li><p class="py-2 px-4 hover:bg-gray-50 block text-black hover:bg-grey-light cursor-pointer">Blockchain class</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button @click.prevent="addStudent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
