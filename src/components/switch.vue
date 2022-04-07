<script lang="ts">
export default {
  name: 'Switch',
}
</script>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
// const status = ref('Disabled')
const props:any = defineProps({
  status: {
    type: Boolean,
  },
  name: {
    type: String
  }
});

const checked:any = computed(() => {
    let answer:any
    if (props.status == 1) {
      answer = true
    } else {
      answer = false
    }
  return answer
});

const { status, name } = toRefs(props);

const emit = defineEmits(['toggle']);

const itemStatus:any = computed(() => {
  let answer:any
  if (checked.value) {
    answer = 'Active'
  } else {
    answer = 'Disabled'
  }
  return answer
});

// const isActive = ref(false)
const changeStatus:any = () => {
    // isActive.value = !isActive.value
    // status.value = isActive.value ? 'Active' : 'Disabled'
  emit('toggle')
  if (checked.value) {
    return itemStatus.value = 'Active'
  } else {
    return itemStatus.value = 'Disabled'
  }
}

const changeCourseStatus:any = () => {
    // isActive.value = !isActive.value
    // status.value = isActive.value ? 'Active' : 'Disabled'
  console.log('so I am here')
  if (checked.value) {
    emit('toggle', 1)
    console.log('checked value is ', checked.value)
    return checked.value = !checked.value
  } else {
    emit('toggle', 0)
    console.log('checked value is ', checked.value)
    return checked.value = !checked.value
  }
}
</script>

<template>
    <div v-if="props.name == 'course'" class="my-2 flex items-center">
      <label class="relative inline-block h-3 w-8">
        <input 
          type="checkbox" 
          id="checkbox"
          :checked="checked"
          @click="changeCourseStatus"
          >
        <span class="toggler round"></span>
      </label>
      <p class="px-4">
        <slot>
        </slot>
      </p> 
    </div>
    <div v-else class="my-2 flex items-center">
      <label class="relative inline-block h-3 w-8">
        <input 
          type="checkbox" 
          id="checkbox"
          :checked="checked"
          @click="changeStatus"
        >
        <span class="toggler round"></span>
      </label>
      <p class="px-4">
        {{ itemStatus }}
      </p> 
    </div>
</template>

<style scoped>
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .toggler {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgb(227, 227, 227);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    .toggler::before {
        @apply absolute w-5 h-5 -left-[4px] -bottom-[4px] bg-primary;
        content: '';
    }
    input:checked + .toggler {
        @apply bg-primary bg-opacity-[38%];
    }
    input:checked + .toggler:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }
    .toggler.round {
        border-radius: 34px;
    }
    .toggler.round:before {
        border-radius: 50%;
    }
</style>