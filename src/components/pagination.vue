<script lang="ts">
export default {
  name: 'pagination',
}
</script>

<script setup lang="ts">
import { defineEmits, defineProps, ref, toRefs, computed } from 'vue';
import SvgIcons from './SvgIcons.vue'

const props = defineProps({
    maxVisibleButtons: {
        type: Number,
        required: false,
        default: 2,
    },
    totalPages: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
    perPage: {
        type: Number,
        required: true,
    },
})

const { currentPage, maxVisibleButtons, totalPages } = toRefs(props)

const startPage:any = computed(() => {
    if (props.currentPage == 1) {
        return 1;
    }
    if (props.currentPage === totalPages.value) {
        return props.totalPages - props.maxVisibleButtons;
    }
    return props.currentPage;
});

const page:any = computed(() => {
    const start:any = startPage.value;
    const end:any = start + props.maxVisibleButtons;
    const pages:any = [];
    for (let i:any = start; i <= Math.min(end - 1, totalPages.value); i++) {
        pages.push({
            name: i,
            isDisabled: i === props.currentPage,
        });
    }
    return pages;
});

const isInFirstPage:any = computed(() => {
  return props.currentPage == 1;
});

const isInLastPage:any = computed(() => {
  return props.currentPage == totalPages.value;
});

const emit = defineEmits(['pageChanged']);

const onClickFirstPage = () => {
    console.log('e suppose disable', isInFirstPage.value)
    emit('pageChanged', 1);
}

const onClickLastPage = () => {
    emit('pageChanged', totalPages.value);
}

const onClickNextPage = () => {
    console.log('current page na', props.currentPage)
    emit('pageChanged', props.currentPage + 1);
}
const onClickPreviousPage = () => {
    emit('pageChanged', props.currentPage - 1);
}

const isPageActive:any = (page:any) => {
    return page == props.currentPage;
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