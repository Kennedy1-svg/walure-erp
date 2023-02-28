<script lang="ts">
export default {
//   name: 'AddLeaveManagement',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { api_url } from '../../../config'
import moment from 'moment';
import { account_api_url } from '../../../config'
import SvgIcons from '../../SvgIcons.vue';
import { DatePicker } from 'v-calendar'
import Filter from '../../Filter.vue';
import Datepicker from '@vuepic/vue-datepicker';
import 'v-calendar/dist/style.css';
import '@vuepic/vue-datepicker/dist/main.css'
// import datepicker from '../../datepicker.vue'
import * as accountActionTypes from '../../../store/module/account/constants/action'
import multiselect from '@vueform/multiselect'
import * as accountMutationTypes from '../../../store/module/account/constants/mutation'

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

const newLeaveManagement:any = computed(() => {
    return store.getters.getNewLeaveManagement.value
})

const leavetypes:any = computed(() => {
    // return store.getters.getCategory.value.payload;
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

const checkError:any = () => {
    if (!newLeaveManagement.value.leaveTypeId) {
        errors.leaveTypeId = true;
        errors.leaveTypeIdText = 'Leave type is required'
    } else {
        errors.leaveTypeId = false;
        errors.leaveTypeIdText = '';
    }

    // if (!newLeaveManagement.value.email) {
    //     errors.email = true;
    //     errors.emailText = 'Email is required'
    // } else if (!newLeaveManagement.value.email.match(email)) {
    //     errors.email = true;
    //     errors.emailText = `Email must should have the format 'brianadams@walure.com`
    // } else {
    //     errors.email = false;
    //     errors.emailText = ''
    // }

    if (!newLeaveManagement.value.nameOfRelief) {
        errors.nameOfRelief = true;
        errors.nameOfReliefText = 'Please name your relief.'
    // } else if (isNaN(newLeaveManagement.value.nameOfRelief)) {
    //     errors.nameOfRelief = true;
    //     errors.nameOfReliefText = 'Amount cannot contain letters'
    } else {
        errors.nameOfRelief = false;
        errors.nameOfReliefText = '';
    }

    if (!newLeaveManagement.value.phone) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newLeaveManagement.value.phone)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else {
        errors.phone = false;
        errors.phoneText = '';
    }

    if (!newLeaveManagement.value.startDate) {
        errors.startDate = true;
        errors.startDateText = 'Start date is required.'
    } else {
        errors.startDate = false;
        errors.startDateText = '';
    }

    if (!newLeaveManagement.value.resumptionDate) {
        errors.resumptionDate = true;
        errors.resumptionDateText = 'Resumption date is required.'
    } else {
        errors.resumptionDate = false;
        errors.resumptionDateText = '';
    }

    if (!newLeaveManagement.value.endDate) {
        errors.endDate = true;
        errors.endDateText = 'End date is required.'
    } else {
        errors.endDate = false;
        errors.endDateText = '';
    }

    if (!newLeaveManagement.value.name) {
        errors.name = true;
        errors.nameText = 'Employee name is required. Please enter a name'
    } else {
        errors.name = false;
        errors.nameText = '';
    }

    if (!newLeaveManagement.value.email) {
        errors.email = true;
        errors.emailText = 'Employee email is required. Please enter an email'
    } else if (!newLeaveManagement.value.email.match(email)) {
        errors.email = true;
        errors.emailText = 'Please enter a valid email'
    } else {
        errors.email = false;
        errors.emailText = '';
    }

    // if (!newLeaveManagement.value.endDate) {
    //     errors.endDate = true;
    //     errors.endDateText = 'End date is required'
    // } else {
    //     errors.endDate = false;
    //     errors.endDateText = '';
    // }

    // if (!newLeaveManagement.value.brief) {
    //     errors.brief = true;
    //     errors.briefText = 'Project brief is required'
    // } else {
    //     errors.brief = false;
    //     errors.briefText = '';
    // }

    if (errors.leaveTypeId) {
        errors.leaveTypeId = true;
        isError.value = true;
    // } else if (errors.email) {
    //     errors.email = true;
    //     isError.value = true;
    } else if (errors.nameOfRelief) {
        errors.nameOfRelief = true;
        isError.value = true;
    // } else if (errors.endDate) {
    //     errors.endDate = true;
    //     isError.value = true;
    // } else if (errors.brief) {
    //     errors.brief = true;
    //     isError.value = true;
    } else if (errors.startDate) {
        errors.startDate = true;
        isError.value = true;
    } else if (errors.resumptionDate) {
        errors.resumptionDate = true;
        isError.value = true;
    } else if (errors.endDate) {
        errors.endDate = true;
        isError.value = true;
    } else if (errors.name) {
        errors.name = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.phone) {
        errors.phone = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

let isChecked:any = ref(false);
const startDate:any = ref('');
const endDate:any = ref('');

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const customPosition:any = () => ({ top: 0, left: 0 });

let errors = reactive({
    leaveTypeId: false,
    leaveTypeIdText: '',
    nameOfRelief: false,
    nameOfReliefText: '',
    startDate: false,
    startDateText: '',
    endDate: false,
    endDateText: '',
    resumptionDate: false,
    resumptionDateText: '',
    name: false,
    nameText: '',
    email: false,
    emailText: '',
    phone: false,
    phoneText: '',
})

const today:any = moment().format('YYYY-MM-DD');

const emits = defineEmits(['close'])

const isEditing:any = computed(() => {
    let answer:any = ref(false)
    if (props.name == 'Add') {
        return
    } else if (props.name == 'Edit') {
        answer = true
    }
    return answer;
})

const uniqueIdentifier:any = async () => {
    console.log('uniqueIdentifier')
    console.log(`${newLeaveManagement.value.category}`)
    const request:any = `${account_api_url}api/expenditurecategory/get-category/${newLeaveManagement.value.category}`;
    console.log('request for the', request)
    await store.dispatch(accountActionTypes.FetchEditCategory, request)
    let category:any = await store.getters.getNewCategory.value
    console.log('category for the', category, newLeaveManagement.value.name)
    let code:any = `${category.name.substring(0, 3).toUpperCase()}${newLeaveManagement.value.name.substring(0, 3).toUpperCase()}${randomDigits.value}`
    console.log('code for the', code, randomDigits.value)
    return code
}

const randomDigits = computed(() => {
  return Math.floor(1000 + Math.random() * 9000);
})

const closeModal:any = async () => {
    // store.commit(accountMutationTypes.SetNewLeaveManagement, {})
    emits('close')
}

const projectcourse:any = ref('')

const addexpenditure:any = async () => {
    console.log('hi');
    const request:any = `${account_api_url}api/expenditure/create-expenditure`;
    let code:any = await uniqueIdentifier()

    const expendituredata:any = {
        leaveTypeId: newLeaveManagement.value.leaveTypeId,
        nameOfRelief: newLeaveManagement.value.nameOfRelief,
        startDate: newLeaveManagement.value.startDate,
        phone: newLeaveManagement.value.phone,
        email: newLeaveManagement.value.email,
        resumptionDate: newLeaveManagement.value.resumptionDate,
        endDate: newLeaveManagement.value.endDate,
        name: newLeaveManagement.value.name,
    }

    const newData:any = {
        url: request,
        data: expendituredata,
    }
    console.log('newData', newData)
    // await store.dispatch(accountActionTypes.AddLeaveManagement, newData)
    closeModal()
    // await store.dispatch(accountActionTypes.FetchLeaveManagement)
    // store.commit(accountMutationTypes.SetNewLeaveManagement, {})
}

const editexpenditure:any = async () => {
    console.log('hi');
    const request:any = `${account_api_url}api/expenditure/edit-expenditure`;

    const expendituredata:any = {
        leaveTypeId: newLeaveManagement.value.leaveTypeId,
        nameOfRelief: newLeaveManagement.value.nameOfRelief,
        startDate: newLeaveManagement.value.startDate,
        phone: newLeaveManagement.value.phone,
        email: newLeaveManagement.value.email,
        resumptionDate: newLeaveManagement.value.resumptionDate,
        endDate: newLeaveManagement.value.endDate,
        name: newLeaveManagement.value.name,
        id: newLeaveManagement.value.id
    }

    const newData:any = {
        url: request,
        data: expendituredata,
    }
    console.log('newData', newData)
    // await store.dispatch(accountActionTypes.EditLeaveManagement, newData)
    closeModal()
    // await store.dispatch(accountActionTypes.FetchLeaveManagement)
    // store.commit(accountMutationTypes.SetNewLeaveManagement, {})
}

const format:any = (date:any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

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
    !isError.value ? addexpenditure() : '';
}

const submitEdit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editexpenditure() : '';
}

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async () => {
    console.log('I am now here')
})
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} leave</p>
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="addexpenditure" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- {{ newLeaveManagement }} -->
                <div class="grid gap-4">
                    <label for="name" class="font-semibold">
                        Employee name <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newLeaveManagement.name" name="name" id="name" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <!-- <multiselect @select="checkError" @clear="checkError" v-model="newLeaveManagement.name" valueProp="id" :options="courses" track-by="name" label="name" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.name ? errors.nameText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="name in courses" :key="name.id"  :value=name.id>{{ name.name }}</option>
                    </select> -->
                </div>
                <div class="grid gap-4">
                    <label for="name" class="font-semibold">
                        Employee email <span class="text-red font-bold">*</span>
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newLeaveManagement.email" name="email" id="email" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <!-- <multiselect @select="checkError" @clear="checkError" v-model="newLeaveManagement.name" valueProp="id" :options="courses" track-by="name" label="name" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="name in courses" :key="name.id"  :value=name.id>{{ name.name }}</option>
                    </select> -->
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- {{ newLeaveManagement }} -->
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newLeaveManagement.phone" name="phone" id="phone" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <!-- <multiselect @select="checkError" @clear="checkError" v-model="newLeaveManagement.name" valueProp="id" :options="courses" track-by="name" label="name" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.phone ? errors.phoneText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="name in courses" :key="name.id"  :value=name.id>{{ name.name }}</option>
                    </select> -->
                </div>
                <div class="grid gap-4">
                    <label for="category" class="font-semibold">
                        Leave type <span class="text-red font-bold">*</span>
                    </label>
                    <!-- <input type="text" @focus="checkError" @keyup="checkError"  v-model="newLeaveManagement.category" name="category" id="category" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none"> -->
                    <multiselect @select="checkError" @clear="checkError"  v-model="newLeaveManagement.leaveTypeId" valueProp="id" :options="leavetypes" track-by="name" label="name" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] text-red">
                        {{ errors.leaveTypeId ? errors.leaveTypeIdText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-2 relative gap-8 mb-10">
                <div class="grid gap-4" id="startDate">
                    <label for="startDate" class="font-semibold">
                        Start date <span class="text-red font-bold">*</span>
                    </label>
                    <DatePicker v-if="props.name == 'Edit'" v-model="newLeaveManagement.startDate" autoApply>
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newLeaveManagement.startDate" placeholder="Select Date" :format="format" position="left" teleport="#startDate" teleport-right :alt-position="customPosition" autoApply/>
                    <!-- <datepicker /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.startDate ? errors.startDateText : '' }}
                    </p>
                </div>
                <div class="grid gap-4" id="endDate">
                    <label for="endDate" class="font-semibold">
                        End date <span class="text-red font-bold">*</span>
                    </label>
                    <DatePicker v-if="props.name == 'Edit'" v-model="newLeaveManagement.endDate" autoApply>
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newLeaveManagement.endDate" placeholder="Select Date" :format="format" position="left" teleport="#endDate" autoApply/>
                    <!-- <datepicker /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.endDate ? errors.endDateText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4" id="resumptionDate">
                    <label for="resumptionDate" class="font-semibold">
                        Resumption date <span class="text-red font-bold">*</span>
                    </label>
                    <DatePicker v-if="props.name == 'Edit'" v-model="newLeaveManagement.resumptionDate" autoApply>
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newLeaveManagement.resumptionDate" placeholder="Select Date" :format="format" position="left" teleport="#resumptionDate" class="z-20" autoApply/>
                    <!-- <datepicker /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.resumptionDate ? errors.resumptionDateText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="nameOfRelief" class="font-semibold">
                        Name of relief <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" placeholder="Enter name" v-model="newLeaveManagement.nameOfRelief" name="nameOfRelief" id="nameOfRelief" class="relative px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none z-20">
                    <p class="text-[10px] text-red">
                        {{ errors.nameOfRelief ? errors.nameOfReliefText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end mt-20 gap-10 pb-10">
                <button @click.prevent="closeModal" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border border-primary text-primary rounded-md">Cancel</button>
                <button v-if="!isEditing" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Create</button>
                <button v-else @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">

.dp-custom-menu {
    position: static !important;
}
</style>