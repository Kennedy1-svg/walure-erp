<script lang="ts">
export default {
  name: 'AddTalents',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import alert from '../../alerts.vue';
import SvgIcons from '../../SvgIcons.vue';
import Modal from '../../Modal.vue'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

const alertState:any = computed(() => store.getters.getBatchAlertStatus.value)
const alertText:any = computed(() => store.getters.getBatchAlertText.value)

let errors = reactive({
    firstName: false,
    firstNameText: '',
    lastName: false,
    lastNameText: '',
    role: false,
    roleText: '',
    linkedin: false,
    linkedinText: '',
    github: false,
    githubText: '',
    twitter: false,
    twitterText: '',
    gender: false,
    genderText: '',
    otherName: false,
    otherNameText: '',
    phone: false,
    phoneText: '',
    resume: false,
    resumeText: '',
    bio: false,
    bioText: '',
    image: false,
    imageText: '',
    skills: false,
    skillsText: '',
    proficiency: false,
    proficiencyText: '',
})

const status:any = computed(() => {
    let answer:any
    if (alertText.value.includes('successfully')) {
        answer = true
    } else {
        answer = false
    }
    return answer
})

const formEl:any = ref(null)

let isChecked:any = ref(false);

let formData = new FormData()

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const newTalent:any = computed(() => {
    // return store.getters.getNewTalent.value;
    return {
        firstName: '',
        lastName: '',
        role: '',}
})

const otherName ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    let imageType:String = newTalent.value.imageFile.type;
    console.log('imageType is', imageType)
    if (!newTalent.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newTalent.value.firstName.length <= 3) {
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
    }
    
    if (!newTalent.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newTalent.value.lastName.length <= 3) {
        errors.lastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.lastName = false;
    }

    if (!newTalent.value.role) {
        errors.role = true;
        errors.roleText = 'Other name is required'
    } else if (newTalent.value.role.length <= 3) {
        errors.roleText = 'Other name needs to be more than 3 characters'
    } else {
        errors.role = false;
    }

    if (!newTalent.value.gender) {
        errors.gender = true;
        errors.genderText = 'Gender is required. Please select a gender'
    } else {
        errors.gender = false;
    }

    if (!newTalent.value.imageFile) {
        errors.image = true;
        errors.imageText = 'Image is required. Please upload an image'
    } else if (newTalent.value.imageFile.size > 5242880) {
        errors.image = true;
        errors.imageText = 'Image size should not be more than 5MB'
    } else {
        errors.image = false;
    }

    // if (!newTalent.value.bioId) {
    //     errors.bio = true;
    //     errors.bioText = 'Course is required. Please select a bio'
    // } else {
    //     errors.bio = false;
    // }

    if (!newTalent.value.otherName) {
        errors.otherName = true;
        errors.otherNameText = 'otherName is required'
    } else if (!newTalent.value.otherName.match(otherName)) {
        errors.otherNameText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.otherName = false;
    }

    if (!newTalent.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newTalent.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newTalent.value.phoneNumber.match(phone)) {
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newTalent.value.phoneNumber.length <= 9) {
        errors.phoneText = 'Phone numer cannot be less than 10 digits'
    } else {
        errors.phone = false;
    }

    if (!newTalent.value.skillss) {
        errors.skills = true;
        errors.skillsText = 'Address is required'
    } else if (newTalent.value.skillss.length <= 13) {
        errors.skillsText = 'Address needs to be more than 3 words'
    } else {
        errors.skills = false;
    }

    if (errors.firstName) {
        errors.firstName = true;
        isError.value = true;
    } else if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else if (errors.role) {
        errors.role = true;
        isError.value = true;
    } else if (errors.otherName) {
        errors.otherName = true;
        isError.value = true;
    } else if (errors.skills) {
        errors.skills = true;
        isError.value = true;
    } else if (errors.image) {
        errors.image = true;
        isError.value = true;
    } else if (errors.phone) {
        errors.phone = true;
        isError.value = true;
    } else if (errors.gender) {
        errors.gender = true;
        isError.value = true;
    } else if (errors.bio) {
        errors.bio = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

const removeImage:any = async () => {
    return newTalent.value.imageFile = ''
}

const bios:any = computed(() => {
    return store.getters.getCourses.value.payload;
})


const emits = defineEmits(['close'])

const closeModal:any =  () => {
    emits('close')
    formEl.reset()
}

const showProfilePicture = ref(false);

let isActive:any = computed(() => {
    if (newTalent.value.imageFile) {
        return true
    } else {
        return false
    }
})

const onChange:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newTalent.value.imageFile = event.target.files[0]
    formData.append('file', event.target.files[0])
    let images: any = document.getElementById('output')
    let image:any = document.getElementById('displayoutput')
    images.src = URL.createObjectURL(event.target.files[0])
    image.src = URL.createObjectURL(event.target.files[0])
    console.log('newTalent image', newTalent.value.imageFile.type)
}

const resetForm:any = Object.freeze({
        firstName: '',
        lastName: '',
        role: '',
        otherName: '',
        phoneNumber: '',
        skillss: '',
        imageFile: '',
        gender: '',
        bioId: ''
})

const addTalent:any = async () => {
    console.log('hi');
    console.log('newstudent', newTalent.value)
    console.log('newstudent', newTalent.value.imageFile)
    const request:any = `${api_url}api/student/create-student`;

    // const formElem = document.getElementById('formElem')
    formData.append('firstName', newTalent.value.firstName)
    formData.append('lastName', newTalent.value.lastName)
    formData.append('role', newTalent.value.role)
    formData.append('imageFile', newTalent.value.imageFile, newTalent.value.imageFile.name)
    formData.append('skillss', newTalent.value.skillss)
    formData.append('phoneNumber', newTalent.value.phoneNumber)
    formData.append('gender', newTalent.value.gender)
    // formData.append('bioId', newTalent.value.bioId)
    formData.append('otherName', newTalent.value.otherName)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))
    
    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newTalent.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newTalent.value.imageFile
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    // await store.dispatch(studentActionTypes.AddNewTalent, newData)
    const result = await store.getters.getTalent
    closeModal()
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addTalent() : '';
}

onMounted(async () => {
    console.log('I am now here')
    // const request:any = `${api_url}api/bio/search-bios/{pageIndex}/{pageSize}`;
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
            <p class="text-2xl"><slot name="title">Add</slot> Talent</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="formElem" ref="formEl" class="text-sm grid">
            <div class="grid text-left grid-cols-2 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="firstname" class="font-semibold">
                        First name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.firstName ? errors.firstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.lastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.lastName ? errors.lastNameText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="otherName" class="font-semibold">
                        Other name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.otherName" name="otherName" id="otherName" placeholder="Enter other name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.otherName ? errors.otherNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.phoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.phone ? errors.phoneText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>
                    
                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newTalent.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.gender ? errors.genderText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="role" class="font-semibold">
                        Role*
                    </label>
                    
                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newTalent.role" name="role" id="role">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.role ? errors.roleText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="github" class="font-semibold">
                        Github Profile
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.github" name="github" id="github" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.github ? errors.githubText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="linkedin" class="font-semibold">
                        LinkedIn Profile
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.linkedin" name="linkedin" id="linkedin" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.linkedin ? errors.linkedinText : '' }}
                    </p>
                </div>
                <!-- <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>
                    
                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newTalent.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.gender ? errors.genderText : '' }}
                    </p>
                </div> -->
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="proficiency" class="font-semibold">
                        Proficiency Level*
                    </label>
                    <!-- <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.proficiency" name="proficiency" id="proficiency" placeholder="Input proficiency" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" /> -->
                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newTalent.proficiencyId" name="proficiency" id="proficiency">
                        <option value="">Select option</option> -->
                        <!-- <option  v-for="item in proficiencys" :key="item.id"  :value=item.id>{{ item.title }}</option> -->
                    <!-- </select> -->
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.proficiency ? errors.proficiencyText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="skills" class="font-semibold">
                        Skills
                    </label>
                    <!-- <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.skillss" name="skills" id="skills" placeholder="Input skills" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" /> -->
                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.skills" name="skills" id="skills" placeholder="Enter skills" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                    <select @focus="checkError" @keyup="checkError" class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newTalent.skills" name="skills" id="skills">
                        <option value="">Select option</option>
                        <!-- <option  v-for="item in proficiencys" :key="item.id"  :value=item.id>{{ item.title }}</option> -->
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.skills ? errors.skillsText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="resume" class="font-semibold">
                        Resume
                    </label>
                    <div class="flex items-center justify-start w-full">
                        <label :class="[errors.resume ? 'rounded-full text-red border-red' : '']" class="flex bg-primary-accent rounded flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center pt-8">
                                <SvgIcons name="upload" />
                                <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                    Upload Document</p>
                            </div>
                            <input type="file" name="imageFile" @change="onChange" class="opacity-0 absolute" accept=".png, .jpg, .mp4" />
                        </label>
                    </div>
                    <p class="text-xs font-medium">
                        Allowed Formats: jpg, png, mp4
                    </p>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.resume ? errors.resumeText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>