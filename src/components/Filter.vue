<script setup lang="ts">
import SvgIcons from './SvgIcons.vue';
</script>

<template>    
    <div class="relative dropdown">
        <button class="border p-3 flex items-center justify-between rounded-md shadow-inner w-full">
            <slot name="info"></slot>

            <SvgIcons name="chevron-down" />
        </button>
        <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
            <div class="absolute bg-white rounded-md shadow-lg py-4 w-full">
                <ul class="list-reset text-grey">
                    <li class="px-5 py-3">
                        <slot name="input"></slot><br>
                    </li>
                    <slot name="list">
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Active
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Disabled</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">None</p></li>
                    </slot>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }
</style>