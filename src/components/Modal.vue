<script setup lang="ts">
</script>

<template>
<div class="relative overflow-hdden">
    <section class="flex h-full justify-center items-start">
        <div onclick="document.getElementById('myModal').showModal()" id="btn">
          <slot name="button">
            <button class="py-3 px-10 bg-gray-800 text-white rounded text shadow-xl">
                Open
            </button>
          </slot>
        </div>
    </section>

    <dialog id="myModal" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
        <div class="flex flex-col w-full h-auto">
            <!-- Modal Content-->
            <slot name="content">This is where the content lives</slot>
            <!-- End of Modal Content-->
        </div>
    </dialog>
</div>
</template>

<style scoped>
  dialog[open] {
    position: absolute !important;
    right: -48%;
    animation: appear .75s cubic-bezier(0.0, 0.0, 0.58, 1.0);
}

  dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
  }
  
 
@keyframes appear {
  from {
    opacity: 1;
    transform: translateX(-40rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
} 
</style>