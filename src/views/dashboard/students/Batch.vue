<script lang="ts">
export default {
    name: 'StudentInBatch', 
};
</script>

<script setup lang="ts">
import BatchHeader from '../../../components/dashboard/students/BatchHeader.vue';
import BatchList from '../../../components/dashboard/students/BatchList.vue';
import alert from '../../../components/alerts.vue';
import SvgIcons from '../../../components/SvgIcons.vue';
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore();

const alertState:any = computed(() => store.getters.getStudentAlertStatus.value)
const alertText:any = computed(() => store.getters.getStudentAlertText.value)
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
    <div class="main mx-5 px-5 overflow-hidden">
        <div class="top">
            <BatchHeader />
        </div>
        <div class="list">
            <BatchList />
        </div>
    </div>
</template>