<script lang="ts">
export default {
  name: 'AddBatch',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'

const route = useRouter()

let isChecked:any = ref(false);
const startDate:any = ref('');
const endDate:any = ref('');

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const addStudent:any = () => {
    console.log('hi');
    // route.push('/dashboard/student-management')
}

const format:any = (date:any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
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
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
        </div>
        <form id="addbatch" class="text-sm text-left grid">
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
                    <label for="trainingtype" class="font-semibold">
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
                    <Datepicker inputClassName="dp-custom-input" v-model="startDate" :maxDate="endDate" placeholder="Start Date" :format="format"/>
                </div>
                <div class="grid gap-4">
                    <label for="enddate" class="font-semibold">
                        End date*
                    </label>
                    <Datepicker inputClassName="dp-custom-input" v-model="endDate" :minDate="startDate" :format="format" placeholder="End Date" />
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

<style scoped>
.dp-custom-calendar{
    background: #ae0000;
    z-index: 9999;  
}
</style>