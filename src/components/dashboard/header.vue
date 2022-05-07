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

const courseStat:any = computed(() => {
    return store.getters.getStats.value.courseApplicantCount
})

const talentStat:any = computed(() => {
    return store.getters.getStats.value.talentPoolCount
})

const outsourcingStat:any = computed(() => {
    return store.getters.getStats.value.outsourcingCount
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
const courseSeries:any = [courseStat.value]
// let courseSeries:any = ['32']

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
const talentSeries:any = [outsourcingStat.value]
// const talentSeries:any = ['51']

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
const talentpoolSeries:any = [talentStat.value]
// const talentpoolSeries:any = ['51']

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
                    {{ courseStat }}/100
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
                    {{ outsourcingStat }}/100
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
                    {{ talentStat }}/100
                </template>
            </Cards>
        </div>
    </div>
</template>