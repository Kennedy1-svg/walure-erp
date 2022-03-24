<script lang="ts">
export default {
  name: 'AddTopics',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import ExperienceCard from './ExperienceCard.vue';

const route = useRouter()

let isChecked:any = ref(false);
const startDate:any = ref('');
const endDate:any = ref('');

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    emits('close')
}

const addTopic:any = () => {
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
    <div class="main w-full mt-[0.5px] bg-white">
        <form id="addtopic" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="title" class="font-semibold">
                        Title
                    </label>
                    <input type="text" name="title" id="title" placeholder="Enter title" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Duration
                    </label>
                    <input type="text" name="duration" id="duration" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
            </div>
            <div class="grid gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Sub Title
                    </label>
                    <textarea type="text" name="address" id="address" placeholder="Write something" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="addTopic" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
        <div class="">
            <h1 class="text-2xl text-left font-semibold pb-3">Experience</h1>
            <ExperienceCard class="my-6" />
            <ExperienceCard class="my-6" />
            <ExperienceCard class="my-6" />
        </div>
    </div>
</template>

<style scoped>
</style>