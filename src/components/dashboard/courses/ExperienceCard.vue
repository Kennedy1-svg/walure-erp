<script lang="ts">
export default {
  name: "ExperienceCard",
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted, toRefs } from 'vue';
import { api_url } from '../../../config';
import SvgIcons from '../../SvgIcons.vue';
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import { useStore } from 'vuex'

const store = useStore();

const emits = defineEmits(['delete', 'edit']);

const deleteItem:any = async () => {
    console.log('delete item');
    emits('delete')
}

const editItem:any = async () => {
    console.log('edit item');
    emits('edit')
}

</script>

<template>
    <div class="main grid border rounded-md justify-items-start p-6">
        <p class="font-bold text-xl">
            <slot name="title">
                Week 1
            </slot>
        </p>
        <p class="text-sm pt-2 text-grey">
            <slot name="date">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </slot>
        </p>
        <p class="text-sm text-left text-grey">
            <slot name="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            </slot>
        </p>
        <div class="justify-self-end">
            <span class="icons pt-3 flex gap-3 text-grey">
                <SvgIcons name="edit" class="cursor-pointer hover:text-green-accent" @click="editItem" />
                <SvgIcons name="delete" class="cursor-pointer hover:text-red" @click="deleteItem" />
            </span>
        </div>
    </div>
</template>