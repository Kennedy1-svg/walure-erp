<script lang="ts">
export default {
  name: 'Card',
}
</script>

<script setup lang="ts">
const chartOptions:any = {
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
const series:any = [40]
</script>

<template>
    <div class="main border grid grid-cols-2 place-content-center rounded">
        <div class="chart -ml-10">
            <slot name="chart">
                <VueApexCharts width="200" type="radialBar" :options="chartOptions" :series="series"></VueApexCharts>
            </slot>
            <!-- 91278e -->
            <!-- 3853ff -->
            <!-- ffc400 -->
        </div>
        <div class="info grid place-content-center">
            <p class="text-gray-400">
                <slot name="title">
                    Course Applicant
                </slot>
            </p>
            <p class="text-[32px] font-bold">
                <slot name="stat">
                    11/100
                </slot>
            </p>
        </div>
    </div>
</template>
