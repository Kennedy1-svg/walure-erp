<script lang="ts">
export default {
  name: 'AddSkill',
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';

const route = useRouter()

let isChecked:any = ref(false);

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const addStudent:any = () => {
    // console.log('hi');
    // route.push('/dashboard/student-management')
}
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add Skill</p>
            <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm grid">
            <div class="grid gap-1 mb-10">
                <label for="batch" class="font-semibold">
                    Name
                </label>
                <input type="text" name="name" id="name" placeholder="Enter name" class="p-3 rounded border">
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="addStudent" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>
