<script lang="ts">
export default {
  name: 'EditOutsourcingForm',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { api_url } from '../../../config'
import moment from 'moment';
import SvgIcons from '../../SvgIcons.vue';
import { DatePicker } from 'v-calendar'
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import Modal from '../../Modals.vue';
import 'v-calendar/dist/style.css';
import 'vue3-date-time-picker/dist/main.css'
import datepicker from '../../datepicker.vue'
import multiselect from '@vueform/multiselect'
import * as projectActionTypes from '../../../store/module/services/constants/action'
import * as projectMutationTypes from '../../../store/module/services/constants/mutation'
import * as instructorActionTypes from '../../../store/module/instructors/constants/action';
import AddTalent from './AddTalent.vue'

const store = useStore();

const router = useRouter();

const route = useRoute();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);
let isTalentAdded:any = ref(false);
let showAddTalent:any = ref(false);

let formData = new FormData()

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

const newOutsourcing:any = computed(() => {
    return store.getters.getNewOutsourcing.value
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phonenumber ='^[0]+[0-9]';

const checkError:any = () => {
    if (!newOutsourcing.value.companyName) {
        errors.companyName = true;
        errors.companyNameText = 'Company name is required'
    } else if (newOutsourcing.value.companyName.length <= 3) {
        errors.companyNameText = 'Company name needs to be more than 3 characters'
    } else {
        errors.companyName = false;
        errors.companyNameText = ''
    }

    if (!newOutsourcing.value.email) {
        errors.email = true;
        errors.emailText = 'Email is required'
    } else if (!newOutsourcing.value.email.match(email)) {
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
        errors.emailText = ''
    }

    if (!newOutsourcing.value.companyType) {
        errors.companyType = true;
        errors.companyTypeText = 'Company type is required'
    } else {
        errors.companyType = false;
        errors.companyTypeText = '';
    }

    if (!newOutsourcing.value.location) {
        errors.location = true;
        errors.locationText = 'Location is required.'
    } else {
        errors.location = false;
        errors.locationText = '';
    }

    if (!newOutsourcing.value.contactName) {
        errors.contactName = true;
        errors.contactNameText = 'Contact person is required.'
    } else if (newOutsourcing.value.contactName.length <= 3) {
        errors.contactName = true;
        errors.contactNameText = 'Contact person should contain more than 3 characters.'
    } else {
        errors.contactName = false;
        errors.contactNameText = '';
    }

    if (!newOutsourcing.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newOutsourcing.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newOutsourcing.value.phoneNumber.match(phonenumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number must start with 0'
    } else if (newOutsourcing.value.phoneNumber.length <= 10) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot be less than 11 digits'
    } else {
        errors.phone = false;
        errors.phoneText = ''
    }

    if (errors.companyName) {
        errors.companyName = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.companyType) {
        errors.companyType = true;
        isError.value = true;
    } else if (errors.phone) {
        errors.phone = true;
        isError.value = true;
    } else if (errors.location) {
        errors.location = true;
        isError.value = true;
    } else if (errors.contactName) {
        errors.contactName = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

let isChecked:any = ref(false);
const startDate:any = ref('');
const phone:any = ref('');

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

let errors = reactive({
    companyName: false,
    companyNameText: '',
    email: false,
    emailText: '',
    companyType: false,
    companyTypeText: '',
    location: false,
    locationText: '',
    phone: false,
    phoneText: '',
    brief: false,
    briefText: '',
    contactName: false,
    contactNameText: '',
})

const emits = defineEmits(['close'])

const outsourcingTalents:any = computed(() => {
    const talents = store.getters.getOutsourcingTalent.value.payload;
    console.log('talents here is', talents)
    return talents.jobDetails
})

const closeModal:any = async () => {
    store.commit(projectMutationTypes.SetNewProject, {})
    emits('close')
}

const company_type:any = [
	{
		label: "Telecommunications",
		value: 0,
	},
	{
		label: "IT",
		value: 1,
	},
	{
		label: "Fast Moving Consumer Goods",
		value: 2,
	},
	{
		label: "Finance",
		value: 3,
	},
	{
		label: "Banking",
		value: 4,
	},
	{
		label: "Health",
		value: 5,
	},
	{
		label: "Insurance",
		value: 6,
	},
	{
		label: "Transportation",
		value: 7,
	},
	{
		label: "Logistics",
		value: 8,
	},
	{
		label: "Oil and Gas",
		value: 9,
	},
	{
		label: "HMO",
		value: 10,
	},
	{
		label: "Real Estate",
		value: 11,
	},
	{
		label: "Education",
		value: 12,
	},
	{
		label: "Construction",
		value: 13,
	},
	{
		label: "Pharmaceutical",
		value: 14,
	},
	{
		label: "Others",
		value: 15,
	}
]

const location:any = [
	{
		label: "Abuja",
        value: "Abuja" 
	},
	{
		label: "Abia",
        value: "Abia"
	},
	{
		label: "Adamawa",
        value: "Ada"
	},
	{
		label: "Akwa Ibom",
        value: "Akwa_Ibom"
	},
	{
		label: "Anambra",
        value: "Anambra"
	},
	{
		label: "Bauchi",
        value: "Bauchi"
	},
	{
		label: "Bayelsa",
        value: "Bayelsa"
	},
	{
		label: "Benue",
        value: "Benue"
	},
	{
		label: "Borno",
        value: "Borno"
	},
	{
		label: "Cross River",
        value: "Cross_River"
	},
	{
		label: "Delta",
        value: "Delta"
	},
	{
		label: "Ebonyi",
        value: "Ebonyi"
	},
	{
		label: "Edo",
        value: "Edo"
	},
	{
		label: "Ekiti",
        value: "Ekiti"
	},
	{
		label: "Enugu",
        value: "Enugu"
	},
	{
		label: "Gombe",
        value: "Gombe"
	},
	{
		label: "Imo",
        value: "Imo"
	},
	{
		label: "Jigawa",
        value: "Jigawa"
	},
	{
		label: "Kaduna",
        value: "Kaduna"
	},
	{
		label: "Kano",
        value: "Kano"
	},
	{
		label: "Katsina",
        value: "Katsina"
	},
	{
		label: "Kebbi",
        value: "Kebbi"
	},
	{
		label: "Kogi",
        value: "Kogi"
	},
	{
		label: "Kwara",
        value: "Kwara"
	},
	{
		label: "Lagos",
        value: "Lagos"
	},
	{
		label: "Nassarawa",
        value: "Nassarawa"
	},
	{
		label: "Niger",
        value: "Niger"
	},
	{
		label: "Ogun",
        value: "Ogun"
	},
	{
		label: "Ondo",
        value: "Ondo"
	},
	{
		label: "Osun",
        value: "Osun"
	},
	{
		label: "Oyo",
        value: "Oyo"
	},
	{
		label: "Plateau",
        value: "Plateau"
	},
	{
		label: "Rivers",
        value: "Rivers"
	},
	{
		label: "Sokoto",
        value: "Sokoto"
	},
	{
		label: "Taraba",
        value: "Taraba"
	},
	{
		label: "Yobe",
        value: "Yobe"
	},
	{
		label: "Zamfara",
        value: "Zamfara"
	}
]

const projectcourse:any = ref('')

const addproject:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/outsourcing/create-request`;

    const projectdata:any = {
        contactName: newOutsourcing.value.contactName,
        email: newOutsourcing.value.email,
        companyType: newOutsourcing.value.companyType,
        location: newOutsourcing.value.location,
        phoneNumber: newOutsourcing.value.phoneNumber,
    //     // brief: newOutsourcing.value.brief,
        companyName: newOutsourcing.value.companyName,
        jobDetails: JSON.parse(JSON.stringify(outsourcingTalents.value)),
    //     TrainingType: newOutsourcing.value.email,
    //     ProjectCapacity: newOutsourcing.value.companyType,
    //     // StartDate: moment(newOutsourcing.value.startDate).format('MM/DD/YYYY'),
    //     // EndDate: moment(newOutsourcing.value.phone).format('MM/DD/YYYY'),
    //     StartDate: newOutsourcing.value.startDate,
    //     EndDate: newOutsourcing.value.phone,
    //     Instructors: JSON.parse(JSON.stringify(newOutsourcing.value.brief)),
    //     CourseId: newOutsourcing.value.courseId,
    }
    
    // formData.append('companyName', newOutsourcing.value.companyName);
    // formData.append('email', newOutsourcing.value.email);
    // formData.append('companyType', newOutsourcing.value.companyType);
    // formData.append('location', newOutsourcing.value.location);
    // formData.append('phoneNumber', newOutsourcing.value.phoneNumber);
    // formData.append('jobDetails', JSON.parse(JSON.stringify(outsourcingTalents.value)));
    // formData.append('contactName', newOutsourcing.value.contactName);

    const newData:any = {
        url: request,
        data: projectdata,
    }
    console.log('newData', newData)
    await store.dispatch(projectActionTypes.AddOutsourcing, newData)
    // await store.dispatch(projectActionTypes.FetchProject)
    // store.commit(projectMutationTypes.SetNewProject, {})
    // const result = await store.getters.getProject
    // closeModal()
}

const editproject:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/project/edit-project`;

    const projectdata:any = {
        companyName: newOutsourcing.value.companyName,
        email: newOutsourcing.value.email,
        companyType: newOutsourcing.value.companyType,
        startDate: moment(newOutsourcing.value.startDate).format('MM/DD/YYYY'),
        phone: moment(newOutsourcing.value.phone).format('MM/DD/YYYY'),
        brief: newOutsourcing.value.brief,
        contactName: newOutsourcing.value.contactName,
        id: newOutsourcing.value.id
    //     Title: newOutsourcing.value.name,
    //     TrainingType: newOutsourcing.value.email,
    //     ProjectCapacity: newOutsourcing.value.companyType,
    //     // StartDate: moment(newOutsourcing.value.startDate).format('MM/DD/YYYY'),
    //     // EndDate: moment(newOutsourcing.value.phone).format('MM/DD/YYYY'),
    //     StartDate: newOutsourcing.value.startDate,
    //     EndDate: newOutsourcing.value.phone,
    //     Instructors: JSON.parse(JSON.stringify(newOutsourcing.value.brief)),
    //     CourseId: newOutsourcing.value.courseId,
    }
    
    // formData.append('Title', newOutsourcing.value.companyName);
    // formData.append('Id', newOutsourcing.value.id);
    // formData.append('TrainingType', newOutsourcing.value.email);
    // formData.append('ProjectCapacity', newOutsourcing.value.companyType);
    // formData.append('StartDate', moment(newOutsourcing.value.startDate).format('MM/DD/YYYY'));
    // formData.append('EndDate', moment(newOutsourcing.value.phone).format('MM/DD/YYYY'));
    // formData.append('Instructors', newOutsourcing.value.brief);
    // formData.append('CourseId', newOutsourcing.value.title);

    const newData:any = {
        url: request,
        data: projectdata,
    }
    console.log('newData', newData)
    await store.dispatch(projectActionTypes.EditProject, newData)
    await store.dispatch(projectActionTypes.FetchProject)
    await store.getters.getProject
    closeModal()
    store.commit(projectMutationTypes.SetNewProject, {})
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
    setTimeout(() => {
        router.push({
            name: 'Outsourcing'
        })
    }, 1000);
}

const submitEdit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editproject() : '';
}

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-blue-accent hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async () => {
    console.log('I am now here')
    const id:any = route.params.id;
    const request:any = `${api_url}api/outsourcing/get/${id}`;
    await store.dispatch(projectActionTypes.FetchEditOutsourcing, request)
    const fetchrequest:any = `${api_url}api/outsourcing/get-jobdetails/${id}`;
    await store.dispatch(projectActionTypes.FetchOutsourcingTalents, fetchrequest)
})

onBeforeUnmount(() => {
    store.commit(projectMutationTypes.SetNewOutsourcing, {})
})
</script>

<template>
    <div class="main w-full mt-[45px] px-[45px] bg-white">
                <!-- {{ newOutsourcing }} -->
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl text-bold">Edit Outsourcing</p>
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
            <!-- <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" /> -->
        </div>
        <form id="addproject" class="text-sm text-left grid">
            <div class="grid grid-cols-3 gap-8 mb-10">
                <!-- {{ newOutsourcing }} -->
                <div class="grid gap-4">
                    <label for="contactName" class="font-semibold">
                        Contact person*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newOutsourcing.contactName" name="contactName" id="contactName" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.contactName ? errors.contactNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="companyName" class="font-semibold">
                        Company name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newOutsourcing.companyName" name="companyName" id="companyName" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <!-- <multiselect @select="checkError" @clear="checkError" v-model="newOutsourcing.companyName" valueProp="id" :options="courses" track-by="companyName" label="companyName" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.companyName ? errors.companyNameText : '' }}
                    </p>
                    
                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.companyName }}</option>
                    </select> -->
                </div>             
                <div class="grid gap-4" id="email">
                    <label for="email" class="font-semibold">
                        Email*
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError"  v-model="newOutsourcing.email" name="email" id="email" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4" id="phoneNumber">
                    <label for="phoneNumber" class="font-semibold">
                        Phone Number*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newOutsourcing.phoneNumber" name="phoneNumber" id="phoneNumber" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.phone ? errors.phoneText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="location" class="font-semibold">
                        Location*
                    </label>
                    <!-- <input type="email" @focus="checkError" @keyup="checkError"  v-model="newOutsourcing.email" name="email" id="email" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none"> -->


                    <multiselect v-model="newOutsourcing.location" valueProp="value" :options="location" @select="checkError" track-by="label" label="label" placeholder="Select location" :searchable="true" class="multiselect-blue" />
                    <!-- <multiselect @select="checkError" @clear="checkError"  v-model="newOutsourcing.email" valueProp="value" :options="trainingoptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->

                    <p class="text-[10px] text-red">
                        {{ errors.location ? errors.locationText : '' }}
                    </p>
                    
                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="trainingtype" id="trainingtype">
                        <option value="">Select option</option>
                        <option value="Online">Online</option>
                        <option value="Onsite">Onsite</option>
                    </select> -->
                </div>
                <div class="grid gap-4">
                    <label for="companyType" class="font-semibold">
                        Company Type*
                    </label>
                    <!-- <input type="text" @focus="checkError" @keyup="checkError"  v-model="newOutsourcing.companyType" name="companyType" id="companyType" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none"> -->
                    <multiselect v-model="newOutsourcing.companyType" @select="checkError" valueProp="value" :options="company_type" track-by="label" label="label" placeholder="Select company type" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] text-red">
                        {{ errors.companyType ? errors.companyTypeText : '' }}
                    </p>
                </div>
            </div>
            <!-- {{ outsourcingTalents.length === 0 ? 'empty' : 'not empty' }} -->
            <!-- <h1 v-if="outsourcingTalents.length !== 0" class="pt-10 text-xl font-bold pb-5">Job Details</h1> -->
            <div v-if="1" class="table mb-28">
                <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                            <!-- {{ outsourcingTalents }} -->
                    <table class="overflow-x-scroll border items-center w-full">
                        <thead class="bg-table-head">
                            <tr class="justify-items-center">
                                <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                                Job Engagement Type
                                </th>
                                <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                                Role
                                </th>
                                <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                                Experience Level
                                </th>
                                <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                                Description
                                </th>
                                <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                                No of Resources
                                </th>
                                <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                            </tr>
                        </thead>

                        <tbody id="students" class="bg-white">
                            <!-- {{ outsourcingTalents }} -->
                            <tr v-for="(talent) in outsourcingTalents" :key="talent.id">
                                <!-- {{ outsourcingTalents }} -->
                                <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                                    <!-- {{ pageIndex == 1 ? (outsourcingTalents.indexOf(talent) + 1) : ((pageIndex - 1) * 10) + (outsourcingTalents.indexOf(talent) + 1) }} -->
                                    <!-- {{ talent.id }} -->
                                    {{ talent.jobEngagementType == 0 ? 'Full Time' : talent.jobEngagementType == 1 ? 'Part time' : 'Contract' }}
                                </td>
                                <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                                    {{ talent.role == 0 ? 'DevOps' : talent.role == 1 ? 'Back-end Developer' : talent.role == 2 ? 'Front-end Developer' : talent.role == 3 ? 'UI/UX Designer' : talent.role == 4 ? 'Product Designer' : talent.role == 5 ? 'Product Manager' : talent.role == 6 ? 'Mobile Developer' : talent.role == 7 ? 'iOS Developer' : talent.role == 8 ? 'Android Developer' : talent.role == 9 ? 'Full Stack Developer' : talent.role == 10 ? 'Enterprise Architect' : talent.role == 11 ? 'Project Manager' : talent.role == 12 ? 'Business Analyst' : talent.role == 13 ? 'CTO' : talent.role == 14 ? 'Data Scientist' : talent.role == 15 ? 'Software Developer' : talent.role == 16 ? 'Operations Manager' : talent.role == 17 ? 'Human Resource Manager' : talent.role == 18 ? 'Quality Assurance Manager' : null }}
                                </td>
                                <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                                    {{ talent.experienceLevel == 0 ? 'Beginner' : talent.experienceLevel == 1 ? 'Intermediate' : 'Experienced' }}
                                </td>
                                <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                                    {{ talent.description }}
                                </td>
                                <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                                    {{ talent.noOfResource }}
                                </td>
                                <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                                    <div class="flex w-2/5 items-center">
                                        <!-- <button
                                        type="button"
                                        @click="showDelete = !showDelete" @click.prevent="sendId(talent.id)" 
                                        class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                        >
                                            <SvgIcons name="delete" />
                                        </button>
                                        <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteCourseCategory(talentitemtodelete)">
                                                <template #title>
                                                    Delete Category
                                                </template>
                                                <template #info>
                                                    Are you sure you want to remove course talent?
                                                </template>
                                                <template #delete>
                                                    Yes, Delete Category
                                                </template>
                                        </DeleteModal> -->
                                            <SvgIcons name="delete" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="flex gap-4 justify-end pb-10">
                <button type="button" @click.prevent="showAddTalent = !showAddTalent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">
                    Add Talent
                </button>
                <!-- <button
                type="button"
                @click="showUpdateStatus = !showUpdateStatus"
                @click.prevent="setId(outsourcingitem.id)"    
                class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                >
                    <SvgIcons name="update" />
                    Update Status
                </button> -->
                <Modal :show="showAddTalent" @close="showAddTalent = !showAddTalent">
                    <AddTalent name="Edit" @close="showAddTalent = !showAddTalent" />
                </Modal>
                <button @click.prevent="submit" :class="[outsourcingTalents.length !== 0 ? activeView : disabledView]" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md" :disabled="outsourcingTalents.length === 0">Save</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">

.dp-custom-menu {
    position: static !important;
}
</style>

<style scoped>
.multiselect-blue {
  --ms-option-bg: #DBEAFE;
  --ms-option-color: #2563EB;
  --ms-bg: #FFFFFF;
}
</style>

<style>
.dp-custom-input {
    @apply py-[8px] rounded-md;
}
.multiselect-blue {
  /* --ms-option-bg: #DBEAFE; */
  --ms-option-color: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-dropdown-bg: #FFFFFF;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-tag-bg: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-py: 8px;
  --ms-font-size: 12px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>