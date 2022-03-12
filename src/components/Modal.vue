<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue'

export default defineComponent({
  name: 'ModalId'
})
</script>


<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
  }
})

const { id }:any = toRefs(props)

const onClick:any = () => {
  console.log('id nah', props.id)
  // let id = props.id
  console.log(id.value)
  let doc:any = document.getElementById(id.value)
  console.log('doc', doc)
  doc.showModal()
}

</script>

<template>
<div class="relative bg-transparent">
    <section class="flex h-full justify-center items-start">
        <div @click.prevent="onClick" id="btn">
          <slot name="button">
            <button class="py-3 px-10 bg-gray-800 text-white rounded text shadow-xl">
                Open
            </button>
          </slot>
        </div>
    </section>

    <dialog :id="props.id" class="h-auto w-11/12 md:w-1/2 p-5 bg-transparent rounded-md ">            
        <div class="flex flex-col w-full h-auto">
            <!-- Modal Content-->
            {{ props.id }}
            <slot name="modalContent">This is where the content lives</slot>
            <!-- End of Modal Content-->
        </div>
    </dialog>
</div>
</template>

<style scoped>
  dialog[open] {
    position: absolute !important;
    right: -48%;
    animation: appear .25s cubic-bezier(0.0, 0.0, 0.58, 1.0);
}

  dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
  }
  
 
@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-40rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
} 
</style>