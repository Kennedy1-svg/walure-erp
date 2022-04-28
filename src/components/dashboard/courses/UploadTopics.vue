<script lang="ts">
export default {
  name: 'UploadTopic',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import { api_url } from '../../../config/index'
import TopicsList from './TopicsList.vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/courses/constants/action'

const route = useRoute()
const store = useStore()

let isChecked:any = ref(false);
const startDate:any = ref('');
const endDate:any = ref('');

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

let formData = new FormData()

const file:any = ref(null)

const uploadCurriculum:any = async (event:any) => {
    console.log('event', event.target.files[0].name)
    // file.value.imageFile = await event.target.files[0]
    formData.append('file', event.target.files[0], event.target.files[0].name)

    const courseId:any = route.params.id
    console.log('course id', courseId)
    // formData.append('courseId', courseId)

    const request:any = `${api_url}api/curriculum/uploadFile/${courseId}`

    const newData:any = {
        url: request,
        data: formData
    }

    await store.dispatch(actionTypes.UploadCurriculum, newData)
    // await store.getters.getCurriculum.value.payload
}

const onChange:any = async (event:any) => {
        // console.log('event', event.target.files[0].name)
        // file.value.imageFile = await event.target.files[0]
        // formData.append('file', event.target.files[0])
        // images.src = URL.createObjectURL(event.target.files[0])
        // image.src = URL.createObjectURL(event.target.files[0])
        // console.log('file image', newStudent.value.imageFile.type)
}

const emits = defineEmits(['close'])

const closeModal:any =  () => {
//   statusId.value = ''
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
    <div class="main w-full mt-[0.5px] rounded-md bg-white">
        <form id="uploadtopics" class="text-sm text-left grid">
            <div class="flex justify-end gap-8 mb-10">
                <a href="../../../../public/Curriculum_sample.xlsx" class="border border-primary px-5 py-4 text-primary cursor-pointer rounded flex justify-center items-center" download="curriculumsample.xlsx">
                    <SvgIcons name="download" />
                    <p class="pl-3 text-lg">Download Template</p>
                </a>
            </div>
            <div class="grid gap-8 mb-10">
                <div class="grid gap-4">
                    <div class="flex items-center justify-start w-full">
                        <label class="flex bg-primary-accent rounded flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center pt-8">
                                <SvgIcons name="upload" />
                                <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                    Upload Document</p>
                            </div>
                            <input type="file" name="imageFile" @change="uploadCurriculum" class="opacity-0 absolute" accept=".xlsx, .csv" />
                        </label>
                    </div>
                    <p class="text-xs font-medium">
                        Allowed Formats: xlsx, csv
                    </p>
                </div>
            </div>
        </form>
        <div>
            <TopicsList />            
        </div>
    </div>
</template>

<style scoped>
</style>