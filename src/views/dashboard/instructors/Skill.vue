<script lang="ts">
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'Skill',
}
</script>

<script setup lang="ts">
import SkillHeader from '../../../components/dashboard/instructors/SkillHeader.vue';
import SkillList from '../../../components/dashboard/instructors/SkillList.vue';
</script>

<template>
    <div class="main mx-9">
        <SkillHeader />
        <SkillList />
    </div>
</template>
