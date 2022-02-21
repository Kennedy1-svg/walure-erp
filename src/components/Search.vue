<script setup lang="ts">
import SvgIcons from './SvgIcons.vue'
</script>

<template>
  <div class="flex items-center">
    <div class="bg-white shadow px-4 p-2 flex mr-4 rounded-md">
        <input class="rounded text-sm p-1 focus:outline-none" type="text" placeholder="Search">
        <span class="w-auto flex justify-end items-center text-grey p-2">
            <SvgIcons name="search"  />
        </span>
      </div>
  </div>
</template>

