<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Disabled')
const isActive = ref(false)

const changeStatus:any = () => {
    isActive.value = !isActive.value
    status.value = isActive.value ? 'Active' : 'Disabled'
}
</script>

<template>
    <div class="my-2 flex items-center">
        <label class="relative inline-block h-3 w-8">
            <input 
                type="checkbox" 
                id="checkbox"
                @click="changeStatus"
                >
            <span class="toggler round"></span>
        </label>
        <p class="px-4">
            {{ status }}
        </p> 
    </div>
</template>

<style scoped>
    input {
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
        @apply absolute w-5 h-5 -left-[4px] -bottom-[4px] bg-primary;
        content: '';
    }

    input:checked + .toggler {
        @apply bg-primary bg-opacity-[38%];
    }

    input:checked + .toggler:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    .toggler.round {
        border-radius: 34px;
    }

    .toggler.round:before {
        border-radius: 50%;
    }
</style>