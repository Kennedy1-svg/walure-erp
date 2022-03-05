<script lang="ts">
export default {
  name: 'Card',
}
</script>

<script setup lang="ts">
</script>

<template>
    <div class="main border flex justify-around rounded">
        <div class="chart">
            <slot name="chart">
                80%
            </slot>
        </div>
        <div class="info">
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
