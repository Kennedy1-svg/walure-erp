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
    console.log('hi');
    // route.push('/dashboard/student-management')
}

let isActive:any = ref(false);

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl"><slot name="title">Add</slot> batch</p>
            <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="name" class="font-semibold">
                        Name*
                    </label>
                    <input type="text" name="name" id="name" placeholder="Enter name" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Course*
                    </label>
                    
                    <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option value="active">Male</option>
                        <option value="inactive">Female</option>
                        <option value="inactive">Not sure</option>
                        <option value="inactive">Prefer not to say</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Training Type*
                    </label>
                    
                    <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="trainingtype" id="trainingtype">
                        <option value="">Select option</option>
                        <option value="active">Male</option>
                        <option value="inactive">Female</option>
                        <option value="inactive">Not sure</option>
                        <option value="inactive">Prefer not to say</option>
                    </select>
                </div>
                <div class="grid gap-4">
                    <label for="capacity" class="font-semibold">
                        Batch capacity*
                    </label>
                    <input type="text" name="capacity" id="capacity" placeholder="Enter number" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">                
                <div class="grid gap-4">
                    <label for="startdate" class="font-semibold">
                        Start date*
                    </label>
                    
                    <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="startdate" id="startdate">
                        <option value="">Start Date</option>
                        <option value="active">Male</option>
                        <option value="inactive">Female</option>
                        <option value="inactive">Not sure</option>
                        <option value="inactive">Prefer not to say</option>
                    </select>
                </div>
                <div class="grid gap-4">
                    <label for="enddate" class="font-semibold">
                        End date*
                    </label>
                    
                    <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="enddate" id="enddate">
                        <option value="">Select option</option>
                        <option value="active">Male</option>
                        <option value="inactive">Female</option>
                        <option value="inactive">Not sure</option>
                        <option value="inactive">Prefer not to say</option>
                    </select>
                </div>
            </div>
            <div class="grid gap-8 mb-10">
                <label for="instructor" class="font-semibold">
                    Instructor
                </label>
                <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">
                            <p class="text-grey">
                                Choose instructor
                            </p>
                        </span>
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-7 w-full mx-auto">
                    </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Araba Temi
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Araba Temi</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Araba Temi</p></li>
                    </template>
                </Filter>
            </div>
            <div class="grid gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Address
                    </label>
                    <textarea type="text" name="address" id="address" placeholder="Input address" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="addStudent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
