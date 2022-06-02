<script lang="ts">
export default {
  name: 'UserSwitch',
}
</script>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
// const status = ref('Disabled')
const props:any = defineProps({
  status: {
    type: Boolean,
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
    <div class="my-2 flex items-center">
      <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
        <input 
          type="checkbox" 
          id="checkbox"
          :checked="checked"
          @click="changeStatus"
        >
        <span class="toggler round"></span>
      </label>
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
        @apply absolute w-6 h-6 -left-[1px] -bottom-[1px] bg-green-accent;
        content: '';
    }
    input:checked + .toggler {
        @apply bg-green-accent bg-opacity-[48%];
    }
    input:checked + .toggler:before {
        -webkit-transform: translateX(18px);
        -ms-transform: translateX(18px);
        transform: translateX(18px);
    }
    .toggler.round {
        border-radius: 34px;
    }
    .toggler.round:before {
        border-radius: 50%;
    }
</style>