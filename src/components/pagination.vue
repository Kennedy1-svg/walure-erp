<script lang="ts">
export default {
  name: 'pagination',
}
</script>

<script setup lang="ts">
import { onMounted, ref, toRefs, computed } from 'vue';
import SvgIcons from './SvgIcons.vue'

const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
    },
})

const { totalPages } = toRefs(props)

const currentPage:any = ref(1)


const isInFirstPage:any = onMounted(() => {
    console.log('first cp',currentPage.value)
  return currentPage.value === 1;
});

const isInLastPage:any = onMounted(() => {
    console.log('lastcp', currentPage.value)
  return currentPage.value === props.totalPages;
});

const emit = defineEmits(['pageChanged']);

const onClickFirstPage = () => {
    console.log('first cp', currentPage.value)
    console.log('e suppose disable', isInFirstPage.value)
    emit('pageChanged', 1);
}

const onClickLastPage = () => {
    console.log('e suppose disable', isInLastPage.value)
    emit('pageChanged', totalPages.value);
}

const onClickNextPage = () => {
    console.log('current page na', currentPage.value)
    if (currentPage.value < totalPages.value) {
        emit('pageChanged', currentPage.value + 1);
        currentPage.value = currentPage.value + 1;
    }
}
const onClickPreviousPage = () => {
    if (currentPage.value > 1) {
        emit('pageChanged', currentPage.value - 1);
        currentPage.value = currentPage.value - 1;
    }
}

const isPageActive:any = (page:any) => {
    return page == currentPage.value;
}

</script>

<template>
    <div class="main">
        <div class="border-t-0 font-normal align-middle border-l-0 border-r-0 whitespace-nowrap py-4 gap-10 text-left flex items-center">
            <button
                type="button"
                @click="onClickFirstPage"
                :disabled="isInFirstPage.value"
            >
                <SvgIcons name="previous" />
            </button>
            <button
                type="button"
                @click="onClickPreviousPage"
                :disabled="isInFirstPage.value"
            >
                <SvgIcons name="chevron-left" />
            </button>
            <button
                type="button"
                @click="onClickNextPage"
                :disabled="isInLastPage.value"
            >
                <SvgIcons name="chevron-right" />
            </button>
            <button
                type="button"
                @click="onClickLastPage"
                :disabled="isInLastPage.value"
            >
                <SvgIcons name="next" />
            </button>
        </div>
    </div>
</template>