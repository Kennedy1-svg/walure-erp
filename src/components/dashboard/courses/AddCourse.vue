<script lang="ts">
export default {
  name: 'AddCourse',
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
    title: false,
    titleText: '',
    courseCode: false,
    courseCodeText: '',
    cost: false,
    costText: '',
    courseContentOne: false,
    courseContentOneText: '',
    courseContentTwo: false,
    courseContentTwoText: '',
    courseContentThree: false,
    courseContentThreeText: '',
    courseContentFour: false,
    courseContentFourText: '',
    courseContentFive: false,
    courseContentFiveText: '',
    resource: false,
    resourceText: '',
    levels: false,
    levelsText: '',
    categories: false,
    categoriesText: '',
    duration: false,
    durationText: '',
    subtext: false,
    subtextText: '',
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

// const newCourse:any = computed(() => {
//     return store.getters.getNewCourse.value;
// })

const newCourse:any = {}

const courseContentTwo ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newCourse.value.imageFile.type;
    // console.log('imageType is', imageType)
    if (!newCourse.value.title) {
        errors.title = true;
        errors.titleText = 'First name is required'
    } else if (newCourse.value.title.length <= 3) {
        errors.titleText = 'First name needs to be more than 3 characters'
    } else {
        errors.title = false;
    }
    
    if (!newCourse.value.courseCode) {
        errors.courseCode = true;
        errors.courseCodeText = 'Last name is required'
    } else if (newCourse.value.courseCode.length <= 3) {
        errors.courseCodeText = 'Last name needs to be more than 3 characters'
    } else {
        errors.courseCode = false;
    }

    if (!newCourse.value.cost) {
        errors.cost = true;
        errors.costText = 'Other name is required'
    } else if (newCourse.value.cost.length <= 3) {
        errors.costText = 'Other name needs to be more than 3 characters'
    } else {
        errors.cost = false;
    }

    if (!newCourse.value.courseContentOne) {
        errors.courseContentOne = true;
        errors.courseContentOneText = 'courseContentOne is required. Please select a courseContentOne'
    } else {
        errors.courseContentOne = false;
    }

    if (!newCourse.value.banner) {
        errors.banner = true;
        errors.bannerText = 'Image is required. Please upload an banner'
    } else if (newCourse.value.banner.size > 5242880) {
        errors.banner = true;
        errors.bannerText = 'Image size should not be more than 5MB'
    } else {
        errors.banner = false;
    }

    if (!newCourse.value.thumbnail) {
        errors.thumbnail = true;
        errors.thumbnailText = 'Image is required. Please upload an thumbnail'
    } else if (newCourse.value.thumbnail.size > 5242880) {
        errors.thumbnail = true;
        errors.thumbnailText = 'Image size should not be more than 5MB'
    } else {
        errors.thumbnail = false;
    }

    if (!newCourse.value.courseContentTwo) {
        errors.courseContentTwo = true;
        errors.courseContentTwoText = 'courseContentTwo is required'
    } else if (!newCourse.value.courseContentTwo.match(courseContentTwo)) {
        errors.courseContentTwoText = `courseContentTwo must should have the format 'brianadams@walure.com`
    } else {
        errors.courseContentTwo = false;
    }

    if (!newCourse.value.phoneNumber) {
        errors.levels = true;
        errors.levelsText = 'Phone number is required'
    } else if (isNaN(newCourse.value.levelsNumber)) {
        errors.levels = true;
        errors.levelsText = 'Phone number cannot contain letters'
    } else if (!newCourse.value.levelsNumber.match(phone)) {
        errors.levelsText = 'Phone numer must start with 0'
    } else if (newCourse.value.levelsNumber.length <= 9) {
        errors.levelsText = 'Phone numer cannot be less than 10 digits'
    } else {
        errors.levels = false;
    }

    if (!newCourse.value.addresss) {
        errors.resourceText = 'true';
        errors.resourceText = 'Address is required'
    } else if (newCourse.value.resources.length <= 13) {
        errors.resourceText = 'Address needs to be more than 3 words'
    } else {
        errors.resourceText = 'false';
    }

    if (errors.title) {
        errors.title = true;
        isError.value = true;
    } else if (errors.courseCode) {
        errors.courseCode = true;
        isError.value = true;
    } else if (errors.cost) {
        errors.cost = true;
        isError.value = true;
    } else if (errors.courseContentTwo) {
        errors.courseContentTwo = true;
        isError.value = true;
    } else if (errors.levels) {
        errors.levels = true;
        isError.value = true;
    } else if (errors.courseContentThree) {
        errors.courseContentThree = true;
        isError.value = true;
    } else if (errors.courseContentTwo) {
        errors.courseContentTwo = true;
        isError.value = true;
    } else if (errors.courseContentOne) {
        errors.courseContentOne = true;
        isError.value = true;
    } else if (errors.courseCode) {
        errors.courseCode = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }   
}

const removeImage:any = async () => {
    return newCourse.value.imageFile = ''
}

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})

const test = () => {
    console.log('hi')
    // console.log('new notes', newCourse.courseDescription.value)
}

const newText = () => {
    console.log('hello')
    // console.log('new notes here', newCourse.courseDescription.value)
}

const notes = ref('')

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    emits('close')
}

const showProfilePicture = ref(false);

let isActive:any = computed(() => {
    // if (newCourse.value.imageFile) {
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
    newCourse.value.imageFile = event.target.files[0]
    formData.append('file', event.target.files[0])
    let images: any = document.getElementById('output')
    let image:any = document.getElementById('displayoutput')
    images.src = URL.createObjectURL(event.target.files[0])
    image.src = URL.createObjectURL(event.target.files[0])
    console.log('newCourse image', newCourse.value.imageFile.type)
}

const resetForm:any = Object.freeze({
        firstName: '',
        courseCode: '',
        cost: '',
        courseContentTwo: '',
        phoneNumber: '',
        addresss: '',
        imageFile: '',
        courseContentOne: '',
        courseId: ''
})

const addCourse:any = async () => {
    console.log('hi');
    console.log('newstudent', newCourse.value)
    console.log('newstudent', newCourse.value.imageFile)
    const request:any = `${api_url}api/student/create-student`;

    // const formElem = document.getElementById('formElem')
    formData.append('firstName', newCourse.value.firstName)
    formData.append('courseCode', newCourse.value.courseCode)
    formData.append('cost', newCourse.value.cost)
    formData.append('imageFile', newCourse.value.imageFile, newCourse.value.imageFile.name)
    formData.append('addresss', newCourse.value.addresss)
    formData.append('phoneNumber', newCourse.value.phoneNumber)
    formData.append('courseContentOne', newCourse.value.courseContentOne)
    // formData.append('courseId', newCourse.value.courseId)
    formData.append('courseContentTwo', newCourse.value.courseContentTwo)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))
    
    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newCourse.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newCourse.value.imageFile
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
            <p class="text-2xl"><slot name="title">Add</slot> Course</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="forrmElem" ref="forrmEl" class="text-sm grid">
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="title" class="font-semibold">
                        Title
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.title" name="title" id="title" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.title ? errors.titleText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="courseCode" class="font-semibold">
                        Course Code
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.courseCode" name="courseCode" id="courseCode" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.courseCode ? errors.courseCodeText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="cost" class="font-semibold">
                        Cost
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.cost" name="cost" id="cost" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.cost ? errors.costText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="resource" class="font-semibold">
                        Resource Download*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.resource" name="resource" id="resource" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.resource ? errors.resourceText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="courseContentOne" class="font-semibold">
                        Course Content (1)*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.courseContentOne" name="courseContentOne" id="courseContentOne" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.courseContentOne ? errors.courseContentOneText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="courseContentTwo" class="font-semibold">
                        Course Content (2)*
                    </label>
                    <input type="courseContentTwo" @focus="checkError" @keyup="checkError" v-model="newCourse.courseContentTwo" name="courseContentTwo" id="courseContentTwo" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.courseContentTwo ? errors.courseContentTwoText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="courseContentThree" class="font-semibold">
                        Course Content (3)*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.courseContentThree" name="courseContentThree" id="courseContentThree" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.courseContentThree ? errors.courseContentThreeText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="courseContentFour" class="font-semibold">
                        Course Content (4)*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.courseContentFour" name="courseContentFour" id="courseContentFour" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.courseContentFour ? errors.courseContentFourText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="courseContentFive" class="font-semibold">
                        Course Content (5)*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.courseContentFive" name="courseContentFive" id="courseContentFive" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.courseContentFive ? errors.courseContentFiveText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="courseContentOne" class="font-semibold">
                        Levels*
                    </label>
                    
                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newCourse.levels" name="levels" id="levels">
                        <option value="">Select option</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="experienced">Experienced</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.levels ? errors.levelsText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="categories" class="font-semibold">
                        Categories*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.categories" name="categories" id="categories" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.categories ? errors.categoriesText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="duration" class="font-semibold">
                        Duration*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.duration" name="duration" id="duration" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.duration ? errors.durationText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="subtext" class="font-semibold">
                        Sub Text*
                    </label>
                    <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.subtext" name="subtext" id="subtext" placeholder="Write something" rows="5" class="p-4 border rounded-md text-xs focus:outline-none" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.subtext ? errors.subtextText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="banner" class="font-semibold">
                        Banner
                    </label>
                    <div class="flex items-center justify-start w-full">
                        <label :class="[errors.banner ? 'rounded-full text-red border-red' : '']" class="flex bg-primary-accent rounded flex-col w-2/3 h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
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
                        {{ errors.banner ? errors.bannerText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Thumbnail
                    </label>
                    <div class="flex items-center justify-start w-full">
                        <label :class="[errors.thumbnail ? 'rounded-full text-red border-red' : '']" class="flex bg-primary-accent rounded flex-col w-2/3 h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
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
                        {{ errors.thumbnail ? errors.thumbnailText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-4 gap-8 mb-10">
                <div class="flex items-center gap-4">
                    <Switch />
                    <label for="categories" class="font-semibold">
                        Is Featured
                    </label>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.isFeatured ? errors.isFeaturedText : '' }}
                    </p>
                </div>
                <div class="flex items-center gap-4">
                    <Switch :status="newCourse.isFeatured" @toggle="toggle(newCourse.isFeatured)" />
                    <label for="duration" class="font-semibold">
                        Is Active
                    </label>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.duration ? errors.durationText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="courseDescription" class="font-semibold">
                        Course Description
                    </label>
                    <QuillEditor
                        class="border-x border-b shadow-lg rounded"
                        contentType="html"
                        theme="snow"
                        toolbar="full"
                        v-model:content="notes"
                        @ready="test"
                        @text-change="newText"
                    />
                    <!-- <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.courseDescription" name="courseDescription" id="courseDescription" placeholder="Input courseDescription" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.courseDescription ? errors.courseDescriptionText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
