<script lang="ts">
export default {
  name: "ViewStudentList",
};
</script>

let id: any = ref();

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api_url } from '../../../config';
import pagination from '../../pagination.vue'
import DeleteModal from '../../DeleteModal.vue';
import Delete from '../../delete.vue'
import SvgIcons from '../../SvgIcons.vue';
import * as batchActionTypes from '../../../store/module/batch/constants/action'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import { useStore } from 'vuex'

const store = useStore();
const route = useRoute();

const studentsInBatch:any = computed(() => {
  return store.getters.getStudentsInBatch.value.payload;
});

const totalPages:any = computed(() => {
    // (totalCount.value % 10 != 0) ? `Math.floor(${totalCount.value} / 10) + 1` : `${totalCount.value} / 10`;
    console.log(totalCount.value)
    let total:any
    if (totalCount.value % 10 != 0) {
        total = Math.floor(totalCount.value / 10) + 1;
    } else {
        total = totalCount.value / 10;
    }
    return total
})

let pageIndex: any = ref(1);

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    const batchid:any = route.params.id;
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${api_url}api/batch/students-inbatch/${batchid}`;
    console.log('url', request)
    await store.dispatch(batchActionTypes.FetchBatch, request)
}

const showDelete = ref(false);

let studenttodelete:any = ref('')

const totalCount:any = computed(() => {
  return store.getters.getStudentsInBatch.value.totalCount;
});

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const setId:any = (id:any) => {
    console.log('set id student id is', id)
    studenttodelete.value = id
    console.log('batchitemtodelete', studenttodelete.value)
    return studenttodelete
}

const removeStudent:any = async (id:any) => {
    console.log('student id', id);
    const batchid:any = route.params.id;
    console.log('batch id', batchid);

    const data:any = {
        batchId: batchid,
        studentId: id
    }

    const request:any = `${api_url}api/batch/removeStudent-fromBatch`;

    const requestData:any = {
        data: data,
        url: request,
    }

    console.log('requestData', requestData)
    await store.dispatch(batchActionTypes.RemoveStudentFromBatch, requestData)

    console.log('batch id', batchid);
    const fetch:any = `${api_url}api/batch/students-inbatch/${batchid}`;
    await store.dispatch(batchActionTypes.FetchStudentsInBatch, fetch); 
    closeModal()
}

onMounted( async () => {
//   store.dispatch(studentActionTypes.GET_STUDENTS);
    console.log('oya, na we dey here');
    const id:any = route.params.id;
    console.log('id', id);
    const request:any = `${api_url}api/batch/students-inbatch/${id}`;
    await store.dispatch(batchActionTypes.FetchStudentsInBatch, request);    
});

</script>

<template>
  <div class="main grid">
        <div class="title flex justify-between items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Student List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ totalCount }}</p>
        </div>
    <div class="table">
        <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
            <table class="overflow-x-scroll border items-center w-full">
                <thead class="bg-table-head">
                <tr class="justify-items-center">
                    <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                    S/N
                    </th>
                    <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                    Student name
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                    Course
                    </th>
                    <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">ID</th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                </tr>
                </thead>

                <tbody id="students" class="bg-white">
                    <!-- {{ studentsInBatch }}   -->
                  <tr v-for="students in studentsInBatch" :key="students.id">
                      <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                          {{ (studentsInBatch.indexOf(students) + 1) }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                          {{ students.firstName }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ students.course }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ students.regNumber }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <!-- <SvgIcons @click="removeStudent(students.id)" name="delete" /> -->
                            <button
                                type="button"
                                @click="showDelete = !showDelete"
                                @click.prevent="setId(students.studentId)"
                                class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                            >
                                <SvgIcons name="delete" />
                            </button>
                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="removeStudent(studenttodelete)">
                                    <template #title>
                                        Remove Student
                                    </template>
                                    <template #info>
                                        Are you sure you want to remove student from batch?
                                    </template>
                                    <template #delete>
                                        Yes, Remove Student
                                    </template>
                            </DeleteModal>
                      </td>
                  </tr>
                  <!-- <tr v-for="(student) in students" :key="student.id"> -->
                      <!-- <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                          {{ (students.indexOf(student) + 1) }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                          {{ student.firstName + ' ' + student.lastName }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ student.email }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ student.phoneNumber }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ student.regNumber }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <Switch :status="student.status" @toggle="toggle(student.status)" />
                      </td> -->
                      <!-- <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-right"> -->
                          <!-- <div class="relative inline-block dropdown"> -->
                              <!-- <button class="flex justify-around gap-8 items-center rounded" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">    <SvgIcons name="ellipsis" />
                              </button> -->
                              <!-- <div class="absolute z-10 opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 w-40">
                                  <div class="absolute right-36 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                      <div class="py-3 gap-3"> -->
                                          <!-- <button
                                          type="button"
                                          @click="showAddToBatch = !showAddToBatch" @click.prevent="setId(student.id)"
                                          class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                          >
                                              <SvgIcons name="doc-add" />
                                              Add to batch
                                          </button>
                                          <Modal :show="showAddToBatch" @close="showAddToBatch = false">
                                              <AddToBatch />
                                          </Modal>

                                          <button
                                          type="button"
                                          @click="showDetails = !showDetails" @click.prevent="setId(student.id)"
                                          class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                          >
                                              <SvgIcons name="details" />
                                              Details
                                          </button>
                                          <Modal :show="showDetails" @close="showDetails = false">
                                              <StudentDetails />
                                          </Modal>

                                          <button
                                          type="button"
                                          @click="showEdit = !showEdit" @click.prevent="setId(student.id)"
                                          class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                          >
                                              <SvgIcons name="edit" />
                                              Edit
                                          </button>
                                          <Modal :show="showEdit" @close="showEdit = false">
                                              <AddStudents />
                                          </Modal>

                                          <button
                                          type="button"
                                          @click="showDelete = !showDelete"
                                          class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                          >
                                              <SvgIcons name="delete" />
                                              Delete
                                          </button>
                                          <Modal :show="showDelete" @close="showDelete = false">
                                          <p class="mb-4">No action</p>
                                          
                                          </Modal> -->
                                          <!-- <Modal class="flex py-2 hover:bg-gray-100">
                                              <template #button>
                                                  <span class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left">
                                                      <SvgIcons name="doc-add" />
                                                      Add to batch
                                                  </span>
                                              </template>
                                              <template #content>
                                                  <AddToBatch />
                                              </template>
                                          </Modal>
                                          <Modal class="flex py-2 hover:bg-gray-100">
                                              <template #button>
                                                  <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"  role="menuitem" >
                                                      <SvgIcons name="details" />
                                                      Details
                                                  </span>
                                              </template>
                                              <template #content>
                                                  <StudentDetails />
                                              </template>
                                          </Modal>
                                          <Modal class="flex py-2 hover:bg-gray-100">
                                              <template #button>
                                                  <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"  role="menuitem" >
                                                      <SvgIcons name="edit" />
                                                      Edit
                                                  </span>
                                              </template>
                                              <template #content>
                                                  <AddStudent />
                                              </template>
                                          </Modal>
                                          <Modal class="flex py-2 hover:bg-gray-100">
                                              <template #button>
                                                  <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"  role="menuitem" >
                                                      <SvgIcons name="delete" />
                                                      Delete
                                                  </span>
                                              </template>
                                              <template #content>
                                                  <div class="bg-white p-7 rounded grid">
                                                      <div class="flex justify-between mb-6">
                                                          <h1 class="text-xl mb-4 font-medium">
                                                              Delete Student
                                                          </h1>
                                                          <span>
                                                              <SvgIcons name="o-cancel" />
                                                          </span>
                                                      </div>
                                                      <p class="text-lg mb-10">Are you sure you want to delete student?</p>
                                                      <div class="flex justify-between items-center mb-3">
                                                          <button class="px-10 py-4 rounded text-primary font-bold">
                                                              Cancel
                                                          </button>
                                                          <button class="bg-red px-10 py-4 rounded text-white font-bold">
                                                              Yes, Delete Student
                                                          </button>
                                                      </div>
                                                  </div>
                                              </template>
                                          </Modal> -->
                                      <!-- </div> -->
                                  <!-- </div> -->
                              <!-- </div> -->
                          <!-- </div> -->
                      <!-- </td> -->
                  <!-- </tr> -->
                </tbody>
            </table>
            <div class="flex items-center pt-6 px-6 mb-20 text-xs text-gray-700 justify-between">
                <div class="">
                    Page {{ pageIndex }} of {{ totalPages }}
                </div>
                <div class="">
                    <pagination
                        :totalPages=totalPages
                        @pageChanged="onPageChange"
                    />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>