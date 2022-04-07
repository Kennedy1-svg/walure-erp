<script lang="ts">
export default {
  name: 'CourseApplicantDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/courses/constants/action'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close'])

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

const courseApplicantDetails:any = computed(() => {
  return store.getters.getEditCourseApplicant.value
})

</script>

<template>
    <div class="main grid px-[45px] pb-[420px]">
        <div class="grid">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Course Applicant Details</p>
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
        </div>
        <div class="bottom">
            <!-- {{ courseApplicantDetails }} -->
            <!-- {{ courseDetails.title }} -->
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Name</p>
                <p>{{ courseApplicantDetails.fullName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <p>{{ courseApplicantDetails.email }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Moile Number</p>
                <p>{{ courseApplicantDetails.phoneNumber }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Course</p>
                <p>{{ courseApplicantDetails.course }}</p>
            </div>
        </div>
    </div>
</template>
