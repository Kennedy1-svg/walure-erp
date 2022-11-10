<script lang="ts">
export default {
  name: 'AddTalentToOutsourcing',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { api_url } from '../../../config'
import moment from 'moment';
import SvgIcons from '../../SvgIcons.vue';
import { DatePicker } from 'v-calendar'
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import 'v-calendar/dist/style.css';
import 'vue3-date-time-picker/dist/main.css'
// import datepicker from '../../datepicker.vue'
import multiselect from '@vueform/multiselect'
import * as projectActionTypes from '../../../store/module/services/constants/action'
import * as projectMutationTypes from '../../../store/module/services/constants/mutation'
import * as instructorActionTypes from '../../../store/module/instructors/constants/action';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

let formData = new FormData()

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

const newOutsourcingTalent:any = computed(() => {
    return store.getters.getNewOutsourcingTalent.value
})

const outsourcingTalents:any = computed(() => {
    return store.getters.getOutsourcingTalent.value
})

const checkError:any = () => {
    if (!newOutsourcingTalent.value.role && newOutsourcingTalent.value.role != '0') {
        errors.role = true;
        errors.roleText = 'Role is required'
    } else {
        errors.role = false;
        errors.roleText = ''
    }

    if (!newOutsourcingTalent.value.noOfResource) {
        errors.noOfResource = true;
        errors.noOfResourceText = 'Number of resources is required.'
    } else if (isNaN(newOutsourcingTalent.value.noOfResource)) {
        errors.noOfResource = true;
        errors.noOfResourceText = 'Number of resources cannot contain letters'
    } else if (newOutsourcingTalent.value.noOfResource < 1) {
        errors.noOfResource = true;
        errors.noOfResourceText = 'Number of resources must be more than 0'
    } else {
        errors.noOfResource = false;
        errors.noOfResourceText = '';
    }

    if (!newOutsourcingTalent.value.jobEngagementType && newOutsourcingTalent.value.jobEngagementType != '0') {
        errors.jobEngagementType = true;
        errors.jobEngagementTypeText = 'Engagement type is required.'
    } else {
        errors.jobEngagementType = false;
        errors.jobEngagementTypeText = '';
    }

    if (!newOutsourcingTalent.value.experienceLevel && newOutsourcingTalent.value.experienceLevel != '0') {
        errors.experienceLevel = true;
        errors.experienceLevelText = 'Experience level is required'
    } else {
        errors.experienceLevel = false;
        errors.experienceLevelText = '';
    }

    if (!newOutsourcingTalent.value.description) {
        errors.description = true;
        errors.descriptionText = 'Please enter a description'
    } else if (newOutsourcingTalent.value.description.length < 10) {
        errors.description = true;
        errors.descriptionText = 'Your description should contain more characters'
    } else {
        errors.description = false;
        errors.descriptionText = '';
    }

    if (errors.role) {
        errors.role = true;
        isError.value = true;
    } else if (errors.experienceLevel) {
        errors.experienceLevel = true;
        isError.value = true;
    } else if (errors.description) {
        errors.description = true;
        isError.value = true;
    } else if (errors.noOfResource) {
        errors.noOfResource = true;
        isError.value = true;
    } else if (errors.jobEngagementType) {
        errors.jobEngagementType = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

const contract_type = [
    {
        label: 'Full Time',
        value: 0
    },
    {
        label: 'Part Time',
        value: 1
    },
    {
        label: 'Contract',
        value: 2
    },
]

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

const experience_leveloptions:any = [
  {
    label: 'Beginner',
    value: 0
  },
  {
    label: 'Intermediate',
    value: 1
  },
  {
    label: 'Experienced',
    value: 2
  },
]

let isChecked:any = ref(false);

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

let errors = reactive({
    role: false,
    roleText: '',
    email: false,
    emailText: '',
    noOfResources: false,
    noOfResourcesText: '',
    noOfResource: false,
    noOfResourceText: '',
    experienceLevel: false,
    experienceLevelText: '',
    description: false,
    descriptionText: '',
    jobEngagementType: false,
    jobEngagementTypeText: '',
})

const trainingoptions:any = ref([
    {
        label: "Onsite",
        value: 0
    },
    {
        label: "Online",
        value: 1
    }
]);

const emits = defineEmits(['close'])

const closeModal:any = async () => {
    store.commit(projectMutationTypes.SetNewProject, {})
    emits('close')
}

const projectcourse:any = ref('')

const addoutsourcingtalent:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/project/create-project`;

    const projectdata:any = {
        role: newOutsourcingTalent.value.role,
        // email: newOutsourcingTalent.value.email,
        // noOfResources: newOutsourcingTalent.value.noOfResources,
        noOfResource: newOutsourcingTalent.value.noOfResource,
        experienceLevel: newOutsourcingTalent.value.experienceLevel,
        description: newOutsourcingTalent.value.description,
        jobEngagementType: newOutsourcingTalent.value.jobEngagementType,
        // id: outsourcingTalents.value.length + 1,
    //     TrainingType: newOutsourcingTalent.value.email,
    //     ProjectCapacity: newOutsourcingTalent.value.noOfResources,
    //     // StartDate: moment(newOutsourcingTalent.value.noOfResource).format('MM/DD/YYYY'),
    //     // EndDate: moment(newOutsourcingTalent.value.experienceLevel).format('MM/DD/YYYY'),
    //     StartDate: newOutsourcingTalent.value.noOfResource,
    //     EndDate: newOutsourcingTalent.value.experienceLevel,
    //     Instructors: JSON.parse(JSON.stringify(newOutsourcingTalent.value.description)),
    //     CourseId: newOutsourcingTalent.value.courseId,
    }

    // formData.append('role', newOutsourcingTalent.value.role);
    // formData.append('email', newOutsourcingTalent.value.email);
    // formData.append('noOfResources', newOutsourcingTalent.value.noOfResources);
    // formData.append('noOfResource', moment(newOutsourcingTalent.value.noOfResource).format('MM/DD/YYYY'));
    // formData.append('experienceLevel', moment(newOutsourcingTalent.value.experienceLevel).format('MM/DD/YYYY'));
    // formData.append('description', newOutsourcingTalent.value.description);
    // formData.append('jobEngagementType', newOutsourcingTalent.value.jobEngagementType);

    const newData:any = {
        url: request,
        data: projectdata,
    }
    console.log('newData', newData)
    await store.dispatch(projectActionTypes.AddOutsourcingTalent, projectdata)
    // await store.dispatch(projectActionTypes.FetchProject)
    store.commit(projectMutationTypes.SetNewOutsourcingTalent, {})
    // const result = await store.getters.getProject
    closeModal()
}

const editoutsourcingtalent:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/project/create-project`;

    const projectdata:any = {
        role: newOutsourcingTalent.value.role,
        // email: newOutsourcingTalent.value.email,
        // noOfResources: newOutsourcingTalent.value.noOfResources,
        noOfResource: newOutsourcingTalent.value.noOfResource,
        experienceLevel: newOutsourcingTalent.value.experienceLevel,
        description: newOutsourcingTalent.value.description,
        jobEngagementType: newOutsourcingTalent.value.jobEngagementType,
        // id: outsourcingTalents.value.length + 1,
    //     TrainingType: newOutsourcingTalent.value.email,
    //     ProjectCapacity: newOutsourcingTalent.value.noOfResources,
    //     // StartDate: moment(newOutsourcingTalent.value.noOfResource).format('MM/DD/YYYY'),
    //     // EndDate: moment(newOutsourcingTalent.value.experienceLevel).format('MM/DD/YYYY'),
    //     StartDate: newOutsourcingTalent.value.noOfResource,
    //     EndDate: newOutsourcingTalent.value.experienceLevel,
    //     Instructors: JSON.parse(JSON.stringify(newOutsourcingTalent.value.description)),
    //     CourseId: newOutsourcingTalent.value.courseId,
    }

    // formData.append('role', newOutsourcingTalent.value.role);
    // formData.append('email', newOutsourcingTalent.value.email);
    // formData.append('noOfResources', newOutsourcingTalent.value.noOfResources);
    // formData.append('noOfResource', moment(newOutsourcingTalent.value.noOfResource).format('MM/DD/YYYY'));
    // formData.append('experienceLevel', moment(newOutsourcingTalent.value.experienceLevel).format('MM/DD/YYYY'));
    // formData.append('description', newOutsourcingTalent.value.description);
    // formData.append('jobEngagementType', newOutsourcingTalent.value.jobEngagementType);

    const newData:any = {
        url: request,
        data: projectdata,
    }
    console.log('newData', newData)
    await store.dispatch(projectActionTypes.EditOutsourcingTalent, projectdata)
    // await store.dispatch(projectActionTypes.FetchProject)
    store.commit(projectMutationTypes.SetNewOutsourcingTalent, {})
    // const result = await store.getters.getProject
    closeModal()
}

// const editproject:any = async () => {
//     console.log('hi');
//     const request:any = `${api_url}api/project/edit-project`;

//     const projectdata:any = {
//         role: newOutsourcingTalent.value.role,
//         email: newOutsourcingTalent.value.email,
//         noOfResources: newOutsourcingTalent.value.noOfResources,
//         noOfResource: moment(newOutsourcingTalent.value.noOfResource).format('MM/DD/YYYY'),
//         experienceLevel: moment(newOutsourcingTalent.value.experienceLevel).format('MM/DD/YYYY'),
//         description: newOutsourcingTalent.value.description,
//         jobEngagementType: newOutsourcingTalent.value.jobEngagementType,
//         id: newOutsourcingTalent.value.id
    //     Title: newOutsourcingTalent.value.name,
    //     TrainingType: newOutsourcingTalent.value.email,
    //     ProjectCapacity: newOutsourcingTalent.value.noOfResources,
    //     // StartDate: moment(newOutsourcingTalent.value.noOfResource).format('MM/DD/YYYY'),
    //     // EndDate: moment(newOutsourcingTalent.value.experienceLevel).format('MM/DD/YYYY'),
    //     StartDate: newOutsourcingTalent.value.noOfResource,
    //     EndDate: newOutsourcingTalent.value.experienceLevel,
    //     Instructors: JSON.parse(JSON.stringify(newOutsourcingTalent.value.description)),
    //     CourseId: newOutsourcingTalent.value.courseId,
    // }

    // formData.append('Title', newOutsourcingTalent.value.role);
    // formData.append('Id', newOutsourcingTalent.value.id);
    // formData.append('TrainingType', newOutsourcingTalent.value.email);
    // formData.append('ProjectCapacity', newOutsourcingTalent.value.noOfResources);
    // formData.append('StartDate', moment(newOutsourcingTalent.value.noOfResource).format('MM/DD/YYYY'));
    // formData.append('EndDate', moment(newOutsourcingTalent.value.experienceLevel).format('MM/DD/YYYY'));
    // formData.append('Instructors', newOutsourcingTalent.value.description);
    // formData.append('CourseId', newOutsourcingTalent.value.title);

//     const newData:any = {
//         url: request,
//         data: projectdata,
//     }
//     console.log('newData', newData)
//     await store.dispatch(projectActionTypes.EditProject, newData)
//     await store.dispatch(projectActionTypes.FetchProject)
//     await store.getters.getProject
//     closeModal()
//     store.commit(projectMutationTypes.SetNewProject, {})
// }

let isActive:any = computed(() => {
    if (props.name == 'Edit') {
        return true
    } else {
        return false
    }
})

const submit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addoutsourcingtalent() : '';
}

const submitEdit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editoutsourcingtalent() : '';
}

// const submitEdit:any = () => {
//     console.log('hello project');
//     checkError();
//     console.log('iserror value', isError.value)
    // !isError.value ? editproject() : '';
// }

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async () => {
    console.log('I am now here')
})
</script>

<template>
    <div class="main w-full h-[92vh] mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add job details</p>
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="addoutsourcingtalent" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- {{ newOutsourcingTalent }} -->
                <!-- {{ outsourcingTalents }} -->
                <div class="grid gap-4">
                    <label for="role" class="font-semibold">
                        Job role*
                    </label>
                    <multiselect @select="checkError" @clear="checkError" v-model="newOutsourcingTalent.role" valueProp="value" :options="role_options" track-by="label" label="label" placeholder="Select role" :searchable="true" class="multiselect-blue" />
                    <!-- <input type="text" @focus="checkError" @keyup="checkError"  v-model="newOutsourcingTalent.role" name="role" id="role" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none"> -->
                    <p class="text-[10px] text-red">
                        {{ errors.role ? errors.roleText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="jobEngagementType" class="font-semibold">
                        Type of Engagement*
                    </label>
                    <!-- <input type="text" @focus="checkError" @keyup="checkError"  v-model="newOutsourcingTalent.title" name="title" id="title" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none"> -->
                    <multiselect @select="checkError" @clear="checkError" v-model="newOutsourcingTalent.jobEngagementType" valueProp="value" :options="contract_type" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] text-red">
                        {{ errors.jobEngagementType ? errors.jobEngagementTypeText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.jobEngagementType }}</option>
                    </select> -->
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4" id="startdate">
                    <label for="noOfResource" class="font-semibold">
                        No of resources*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newOutsourcingTalent.noOfResource" name="noOfResource" id="noOfResource" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <!-- <DatePicker v-if="props.name == 'Edit'" v-model="newOutsourcingTalent.noOfResource">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newOutsourcingTalent.noOfResource" :minDate="today" :maxDate="newOutsourcingTalent.endDate" placeholder="Start Date" :format="format" position="left" teleport="#startdate"/> -->
                    <!-- <datepicker /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.noOfResource ? errors.noOfResourceText : '' }}
                    </p>
                </div>
                <div class="grid gap-4" id="enddate">
                    <label for="experienceLevel" class="font-semibold">
                        Experience Level*
                    </label>
                    <!-- <input type="text" @focus="checkError" @keyup="checkError"  v-model="newOutsourcingTalent.experienceLevel" name="experienceLevel" id="experienceLevel" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none"> -->
                    <multiselect @select="checkError" @clear="checkError" v-model="newOutsourcingTalent.experienceLevel" valueProp="value" :options="experience_leveloptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <!-- <DatePicker v-if="props.name == 'Edit'" v-model="newOutsourcingTalent.endDate">
                        <template v-slot="{ inputValue, experience_leveloptions }">
                            <input
                            class="px-3 py-4 border w-full rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input"  @focus="checkError" @cleared="checkError" menuClassName="dp-custom-menu" v-model="newOutsourcingTalent.endDate" :minDate="newOutsourcingTalent.noOfResource" :format="format" position="left" placeholder="End Date" teleport="#enddate" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.experienceLevel ? errors.experienceLevelText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid gap-8 mb-10">
                <label for="description" class="font-semibold">
                    Job description*
                </label>
                <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newOutsourcingTalent.description" name="description" id="description" placeholder="Type here" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />

                <!-- <multiselect @select="checkError" @clear="checkError" v-model="newOutsourcingTalent.description" mode="tags" :close-on-select="false" valueProp="id" :options="descriptions" track-by="fullName" label="fullName" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                <p class="text-[10px] text-red">
                    {{ errors.description ? errors.descriptionText : '' }}
                </p>
                <!-- <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">
                            <p class="text-grey">
                                Choose instructor
                            </p>
                        </span>
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-7 w-full mx-auto">
                    </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Araba Temi
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Araba Temi</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Araba Temi</p></li>
                    </template>
                </Filter> -->
            </div>
            <div class="flex justify-end pb-10">
                <button v-if="props.name == 'Add'" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
                <button v-if="props.name == 'Edit'" @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">

.dp-custom-menu {
    position: static !important;
}
</style>