<script lang="ts">
export default {
  name: 'AddStudents',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import alert from '../../alerts.vue';
import SvgIcons from '../../SvgIcons.vue';
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

const alertState:any = computed(() => store.getters.getBatchAlertStatus.value)
const alertText:any = computed(() => store.getters.getBatchAlertText.value)

const status:any = computed(() => {
    let answer:any
    if (alertText.value.includes('successfully')) {
        answer = true
    } else {
        answer = false
    }
    return answer
})

let isChecked:any = ref(false);

let formData = new FormData()

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const newStudent:any = computed(() => {
    return store.getters.getNewStudent.value;
})

const removeImage:any = async () => {
    return newStudent.value.imageFile = ''
}

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})

let isActive:any = computed(() => {
    if (newStudent.value.imageFile) {
        return true
    } else {
        return false
    }
})

const onChange:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newStudent.value.imageFile = event.target.files[0]
    formData.append('file', event.target.files[0])
    console.log('newStudent image', newStudent.value.imageFile)
}

const addStudent:any = async () => {
    console.log('hi');
    console.log('newstudent', newStudent.value)
    console.log('newstudent', newStudent.value.imageFile)
    const request:any = `${api_url}api/student/create-student`;

    // const formElem = document.getElementById('formElem')
    formData.append('firstName', newStudent.value.firstName)
    formData.append('lastName', newStudent.value.lastName)
    formData.append('otherName', newStudent.value.otherName)
    formData.append('imageFile', newStudent.value.imageFile, newStudent.value.imageFile.name)
    formData.append('addresss', newStudent.value.addresss)
    formData.append('phoneNumber', newStudent.value.phoneNumber)
    formData.append('gender', newStudent.value.gender)
    formData.append('courseId', newStudent.value.courseId)
    formData.append('email', newStudent.value.email)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))
    
    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newStudent.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newStudent.value.imageFile
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(studentActionTypes.AddNewStudent, newData)
    const result = await store.getters.getStudent
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

onMounted(async () => {
    console.log('I am now here')
    const request:any = `${api_url}api/course/search-courses/{pageIndex}/{pageSize}`;
    await store.dispatch(courseActionTypes.FetchCourses, request)
})

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <alert :class="[alertState ? '' : 'hidden']" class="absolute top-5 bg-white p-2 right-0" name="result">
            <template #icon>
                <p v-if="status" class="bg-green-accent rounded-full border p-2">
                    <SvgIcons class="text-white" name="tick" />
                </p>
                <p v-else class="">
                    <SvgIcons class="text-red" name="exclamation" />
                </p>
            </template>
            <template #info>
                <p class="text-sm">
                    {{ alertText || 'Username or password Invalid' }}
                </p>
            </template>
            <template #button></template>
        </alert>
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl"><slot name="title">Add</slot> Student</p>
            <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" />
        </div>
        <form id="formElem" class="text-sm grid">
            <div class="grid justify-items-center gap-1 mb-[88px]">
                <div class="relative mb-8">
                    <SvgIcons class="text-gray-300" name="pic-avatar" />
                    <span class="absolute cursor-pointer left-3/5 bottom-0 bg-black rounded-full p-2">                   
                        <input type="file" name="imageFile" @change="onChange" class="opacity-0 absolute" accept="image/*" />
                        <SvgIcons class="text-white" name="camera" />
                    </span>
                </div>
                <div class="buttons text-grey flex gap-[50px]">
                    <button @click.prevent="removeImage" class="py-4 px-10 hover:shadow rounded border" :class="[isActive ? activeRemove : disabledRemove]">
                        Remove
                    </button>
                    <button class="py-4 px-10 text-white rounded hover:shadow" :class="[isActive ? activeView : disabledView]">
                        View Passport
                    </button>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="firstname" class="font-semibold">
                        First name
                    </label>
                    <input type="text" v-model="newStudent.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name
                    </label>
                    <input type="text" v-model="newStudent.lastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="othername" class="font-semibold">
                        Other name
                    </label>
                    <input type="text" v-model="newStudent.otherName" name="othername" id="othername" placeholder="Enter other name" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" v-model="newStudent.phoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email*
                    </label>
                    <input type="email" v-model="newStudent.email" name="email" id="email" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
                <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>
                    
                    <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newStudent.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Course*
                    </label>
                    <select class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newStudent.courseId" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.title }}</option>
                    </select>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Address
                    </label>
                    <textarea type="text" v-model="newStudent.addresss" name="address" id="address" placeholder="Input address" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="addStudent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
