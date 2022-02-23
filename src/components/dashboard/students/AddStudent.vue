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
            <div class="grid gap-1 mb-10">
                <label for="batch" class="font-semibold">
                    Select from batch available*
                </label>
                
                <div class="relative">
                    <button class="border p-3 text-grey flex items-center justify-between rounded-md shadow-inner w-full">
                        <span class="">Select options</span>

                        <SvgIcons name="chevron-down" />
                    </button>
                    <div class="rounded-md shadow-lg py-4 relative pin-t pin-l">
                        <ul class="list-reset text-grey">
                            <li class="p-2"><input class="border-2 rounded h-8 w-full"><br></li>
                            <li><p class="py-2 px-4 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                                Project class
                            </p></li>
                            <li><p class="py-2 px-4 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Gold class</p></li>
                            <li><p class="py-2 px-4 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Blockchain class</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="addStudent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
