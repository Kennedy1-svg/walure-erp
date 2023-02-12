<script lang="ts">
export default {
  name: 'AddRevenue',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { account_api_url } from '../../../config'
import moment from 'moment';
import SvgIcons from '../../SvgIcons.vue';
import { DatePicker } from 'v-calendar'
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import 'v-calendar/dist/style.css';
import 'vue3-date-time-picker/dist/main.css'
// import datepicker from '../../datepicker.vue'
import multiselect from '@vueform/multiselect'
import * as accountActionTypes from '../../../store/module/account/constants/action'
import * as accountMutationTypes from '../../../store/module/account/constants/mutation'
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

const newRevenue:any = computed(() => {
    return store.getters.getNewRevenue.value
})

const categories:any = computed(() => {
    return store.getters.getCategory.value.payload;
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

const checkError:any = () => {
    if (!newRevenue.value.categoryId && newRevenue.value.categoryId != '0') {
        errors.categoryId = true;
        errors.categoryIdText = 'Category is required'
    } else {
        errors.categoryId = false;
        errors.categoryIdText = '';
    }

    // if (!newRevenue.value.email) {
    //     errors.email = true;
    //     errors.emailText = 'Email is required'
    // } else if (!newRevenue.value.email.match(email)) {
    //     errors.email = true;
    //     errors.emailText = `Email must should have the format 'brianadams@walure.com`
    // } else {
    //     errors.email = false;
    //     errors.emailText = ''
    // }

    if (!newRevenue.value.amount) {
        errors.amount = true;
        errors.amountText = 'Number of resources is required'
    } else if (isNaN(newRevenue.value.amount)) {
        errors.amount = true;
        errors.amountText = 'Number of resources cannot contain letters'
    } else {
        errors.amount = false;
        errors.amountText = '';
    }

    if (!newRevenue.value.transactionDate) {
        errors.transactionDate = true;
        errors.transactionDateText = 'DOT is required.'
    } else {
        errors.transactionDate = false;
        errors.transactionDateText = '';
    }

    if (!newRevenue.value.item) {
        errors.item = true;
        errors.itemText = 'Product is required. Please enter a item'
    } else {
        errors.item = false;
        errors.itemText = '';
    }

    // if (!newRevenue.value.endDate) {
    //     errors.endDate = true;
    //     errors.endDateText = 'End date is required'
    // } else {
    //     errors.endDate = false;
    //     errors.endDateText = '';
    // }

    // if (!newRevenue.value.brief) {
    //     errors.brief = true;
    //     errors.briefText = 'Project brief is required'
    // } else {
    //     errors.brief = false;
    //     errors.briefText = '';
    // }

    if (errors.categoryId) {
        errors.categoryId = true;
        isError.value = true;
    // } else if (errors.email) {
    //     errors.email = true;
    //     isError.value = true;
    } else if (errors.amount) {
        errors.amount = true;
        isError.value = true;
    // } else if (errors.endDate) {
    //     errors.endDate = true;
    //     isError.value = true;
    // } else if (errors.brief) {
    //     errors.brief = true;
    //     isError.value = true;
    } else if (errors.transactionDate) {
        errors.transactionDate = true;
        isError.value = true;
    } else if (errors.item) {
        errors.item = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

let isChecked:any = ref(false);
const transactionDate:any = ref('');
const endDate:any = ref('');

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

let errors = reactive({
    categoryId: false,
    categoryIdText: '',
    amount: false,
    amountText: '',
    transactionDate: false,
    transactionDateText: '',
    endDate: false,
    endDateText: '',
    item: false,
    itemText: '',
})

const uniqueIdentifier:any = async () => {
    console.log('uniqueIdentifier')
    console.log(`${newRevenue.value.categoryId}`)
    const request:any = `${account_api_url}api/revenuecategory/get_category/${newRevenue.value.categoryId}`;
    console.log('request for the', request)
    await store.dispatch(accountActionTypes.FetchEditCategory, request)
    let category:any = await store.getters.getNewCategory.value
    console.log('category for the', category, newRevenue.value.item)
    let code:any = `${category.name.substring(0, 3).toUpperCase()}${newRevenue.value.item.substring(0, 3).toUpperCase()}${randomDigits.value}`
    console.log('code for the', code, randomDigits.value)
    return code
}

const randomDigits = computed(() => {
  return Math.floor(1000 + Math.random() * 9000);
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

const closeModal:any = async () => {
    // await store.commit(accountMutationTypes.SetNewRevenue, {})
    emits('close')
}

const addrevenue:any = async () => {
    console.log('hi');
    const request:any = `${account_api_url}api/revenue/create-revenue`;
    let code:any = await uniqueIdentifier()

    const revenuedata:any = {
        categoryId: newRevenue.value.categoryId,
        uniqueIdentifierCode: code,
        amount: newRevenue.value.amount,
        transactionDate: newRevenue.value.transactionDate,
        item: newRevenue.value.item,
    }

    const newData:any = {
        url: request,
        data: revenuedata,
    }
    console.log('newData', newData)
    await store.dispatch(accountActionTypes.AddRevenue, newData)
    closeModal()
    await store.dispatch(accountActionTypes.FetchRevenue)
    store.commit(accountMutationTypes.SetNewRevenue, {})
}

const editrevenue:any = async () => {
    console.log('hi');
    const request:any = `${account_api_url}api/revenue/edit_revenue`;

    const revenuedata:any = {
        categoryId: newRevenue.value.categoryId,
        amount: newRevenue.value.amount,
        transactionDate: newRevenue.value.transactionDate,
        // endDate: moment(newRevenue.value.endDate).format('MM/DD/YYYY'),
        // brief: newRevenue.value.brief,
        item: newRevenue.value.item,
        id: newRevenue.value.id
    }

    const newData:any = {
        url: request,
        data: revenuedata,
    }
    console.log('newData', newData)
    await store.dispatch(accountActionTypes.EditRevenue, newData)
    closeModal()
    await store.dispatch(accountActionTypes.FetchRevenue)
    store.commit(accountMutationTypes.SetNewRevenue, {})
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
    !isError.value ? addrevenue() : '';
}

const submitEdit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editrevenue() : '';
}

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async () => {
    console.log('I am now here')
    const request:any = `${account_api_url}api/revenuecategory/getlist-category`;
    console.log('url', request)
    await store.dispatch(accountActionTypes.FetchCategory, request)
})
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} revenue</p>
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="addrevenue" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- {{ newRevenue }} -->
                <div class="grid gap-4">
                    <label for="category" class="font-semibold">
                        Category <span class="text-red font-bold">*</span>
                    </label>
                    <!-- <input type="text" @focus="checkError" @keyup="checkError"  v-model="newRevenue.category" name="category" id="category" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none"> -->
                    <multiselect @select="checkError" @clear="checkError"  v-model="newRevenue.categoryId" valueProp="id" :options="categories" track-by="name" label="name" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] text-red">
                        {{ errors.categoryId ? errors.categoryIdText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="product" class="font-semibold">
                        Product <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newRevenue.item" name="product" id="product" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <!-- <multiselect @select="checkError" @clear="checkError" v-model="newRevenue.product" valueProp="id" :options="courses" track-by="product" label="product" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.item ? errors.itemText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.product }}</option>
                    </select> -->
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4" id="transactionDate">
                    <label for="transactionDate" class="font-semibold">
                        DOT <span class="text-red font-bold">*</span>
                    </label>
                    <DatePicker v-if="props.name == 'Edit'" v-model="newRevenue.transactionDate">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newRevenue.transactionDate" placeholder="Select Date" :format="format" position="left" teleport="#transactionDate"/>
                    <!-- <datepicker /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.transactionDate ? errors.transactionDateText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="amount" class="font-semibold">
                        Amount <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newRevenue.amount" name="amount" id="amount" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.amount ? errors.amountText : '' }}
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