<script lang="ts">
export default {
    name: 'EmployeeBiodataDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/instructors/constants/action'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close']);

const removeResume:any = async () => {
    // return newTalent.value.Resume = ''
}
let pdfSource:any = ref('');

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

const instructor:any = computed(() => {
    // console.log('students', JSON.parse(JSON.stringify(store.getters.getEditStudent.value)))
    return JSON.parse(JSON.stringify(store.getters.getEditInstructor.value))
})

</script>

<template>
    <div class="main grid px-[45px]">
        <div class="grid mb-7">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Employee Details</p>
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
            <!-- {{ instructor }} -->
            <div class="image grid justify-items-center">
                <span class=" border p-1 rounded-full mb-9">
                    <img class="w-28 h-28 rounded-full" :src="instructor.image" alt="user img">
                </span>
                <span class=" border p-1 rounded-full mb-9">
                    <img class="w-20 h-20 rounded-full" :src="instructor.image" alt="user img">
                </span>
                <!-- <p class="text-2xl font-semibold">{{ instructor.fullName }}</p> -->
                <!-- <p class="text-grey font-medium">Instructor</p> -->
            </div>
        </div>
        <div class="bottom">
            <div class="grid pt-3 pb-8 text-xl font-medium justify-items-start">
                <p class="uppercase">Personal details</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 pb-20 font-semibold text-[#232D42]">
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Surname
                    </h5>
                    <p>
                        Adebisi
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Firstname
                    </h5>
                    <p>
                        Leke
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Othernames
                    </h5>
                    <p>
                        Segun
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Religion
                    </h5>
                    <p>
                        Christian
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        State of origin
                    </h5>
                    <p>
                        Lagos
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Date Of Birth
                    </h5>
                    <p>
                        08/08/2022
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Sex
                    </h5>
                    <p>
                        Male
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Marital Status
                    </h5>
                    <p>
                        Single
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Job Title
                    </h5>
                    <p>
                        Product Manager
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Contact Number
                    </h5>
                    <p>
                        08036457889
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Email Address
                    </h5>
                    <p>
                        Leke@walurecapital.com
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Home Address
                    </h5>
                    <p>
                        28 Anthony bus stop ikeja lagos state
                    </p>
                </div>
            </div>
            <div class="grid pt-1 pb-8 text-xl font-medium justify-items-start">
                <p class="uppercase">birthday reminder</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 pb-20 font-semibold text-[#232D42]">
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Surname
                    </h5>
                    <p>
                        Adebisi
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Firstname
                    </h5>
                    <p>
                        Leke
                    </p>
                </div>
            </div>
            <div class="grid pt-1 pb-8 text-xl font-medium justify-items-start">
                <p class="uppercase">next of kin details</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 pb-20 font-semibold text-[#232D42]">
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Name of Next kin
                    </h5>
                    <p>
                        Adebisi
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Relationship
                    </h5>
                    <p>
                        Father
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Sex
                    </h5>
                    <p>
                        Male
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Mobile Numbers
                    </h5>
                    <p>
                        08036457889
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        State of origin
                    </h5>
                    <p>
                        Lagos
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Home Address
                    </h5>
                    <p>
                        28 Anthony bus stop ikeja lagos state
                    </p>
                </div>
            </div>
            <div class="grid pt-1 pb-8 text-xl font-medium justify-items-start">
                <p class="uppercase">bank details</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 pb-20 font-semibold text-[#232D42]">
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Bank Name
                    </h5>
                    <p>
                        Ecobank
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Account Name
                    </h5>
                    <p>
                        Leke
                    </p>
                </div>
                <div class="grid gap-y-8">
                    <h5 class="text-[#8692A6]">
                        Account Number
                    </h5>
                    <p>
                        932038981811
                    </p>
                </div>
            </div>
            <div class="grid pt-1 pb-8 text-xl font-medium justify-items-start">
                <p class="capitalize">other uploads</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 pb-20 font-semibold text-[#232D42]">
                <div class="grid gap-y-8">
                    <div class="flex justify-around gap-3 items-center">
                        <a :href="pdfSource">
                        <SvgIcons name="eye" /></a>
                        <SvgIcons name="delete" @click="removeResume" />
                    </div>
                </div>
                <div class="grid gap-y-8">
                    <div class="flex justify-around gap-3 items-center">
                        <a :href="pdfSource">
                        <SvgIcons name="eye" /></a>
                        <SvgIcons name="delete" @click="removeResume" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end pt-1 pb-6">
            <button @click.prevent="" class="py-4 px-8 hover:bg-opacity-80 font-bold gap-5 flex justify-center border border-primary text-primary rounded-md">
                <svgIcons name="download" />
                <p>
                    Download Bio-Data
                </p>
            </button>
        </div>
    </div>
</template>
