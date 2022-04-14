<script lang="ts">
export default {
  name: 'AddTopics',
}
</script>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import ExperienceCard from './ExperienceCard.vue';
import * as actionTypes from '../../../store/module/courses/constants/action'
import * as mutationTypes from '../../../store/module/courses/constants/mutation'
import { api_url } from '../../../config'

const store = useStore();
const route = useRoute();

let isChecked:any = ref(false);
const startDate:any = ref('');
const endDate:any = ref('');

const props = defineProps({
  isChecked: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
});

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    emits('close')
}

const newCurriculum = computed(() => {
    return store.getters.getNewCurriculum.value
})

const addTopic:any = async () => {
    // console.log('hi');
    // route.push('/dashboard/student-management')
    const ID:any = await store.getters.getCurriculum.value.payload.length;
    const ID2:any = await store.state.courses.newCurriculumBatch.length;

    console.log('ID', ID);
    console.log('ID2', ID2);


    const data:any = {
        id: ID + ID2 + 1,
        title: newCurriculum.value.title,
        duration: newCurriculum.value.duration,
        subTitle: newCurriculum.value.subTitle
    }
    console.log('data for me here is ', data)
    await store.dispatch(actionTypes.AddToCurriculum, data)
    await store.getters.getCurriculum.value.payload
    store.commit(mutationTypes.SetNewCurriculum, {})
}

const grand_error = ref(true)

const removeTopic:any = async (id:any) => {
    console.log('i will delete id ', id)
    await store.dispatch(actionTypes.removeCurriculum, id)
}

// const isDisabled:any = ref(true)

const checkError:any = () => {
    let error:any = {
        title: true,
        subTitle: true,
        duration: true
    }
    if (!newCurriculum.value.title) {
        error.title = true
    } else if (newCurriculum.value.title.length <= 3) {
        error.title = true
    } else {
        error.title = false
    }

    if (!newCurriculum.value.subTitle) {
        error.subTitle = true
    } else if (newCurriculum.value.subTitle.length <= 3) {
        error.subTitle = true
    } else {
        error.subTitle = false
    }
    if (!newCurriculum.value.duration) {
        error.duration = true
    } else {
        error.duration = false
    }

    console.log('the errors here ehn', error)

    if (error.title || error.subTitle || error.duration) {
        grand_error.value = true
    } else {
        grand_error.value = false
    }
}

const submit:any = async () => {
    console.log('checking error...beep boop beep', grand_error.value)
    await checkError()
    // console.log('i am here o', grand_error.value)
    !grand_error.value ? addTopic() : ''
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


// const curriculum:any = computed(():any => {
// 	return store.getters.getCurriculum.value.payload
// })

const curriculum: any = computed(():any => {
    return store.getters.getCurriculum.value.payload
})

const newCurriculumBatch:any = computed(():any => {
    return store.state.courses.newCurriculumBatch
})

onMounted( async() => {
	const id:any = route.params.id;
	const request:any = `${api_url}api/curriculum/get-curriculum/${id}`
	await store.dispatch(actionTypes.FetchCurriculum, request)
})
</script>

<template>
    <div class="main w-full mt-[0.5px] bg-white">
        {{ newCurriculum }} 
        <form id="addtopic" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="title" class="font-semibold">
                        Title
                    </label>
                    <input type="text" v-model="newCurriculum.title"
                    @blur="checkError" @focus="checkError" name="title" id="title" placeholder="Enter title" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
                <div class="grid gap-4">
                    <label for="duration" class="font-semibold">
                        Duration
                    </label>
                    <input type="text" v-model="newCurriculum.duration"
                    @blur="checkError" @focus="checkError" name="duration" id="duration" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
            </div>
            <div class="grid gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Sub Title
                    </label>
                    <textarea type="text"
                    @blur="checkError" @focus="checkError" name="address" id="address" v-model="newCurriculum.subTitle" placeholder="Write something" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
                </div>
            </div>
            <div class="flex justify-end pb-10">
                {{ grand_error }}
                <button type="button" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
        <!-- <div class="">
            {{ curriculum }}
            <h1 class="text-2xl text-left font-semibold pb-3">Experience</h1>
            <div class="experiences" v-for="item in curriculum" :key="item.id" >
                <ExperienceCard class="my-6">
                    <template #title>
                        {{ item.title }}
                    </template>
                    <template #date>
                        {{ item.duration }}
                    </template>
                    <template #description>
                        {{ item.subTitle }}
                    </template>
                </ExperienceCard>
            </div>
                {{ newCurriculumBatch }} h
            <div class="experiences" v-for="item in newCurriculumBatch" :key="item.id" >
                <ExperienceCard name="temp" class="my-6" @delete="removeTopic(item.id)">
                    <template #title>
                        {{ item.title }}
                    </template>
                    <template #date>
                        {{ item.duration }}
                    </template>
                    <template #description>
                        {{ item.subTitle }}
                    </template>
                </ExperienceCard>
            </div> -->
            <!-- <ExperienceCard class="my-6">
                <template #title>

                </template>
                <template #date>

                </template>
                <template #description>

                </template>
            </ExperienceCard> -->
        <!-- </div> -->
    </div>
</template>

<style scoped>
</style>