<script setup lang="ts">
import { useStore } from 'vuex'
import { ref } from 'vue';
import MenuItem from '../../components/pagination.vue'
import Chart from '../../components/switch.vue'
// import addModal from '../../components/test.vue'
import StudentDetails from '../../components/dashboard/students/StudentDetails.vue'
import StudentInBatch from '../../components/dashboard/students/ViewStudentHeader.vue'
import CourseDetails from '../../components/dashboard/courses/CourseDetails.vue'
import * as actionTypes from '../../store/module/events/constants/action'
import * as mutationTypes from '../../store/module/events/constants/mutation'
import Test from '../../components/dashboard/students/AddStudents.vue'
import spinner from '../../components/spinner.vue'
import ModalDialog from '../../components/Modals.vue'
import Filter from '../../components/Filter.vue'
import InstructorDetails from '../../components/dashboard/instructors/InstructorDetails.vue';
import AddTalents from '../../components/dashboard/instructors/AddTalents.vue';
import UpdateStatus from '../../components/dashboard/instructors/UpdateStatus.vue';
import AddSkill from '../../components/dashboard/instructors/AddSkill.vue';
import ContactHeader from '../../components/dashboard/contact/ContactHeader.vue';
import ContactList from '../../components/dashboard/contact/ContactList.vue';
import Delete from '../../components/delete.vue';
import ContactDetails from '../../components/dashboard/contact/ContactDetails.vue';


const store = useStore()

let visible = ref(false);

const openModal = () => {
  visible.value = true;
}

const close = () => {
  visible.value = false;
}

let currentPage: any = ref(1);

const onPageChange:any = (page:any) => {
  console.log('page suppose don change')
  console.log('page na', page)
  currentPage.value = page;
}

const showModal = ref(false);

const showModali = ref(false);

const filterItems:any = ['Active', 'Disabled', 'All']

let searchText:any = ref('');



const filter:any = async () => {
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const status:any = document.getElementById('status');
  console.log('status', status)
  const rows:any = status.getElementsByTagName('ul');
  console.log('rows', rows)
  console.log('rows length', rows.length)

  for (let i:any = 0; i < rows.length; i++) {
    const row:any = rows[i];
    console.log('row', rows[0])
    console.log('row', rows[1])
    console.log('row', rows[2])
    console.log('row', rows[0].textContent)
    console.log('row', rows[1].textContent)
    console.log('row', rows[2].textContent)
    if (
      row.textContent.toLowerCase().indexOf(search) > -1 
    ) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

const onAdd:any = () => {
  console.log('add')
  store.commit(mutationTypes.SetOpenAddStatus, true)
  // await store.dispatch(actionTypes.UpdateClientEditingStatus, true)
}

const onView = () => {
  console.log('view')
  store.commit(mutationTypes.SetOpenDetailsStatus, true)
  // await store.dispatch(actionTypes.UpdateClientEditingStatus, true)
}

const onEdit = () => {
  console.log('view')
  store.commit(mutationTypes.SetOpenDetailsStatus, true)
  // await store.dispatch(actionTypes.UpdateClientEditingStatus, true)
}

</script>

<template>
<div class="grid p-20 gap-4">
  <button @click="onAdd">Click</button>
  <button @click.prevent="onView">Click</button>
  <button @click.prevent="onEdit">Click</button>
   <Filter>
      <template #info>
          <span class="pl-5 pr-56">Status</span>
      </template>
      <template #input>
          <input @keyup.esc="close" @keyup="filter" v-model="searchText"  class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Filter Status">
      </template>
      <template #list>
        <div id="status">
          <ul class="overflow-auto" v-for="(item, index) in filterItems" :key="index">
            <li class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">{{ item }}</li>
        </ul>
        </div>
        <!-- <ul id="status" class="overflow-auto" v-for="(item, index) in filterItems" :key="index">
            <li class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">{{ item }}</li>
        </ul> -->
        <!-- <table>
          <tbody id="status">
            <td v-for="(item, index) in filterItems" :key="index"> -->
              <!-- <tr class="py-2 px-5 w-full grid hover:bg-gray-50 hover:bg-grey-light cursor-pointer"> -->
                <!-- {{ item }} -->
              <!-- </tr> -->
            <!-- </td>
          </tbody>
        </table> -->
      </template>
  </Filter>
  <CourseDetails />
  <Delete />
  <InstructorDetails />
  <ContactHeader />
  <ContactList />
  <ContactDetails />
  <AddTalents />
  <UpdateStatus />
  <spinner />
    <Chart />
    <button
      type="button"
      @click="showModal = !showModal"
      class="mx-auto w-full flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Open Modal
    </button>
    <ModalDialog :show="showModal" @close="showModal = false">
      <p class="mb-4">Gokuu is...</p>
      <img src="https://i.gifer.com/QjMQ.gif" />
    </ModalDialog>

    <StudentInBatch />

    <AddSkill />

    <button
      type="button"
      @click="showModali = !showModali"
      class="mx-auto w-full flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Open Modal
    </button>
    <ModalDialog :show="showModali" @close="showModali = false">
      <p class="mb-4">Gokuu is...</p>
      
    </ModalDialog>
    <MenuItem
      :totalPages="10"
      :perPage="10"
      :currentPage="currentPage.value"
      @pageChanged="onPageChange"
    >      
    </MenuItem>
  <button @click.prevent="onAdd">Click</button>
  <!-- <button @click.prevent="onView">Click</button> -->
    <!-- <addModal /> -->
    <StudentDetails />
  <button @click.prevent="onAdd">Click</button>
</div>
</template>
