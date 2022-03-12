<script lang="ts">
export default {
  name: 'StudentDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/students/constants/action'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close'])

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

const student:any = computed(() => {
    // console.log('students', JSON.parse(JSON.stringify(store.getters.getEditStudent.value)))
    return JSON.parse(JSON.stringify(store.getters.getEditStudent.value))
})

// onMounted(async () => {
//     console.log('I am now here')
//     const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
//     await store.dispatch(actionTypes.FetchEditStudent, request)
// })

</script>

<template>
    <div class="main grid px-[45px]">
        <div class="grid mb-[88px]">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Student Details</p>
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
            <div class="image grid justify-items-center">
                <span class=" border p-1 rounded-full mb-9">
                    <img class="w-32 h-32 rounded-full" :src=student.image alt="user img">
                </span>
                <!-- <button type="button" @click="showProfilePicture = !showProfilePicture"  class="rounded bg-primary text-white text-sm px-10 py-4">
                    View Passport
                </button> -->
                <!-- <Modal :show="showProfilePicture" @close="showProfilePicture = false">
                    <img class="" :src=student.image alt="user img">
                </Modal> -->
                <Modal id="picture" :show="showProfilePicture" @close="showProfilePicture = false">
                    <template #button>
                        <button type="button" @click="showProfilePicture = !showProfilePicture"  class="rounded bg-primary text-white text-sm px-10 py-4">
                            View Passport
                        </button>
                    </template>
                    <template #modalContent>
                        <img class="" :src=student.image alt="user img">
                    </template>
                </Modal>
            </div>
        </div>
        <div class="bottom">
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>First name</p>
                <p>{{ student.firstName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Last name</p>
                <p>{{ student.lastName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Other name</p>
                <p>othername</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Reg number</p>
                <p>{{ student.regNumber }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <p>{{ student.email }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Mobile number</p>
                <p>{{ student.phoneNumber }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Gender</p>
                <p>{{ student.gender }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Address</p>
                <p>{{ student.addresss }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Status</p>
                <p>{{ student.status == 1 ? 'Active' : 'Disabled' }}</p>
            </div>
        </div>
    </div>
</template>
