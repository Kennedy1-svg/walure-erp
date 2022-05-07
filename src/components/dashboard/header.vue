<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import * as actionTypes from '../../store/module/dashboard/constants/action'

export default {
  name: 'DashboardHeader',
}
</script>

<script setup lang="ts">
import { api_url } from '../../config';
import Cards from '../Card.vue';
const store = useStore();

const stats:any = computed(() => {
    console.log('stats', JSON.parse(JSON.stringify(store.getters.getStats.value)))
    return store.getters.getStats.value
})

const courseChartOptions:any = {
    chart: {
        height: 200,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%',
            }
        },
    },
    labels: [''],
    colors: ['#3853ff'],
}
const courseSeries:any = ref([`${stats.value.courseApplicantCount}`])

const talentChartOptions:any = {
    chart: {
        height: 200,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%',
            }
        },
    },
    labels: [''],
    colors: ['#91278e'],
}
const talentSeries:any = [`${stats.value.outsourcingCount}`]

const talentpoolChartOptions:any = {
    chart: {
        height: 200,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%',
            }
        },
    },
    labels: [''],
    colors: ['#ffc400'],
}
const talentpoolSeries:any = [`${stats.value.talentPoolCount}`]

onMounted( async () => {
    // store.commit('setPageTitle', 'Course List');
    console.log('dashboard stats mounted');
    // const request:any = `${api_url}api/dashboard`;
    await store.dispatch(actionTypes.FetchStats)
});
</script>

<template>
    <div class="main grid py-8">
        <h1 class="text-xl font-semibold">Dashboard</h1>
            <!-- {{ stats }} -->
        <div class="grid grid-cols-3 gap-8">
            <Cards>
                <template #chart>
                    <VueApexCharts width="200" type="radialBar" :options="courseChartOptions" :series="courseSeries"></VueApexCharts>
                </template>
                <template #stat>
                    {{ stats.courseApplicantCount }}/100
                </template>
            </Cards>
            <Cards>
                <template #chart>
                    <VueApexCharts width="200" type="radialBar" :options="talentChartOptions" :series="talentSeries"></VueApexCharts>
                </template>
                <template #title>
                    Talent Request
                </template>
                <template #stat>
                    {{ stats.outsourcingCount }}/100
                </template>
            </Cards>
            <Cards>
                <template #chart>
                    <VueApexCharts width="200" type="radialBar" :options="talentpoolChartOptions" :series="talentpoolSeries"></VueApexCharts>
                </template>
                <template #title>
                    Talent Pool
                </template>
                <template #stat>
                    {{ stats.talentPoolCount }}/100
                </template>
            </Cards>
        </div>
    </div>
</template>