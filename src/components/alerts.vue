<script lang="ts">
export default {
  name: 'alerts',
}
</script>

<script setup lang="ts">
const props = defineProps<{
    name: String
}>()
</script>

<template>
    <div>
        <div v-if="name == 'result'" class="flex items-center gap-4">
            <div class="icon">
                <slot name="icon"></slot>
            </div>
            <div class="info">
                <slot name="info"></slot>
            </div>
            <div class="btn">
                <slot name="button"></slot>
            </div>
        </div>
        <div v-else-if="name == 'delete'">
            <div class="bg-white p-7 rounded grid">
                <div class="flex justify-between mb-6">

                    <h1 class="text-xl mb-4 font-medium">
                        <slot name="title">Delete Student</slot>
                    </h1>
                    <span>
                        <SvgIcons class="cursor-pointer" onclick="document.getElementById('myModal').close();" name="o-cancel" />
                    </span>
                </div>
                <p class="text-lg mb-10">
                    <slot name="info">
                        Are you sure you want to delete student?
                    </slot>
                </p>
                <div class="flex justify-between items-center mb-3">
                    <button class="px-10 py-4 rounded text-primary font-bold">
                        Cancel
                    </button>
                    <button class="bg-red px-10 py-4 rounded text-white font-bold">
                        <slot name="btn">
                            Yes, Delete Student
                        </slot>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
