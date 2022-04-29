<script lang="ts">
export default {
  name: 'ContactDetails',
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

const course:any = computed(() => {
    // console.log('courses', JSON.parse(JSON.stringify(store.getters.getEditcourse.value)))
    // return JSON.parse(JSON.stringify(store.getters.getEditcourse.value))
})

// onMounted(async () => {
//     console.log('I am now here')
//     const request:any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`;
//     await store.dispatch(actionTypes.FetchEditcourse, request)
// })

</script>

<template>
    <div class="main grid px-[45px]">
        <div class="grid">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Contact Details</p>
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
        </div>
        <div class="bottom">
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Name</p>
                <!-- <p>{{ course.title }}</p> -->
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Mobile</p>
                <!-- <p>{{ course.sourcecode }}</p> -->
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <p>othername</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Date</p>
                <!-- <p>{{ course.description }}</p> -->
            </div>
            <div class="flex py-3 text-xl font-medium justify-between items-start">
                <p>Message</p>
                <!-- <p>{{ course.resources }}</p> -->
                <p class="w-2/3 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique faucibus massa eu tortor gravida nisl ornare etiam. Pulvinar pellentesque ultrices eget fringilla neque, vel. Sit fames elementum, mi gravida placerat.
                </p>
            </div>
        </div>
    </div>
</template>
