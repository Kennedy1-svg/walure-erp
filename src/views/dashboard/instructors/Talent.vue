<script lang="ts">
import { onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'Talent',
}
</script>

<script setup lang="ts">
import TalentHeader from '../../../components/dashboard/instructors/TalentHeader.vue';
import TalentList from '../../../components/dashboard/instructors/TalentList.vue';
import alert from '../../../components/alerts.vue';
import SvgIcons from '../../../components/SvgIcons.vue';
const store = useStore();

const alertState:any = computed(() => store.getters.getInstructorAlertStatus.value)
const alertText:any = computed(() => store.getters.getInstructorAlertText.value)
const batchAlertState:any = computed(() => store.getters.getBatchAlertStatus.value)
const batchAlertText:any = computed(() => store.getters.getBatchAlertText.value)

const status:any = computed(() => {
    let answer:any
    if (alertText.value.includes('successfully') || batchAlertText.value.includes('successfully')) {
        answer = true
    } else {
        answer = false
    }
    return answer
})
</script>

<template>
    <div class="main mx-9 overflow-hidden">
        <alert :class="[alertState ? '' : batchAlertState ? '' : 'hidden']"  class="fixed z-60 top-40 bg-white p-2 right-0" name="result">
            <template #icon>
                <p v-if="status" class="bg-green-accent rounded-full border p-2">
                    <SvgIcons class="text-white" name="tick" />
                </p>
                <p v-else class="">
                    <SvgIcons class="text-red" name="exclamation" />
                </p>
            </template>
            <template #info>
                <p class="text-sm">
                    {{ alertText || batchAlertText }}
                </p>
            </template>
            <template #button></template>
        </alert>
        <TalentHeader />
        <TalentList />
    </div>
</template>
