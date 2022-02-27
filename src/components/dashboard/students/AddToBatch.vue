<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';

const route = useRouter()

let isChecked:any = ref(false);

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const addStudent:any = () => {
    // console.log('hi');
    // route.push('/dashboard/student-management')
}
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add Student</p>
            <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm text-left grid">
            <div class="grid gap-1 mb-10">
                <label for="batch" class="font-semibold">
                    Select from batch available*
                </label>
                <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">
                            <p class="text-grey">
                                Select option
                            </p>
                        </span>
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-7 w-full mx-auto">
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
            <div class="flex justify-end pb-10">
                <button @click.prevent="addStudent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
