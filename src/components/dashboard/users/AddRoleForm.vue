<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, toRefs } from 'vue'
import { api_url } from '../../../config'
import { useStore } from 'vuex'

export default {
    name: 'AddRoleForm',
}
</script>

<script setup lang="ts">
import Switch from '../../userswitch.vue'
import Search from '../../Search.vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
// import switcher from '../../switcher.vue';
import * as actionTypes from '../../../store/module/users/constants/action'
import * as mutationTypes from '../../../store/module/users/constants/mutation'

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);

let errors = reactive({
    RoleName: false,
    RoleNameText: '',
    Permission: false,
    PermissionText: '',
})

const newRole:any = computed(() => {
    return store.getters.getNewRole.value;
});

const allPermissions:any = computed(() => {
    return store.getters.getPermissions.value.payload;
});

const checkError:any = () => {
    if (!newRole.value.role) {
        errors.RoleName = true;
        errors.RoleNameText = 'New role name is required'
    } else if (newRole.value.role.length <= 3) {
        errors.RoleName = true;
        errors.RoleNameText = 'Role name needs to be more than 3 characters'
    } else {
        errors.RoleName = false;
    }

    if (!newRole.value.Permission) {
        errors.Permission = true;
        errors.PermissionText = 'Add a permission'
    } else {
        errors.Permission = false;
    }


    if (errors.RoleName) {
        errors.RoleName = true;
        isError.value = true;
    } else if (errors.Permission) {
        errors.Permission = true;
        isError.value = true;
    }
}

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    let user:any = {}
    store.commit(mutationTypes.SetNewUser, user)
    emits('close')
}

const addRole:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/user-management/new-userapp`;

    let requestData:any = {
        role: newRole.value.role,
        permissions: newRole.value.permissions
    }

    const newData:any = {
        url: request,
        data: requestData
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.AddNewRole, newData)
    const result = await store.getters.getRoles
    store.commit(mutationTypes.SetNewRole, {})
    closeModal()
}

let clicked:any = ref(false)

let allMarked:any = ref()

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addRole() : '';
}

const createUsers:any = {
    name: 'Create all users'
}

const viewDashboard:any = {
    name: 'View dashboard'
}

const accessCourse:any = {
    name: 'Access to course'
}

const accessTalentMgmt:any = {
    name: 'Access to talent management'
}

const contactUs:any = {
    name: 'Contact us'
}

const allModules:any = {
    name: 'Access to all modules'
}

const iposModules:any = {
    name: 'Access to all ipos modules'
}

const student:any = {
    name: 'Access to all student'
}

const serviceMgmt:any = {
    name: 'Access to all service management'
}

let isSearching:any = ref(false)

let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
    const search:any = searchText.value.toLowerCase();
    const request:any = `${api_url}api/role/search-role/{pageIndex}/{pageSize}/${search}`;
    await store.dispatch(actionTypes.FetchRole, request)
}

const close:any = async () => {
    isSearching.value = false
    searchText.value = ''
    await store.dispatch(actionTypes.FetchRole)
}

const toggleCreateUser:any = async () => {
    if (!checked.createUsers) {
        newRole.value.permissions.push(createUsers)
        checked.createUsers = !checked.createUsers
    } else {
        remove(createUsers)
        checked.createUsers = !checked.createUsers
    }
}

const toggleAllModules:any = async () => {
    if (!checked.allModules) {
        newRole.value.permissions.push(allModules)
        checked.allModules = !checked.allModules
    } else {
        remove(allModules)
        checked.allModules = !checked.allModules
    }
}

const toggleViewDashboard:any = async () => {
    if (!checked.viewDashboard) {
        newRole.value.permissions.push(viewDashboard)
        checked.viewDashboard = !checked.viewDashboard
    } else {
        remove(viewDashboard)
        checked.viewDashboard = !checked.viewDashboard
    }
}

const toggleIposModules:any = async () => {
    if (!checked.iposModules) {
        newRole.value.permissions.push(iposModules)
        checked.iposModules = !checked.iposModules
    } else {
        remove(iposModules)
        checked.iposModules = !checked.iposModules
    }
}

const toggleAccessCourse:any = async () => {
    if (!checked.accessCourse) {
        newRole.value.permissions.push(accessCourse)
        checked.accessCourse = !checked.accessCourse
    } else {
        remove(accessCourse)
        checked.accessCourse = !checked.accessCourse
    }
}

const toggleStudent:any = async () => {
    if (!checked.student) {
        newRole.value.permissions.push(student)
        checked.student = !checked.student
    } else {
        remove(student)
        checked.student = !checked.student
    }
}

const toggleAccessTalentMgmt:any = async () => {
    if (!checked.accessTalentMgmt) {
        newRole.value.permissions.push(accessTalentMgmt)
        checked.accessTalentMgmt = !checked.accessTalentMgmt
    } else {
        remove(accessTalentMgmt)
        checked.accessTalentMgmt = !checked.accessTalentMgmt
    }
}

const toggleServiceMgmt:any = async () => {
    if (!checked.serviceMgmt) {
        newRole.value.permissions.push(serviceMgmt)
        checked.serviceMgmt = !checked.serviceMgmt
    } else {
        remove(serviceMgmt)
        checked.serviceMgmt = !checked.serviceMgmt
    }
}

const toggleContactUs:any = async () => {
    if (!checked.contactUs) {
        newRole.value.permissions.push(contactUs)
        checked.contactUs = !checked.contactUs
    } else {
        remove(contactUs)
        checked.contactUs = !checked.contactUs
    }
}

const toggle:any = (permission:any) => {}

let checked:any = reactive({
    createUsers: false,
    allModules: false,
    viewDashboard: false,
    iposModules: false,
    accessCourse: false,
    student: false,
    accessTalentMgmt: false,
    serviceMgmt: false,
    contactUs: false,
})

const selectAll = () => {
    checked.createUsers = true
    checked.allModules = true
    checked.viewDashboard = true
    checked.iposModules = true
    checked.accessCourse = true
    checked.student = true
    checked.accessTalentMgmt = true
    checked.serviceMgmt = true
    checked.contactUs = true
}

const unselectAll = () => {
    clicked.value = false
    newRole.value.permissions = []
    checked.createUsers = false
    checked.allModules = false
    checked.viewDashboard = false
    checked.iposModules = false
    checked.accessCourse = false
    checked.student = false
    checked.accessTalentMgmt = false
    checked.serviceMgmt = false
    checked.contactUs = false
}

const remove:any = (permission:any) => {
    newRole.value.permissions = newRole.value.permissions.filter((result:any) => {
        console.log(`result is ${result.name}`)
        return result.name !== permission.name
    })
}

const markAll:any = () => {
    if (clicked.value) {
        clicked.value = false
        unselectAll()
    } else {
        newRole.value.permissions = [createUsers, viewDashboard, accessCourse, accessTalentMgmt, contactUs, allModules, iposModules, student, serviceMgmt]
        clicked.value=true
        selectAll()
    }
}

onMounted(async () => {
    await store.dispatch(actionTypes.FetchPermissions)
})
</script>

<template>
    <div class="main grid pt-[50px] h-full bg-white px-10 pb-[10px] gap-5">
        <!-- {{ allPermissions }} -->
        <div class="flex justify-between items-center">
            <div class="grid gap-3">
                <label for="rolename" class="font-semibold">
                    Role name
                </label>
                <input type="text" placeholder="Role name" @focus="checkError" @keyup="checkError" v-model="newRole.role" name="rolename" id="rolename" class="px-4 py-[10px] w-[400px] border rounded-md text-xs focus:outline-none">

                <p class="text-[10px] text-red">
                    {{ errors.RoleName ? errors.RoleNameText : '' }}
                </p>
            </div>
            <div class="grid gap-3 pt-4">
                <Search>
                    <template #input>
                        <input class="rounded text-sm w-[250px] p-1 focus:outline-none" @keyup.esc="close" v-model="searchText" type="text" placeholder="Search permission">
                        <span class="w-auto flex justify-end items-center text-grey">
                            <SvgIcons v-if="!isSearching" name="search" @click="filter"  />
                            <SvgIcons v-else name="o-cancel" @click="close" class="transform scale-75" />
                        </span>
                    </template>
                </Search>
            </div>
        </div>
        <div class="flex justify-end my-3">
            <p class="flex items-center gap-3">Mark all permission <span>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        id="checkbox"
                        :checked="clicked"
                        @click="markAll()">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch @change="markAll" @click="clicked.value = !clicked.value" /> -->
            </span> </p>
        </div>
        <!-- <switcher :checked="clicked" /> -->
        <div class="grid grid-cols-2 gap-x-44 gap-y-2">
            <div class="flex justify-between items-center">
                <p>Create all users</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.createUsers"
                        @click="toggleCreateUser()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(createUsers)" @remove="remove(createUsers)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>Create all users</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44"> -->
            <div class="flex justify-between items-center">
                <p>Access all modules</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.allModules"
                        @click="toggleAllModules()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(allModules)" @remove="remove(allModules)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>Access all modules</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44"> -->
            <div class="flex justify-between items-center">
                <p>View Dashboard</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.viewDashboard"
                        @click="toggleViewDashboard()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(viewDashboard)" @remove="remove(viewDashboard)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>View Dashboard</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44"> -->
            <div class="flex justify-between items-center">
                <p>Access Ipos module</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.iposModules"
                        @click="toggleIposModules()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(iposModules)" @remove="remove(iposModules)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>Access Ipos module</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44"> -->
            <div class="flex justify-between items-center">
                <p>Access to course</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.accessCourse"
                        @click="toggleAccessCourse()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(accessCourse)" @remove="remove(accessCourse)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>Access to course</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44"> -->
            <div class="flex justify-between items-center">
                <p>Access student</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.student"
                        @click="toggleStudent()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(student)" @remove="remove(student)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>Access student</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44"> -->
            <div class="flex justify-between items-center">
                <p>Access Talent mgt</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.accessTalentMgmt"
                        @click="toggleAccessTalentMgmt()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(accessTalentMgmt)" @remove="remove(accessTalentMgmt)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>Access Talent mgt</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44"> -->
            <div class="flex justify-between items-center">
                <p>Access to service mgt</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.serviceMgmt"
                        @click="toggleServiceMgmt()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(serviceMgmt)" @remove="remove(serviceMgmt)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>Access to service mgt</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44"> -->
            <div class="flex justify-between items-center">
                <p>Contact us</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.contactUs"
                        @click="toggleContactUs()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
                <!-- <Switch class="" @toggle="toggle(contactUs)" @remove="remove(contactUs)" /> -->
            </div>
            <!-- <div class="flex justify-between items-center">
                <p>Contact us</p>
                <Switch class="" @toggle="toggle(createUsers)" @remove="remove()" />
            </div> -->
        </div>
        <div class="flex justify-between items-center py-10">
            <div class="grid gap-3">
            </div>
            <div class="grid gap-3">
                <div class="flex justify-center items-center gap-20 pr-10">
                    <button @click.prevent="unselectAll" class="py-4 px-8 bg-opacity-80 font-bold text-primary flex justify-center border border-primary hover:bg-primary hover:text-white rounded-md">
                        Remove all
                    </button>
                    <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">
                        Create role
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    input:checked {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .toggler {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgb(227, 227, 227);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    .toggler::before {
        @apply absolute w-6 h-6 -left-[1px] -bottom-[1px] bg-green-accent;
        content: '';
    }
    input:checked + .toggler {
        @apply bg-green-accent bg-opacity-[48%];
    }
    input:checked + .toggler:before {
        -webkit-transform: translateX(22px);
        -ms-transform: translateX(22px);
        transform: translateX(22px);
    }
    .toggler.round {
        border-radius: 34px;
    }
    .toggler.round:before {
        border-radius: 50%;
    }
</style>