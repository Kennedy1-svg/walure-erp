<script lang="ts">
export default {
  name: 'AddStudents',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
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

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

let errors = reactive({
    firstName: false,
    firstNameText: '',
    lastName: false,
    lastNameText: '',
    OtherName: false,
    OtherNameText: '',
    gender: false,
    genderText: '',
    email: false,
    emailText: '',
    phone: false,
    phoneText: '',
    course: false,
    courseText: '',
    image: false,
    imageText: '',
    address: false,
    addressText: '',
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

const newStudent:any = computed(() => {
    return store.getters.getNewStudent.value;
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    let imageType:String = newStudent.value.imageFile.type;
    console.log('imageType is', imageType)
    if (!newStudent.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newStudent.value.firstName.length <= 3) {
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
    }
    
    if (!newStudent.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newStudent.value.lastName.length <= 3) {
        errors.lastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.lastName = false;
    }

    if (!newStudent.value.OtherName) {
        errors.OtherName = true;
        errors.OtherNameText = 'Other name is required'
    } else if (newStudent.value.OtherName.length <= 3) {
        errors.OtherNameText = 'Other name needs to be more than 3 characters'
    } else {
        errors.OtherName = false;
    }

    if (!newStudent.value.gender) {
        errors.gender = true;
        errors.genderText = 'Gender is required. Please select a gender'
    } else {
        errors.gender = false;
    }

    if (!newStudent.value.imageFile) {
        errors.image = true;
        errors.imageText = 'Image is required. Please upload an image'
    } else if (newStudent.value.imageFile.size > 5242880) {
        errors.image = true;
        errors.imageText = 'Image size should not be more than 5MB'
    } else {
        errors.image = false;
    }

    if (!newStudent.value.courseId) {
        errors.course = true;
        errors.courseText = 'Course is required. Please select a course'
    } else {
        errors.course = false;
    }

    if (!newStudent.value.email) {
        errors.email = true;
        errors.emailText = 'email is required'
    } else if (!newStudent.value.email.match(email)) {
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }

    if (!newStudent.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newStudent.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newStudent.value.phoneNumber.match(phone)) {
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newStudent.value.phoneNumber.length <= 10) {
        errors.phoneText = 'Phone numer cannot be less than 11 digits'
    } else {
        errors.phone = false;
    }

    if (!newStudent.value.addresss) {
        errors.address = true;
        errors.addressText = 'Address is required'
    } else if (newStudent.value.addresss.length <= 13) {
        errors.addressText = 'Address needs to be more than 3 words'
    } else {
        errors.address = false;
    }

    if (errors.firstName) {
        errors.firstName = true;
        isError.value = true;
    } else if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else if (errors.OtherName) {
        errors.OtherName = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.address) {
        errors.address = true;
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
    } else if (errors.course) {
        errors.course = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}


const checkEditError:any = () => {
    // let imageType:String = newStudent.imageFile.type;
    // console.log('imageType is', imageType)
    if (!newStudent.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newStudent.value.firstName.length <= 3) {
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
    }
    
    if (!newStudent.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newStudent.value.lastName.length <= 3) {
        errors.lastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.lastName = false;
    }

    if (!newStudent.value.OtherName) {
        errors.OtherName = true;
        errors.OtherNameText = 'Other name is required'
    } else if (newStudent.value.OtherName.length <= 3) {
        errors.OtherNameText = 'Other name needs to be more than 3 characters'
    } else {
        errors.OtherName = false;
    }

    if (!newStudent.value.gender) {
        errors.gender = true;
        errors.genderText = 'Gender is required. Please select a gender'
    } else {
        errors.gender = false;
    }

    // if (!newStudent.value.image) {
    //     errors.image = true;
    //     errors.imageText = 'Image is required. Please upload an image'
    // } else if (newStudent.value.image.size > 5242880) {
    //     errors.image = true;
    //     errors.imageText = 'Image size should not be more than 5MB'
    // } else {
    //     errors.image = false;
    // }

    if (!newStudent.value.courseId) {
        errors.course = true;
        errors.courseText = 'Course is required. Please select a course'
    } else {
        errors.course = false;
    }

    if (!newStudent.value.email) {
        errors.email = true;
        errors.emailText = 'email is required'
    } else if (!newStudent.value.email.match(email)) {
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }

    if (!newStudent.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newStudent.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newStudent.value.phoneNumber.match(phone)) {
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newStudent.value.phoneNumber.length <= 10) {
        errors.phoneText = 'Phone numer cannot be less than 11 digits'
    } else {
        errors.phone = false;
    }

    if (!newStudent.value.addresss) {
        errors.address = true;
        errors.addressText = 'Address is required'
    } else if (newStudent.value.addresss.length <= 13) {
        errors.addressText = 'Address needs to be more than 3 words'
    } else {
        errors.address = false;
    }

    if (errors.firstName) {
        errors.firstName = true;
        isError.value = true;
    } else if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else if (errors.OtherName) {
        errors.OtherName = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.address) {
        errors.address = true;
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
    } else if (errors.course) {
        errors.course = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

const removeImage:any = async () => {
    newStudent.value.image = '';
    return newStudent.value.imageFile = ''    
}

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})


const emits = defineEmits(['close'])

const closeModal:any = () => {
    emits('close')
}

const showProfilePicture = ref(false);

let isActive:any = computed(() => {
    if (props.name == 'Edit') {
        newchange()
    }

    if (newStudent.value.imageFile || newStudent.value.image) {
        return true
    } else {
        return false
    }
})

const newchange:any = async () => {
    let image:any = document.getElementById('displayoutput')
    console.log('image is', newStudent.value.image)
    console.log('image itslef is', image)
    image.src = newStudent.value.image
    console.log('image source is', image.src)
}

const onChange:any = async (event:any) => {
    console.log('event', event.target.files[0].name)
    newStudent.value.imageFile = await event.target.files[0]
    formData.append('file', event.target.files[0])
    let images: any = document.getElementById('output')
    let image:any = document.getElementById('displayoutput')
    images.src = URL.createObjectURL(event.target.files[0])
    image.src = URL.createObjectURL(event.target.files[0])
    console.log('newStudent image', newStudent.value.imageFile.type)
}

const resetForm:any = Object.freeze({
        firstName: '',
        lastName: '',
        OtherName: '',
        email: '',
        phoneNumber: '',
        addresss: '',
        imageFile: '',
        gender: '',
        courseId: ''
})

const isEditing:any = computed(() => {
    let answer:any = ref(false)
    if (props.name == 'Add') {
        return
    } else if (props.name == 'Edit') {
        answer = true
    }
    return answer;
})

const addStudent:any = async () => {
    console.log('hi');
    console.log('newstudent', newStudent.value)
    console.log('newstudent', newStudent.value.imageFile)
    const request:any = `${api_url}api/student/create-student`;

    // const formElem = document.getElementById('formElem')
    formData.append('firstName', newStudent.value.firstName)
    formData.append('lastName', newStudent.value.lastName)
    formData.append('OtherName', newStudent.value.OtherName)
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
    closeModal()
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const editStudent:any = async () => {
    console.log('hi');
    console.log('newstudent image', newStudent.value)
    console.log('newstudent image', newStudent.value.image)
    const request:any = `${api_url}api/student/create-student`;

    // const formElem = document.getElementById('formElem')
    formData.append('firstName', newStudent.value.firstName)
    formData.append('lastName', newStudent.value.lastName)
    formData.append('OtherName', newStudent.value.OtherName)
    formData.append('imageFile', newStudent.value.image, newStudent.value.image.name)
    formData.append('addresss', newStudent.value.addresss)
    formData.append('phoneNumber', newStudent.value.phoneNumber)
    formData.append('gender', newStudent.value.gender)
    formData.append('courseId', newStudent.value.courseId)
    formData.append('email', newStudent.value.email)
    formData.append('Id', newStudent.value.id)

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
    await store.dispatch(studentActionTypes.EditStudent, newData)
    const result = await store.getters.getStudent
    closeModal()
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addStudent() : '';
}

const submitEdit:any = () => {
    console.log('hello editor');
    checkEditError();
    console.log('iserror value', isError.value)
    !isError.value ? editStudent() : '';
}

onMounted(async () => {
    console.log('I am now here')
    const request:any = `${api_url}api/course/get-courses`;
    await store.dispatch(courseActionTypes.FetchCourses, request)
})

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <!-- {{ newStudent }} -->
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} Student</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="formElem" ref="formEl" class="text-sm grid">
            <div class="grid justify-items-center gap-1 mb-[88px]">
                    <p class="text-[10px] text-red">
                        {{ errors.image ? errors.imageText : '' }}
                    </p>
                <div class="relative mb-8">
                    <div v-if="!isActive">
                        <SvgIcons v-if="!isActive" :class="[errors.image ? 'border rounded-full text-red border-red' : '']" class="text-gray-300" name="pic-avatar" />
                        <span class="absolute cursor-pointer left-3/5 bottom-0 bg-black rounded-full p-2">                   
                            <input type="file" name="imageFile" @change="onChange" class="opacity-0 absolute" accept=".png, .jpg, .jpeg" />
                            <SvgIcons class="text-white" name="camera" />
                        </span>
                    </div>
                    <img class="w-20 h-20 border p-1 rounded-full" :class="[ isActive ? '' : 'hidden' ]" id="displayoutput" alt="user img">
                </div>
                <div class="buttons text-grey flex gap-[50px]">
                    <button @click.prevent="removeImage" class="py-4 px-10 hover:shadow rounded border" :class="[isActive ? activeRemove : disabledRemove]" :disabled = !isActive>
                        Remove
                    </button>

                    <Modal id="profile" :show="showProfilePicture" @close="showProfilePicture = false">
                        <template #button>
                        <button type="button" class="py-4 px-10 text-white rounded hover:shadow" :class="[isActive ? activeView : disabledView]" :disabled = !isActive>
                            View Passport
                        </button>
                        </template>
                        <template #modalContent>
                            <img id="output" alt="user img">
                        </template>
                    </Modal>

                <!-- <button @click="showProfilePicture = !showProfilePicture" type="button" class="py-4 px-10 text-white rounded hover:shadow" :class="[isActive ? activeView : disabledView]" :disabled = !isActive>
                    View Passport
                </button>
                <Modal :show="showProfilePicture" @close="showProfilePicture = false">
                    <img id="output" alt="user img">
                </Modal> -->
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="firstname" class="font-semibold">
                        First name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.firstName ? errors.firstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.lastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.lastName ? errors.lastNameText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="othername" class="font-semibold">
                        Other name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.OtherName" name="othername" id="othername" placeholder="Enter other name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.OtherName ? errors.OtherNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.phoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.phone ? errors.phoneText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email*
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newStudent.email" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>
                    
                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newStudent.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
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
                    <select @focus="checkError" @keyup="checkError" class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newStudent.courseId" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.title }}</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.course ? errors.courseText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Address
                    </label>
                    <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.addresss" name="address" id="address" placeholder="Input address" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.address ? errors.addressText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button v-if="!isEditing" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
                <button v-else @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>
