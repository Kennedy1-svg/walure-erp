<script lang="ts">
export default {
  name: 'AddUser',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import multiselect from '@vueform/multiselect'
import Modl from '../../Modals.vue'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/users/constants/action'
import * as mutationTypes from '../../../store/module/users/constants/mutation'
// import WebViewer from '../../WebViewer.vue'
// import pdfDisplay from 'vue-pdf'
// import WebViewer from '@pdftron/webviewer'
// import * as studentActionTypes from '../../../store/module/students/constants/action'
import { useStore } from 'vuex';
// import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
// import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
// import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let showTooltip = ref(false)
// let isResumeFile:any = ref(false);
// let isLoading:any = ref(false);


// const pdfSrc = ref<VuePdfPropsType['src']>('https://walure.blob.core.windows.net/assets/blobs/instructor/795427139f594572a0b6201ef4de1136.pdf')

// const numOfPages = ref(0)

// const loadingTask = createLoadingTask(pdfSrc.value)
// loadingTask.promise.then((pdf: PDFDocumentProxy) => {
    // numOfPages.value = pdf.numPages
// })

// const alertState:any = computed(() => store.getters.getInstructorAlertStatus.value)
// const alertText:any = computed(() => store.getters.getInstructorAlertText.value)

let errors = reactive({
    FirstName: false,
    FirstNameText: '',
    LastName: false,
    LastNameText: '',
    username: false,
    usernameText: '',
    linkedin: false,
    linkedinText: '',
    facebook: false,
    facebookText: '',
    department: false,
    departmentText: '',
    role: false,
    roleText: '',
    email: false,
    emailText: '',
    phone: false,
    phoneText: '',
    resume: false,
    resumeText: '',
    bio: false,
    bioText: '',
    image: false,
    imageText: '',
    address: false,
    addressText: '',
    experience: false,
    experienceText: '',
})

// const status:any = computed(() => {
//     let answer:any
//     if (alertText.value.includes('successfully')) {
//         answer = true
//     } else {
//         answer = false
//     }
//     return answer
// });

const roleoptions:any = [
    {
        label: 'DevOps',
        value: 0,
    },
    {
        label: 'Back-end Developer',
        value: 1,
    },
    {
        label: 'Front-end Developer',
        value: 2,
    },
    {
        label: 'UI/UX Designer',
        value: 3,
    },
    {
        label: 'Product Designer',
        value: 4,
    },
    {
        label: 'Product Manager',
        value: 5,
    },
    {
        label: 'Mobile Developer',
        value: 6,
    },
    {
        label: 'iOS Developer',
        value: 7,
    },
    {
        label: 'Android Developer',
        value: 8,
    },
    {
        label: 'Full Stack Developer',
        value: 9,
    },
    {
        label: 'Enterprise Architect',
        value: 10,
    },
    {
        label: 'Project Manager',
        value: 11,
    },
    {
        label: 'Business Analyst',
        value: 12,
    },
    {
        label: 'CTO',
        value: 13,
    },
    {
        label: 'Data Scientist',
        value: 14,
    },
    {
        label: 'Software Developer',
        value: 15,
    },
    {
        label: 'Operations Manager',
        value: 16,
    },
    {
        label: 'Human Resource Manager',
        value: 17,
    },
    {
        label: 'Quality Assurance Manager',
        value: 18,
    },
]

let pdfSource:any = ref('');

let isChecked:any = ref(false);

let formData = new FormData();

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const newUser:any = computed(() => {
    return store.getters.getNewInstructor.value;
});

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newUser.value.Image.type;
    // console.log('imageType is', imageType)
    if (!newUser.value.FirstName) {
        errors.FirstName = true;
        errors.FirstNameText = 'First name is required'
    } else if (newUser.value.FirstName.length <= 3) {
        errors.FirstName = true;
        errors.FirstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.FirstName = false;
    }
    
    if (!newUser.value.LastName) {
        errors.LastName = true;
        errors.LastNameText = 'Last name is required'
    } else if (newUser.value.LastName.length <= 3) {
        errors.LastName = true;
        errors.LastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.LastName = false;
    }

    if (!newUser.value.UserName) {
        errors.username = true;
        errors.usernameText = 'User name is required'
    } else if (newUser.value.UserName.length <= 3) {
        errors.username = true;
        errors.usernameText = 'User name needs to be more than 3 characters'
    } else {
        errors.username = false;
    }

    if (!newUser.value.Department) {
        errors.department = true;
        errors.departmentText = 'Department is required'
    } else if (newUser.value.Department.length <= 3) {
        errors.department = true;
        errors.departmentText = 'Department needs to be more than 3 characters'
    } else {
        errors.department = false;
    }

    if (!newUser.value.Role && newUser.value.Role != '0') {
        errors.role = true;
        errors.roleText = 'Role is required. Please select a role'
    } else {
        errors.role = false;
    }

    if (!newUser.value.Email) {
        errors.email = true;
        errors.emailText = 'email is required'
    } else if (!newUser.value.Email.match(email)) {
        errors.email = true;
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }

    if (!newUser.value.PhoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newUser.value.PhoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newUser.value.PhoneNumber.match(phone)) {
        errors.phone = true;
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newUser.value.PhoneNumber.length <= 9) {
        errors.phone = true;
        errors.phoneText = 'Phone numer cannot be less than 10 digits'
    } else {
        errors.phone = false;
    }

    if (errors.FirstName) {
        errors.FirstName = true;
        isError.value = true;
    } else if (errors.LastName) {
        errors.LastName = true;
        isError.value = true;
    } else if (errors.username) {
        errors.username = true;
        isError.value = true;
    } else if (errors.department) {
        errors.department = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.phone) {
        errors.phone = true;
        isError.value = true;
    } else if (errors.role) {
        errors.role = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

// const viewer:any = ref(null)
// const input:any = document.getElementById('resume_upload');
// const path = `http://localhost:3000/webviewer`;

// WebViewer({path, initialDoc: newUser.value.Resume}, input)
//     .then(instance => {
//         // const { Feature } = instance.UI
//         // instance.UI.enableFeatures([Feature.FilePicker])
//         input.addEventListner('change', () => {
//             const file = input.files[0];
//             instance.UI.loadDocument(file, { filename: file.name})
//         })
//     })

const removeImage:any = async () => {
    return newUser.value.Image = ''
}

const removeResume:any = async () => {
    return newUser.value.Resume = ''
}

const bios:any = computed(() => {
    return store.getters.getCourses.value.payload;
})

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    store.commit(mutationTypes.SetNewUser, {})
    emits('close')
    // formEl.reset()
}

const showProfilePicture = ref(false);

const showResume = ref(false)

const testing:any = () => {
    console.log(showResume.value)
    console.log(newUser.value)
}

let isActive:any = computed(() => {
    if (newUser.value.Image) {
        return true
    } else {
        return false
    }
})

let isResumeActive:any = computed(() => {
    if (newUser.value.Resume) {
        checkError();
        return true
    } else {
        return false
    }
})

const onChange:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newUser.value.Image = event.target.files[0]
    formData.append('file', event.target.files[0])
    let images: any = document.getElementById('addinstructoroutput')
    let image:any = document.getElementById('displayoutput')
    images.src = URL.createObjectURL(event.target.files[0])
    image.src = URL.createObjectURL(event.target.files[0])
    console.log('newUser image', newUser.value.Image.type)
}

const onChangeResume:any = (event:any):any => {
    console.log('event', event.target.files[0])
    newUser.value.Resume = event.target.files[0]
    formData.append('Resume', event.target.files[0])
    // let images: any = document.getElementById('addinstructoroutput')
    // let image:any = document.getElementById('displayoutput')
    pdfSource.value = URL.createObjectURL(event.target.files[0])
    // image.src = URL.createObjectURL(event.target.files[0])
    console.log('newUser resume', newUser.value.Resume.type)
    console.log('newUser link', pdfSource.value)
}

const addInstructor:any = async () => {
    console.log('hi');
    console.log('newstudent', newUser.value)
    console.log('newstudent', newUser.value.image)
    const request:any = `${api_url}api/instructor/create-instructor`;

    // const formElem = document.getElementById('formElem')
    formData.append('FirstName', newUser.value.FirstName)
    formData.append('LastName', newUser.value.LastName)
    formData.append('OtherName', newUser.value.OtherName)
    formData.append('UserName', newUser.value.UserName)
    formData.append('Department', newUser.value.Department)
    formData.append('LinkedInUrl', newUser.value.LinkedInUrl)
    formData.append('FacebookUrl', newUser.value.FacebookUrl)
    formData.append('Image', newUser.value.Image, newUser.value.Image.name)
    // formData.append('Resume', newUser.value.Resume, newUser.value.Resume.name)
    formData.append('Address', newUser.value.Address)
    formData.append('PhoneNumber', newUser.value.PhoneNumber)
    formData.append('Role', newUser.value.Role)
    formData.append('Bio', newUser.value.Bio)
    formData.append('Email', newUser.value.Email)
    formData.append('ExperienceLevel', newUser.value.ExperienceLevel)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))
    
    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newUser.value))

    // const submitdata = {
    //     ...formData,
    //     image: newUser.value.image
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.AddNewUser, newData)
    const result = await store.getters.getUsers
    store.commit(mutationTypes.SetNewUser, {})
    closeModal()
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const newFile:any = computed(() => {
    return pdfSource
})

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addInstructor() : '';
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
    <div class="main relative w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <!-- <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add Role</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div> -->
        <form id="formElem" ref="formEl" class="text-sm grid">
            <div class="grid text-left grid-cols-3 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="username" class="font-semibold">
                        Username
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.UserName" name="username" id="username" placeholder="Enter username" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.username ? errors.usernameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="firstname" class="font-semibold">
                        First name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.FirstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.FirstName ? errors.FirstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.LastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.LastName ? errors.LastNameText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-3 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newUser.Email" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.PhoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.phone ? errors.phoneText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="role" class="font-semibold">
                        Role
                    </label>
                       
                    <multiselect v-model="newUser.Role" @clear="checkError" @select="checkError" valueProp="value" :options="roleoptions" track-by="label" label="label" placeholder="Select role" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.role ? errors.roleText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-3 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="username" class="font-semibold">
                        Department
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.Department" name="username" id="username" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.department ? errors.departmentText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>

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