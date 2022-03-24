<script lang="ts">
export default {
  name: 'DeleteForm',
}
</script>

<script setup lang="ts">
import SvgIcons from './SvgIcons.vue';
import { ref } from 'vue';

const emits = defineEmits(['close', 'delete']);

const closeModal:any = async () => {
  emits('close')
}

const deleteItem:any = async () => {
  emits('delete')
}

</script>

<template>
    <div class="main p-6">
        <div class="title pb-5 flex justify-between items-center">
            <p class="text-xl font-semibold">
                <slot name="title">Delete</slot>
            </p>
            <svgIcons @click="closeModal" name="o-cancel" class="cursor-pointer" />
        </div>
        <div class="info pb-24">
            <p class="text-lg">
                <slot name="info">Are you sure?</slot>
            </p>
        </div>
        <div class="buttons flex justify-center items-center gap-3">
            <button @click="closeModal" type="button" class="py-4 px-10 text-primary rounded">
                Cancel
            </button>
            <button @click="deleteItem" type="button" class="py-4 px-10 text-white bg-red rounded">
                <slot name="delete">Yes, Delete</slot>
            </button>
        </div>
    </div>
</template>