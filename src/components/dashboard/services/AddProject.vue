<script lang="ts">
export default {
  name: 'AddProject',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { api_url } from '../../../config'
import moment from 'moment';
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import datepicker from '../../datepicker.vue'
import multiselect from '@vueform/multiselect'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as projectActionTypes from '../../../store/module/services/constants/action'
import * as instructorActionTypes from '../../../store/module/instructors/constants/action';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

let formData = new FormData()

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

const newProject:any = computed(() => {
    // return store.getters.getNewProject.value
})

const checkError:any = () => {
    if (!newProject.value.name) {
        errors.name = true;
        errors.nameText = 'Project name is required'
    } else if (newProject.value.name.length <= 3) {
        errors.nameText = 'Project name needs to be more than 3 characters'
    } else {
        errors.name = false;
        errors.nameText = ''
    }
    
    if (!newProject.value.trainingType && newProject.value.trainingType != '0') {
        errors.trainingType = true;
        errors.trainingTypeText = 'Training Type is required'
    } else {
        errors.trainingType = false;
        errors.trainingTypeText = ''
    }

    if (!newProject.value.projectCapacity) {
        errors.projectCapacity = true;
        errors.projectCapacityText = 'Other name is required'
    } else if (newProject.value.projectCapacity <= 0) {
        errors.projectCapacityText = 'Project capacity name needs to be more than 0'
    } else {
        errors.projectCapacity = false;
        errors.projectCapacityText = '';
    }

    if (!newProject.value.startDate) {
        errors.startDate = true;
        errors.startDateText = 'Start date is required. Please select a startDate'
    } else {
        errors.startDate = false;
        errors.startDateText = '';
    }

    if (!newProject.value.courseId) {
        errors.course = true;
        errors.courseText = 'Course is required. Please select a course'
    } else {
        errors.course = false;
        errors.courseText = '';
    }

    if (!newProject.value.endDate) {
        errors.endDate = true;
        errors.endDateText = 'End date is required'
    } else {
        errors.endDate = false;
        errors.endDateText = '';
    }

    if (newProject.value.instructor.length === 0) {
        errors.instructor = true;
        errors.instructorText = 'Instructor(s) is required'
    } else {
        errors.instructor = false;
        errors.instructorText = '';
    }

    if (errors.name) {
        errors.name = true;
        isError.value = true;
    } else if (errors.trainingType) {
        errors.trainingType = true;
        isError.value = true;
    } else if (errors.projectCapacity) {
        errors.projectCapacity = true;
        isError.value = true;
    } else if (errors.endDate) {
        errors.endDate = true;
        isError.value = true;
    } else if (errors.instructor) {
        errors.instructor = true;
        isError.value = true;
    } else if (errors.startDate) {
        errors.startDate = true;
        isError.value = true;
    } else if (errors.course) {
        errors.course = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

let isChecked:any = ref(false);
const startDate:any = ref('');
const endDate:any = ref('');

const courses:any = computed(() => {
  return store.getters.getCourses.value.payload;
});

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

let errors = reactive({
    name: false,
    nameText: '',
    trainingType: false,
    trainingTypeText: '',
    projectCapacity: false,
    projectCapacityText: '',
    startDate: false,
    startDateText: '',
    endDate: false,
    endDateText: '',
    instructor: false,
    instructorText: '',
    course: false,
    courseText: '',
})



const instructors:any = computed(() => {
  return store.getters.getInstructor.value.payload;
});

const training:any = ref('')

const instructor:any = ref([])

const trainingoptions:any = ref([
    {
        label: "Onsite",
        value: 0
    },
    {
        label: "Online",
        value: 1
    }
]);

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    emits('close')
}

const projectcourse:any = ref('')

const addproject:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/project/create-project`;

    // const projectdata:any = {
    //     Title: newProject.value.name,
    //     TrainingType: newProject.value.trainingType,
    //     ProjectCapacity: newProject.value.projectCapacity,
    //     // StartDate: moment(newProject.value.startDate).format('MM/DD/YYYY'),
    //     // EndDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
    //     StartDate: newProject.value.startDate,
    //     EndDate: newProject.value.endDate,
    //     Instructors: JSON.parse(JSON.stringify(newProject.value.instructor)),
    //     CourseId: newProject.value.courseId,
    // }
    
    formData.append('Title', newProject.value.name);
    formData.append('TrainingType', newProject.value.trainingType);
    formData.append('ProjectCapacity', newProject.value.projectCapacity);
    formData.append('StartDate', moment(newProject.value.startDate).format('MM/DD/YYYY'));
    formData.append('EndDate', moment(newProject.value.endDate).format('MM/DD/YYYY'));
    formData.append('Instructors', newProject.value.instructor);
    formData.append('CourseId', newProject.value.courseId);

    const newData:any = {
        url: request,
        data: formData,
    }
    console.log('newData', newData)
    await store.dispatch(projectActionTypes.AddProject, newData)
    await store.dispatch(projectActionTypes.FetchProject)
    const result = await store.getters.getProject
    closeModal()
}

const editproject:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/project/edit-project`;

    // const projectdata:any = {
    //     Title: newProject.value.name,
    //     TrainingType: newProject.value.trainingType,
    //     ProjectCapacity: newProject.value.projectCapacity,
    //     // StartDate: moment(newProject.value.startDate).format('MM/DD/YYYY'),
    //     // EndDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
    //     StartDate: newProject.value.startDate,
    //     EndDate: newProject.value.endDate,
    //     Instructors: JSON.parse(JSON.stringify(newProject.value.instructor)),
    //     CourseId: newProject.value.courseId,
    // }
    
    formData.append('Title', newProject.value.name);
    formData.append('Id', newProject.value.id);
    formData.append('TrainingType', newProject.value.trainingType);
    formData.append('ProjectCapacity', newProject.value.projectCapacity);
    formData.append('StartDate', moment(newProject.value.startDate).format('MM/DD/YYYY'));
    formData.append('EndDate', moment(newProject.value.endDate).format('MM/DD/YYYY'));
    formData.append('Instructors', newProject.value.instructor);
    formData.append('CourseId', newProject.value.courseId);

    const newData:any = {
        url: request,
        data: formData,
    }
    console.log('newData', newData)
    await store.dispatch(projectActionTypes.EditProject, newData)
    await store.dispatch(projectActionTypes.FetchProject)
    const result = await store.getters.getProject
    closeModal()
}

const format:any = (date:any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

let isActive:any = computed(() => {
    if (props.name == 'Edit') {
        return true
    } else {
        return false
    }
})

const submit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addproject() : '';
}

const submitEdit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addproject() : '';
}

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async () => {
    console.log('I am now here')
    const request:any = `${api_url}api/course/get-courses`;
    await store.dispatch(courseActionTypes.FetchCourses, request)
    const instructorrequest:any = `${api_url}api/instructor/get-instructors`;
    await store.dispatch(instructorActionTypes.FetchInstructors, instructorrequest)
})
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} project</p>
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <!-- <form id="addproject" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10"> -->
                <!-- {{ newProject }} -->
                <!-- <div class="grid gap-4">
                    <label for="name" class="font-semibold">
                        Name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newProject.name" name="name" id="name" placeholder="Enter name" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.name ? errors.nameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Course*
                    </label>
                    <multiselect @select="checkError" @clear="checkError" v-model="newProject.courseId" valueProp="id" :options="courses" track-by="title" label="title" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] text-red">
                        {{ errors.course ? errors.courseText : '' }}
                    </p> -->
                    
                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.title }}</option>
                    </select> -->
                <!-- </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="trainingtype" class="font-semibold">
                        Training Type*
                    </label>

                    <multiselect @select="checkError" @clear="checkError"  v-model="newProject.trainingType" valueProp="value" :options="trainingoptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />

                    <p class="text-[10px] text-red">
                        {{ errors.trainingType ? errors.trainingTypeText : '' }}
                    </p> -->
                    
                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="trainingtype" id="trainingtype">
                        <option value="">Select option</option>
                        <option value="Online">Online</option>
                        <option value="Onsite">Onsite</option>
                    </select> -->
                <!-- </div>
                <div class="grid gap-4">
                    <label for="capacity" class="font-semibold">
                        Project capacity*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newProject.projectCapacity" name="capacity" id="capacity" placeholder="Enter number" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.projectCapacity ? errors.projectCapacityText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">                
                <div class="grid gap-4" id="startdate">
                    <label for="startdate" class="font-semibold">
                        Start date*
                    </label>
                    <Datepicker inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newProject.startDate" :maxDate="newProject.endDate" placeholder="Start Date" :format="format" position="left" teleport="#startdate"/> -->
                    <!-- <datepicker /> -->
                    <!-- <p class="text-[10px] text-red">
                        {{ errors.startDate ? errors.startDateText : '' }}
                    </p>
                </div>
                <div class="grid gap-4" id="enddate">
                    <label for="enddate" class="font-semibold">
                        End date*
                    </label>
                    <Datepicker inputClassName="dp-custom-input"  @focus="checkError" @cleared="checkError" menuClassName="dp-custom-menu" v-model="newProject.endDate" :minDate="newProject.startDate" :format="format" position="left" placeholder="End Date" teleport="#enddate" />
                    <p class="text-[10px] text-red">
                        {{ errors.endDate ? errors.endDateText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid gap-8 mb-10">
                <label for="instructor" class="font-semibold">
                    Instructor
                </label>
                <multiselect @select="checkError" @clear="checkError" v-model="newProject.instructor" mode="tags" :close-on-select="false" valueProp="id" :options="instructors" track-by="fullName" label="fullName" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                <p class="text-[10px] text-red">
                    {{ errors.instructor ? errors.instructorText : '' }}
                </p> -->
                <!-- <Filter>
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
                </Filter> -->
            <!-- </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form> -->
    </div>
</template>

<style lang="scss">

.dp-custom-menu {
    position: static !important;
}
</style>