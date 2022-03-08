<script lang="ts">
export default {
  name: 'Filter',
}
</script>

<script setup lang="ts">
import SvgIcons from './SvgIcons.vue';
import { ref } from 'vue';

let searchText:any = ref('');


const filter:any = async () => {
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const status:any = document.getElementById('status');
  console.log('status', status)
  const rows:any = status.getElementsByTagName('ul');
  console.log('rows', rows)
  console.log('rows length', rows.length)

  for (let i:any = 0; i < rows.length; i++) {
    const row:any = rows[i];
    console.log('row', rows[0])
    console.log('row', rows[1])
    console.log('row', rows[2])
    console.log('row', rows[0].textContent)
    console.log('row', rows[1].textContent)
    console.log('row', rows[2].textContent)
    if (
      row.textContent.toLowerCase().indexOf(search) > -1 
    ) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

const close:any = async () => {
  searchText.value = ''
}
</script>

<template>    
    <div class="relative dropdown">
        <button type="button" class="border p-3 flex items-center justify-between rounded-md shadow-inner w-full">
            <slot name="info"></slot>

            <SvgIcons name="chevron-down" />
        </button>
        <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
            <div class="absolute bg-white rounded-md shadow-lg py-4 w-full">
                <ul class="list-reset text-grey">
                    <li class="px-5 py-3">
                        <slot name="input">
                          <input @keyup.esc="close" @keyup="filter" v-model="searchText" class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Filter Status">
                        </slot><br>
                    </li>
                    <div class="">
                      <slot name="list"></slot>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }
</style>