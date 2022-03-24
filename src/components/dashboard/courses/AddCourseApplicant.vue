<script lang="ts">
export default {
  name: 'AddCourseApplicant',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import alert from '../../alerts.vue';
import SvgIcons from '../../SvgIcons.vue';
import Switch from '../../switch.vue'
import Modal from '../../Modal.vue'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

// const alertState:any = computed(() => store.getters.getCourseAlertStatus.value)
// const alertText:any = computed(() => store.getters.getCourseAlertText.value)

const alertState:any = ref(false)
const alertText:any = ref(false)

let errors = reactive({
    firstName: false,
    firstNameText: '',
    lastName: false,
    lastNameText: '',
    otherName: false,
    otherNameText: '',
    email: false,
    emailText: '',
    courseContentTwo: false,
    courseContentTwoText: '',
    course: false,
    courseText: '',
    courseContentFour: false,
    courseContentFourText: '',
    courseContentFive: false,
    courseContentFiveText: '',
    phoneNumber: false,
    phoneNumberText: '',
    gender: false,
    genderText: '',
    categories: false,
    categoriesText: '',
    duration: false,
    durationText: '',
    address: false,
    addressText: '',
    banner: false,
    bannerText: '',
    thumbnail: false,
    thumbnailText: '',
    isFeatured: false,
    isFeaturedText: '',
    isActive: false,
    isActiveText: '',
    courseDescription: false,
    courseDescriptionText: '',
})

const status:any = computed(() => {
    let answer:any
    // if (alertText.value.includes('successfully')) {
    //     answer = true
    // } else {
    //     answer = false
    // }
    return answer
})

const formEl:any = ref(null)

let isChecked:any = ref(false);

let formData = new FormData()

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

// const newApplicant:any = computed(() => {
//     return store.getters.getNewCourse.value;
// })

const newApplicant:any = {}

const courseContentTwo ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newApplicant.value.imageFile.type;
    // console.log('imageType is', imageType)
    if (!newApplicant.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newApplicant.value.firstName.length <= 3) {
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
    }
    
    if (!newApplicant.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newApplicant.value.lastName.length <= 3) {
        errors.lastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.lastName = false;
    }

    if (!newApplicant.value.otherName) {
        errors.otherName = true;
        errors.otherNameText = 'Other name is required'
    } else if (newApplicant.value.otherName.length <= 3) {
        errors.otherNameText = 'Other name needs to be more than 3 characters'
    } else {
        errors.otherName = false;
    }

    if (!newApplicant.value.email) {
        errors.email = true;
        errors.emailText = 'email is required. Please select a email'
    } else {
        errors.email = false;
    }

    if (!newApplicant.value.banner) {
        errors.banner = true;
        errors.bannerText = 'Image is required. Please upload an banner'
    } else if (newApplicant.value.banner.size > 5242880) {
        errors.banner = true;
        errors.bannerText = 'Image size should not be more than 5MB'
    } else {
        errors.banner = false;
    }

    if (!newApplicant.value.thumbnail) {
        errors.thumbnail = true;
        errors.thumbnailText = 'Image is required. Please upload an thumbnail'
    } else if (newApplicant.value.thumbnail.size > 5242880) {
        errors.thumbnail = true;
        errors.thumbnailText = 'Image size should not be more than 5MB'
    } else {
        errors.thumbnail = false;
    }

    if (!newApplicant.value.courseContentTwo) {
        errors.courseContentTwo = true;
        errors.courseContentTwoText = 'courseContentTwo is required'
    } else if (!newApplicant.value.courseContentTwo.match(courseContentTwo)) {
        errors.courseContentTwoText = `courseContentTwo must should have the format 'brianadams@walure.com`
    } else {
        errors.courseContentTwo = false;
    }

    if (!newApplicant.value.phoneNumber) {
        errors.gender = true;
        errors.genderText = 'Phone number is required'
    } else if (isNaN(newApplicant.value.genderNumber)) {
        errors.gender = true;
        errors.genderText = 'Phone number cannot contain letters'
    } else if (!newApplicant.value.genderNumber.match(phone)) {
        errors.genderText = 'Phone numer must start with 0'
    } else if (newApplicant.value.genderNumber.length <= 9) {
        errors.genderText = 'Phone numer cannot be less than 10 digits'
    } else {
        errors.gender = false;
    }

    if (!newApplicant.value.addresss) {
        errors.phoneNumberText = 'true';
        errors.phoneNumberText = 'Address is required'
    } else if (newApplicant.value.phoneNumbers.length <= 13) {
        errors.phoneNumberText = 'Address needs to be more than 3 words'
    } else {
        errors.phoneNumberText = 'false';
    }

    if (errors.firstName) {
        errors.firstName = true;
        isError.value = true;
    } else if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else if (errors.otherName) {
        errors.otherName = true;
        isError.value = true;
    } else if (errors.courseContentTwo) {
        errors.courseContentTwo = true;
        isError.value = true;
    } else if (errors.gender) {
        errors.gender = true;
        isError.value = true;
    } else if (errors.course) {
        errors.course = true;
        isError.value = true;
    } else if (errors.courseContentTwo) {
        errors.courseContentTwo = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

const removeImage:any = async () => {
    return newApplicant.value.imageFile = ''
}

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})

const test = () => {
    console.log('hi')
    // console.log('new notes', newApplicant.courseDescription.value)
}

const newText = () => {
    console.log('hello')
    // console.log('new notes here', newApplicant.courseDescription.value)
}

const notes = ref('')

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    emits('close')
}

const showProfilePicture = ref(false);

let isActive:any = computed(() => {
    // if (newApplicant.value.imageFile) {
    //     return true
    // } else {
    //     return false
    // }
})

const toggle:any = (status:any) => {
    if (status == 0) {
        return status = 1
    } else {
        return status = 0
    }
}

const onChange:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newApplicant.value.imageFile = event.target.files[0]
    formData.append('file', event.target.files[0])
    let images: any = document.getElementById('output')
    let image:any = document.getElementById('displayoutput')
    images.src = URL.createObjectURL(event.target.files[0])
    image.src = URL.createObjectURL(event.target.files[0])
    console.log('newApplicant image', newApplicant.value.imageFile.type)
}

const resetForm:any = Object.freeze({
        firstName: '',
        lastName: '',
        otherName: '',
        courseContentTwo: '',
        phoneNumber: '',
        addresss: '',
        imageFile: '',
        email: '',
        courseId: ''
})

const addCourse:any = async () => {
    console.log('hi');
    console.log('newstudent', newApplicant.value)
    console.log('newstudent', newApplicant.value.imageFile)
    const request:any = `${api_url}api/student/create-student`;

    // const formElem = document.getElementById('formElem')
    formData.append('firstName', newApplicant.value.firstName)
    formData.append('lastName', newApplicant.value.lastName)
    formData.append('otherName', newApplicant.value.otherName)
    formData.append('imageFile', newApplicant.value.imageFile, newApplicant.value.imageFile.name)
    formData.append('addresss', newApplicant.value.addresss)
    formData.append('phoneNumber', newApplicant.value.phoneNumber)
    formData.append('email', newApplicant.value.email)
    // formData.append('courseId', newApplicant.value.courseId)
    formData.append('courseContentTwo', newApplicant.value.courseContentTwo)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))
    
    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newApplicant.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newApplicant.value.imageFile
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    // await store.dispatch(studentActionTypes.AddNewCourse, newData)
    const result = await store.getters.getCourse
    closeModal()
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addCourse() : '';
}

onMounted(async () => {
    console.log('I am now here')
    // const request:any = `${api_url}api/course/search-courses/{pageIndex}/{pageSize}`;
    // await store.dispatch(courseActionTypes.FetchCourses, request)
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
            <p class="text-2xl"><slot name="title">Add New</slot> Applicant</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="forrmElem" ref="forrmEl" class="text-sm grid">
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="firstName" class="font-semibold">
                        First name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.firstName" name="firstName" id="firstName" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.firstName ? errors.firstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="lastName" class="font-semibold">
                        Last name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.lastName" name="lastName" id="lastName" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.lastName ? errors.lastNameText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="otherName" class="font-semibold">
                        Other name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.otherName" name="otherName" id="otherName" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.otherName ? errors.otherNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="phoneNumber" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.phoneNumber" name="phoneNumber" id="phoneNumber" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.phoneNumber ? errors.phoneNumberText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.email" name="email" id="email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>
                    
                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newApplicant.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.gender ? errors.genderText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Course*
                    </label>
                    
                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newApplicant.course" name="course" id="course">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.course ? errors.courseText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Address*
                    </label>
                    <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.address" name="address" id="address" placeholder="Write something" rows="5" class="p-4 border rounded-md text-xs focus:outline-none" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.address ? errors.addressText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
