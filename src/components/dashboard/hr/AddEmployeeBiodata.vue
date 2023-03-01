<script lang="ts">
export default {
  name: 'AddEmployeeBiodata',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import moment from 'moment';
import SvgIcons from '../../SvgIcons.vue';
import multiselect from '@vueform/multiselect'
import Modal from '../../Modal.vue'
import Datepicker from '@vuepic/vue-datepicker';
import 'v-calendar/dist/style.css';
import '@vuepic/vue-datepicker/dist/main.css'
import * as actionTypes from '../../../store/module/instructors/constants/action'
import * as mutationTypes from '../../../store/module/instructors/constants/mutation'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

const activeTab:any = ref(0)
const photoactiveTab:any = ref(0)
const completeTab:any = reactive({
    personal: true,
    more: false
})

const props = defineProps({
    name: {
    type: String,
  }
});

const isBannerActive:any = computed(() => {
    let answer:any = false
    if (newEmployeeBiodata.value.banner) {
        answer = true
    }
    return answer
})

const isBannerRemoved:any = ref(false)

const removeBanner:any = async () => {
    return newEmployeeBiodata.value.banner = ''
}

const onChangePhoto:any = (event:any):any => {
    console.log('event', event.target.files[0])
    newEmployeeBiodata.value.Resume = event.target.files[0]
    formData.append('Resume', event.target.files[0])
    // let images: any = document.getElementById('addinstructoroutput')
    // let image:any = document.getElementById('displayoutput')
    pdfSource.value = URL.createObjectURL(event.target.files[0])
    // image.src = URL.createObjectURL(event.target.files[0])
    console.log('newEmployeeBiodata resume', newEmployeeBiodata.value.Resume.type)
    console.log('newEmployeeBiodata link', pdfSource.value)
}

const tabs:any = [
	"1. Personal Details",
	"2. More Details",
	"3. Upload Photo",
]

const phototabs:any = [
	"Upload Picture",
	"Signature",
	"Others",
]

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

let pdfSource:any = ref('');

// const alertState:any = computed(() => store.getters.getBatchAlertStatus.value)
// const alertText:any = computed(() => store.getters.getBatchAlertText.value)

const format:any = (date:any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

let errors = reactive({
    lastName: false,
    lastNameText: '',
    firstName: false,
    firstNameText: '',
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
    email: false,
    emailText: '',
})

const formEl:any = ref(null)

let isChecked:any = ref(false);

let formData = new FormData()

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const today:any = moment().format('YYYY-MM-DD');
let date = new Date();

const beforeDate:any = (years:any = 0, months:any = 0, days:any = 0) => {
    let year  = date.getFullYear();
    let month = date.getMonth();
    let day   = date.getDate();
    let newDate  = new Date(year - years, month - months, day - days);
    return newDate;
}

const afterDate:any = (years:any = 0, months:any = 0, days:any = 0) => {
    let year  = date.getFullYear();
    let month = date.getMonth();
    let day   = date.getDate();
    let newDate  = new Date(year + years, month + months, day + days);
    return newDate;
}

let dobRestriction:any = beforeDate(18)

const newEmployeeBiodata:any = computed(() => {
    return store.getters.getNewTalent.value;
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newEmployeeBiodata.value.imageFile.type;
    console.log('newEmployeeBiodata skill is', JSON.stringify(newEmployeeBiodata.value.Skills))
    if (!newEmployeeBiodata.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newEmployeeBiodata.value.lastName.length <= 3) {
        errors.lastName = true;
        errors.lastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.lastName = false;
        errors.lastNameText = ''
    }

    if (!newEmployeeBiodata.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newEmployeeBiodata.value.firstName.length <= 3) {
        errors.firstName = true;
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
        errors.firstNameText = ''
    }

    if (!newEmployeeBiodata.value.emailAddress) {
        errors.email = true;
        errors.emailText = 'Email is required'
    } else if (!newEmployeeBiodata.value.emailAddress.match(email)) {
        errors.email = true;
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }


    if (!newEmployeeBiodata.value.GitHubUrl) {
        errors.github = true;
        errors.githubText = 'Github url is required'
    } else if (newEmployeeBiodata.value.GitHubUrl.length <= 3) {
        errors.github = true;
        errors.githubText = 'Github url needs to be more than 3 characters'
    } else {
        errors.github = false;
        errors.githubText = ''
    }

    if (!newEmployeeBiodata.value.LinkedInUrl) {
        errors.linkedin = true;
        errors.linkedinText = 'LinkedIn url is required'
    } else if (newEmployeeBiodata.value.LinkedInUrl.length <= 3) {
        errors.linkedin = true;
        errors.linkedinText = 'LinkedIn url needs to be more than 3 characters'
    } else {
        errors.linkedin = false;
        errors.linkedinText = ''
    }

    if (!newEmployeeBiodata.value.Resume) {
        errors.resume = true;
        errors.resumeText = 'Your resume is required'
    } else {
        errors.resume = false;
        errors.resumeText = ''
    }

    if (!newEmployeeBiodata.value.Role && newEmployeeBiodata.value.Role != '0') {
        errors.role = true;
        errors.roleText = 'Please select a role'
    } else {
        errors.role = false;
        errors.roleText = ''
    }

    if (!newEmployeeBiodata.value.Gender && newEmployeeBiodata.value.Gender != '0') {
        errors.gender = true;
        errors.genderText = 'Gender is required. Please select a gender'
    } else {
        errors.gender = false;
        errors.genderText = ''
    }

    if (!newEmployeeBiodata.value.ProficiencyLevel && newEmployeeBiodata.value.ProficiencyLevel != '0') {
        errors.proficiency = true;
        errors.proficiencyText = 'Proficiency is required. Please select a proficiency'
    } else {
        errors.proficiency = false;
        errors.proficiencyText = ''
    }

    if (newEmployeeBiodata.value.Skills.length == 0) {
        errors.skills = true;
        errors.skillsText = 'Please select at least a skill'
    } else {
        errors.skills = false;
    }

    if (!newEmployeeBiodata.value.PhoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newEmployeeBiodata.value.PhoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newEmployeeBiodata.value.PhoneNumber.match(phone)) {
        errors.phone = true;
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newEmployeeBiodata.value.PhoneNumber.length <= 9) {
        errors.phone = true;
        errors.phoneText = 'Phone numer cannot be less than 10 digits'
    } else {
        errors.phone = false;
        errors.phoneText = ''
    }

    // if (newEmployeeBiodata.value.Skills.value <= 0) {
    //     errors.skills = true;
    //     errors.skillsText = 'Skill is required'
    // } else {
    //     errors.skills = false;
    //     errors.skillsText = ''
    // }

    if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else if (errors.firstName) {
        errors.firstName = true;
        isError.value = true;
    } else if (errors.role) {
        errors.role = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
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

let isResumeActive:any = computed(() => {
    if (newEmployeeBiodata.value.Resume) {
        checkError();
        return true
    } else {
        return false
    }
})

// const removeImage:any = async () => {
//     return newEmployeeBiodata.value.imageFile = ''
// }

const removeResume:any = async () => {
    return newEmployeeBiodata.value.Resume = ''
}

const gender_options = [
    {
        label: "Male",
        value: 0,
    },
    {
        label: "Female",
        value: 1,
    },
]

const jobTitle = [
    {
        label: "Front-end engineer",
        value: 0,
    },
    {
        label: "Back-end Engineer",
        value: 1,
    },
    {
        label: "DevOps engineer",
        value: 2,
    },
    {
        label: "Infrastructure Engineer",
        value: 3,
    },
    {
        label: "Full Stack engineer",
        value: 4,
    },
    {
        label: "Product Designer",
        value: 5,
    },
]

const marital_status = [
    {
        label: "Single",
        value: 0,
    },
    {
        label: "Married",
        value: 1,
    },
    {
        label: "It's complicated",
        value: 2,
    },
]

const reminder_status = [
    {
        label: "A day before",
        value: 0,
    },
    {
        label: "Daily",
        value: 1,
    },
    {
        label: "Monthly",
        value: 2,
    },
]

const states = [
    {
        label: "Abia",
        value: "Abia",
    },
    {
        label: "Adamawa",
        value: "Adamawa",
    },
    {
        label: "Akwa Ibom",
        value: "Akwa Ibom",
    },
    {
        label: "Anambra",
        value: "Anambra",
    },
    {
        label: "Bauchi",
        value: "Bauchi",
    },
    {
        label: "Bayelsa",
        value: "Bayelsa",
    },
    {
        label: "Benue",
        value: "Benue",
    },
    {
        label: "Borno",
        value: "Borno",
    },
    {
        label: "Cross River",
        value: "Cross River",
    },
    {
        label: "Delta",
        value: "Delta",
    },
    {
        label: "Ebonyi",
        value: "Ebonyi",
    },
    {
        label: "Edo",
        value: "Edo",
    },
    {
        label: "Ekiti",
        value: "Ekiti",
    },
    {
        label: "Enugu",
        value: "Enugu",
    },
    {
        label: "Gombe",
        value: "Gombe",
    },
    {
        label: "Imo",
        value: "Imo",
    },
    {
        label: "Jigawa",
        value: "Jigawa",
    },
    {
        label: "Kaduna",
        value: "Kaduna",
    },
    {
        label: "Kano",
        value: "Kano",
    },
    {
        label: "Katsina",
        value: "Katsina",
    },
    {
        label: "Kebbi",
        value: "Kebbi",
    },
    {
        label: "Kogi",
        value: "Kogi",
    },
    {
        label: "Kwara",
        value: "Kwara",
    },
    {
        label: "Lagos",
        value: "Lagos",
    },
    {
        label: "Nasarawa",
        value: "Nasarawa",
    },
    {
        label: "Niger",
        value: "Niger",
    },
    {
        label: "Ogun",
        value: "Ogun",
    },
    {
        label: "Ondo",
        value: "Ondo",
    },
    {
        label: "Osun",
        value: "Osun",
    },
    {
        label: "Oyo",
        value: "Oyo",
    },
    {
        label: "Plateau",
        value: "Plateau",
    },
    {
        label: "Rivers",
        value: "Rivers",
    },
    {
        label: "Sokoto",
        value: "Sokoto",
    },
    {
        label: "Taraba",
        value: "Taraba",
    },
    {
        label: "Yobe",
        value: "Yobe",
    },
    {
        label: "Zamfara",
        value: "Zamfara",
    },
    {
        label: "FCT",
        value: "FCT",
    },
]

const proficiency_options = [
    {
        label: "Beginner",
        value: 0,
    },
    {
        label: "Intermediate",
        value: 1,
    },
    {
        label: "Advanced",
        value: 2,
    },
    {
        label: "Senior",
        value: 3,
    },
]

// const role_options = [
//     {
//         label: 'DevOps',
//         value: 'DevOps',
//     },
//     {
//         label: 'Back-end Developer',
//         value: 'Back-end Developer',
//     },
//     {
//         label: 'Front-end Developer',
//         value: 'Front-end Developer',
//     },
//     {
//         label: 'UI/UX Designer',
//         value: 'UI/UX Designer',
//     },
//     {
//         label: 'Product Designer',
//         value: 'Product Designer',
//     },
//     {
//         label: 'Product Manager',
//         value: 'Product Manager',
//     },
//     {
//         label: 'Mobile Developer',
//         value: 'Mobile Developer',
//     },
//     {
//         label: 'iOS Developer',
//         value: 'iOS Developer',
//     },
//     {
//         label: 'Android Developer',
//         value: 'Android Developer',
//     },
//     {
//         label: 'Full Stack Developer',
//         value: 'Full Stack Developer',
//     },
//     {
//         label: 'Enterprise Architect',
//         value: 'Enterprise Architect',
//     },
//     {
//         label: 'Project Manager',
//         value: 'Project Manager',
//     },
//     {
//         label: 'Business Analyst',
//         value: 'Business Analyst',
//     },
//     {
//         label: 'CTO',
//         value: 'CTO',
//     },
//     {
//         label: 'Data Scientist',
//         value: 'Data Scientist',
//     },
//     {
//         label: 'Software Developer',
//         value: 'Software Developer',
//     },
//     {
//         label: 'Operations Manager',
//         value: 'Operations Manager',
//     },
//     {
//         label: 'Human Resource Manager',
//         value: 'Human Resource Manager',
//     },
//     {
//         label: 'Quality Assurance Manager',
//         value: 'Quality Assurance Manager',
//     },
// ]
const role_options = [
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

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    store.commit(mutationTypes.SetNewTalent, {})
    emits('close')
    isDisabled.value = false;
    // formEl.reset()
}

const showResume = ref(false);

const showProfilePicture = ref(false);

const skills:any = computed(() => {
    return store.getters.getSkills.value.payload;
})

let isActive:any = computed(() => {
    if (newEmployeeBiodata.value.imageFile) {
        return true
    } else {
        return false
    }
})

const deselect:any = async () => {
    const request:any = `${api_url}api/skill/get-skills`;
    store.dispatch(actionTypes.FetchSkills, request)
    store.getters.getSkills.value
}

const onChange:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newEmployeeBiodata.value.ResumeFile = event.target.files[0]
    formData.append('file', event.target.files[0])
    // let images: any = document.getElementById('output')
    pdfSource.value = URL.createObjectURL(event.target.files[0])
    console.log('newInstructor link', pdfSource.value)
    // let image:any = document.getElementById('displayoutput')
    // images.src = URL.createObjectURL(event.target.files[0])
    // image.src = URL.createObjectURL(event.target.files[0])
    console.log('newEmployeeBiodata image', newEmployeeBiodata.value.ResumeFile.type)
}

const addTalent:any = async () => {
    console.log('hi');
    isDisabled.value = true;
    // console.log('newstudent', newEmployeeBiodata.value)
    // console.log('newstudent', newEmployeeBiodata.value.imageFile)
    const request:any = `${api_url}api/talentpool/create-talentpool`;

    // const formElem = document.getElementById('formElem')
    formData.append('lastName', newEmployeeBiodata.value.lastName)
    formData.append('firstName', newEmployeeBiodata.value.firstName)
    // formData.append('OtherName', newEmployeeBiodata.value.OtherName)
    formData.append('Role', newEmployeeBiodata.value.Role)
    // formData.append('imageFile', newEmployeeBiodata.value.imageFile, newEmployeeBiodata.value.imageFile.name)
    formData.append('emailAddress', newEmployeeBiodata.value.emailAddress)
    formData.append('Gender', newEmployeeBiodata.value.Gender)
    formData.append('Skills', newEmployeeBiodata.value.Skills)
    formData.append('PhoneNumber', newEmployeeBiodata.value.PhoneNumber)
    formData.append('ResumeFile', newEmployeeBiodata.value.ResumeFile, newEmployeeBiodata.value.ResumeFile.name)
    formData.append('ProficiencyLevel', newEmployeeBiodata.value.ProficiencyLevel)
    formData.append('GitHubUrl', newEmployeeBiodata.value.GitHubUrl)
    formData.append('LinkedInUrl', newEmployeeBiodata.value.LinkedInUrl)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))

    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newEmployeeBiodata.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newEmployeeBiodata.value.imageFile
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.AddNewTalent, newData)
    const result = await store.getters.getTalents
    closeModal()
    store.commit(mutationTypes.SetNewTalent, {})
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
    console.log('I am now heres')
    const request:any = `${api_url}api/skill/get-skills`;
    await store.dispatch(actionTypes.FetchSkills, request)

    let tabsIndex:any = document.getElementById("tabs")

    console.log('tabindex', tabsIndex)
})

const activeRemove:any = 'border-primary text-primary hFirstnameover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl font-semibold">Add Employee</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <div class="flex">
            <div class="w-1/3 mt4">
                <ul class="grid w-full justify-start itemscenter my4">
                    <template v-for="(tab, index) in tabs" :key="index">
                        <li id="tabs" class="cursor-pointer py-2 xl:pr-14 pr-10 xl:pl-4 pl-2 text-left font-semibold"
                            :class="[activeTab===index ? 'text-white bg-primary' : '']" @click="activeTab = index"
                            v-text="tab"></li>
                    </template>
                </ul>
                <!-- <ul class="grid w-full justify-start itemscenter my4">
                    <template>
                        <li class="cursor-pointer py-2 xl:pr-14 pr-10 xl:pl-4 pl-2 text-left font-semibold" :class="[activeTab===0 ? 'text-white bg-primary' : '']" @click="activeTab = 0" v-text="'1. Personal Details'">

                        </li>
                        <li class="cursor-pointer py-2 xl:pr-14 pr-10 xl:pl-4 pl-2 text-left font-semibold">
                            2. More Details
                        </li>
                        <li class="cursor-pointer py-2 xl:pr-14 pr-10 xl:pl-4 pl-2 text-left font-semibold">
                            3. Personal Details
                        </li>
                    </template>
                </ul> -->
            </div>
            <div class="w-2/3">
                <div class="rounded-md text-center w-full mx-auto overflow-auto">
                    <div v-show="activeTab===0">
                        <form id="formElem" ref="formEl" class="text-sm grid">
                            <div class="grid text-left grid-cols-2 gap-10 mb-10">
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        lastName
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.lastName" name="lastName" id="lastName" placeholder="Enter lastName" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="firstname" class="font-semibold">
                                        Firstname
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.firstName ? errors.firstNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="otherName" class="font-semibold">
                                        Other names
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.otherName" name="otherName" id="otherName" placeholder="Enter other name" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.otherName ? errors.otherNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="religion" class="font-semibold">
                                        Religion
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.religion" name="religion" id="religion" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.firstName ? errors.firstNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        State of origin
                                    </label>
                                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.lastName" name="lastName" id="lastName" placeholder="Enter lastName" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                                    <multiselect v-model="newEmployeeBiodata.state" @select="checkError" valueProp="value" :options="states" track-by="label" label="label" placeholder="Select state" :searchable="true" class="multiselect-blue" />
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4" id="dot">
                                    <label for="dot" class="font-semibold">
                                        Date of birth
                                    </label>
                                    <!-- <DatePicker v-model="newEmployeeBiodata.dot">
                                        <template v-slot="{ inputValue, inputEvents }">
                                            <input
                                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                                            :value="inputValue"
                                            v-on="inputEvents"
                                            />
                                        </template>
                                    </DatePicker> -->
                                    <Datepicker inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newEmployeeBiodata.dot" placeholder="Select Date" :format="format" :maxDate="dobRestriction" position="left" teleport="#dot" autoApply/>
                                    <!-- <datepicker /> -->
                                    <p class="text-[10px] text-red">
                                        <!-- {{ errors.dot ? errors.dotText : '' }} -->
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        Sex
                                    </label>
                                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.lastName" name="lastName" id="lastName" placeholder="Enter lastName" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                                    <multiselect v-model="newEmployeeBiodata.Gender" @select="checkError" valueProp="value" :options="gender_options" track-by="label" label="label" placeholder="Select state" :searchable="true" class="multiselect-blue" />
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        Marital Status
                                    </label>
                                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.lastName" name="lastName" id="lastName" placeholder="Enter lastName" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                                    <multiselect v-model="newEmployeeBiodata.maritalStatus" @select="checkError" valueProp="value" :options="marital_status" track-by="label" label="label" placeholder="Select state" :searchable="true" class="multiselect-blue" />
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        Job Title
                                    </label>
                                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.lastName" name="lastName" id="lastName" placeholder="Enter lastName" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                                    <multiselect v-model="newEmployeeBiodata.jobTitle" @select="checkError" valueProp="value" :options="jobTitle" track-by="label" label="label" placeholder="Select state" :searchable="true" class="multiselect-blue" />
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        Contact Number
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.PhoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.phone ? errors.phoneText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4 col-span-2">
                                    <label for="email" class="font-semibold">
                                        emailAddress
                                    </label>
                                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.emailAddress" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.email ? errors.emailText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4 col-span-2">
                                    <label for="email" class="font-semibold">
                                        Home Address
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.address" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.email ? errors.emailText : '' }}
                                    </p>
                                </div>
                            </div>
                            <div class="mb-7 grid justify-start font-semibold">
                                <h4 class="uppercase text-2xl font-semibold text-[#232D42] mb-5 text-left">Birthday reminder</h4>
                                <div class="grid text-left grid-cols-2 gap-10 mb-10">
                                    <div class="grid gap-4" id="dota">
                                        <label for="dota" class="font-semibold">
                                            Date of birth
                                        </label>
                                        <Datepicker inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newEmployeeBiodata.dot" placeholder="Select Date" :maxDate="dobRestriction" :format="format" position="left" teleport="#dota"/>
                                        <!-- <datepicker /> -->
                                        <p class="text-[10px] text-red">
                                            <!-- {{ errors.dot ? errors.dotText : '' }} -->
                                        </p>
                                    </div>
                                    <div class="grid gap-4">
                                        <label for="lastName" class="font-semibold">
                                            Set reminder
                                        </label>
                                        <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.lastName" name="lastName" id="lastName" placeholder="Enter lastName" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                                        <multiselect v-model="newEmployeeBiodata.reminder" @select="checkError" valueProp="value" :options="reminder_status" track-by="label" label="label" placeholder="Select state" :searchable="true" class="multiselect-blue" />
                                        <p class="text-[10px] -mt-2 text-red">
                                            {{ errors.lastName ? errors.lastNameText : '' }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end pb-10">
                                <button @click.prevent="activeTab=1" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Next</button>
                            </div>
                        </form>
                    </div>
                    <div v-show="activeTab===1">
                        <h4 class="uppercase text-2xl font-semibold text-[#232D42] text-left mb-4">next of kin details</h4>
                        <form id="formElem" ref="formEl" class="text-sm grid">
                            <div class="grid text-left grid-cols-2 gap-12 mb-10">
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        Name of Next kin
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.nextKinName" name="lastName" id="lastName" placeholder="Enter sur name" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="firstname" class="font-semibold">
                                        Relationship
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.nextKinRelationship" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.firstName ? errors.firstNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        State of origin
                                    </label>
                                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.lastName" name="lastName" id="lastName" placeholder="Enter lastName" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                                    <multiselect v-model="newEmployeeBiodata.nextKinState" @select="checkError" valueProp="value" :options="states" track-by="label" label="label" placeholder="Select state" :searchable="true" class="multiselect-blue" />
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        Sex
                                    </label>
                                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.lastName" name="lastName" id="lastName" placeholder="Enter lastName" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                                    <multiselect v-model="newEmployeeBiodata.nextKinGender" @select="checkError" valueProp="value" :options="gender_options" track-by="label" label="label" placeholder="Select state" :searchable="true" class="multiselect-blue" />
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4 col-span-2">
                                    <label for="lastName" class="font-semibold">
                                        Contact Number
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.nextKinPhoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.phone ? errors.phoneText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4 col-span-2">
                                    <label for="email" class="font-semibold">
                                        Home Address
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.nextKinAddress" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.email ? errors.emailText : '' }}
                                    </p>
                                </div>
                            </div>
                            <hr class="mt-4 mb-6 " />
                            <h4 class="uppercase text-2xl font-semibold text-[#232D42] text-left mb-5">bank details</h4>
                            <div class="grid text-left grid-cols-2 gap-12 mb-10">
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        Bank Name
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.bankName" name="lastName" id="lastName" placeholder="Enter sur name" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.lastName ? errors.lastNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="firstname" class="font-semibold">
                                        Account Name
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.accountName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.firstName ? errors.firstNameText : '' }}
                                    </p>
                                </div>
                                <div class="grid gap-4">
                                    <label for="lastName" class="font-semibold">
                                        Account Number
                                    </label>
                                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newEmployeeBiodata.accountNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                                    <p class="text-[10px] -mt-2 text-red">
                                        {{ errors.phone ? errors.phoneText : '' }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex justify-between pb-10">
                                <button @click.prevent="activeTab=0" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border border-primary text-primary rounded-md">Back</button>
                                <button @click.prevent="activeTab=2" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Next</button>
                            </div>
                        </form>
                    </div>
                    <div v-show="activeTab===2">
                        <p class="text-xl font-semibold text-left mb-4">Upload required document</p>
                        <ul class="flex w-full justify-start mb-8">
                            <template v-for="(tab, index) in phototabs" :key="index">
                                <li id="tabs" class="cursor-pointer py-2 xl:pr-14 pr-10 xl:pl-4 pl-2 text-left font-semibold"
                                    :class="[photoactiveTab===index ? 'text-white bg-primary' : '']" @click="photoactiveTab = index"
                                    v-text="tab"></li>
                            </template>
                        </ul>
                        <div v-show="photoactiveTab===0">
                            <div class="grid gap-4">
                                <!-- <label for="resume" class="font-semibold">
                                    Resume
                                </label> -->
                                <div class="grid items-center w-full">
                                    <label for="resume_upload" :class="[errors.resume ? 'text-red border-red' : '']" class="flex bg-primary-accent rounded flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                        <div class="flex flex-col items-center pt-8">
                                            <SvgIcons name="upload" />
                                            <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                                Upload Document</p>
                                        </div>
                                        <input type="file" id="resume_upload" name="resume" @change="onChangePhoto" class="opacity-0 absolute" accept=".png, .jpeg, .jpg" :disabled="isResumeActive" />
                                    </label>
                                    <div v-if="newEmployeeBiodata.Resume" class="flex justify-between mt-5 w-1/2 rounded items-center p-5 bg-primary-accent" :class="[isResumeActive ? '' : 'hidden']">
                                        <div class="">
                                            <p class="font-semibold py-1 w-40 truncate">
                                                {{ newEmployeeBiodata.Resume.name }}
                                            </p>
                                            <p class="text-xs pb-1 text-left text-gray-500">
                                                {{ newEmployeeBiodata.Resume.size > 999999 ? (newEmployeeBiodata.Resume.size / 1000000).toFixed(2) + 'Mb' : newEmployeeBiodata.Resume.size > 999 ? (newEmployeeBiodata.Resume.size / 1000).toFixed(2) + ' kb' : newEmployeeBiodata.Resume.size + ' bytes' }}
                                            </p>
                                        </div>
                                        <div class="flex justify-around gap-3 items-center">
                                            <a :href="pdfSource">
                                            <SvgIcons name="eye" /></a>
                                            <!-- <Modl :show="showResume" @close="showResume = !showResume"> -->
                                                <!-- <vue-pdf src="https://drive.google.com/file/d/0BwO1glerFQloUmxabTBEWUxvMFk/view?usp=sharing&resourcekey=0-cjnce0_aI2EE5MrdUTRJsA"></vue-pdf> -->
                                                <!-- <AddSkill name="Add" />
                                            </Modl> -->
                                            <SvgIcons name="delete" @click="removeResume" />
                                        </div>
                                    </div>
                                    <!-- <div id="viewer" style="width: 1024px; height: 600px;"></div> -->
                                </div>
                                <p class="text-xs text-left font-medium">
                                    Allowed Formats: png, jpeg
                                </p>
                                <p class="text-[10px] -mt-2 text-red">
                                    {{ errors.resume ? errors.resumeText : '' }}
                                </p>
                            </div>
                        </div>
                        <div v-show="photoactiveTab===1">
                            <div class="grid gap-4">
                                <!-- <label for="resume" class="font-semibold">
                                    Resume
                                </label> -->
                                <div class="grid items-center w-full">
                                    <label for="resume_upload" :class="[errors.resume ? 'text-red border-red' : '']" class="flex bg-primary-accent rounded flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                        <div class="flex flex-col items-center pt-8">
                                            <SvgIcons name="upload" />
                                            <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                                Upload Document</p>
                                        </div>
                                        <input type="file" id="resume_upload" name="resume" @change="onChangePhoto" class="opacity-0 absolute" accept=".png, .jpeg, .jpg" :disabled="isResumeActive" />
                                    </label>
                                    <div v-if="newEmployeeBiodata.Resume" class="flex justify-between mt-5 w-1/2 rounded items-center p-5 bg-primary-accent" :class="[isResumeActive ? '' : 'hidden']">
                                        <div class="">
                                            <p class="font-semibold py-1 w-40 truncate">
                                                {{ newEmployeeBiodata.Resume.name }}
                                            </p>
                                            <p class="text-xs pb-1 text-left text-gray-500">
                                                {{ newEmployeeBiodata.Resume.size > 999999 ? (newEmployeeBiodata.Resume.size / 1000000).toFixed(2) + 'Mb' : newEmployeeBiodata.Resume.size > 999 ? (newEmployeeBiodata.Resume.size / 1000).toFixed(2) + ' kb' : newEmployeeBiodata.Resume.size + ' bytes' }}
                                            </p>
                                        </div>
                                        <div class="flex justify-around gap-3 items-center">
                                            <a :href="pdfSource">
                                            <SvgIcons name="eye" /></a>
                                            <!-- <Modl :show="showResume" @close="showResume = !showResume"> -->
                                                <!-- <vue-pdf src="https://drive.google.com/file/d/0BwO1glerFQloUmxabTBEWUxvMFk/view?usp=sharing&resourcekey=0-cjnce0_aI2EE5MrdUTRJsA"></vue-pdf> -->
                                                <!-- <AddSkill name="Add" />
                                            </Modl> -->
                                            <SvgIcons name="delete" @click="removeResume" />
                                        </div>
                                    </div>
                                    <!-- <div id="viewer" style="width: 1024px; height: 600px;"></div> -->
                                </div>
                                <p class="text-xs text-left font-medium">
                                    Allowed Formats: png, jpeg
                                </p>
                                <p class="text-[10px] -mt-2 text-red">
                                    {{ errors.resume ? errors.resumeText : '' }}
                                </p>
                            </div>
                        </div>
                        <div v-show="photoactiveTab===2">
                            <div class="grid gap-4">
                                <!-- <label for="resume" class="font-semibold">
                                    Resume
                                </label> -->
                                <div class="grid items-center w-full">
                                    <label for="resume_upload" :class="[errors.resume ? 'text-red border-red' : '']" class="flex bg-primary-accent rounded flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                        <div class="flex flex-col items-center pt-8">
                                            <SvgIcons name="upload" />
                                            <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                                Upload Document</p>
                                        </div>
                                        <input type="file" id="resume_upload" name="resume" @change="onChangePhoto" class="opacity-0 absolute" accept=".png, .jpeg, .jpg" :disabled="isResumeActive" />
                                    </label>
                                    <div v-if="newEmployeeBiodata.Resume" class="flex justify-between mt-5 w-1/2 rounded items-center p-5 bg-primary-accent" :class="[isResumeActive ? '' : 'hidden']">
                                        <div class="">
                                            <p class="font-semibold py-1 w-40 truncate">
                                                {{ newEmployeeBiodata.Resume.name }}
                                            </p>
                                            <p class="text-xs pb-1 text-left text-gray-500">
                                                {{ newEmployeeBiodata.Resume.size > 999999 ? (newEmployeeBiodata.Resume.size / 1000000).toFixed(2) + 'Mb' : newEmployeeBiodata.Resume.size > 999 ? (newEmployeeBiodata.Resume.size / 1000).toFixed(2) + ' kb' : newEmployeeBiodata.Resume.size + ' bytes' }}
                                            </p>
                                        </div>
                                        <div class="flex justify-around gap-3 items-center">
                                            <a :href="pdfSource">
                                            <SvgIcons name="eye" /></a>
                                            <!-- <Modl :show="showResume" @close="showResume = !showResume"> -->
                                                <!-- <vue-pdf src="https://drive.google.com/file/d/0BwO1glerFQloUmxabTBEWUxvMFk/view?usp=sharing&resourcekey=0-cjnce0_aI2EE5MrdUTRJsA"></vue-pdf> -->
                                                <!-- <AddSkill name="Add" />
                                            </Modl> -->
                                            <SvgIcons name="delete" @click="removeResume" />
                                        </div>
                                    </div>
                                    <!-- <div id="viewer" style="width: 1024px; height: 600px;"></div> -->
                                </div>
                                <p class="text-xs text-left font-medium">
                                    Allowed Formats: png, jpeg
                                </p>
                                <p class="text-[10px] -mt-2 text-red">
                                    {{ errors.resume ? errors.resumeText : '' }}
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-between pb-10">
                            <button @click.prevent="activeTab=1" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border border-primary text-primary rounded-md">Back</button>
                            <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.multiselect-blue {
  --ms-option-bg: #DBEAFE;
  --ms-option-color: #2563EB;
  --ms-bg: #FFFFFF;
}
</style>

<style scoped>
.dp-custom-input {
    @apply py-[8px] rounded-md;
}
.multiselect-blue {
  /* --ms-option-bg: #DBEAFE; */
  --ms-option-color: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-dropdown-bg: #FFFFFF;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-tag-bg: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-py: 11px;
  --ms-font-size: 13px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">

.dp-custom-menu {
    position: static !important;
}
</style>