<script lang="ts">
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'Talent',
}
</script>

<script setup lang="ts">
import TalentHeader from '../../../components/dashboard/instructors/TalentHeader.vue';
import TalentList from '../../../components/dashboard/instructors/TalentList.vue';
</script>

<template>
    <div class="main mx-9">
        <TalentHeader />
        <TalentList />
    </div>
</template>
