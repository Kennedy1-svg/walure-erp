<script lang="ts">
export default {
  name: 'Card',
}
</script>

<script setup lang="ts">
</script>

<template>
    <div class="relative main bg-white border px-2 py-4 grid xl:grid-cols-3 place-content-center rounded-md">
        <!-- <div class="absolute top-[64px] xl:left-[80px] left-[114px]">
            <p class="">%</p>
        </div> -->
        <div class="chart p-5">
            <slot name="chart">
            </slot>
            <!-- 91278e -->
            <!-- 3853ff -->
            <!-- ffc400 -->
        </div>
        <div class="info xl:col-span-2 pl-5 grid content-center">
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
