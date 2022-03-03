<script setup lang="ts">
import Cards from '../Card.vue';
</script>

<template>
    <div class="main grid py-8">
        <h1 class="text-xl font-semibold">Dashboard</h1>
        <div class="grid grid-cols-3 gap-8">
            <Cards></Cards>
            <Cards></Cards>
            <Cards></Cards>
        </div>
    </div>
</template>