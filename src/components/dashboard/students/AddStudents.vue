<script lang="ts">
export default {
  name: 'AddStudents',
}
</script>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';

const route = useRouter()

let isChecked:any = ref(false);

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const addStudent:any = () => {
    console.log('hi');
    // route.push('/dashboard/student-management')
}

const newStudent:any = reactive({
    firstname: '',
    lastname: '',
    othername: '',
    image: null,
    email: '',
    phone: '',
    gender: '',
    course: '',
    address: '',
})

let isActive:any = ref(false);

const onChange:any = (event:any):any => {
    newStudent.image = event.target.files[0]
}

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl"><slot name="title">Add</slot> Student</p>
            <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm grid">
            <div class="grid justify-items-center gap-1 mb-[88px]">
                <div class="relative mb-8">
                    <SvgIcons class="text-gray-300" name="pic-avatar" />
                    <span class="absolute cursor-pointer left-3/5 bottom-0 bg-black rounded-full p-2">                   
                        <input type="file" @change="onChange" class="opacity-0 absolute" />
                        <SvgIcons class="text-white" name="camera" />
                    </span>
                </div>
                <div class="buttons text-grey flex gap-[50px]">
                    <button class="py-4 px-10 hover:shadow rounded border" :class="[isActive ? activeRemove : disabledRemove]">
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
                    <input type="text" v-model="newStudent.firstname" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name
                    </label>
                    <input type="text" v-model="newStudent.lastname" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="othername" class="font-semibold">
                        Other name
                    </label>
                    <input type="text" v-model="newStudent.othername" name="othername" id="othername" placeholder="Enter other name" class="p-4 border rounded-md text-xs focus:outline-none">
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" v-model="newStudent.phone" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
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
                        <option value="active">Male</option>
                        <option value="inactive">Female</option>
                    </select>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Course*
                    </label>
                    <select class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newStudent.course" name="course" id="course">
                        <option value="">Select option</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Address
                    </label>
                    <textarea type="text" v-model="newStudent.address" name="address" id="address" placeholder="Input address" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="addStudent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
