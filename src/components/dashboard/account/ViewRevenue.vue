<script lang="ts">
export default {
  name: 'ViewRevenue',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
// import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { account_api_url } from '../../../config'
import moment from 'moment';
import SvgIcons from '../../SvgIcons.vue';
import { DatePicker } from 'v-calendar';
import Datepicker from '@vuepic/vue-datepicker';
import 'v-calendar/dist/style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import multiselect from '@vueform/multiselect'
import * as accountActionTypes from '../../../store/module/account/constants/action';
import * as accountMutationTypes from '../../../store/module/account/constants/mutation';

const store = useStore();

const newRevenue:any = computed(() => {
    return store.getters.getNewRevenue.value
})

const categories:any = computed(() => {
    return store.getters.getCategory.value.payload;
})

const randomDigits = computed(() => {
  return Math.floor(1000 + Math.random() * 9000);
})

const today:any = moment().format('YYYY-MM-DD');

const emits = defineEmits(['close'])

const closeModal:any = () => {
    store.commit(accountMutationTypes.SetNewRevenue, {})
    emits('close')
}

const format:any = (date:any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

onMounted(async () => {
    console.log('I am now here')
    const request:any = `${account_api_url}api/revenuecategory/getlist-category`;
    console.log('url', request)
    await store.dispatch(accountActionTypes.FetchCategoryList, request)
})
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">View revenue</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="addrevenue" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- {{ newRevenue }} -->
                <div class="grid gap-4">
                    <label for="category" class="font-semibold">
                        Category <span class="text-red font-bold">*</span>
                    </label>
                    <multiselect v-model="newRevenue.categoryId" valueProp="id" :options="categories" track-by="name" label="name" placeholder="Select option" :searchable="true" class="multiselect-blue" disabled="true"/>
                </div>
                <div class="grid gap-4">
                    <label for="product" class="font-semibold">
                        Product <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text"  v-model="newRevenue.item" name="product" id="product" class="px-4 py-[10px] w-full border rounded-md text-sm focus:outline-none" disabled>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4" id="transactionDate">
                    <label for="transactionDate" class="font-semibold">
                        DOT <span class="text-red font-bold">*</span>
                    </label>
                    <Datepicker inputClassName="dp-custom-input" menuClassName="dp-custom-menu" v-model="newRevenue.transactionDate" placeholder="Select Date" :format="format" position="left" teleport="#transactionDate" disabled autoApply/>
                </div>
                <div class="grid gap-4">
                    <label for="amount" class="font-semibold">
                        Amount <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" v-model="newRevenue.amount" name="amount" id="amount" class="px-4 py-[10px] w-full border rounded-md text-sm focus:outline-none" disabled>
                </div>
                <div class="grid gap-4">
                    <label for="uniqueIdentifier" class="font-semibold">
                        Unique Identifier Code <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" v-model="newRevenue.uniqueIdentifierCode" name="amount" id="amount" class="px-4 py-[10px] w-full border rounded-md text-sm focus:outline-none" disabled>
                </div>
                <div class="grid gap-4">
                    <label for="doc" class="font-semibold">
                        DOC <span class="text-red font-bold">*</span>
                    </label>
                    <Datepicker inputClassName="dp-custom-input" menuClassName="dp-custom-menu" v-model="newRevenue.createdOn" placeholder="Select Date" :format="format" position="left" teleport="#transactionDate" disabled autoApply/>
                </div>
                <div class="grid gap-4">
                    <label for="createdBy" class="font-semibold">
                        Created by <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" v-model="newRevenue.createdBy" name="createdBy" id="createdBy" class="px-4 py-[10px] w-full border rounded-md text-sm focus:outline-none" disabled>
                </div>
                <div class="grid gap-4">
                    <label for="modifiedBy" class="font-semibold">
                        Modified by <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" v-model="newRevenue.modifiedBy" name="modifiedBy" id="modifiedBy" class="px-4 py-[10px] w-full border rounded-md text-sm focus:outline-none" disabled>
                </div>
            </div>
            <div class="flex justify-end mt-20 gap-10 pb-10">
                <button @click.prevent="closeModal" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border border-primary text-primary rounded-md">Close</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">

.dp-custom-menu {
    position: static !important;
}
</style>

<style scoped>
.dp-custom-input {
    @apply py-[8px] rounded-md;
}
.multiselect-blue {
  /* --ms-option-bg: #DBEAFE; */
  --ms-option-color: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-dropdown-bg: #FFFFFF;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-tag-bg: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-py: 10px;
  --ms-font-size: 14px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>