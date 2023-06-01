<script lang="ts">
export default {
    name: 'DepartmentDetailsHeader'
}
</script>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue'
import { api_url } from '../../../config/index'
import * as departmentActionTypes from '../../../store/module/department/constants/actions';
import SvgIcons from '../../SvgIcons.vue'
import AddStaff from '../department/AddStaff.vue'

const route = useRoute()
const store = useStore()
const router = useRouter()

const closeModal:any = () => {
  // document.getElementById('addstudent').showModal()
  console.log('close dept modal')
    // localStorage.removeItem('newstudent')
    // localStorage.removeItem('editstudent')
  let doc:any = document.getElementById('addstaff')
  doc.close()  
}

const departmentId:any = computed(() => {
    return store.getters.getDepartmentType.value.payload 
})

const id:any = route.params.id

onMounted(async() => {
    console.log('department List mounted');
    const request:any = `${api_url}api/Department/get-department/${id}`;
    console.log('the url is', request)
    await store.dispatch(departmentActionTypes.FetchDepartmentType, request)
    console.log('department data',departmentId.value)

} )




</script>

<template>
   <div class="main grid px-6 pt-20">
        <div class="title pr-32 xl:pr-0 items-center mb-10">
            <h1 class="text-2xl font-semibold text-black capitalize">{{ departmentId.name }}</h1>
            <div class="flex justify-between items-center">
                <div class="flex items-center ">
                   <router-link active-class="active" class="flex items-center font-semibold justify-between hover:bg-primary-accent text-primary" to="/dashboard/department">
						<div class="flex items-center gap-3 py-4">
							<p class="text-[15px]">
								Department
							</p>
						</div>
				   </router-link>
                  <p class="mx-4 capitalize"> >   {{ departmentId.name }}</p>
                </div>
                <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold my-2">Add Staff</p>

                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addstaff').showModal()" id="btn">
                          <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                              <SvgIcons name="plus" /> <!-- plus icon -->
                          </span>
                      </div>
                    </section>      
                </div>
            </button>

            <dialog id="addstaff" class="h-auto w-1/2 md:w-1/2 p-5 bg-white rounded-md">            
                      <div class="w-full h-auto ">
                          <!-- Modal Content-->
                              <AddStaff @close="closeModal" />
                          <!-- End of Modal Content-->
                      </div>
            </dialog>
            </div>
            
            
        </div> 
  </div>    
    
</template>

<style scoped>
 dialog[open] {
    position: absolute !important;
    right: -48%;
    animation: appear .25s cubic-bezier(0.0, 0.0, 0.58, 1.0);
}

  dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
  }
  
 
@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-40rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>