

<script lang="ts">
export default {
  name: 'ModalDialog',
};
</script>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import SvgIcons from './SvgIcons.vue'
// import useClickOutside from '../composables/useClickOutside.js';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['close']);

const { show } = toRefs(props);
const showModal = ref(false);
const modal = ref(null);
// const { onClickOutside } = useClickOutside();
const closeModal:any = () => {
  emits('close')
}

// onClickOutside(modal, () => {
//   if (showModal.value === true) {
//     closeModal();
//   }
// });

watch(
  () => props.show,
  show => {
    showModal.value = show;
  },
);

</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        ref="modal-backdrop"
        class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-10"
        v-show="showModal"
      >
        <div
          class="flex lg:justify-end justify-center h-auto pr-1 pt-1 text-center"
        >
          <transition
            enter-active-class="transition ease-out duration-300 transform "
            enter-from-class="opacity-0 translate-y-10 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
          >
            <div
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-md p-8 lg:w-1/2 w-11/12"
              role="dialog"
              ref="modal"
              aria-modal="true"
              v-show="showModal"
              aria-labelledby="modal-headline"
            >
              <!-- <button class="absolute top-4 z-50 right-4">
                <SvgIcons name="cancel" @click="closeModal" />
              </button> -->
              <slot>I'm empty inside</slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style></style>
