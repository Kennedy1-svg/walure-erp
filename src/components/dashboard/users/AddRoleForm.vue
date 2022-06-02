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
import SvgIcons from '../../SvgIcons.vue';

const markAll:any = () => {

}

</script>

<template>
    <div class="main grid pt-[50px] h-full bg-white px-10 pb-[10px] gap-5">
        <div class="flex justify-between items-center">
            <div class="grid gap-3">
                <label for="email" class="font-semibold">
                    Role name
                </label>
                <input type="text" placeholder="Role name" @focus="checkError" @keyup="checkError"   name="name" id="name" class="px-4 py-[10px] w-[400px] border rounded-md text-xs focus:outline-none">

                <p class="text-[10px] text-red">
                    <!-- {{ errors.email ? errors.emailText : '' }} -->
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
                <Switch @change="markAll" />
            </span> </p>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>Create all users</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>Create all users</p>
                <Switch class="" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>Access all modules</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>Access all modules</p>
                <Switch class="" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>View Dashboard</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>View Dashboard</p>
                <Switch class="" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>Access Ipos module</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>Access Ipos module</p>
                <Switch class="" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>Access to course</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>Access to course</p>
                <Switch class="" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>Access student</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>Access student</p>
                <Switch class="" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>Access Talent mgt</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>Access Talent mgt</p>
                <Switch class="" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>Access to service mgt</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>Access to service mgt</p>
                <Switch class="" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-44">
            <div class="flex justify-between items-center">
                <p>Contact us</p>
                <Switch class="" />
            </div>
            <div class="flex justify-between items-center">
                <p>Contact us</p>
                <Switch class="" />
            </div>
        </div>
        <div class="flex justify-between items-center py-10">
            <div class="grid gap-3">
            </div>
            <div class="grid gap-3">
                <div class="flex justify-center items-center gap-20 pr-10">
                    <button>
                        Remove all
                    </button>
                    <button>
                        Create role
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>