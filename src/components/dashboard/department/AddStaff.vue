<script lang="ts">
export default {
    name: 'AddStaff'
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue'

const emits = defineEmits(['close'])

const closeModal:any = () => {
    emits('close')
}

</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <h1 class="text-2xl">Add Staff</h1>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>

        <form class="text-sm grid grid-cols-2">
            <div>
            <label for="department" class="font-bold">
                First Name
            </label>
            <input type="text" class="p-4 border rounded-md text-xs focus:outline-none block my-3"  />
            </div>
            <div>
            <label for="department" class="font-bold">
                Last Name
            </label>
            <input type="text" class="p-4 border rounded-md text-xs focus:outline-none block my-3"  />
            </div>
            <div>
            <label for="department" class="font-bold">
                Middle Name
            </label>
            <input type="text" class="p-4 border rounded-md text-xs focus:outline-none block my-3"  />
            </div>
            <div>
            <label for="department" class="font-bold">
                Email
            </label>
            <input type="email" class="p-4 border rounded-md text-xs focus:outline-none block my-3"/>
            </div>
            <div>
            <label for="department" class="font-bold">
                Phone number
            </label>
            <input type="number" class="p-4 border rounded-md text-xs focus:outline-none block my-3" />
            </div>
            <div>
            <label for="department" class="font-bold">
                Gender
            </label>
            </div>
            <div>
            <label for="department" class="font-bold">
                Role
            </label>      
            </div>
            <div>
            <label for="department" class="font-bold">
                Department
            </label>
            </div>
        
        </form>

    </div>
    
</template>