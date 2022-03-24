<script lang="ts">
export default {
  name: 'CourseCard',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SvgIcons from '../../SvgIcons.vue';
</script>

<template>
    <div class="main grid justify-items-center items-center py-14 bg-white rounded">
        <div class="flex">
            <span class="border-2 border-dashed p-1 rounded-full  justify-center items-center">
                <SvgIcons class="text-gray-300" name="pic-avatar" />
            </span>
        </div>
        <!-- <img src="" alt=""> -->
        <div class="text-center pt-5">
            <p class="text-2xl font-semibold py-1">Farming</p>
            <p class="font-medium text-grey">Beginners 6 weeks</p>
        </div>
        <div class="btns py-9 flex gap-4 text-white">
            <button class="bg-red rounded px-10 py-4">
                Delete
            </button>
            <button class="bg-greenish rounded px-10 py-4">
                Update
            </button>
        </div>
    </div>
</template>