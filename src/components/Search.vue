<script lang="ts">
export default {
  name: 'Search',
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcons from './SvgIcons.vue';

let searchText:any = ref('');

const filter:any = async () => {
  const search:any = searchText.value.toLowerCase();
  const students:any = document.getElementById('students');
  const rows:any = students.getElementsByTagName('tr');

  for (let i:any = 0; i < rows.length; i++) {
    const firstCol:any = rows[i].getElementsByTagName('td')[1];
    const secondCol:any = rows[i].getElementsByTagName('td')[2];
    const thirdCol:any = rows[i].getElementsByTagName('td')[3];
    const fourthCol:any = rows[i].getElementsByTagName('td')[4];

    if (
      firstCol.innerText.toLowerCase().indexOf(search) > -1 ||
      secondCol.innerText.toLowerCase().indexOf(search) > -1 ||
      thirdCol.innerText.toLowerCase().indexOf(search) > -1 ||
      fourthCol.innerText.toLowerCase().indexOf(search) > -1
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
  <div class="flex items-center">
    <div class="bg-white shadow px-4 p-2 flex mr-4 rounded-md">
      <slot name="input">
        <input class="rounded text-sm p-1 focus:outline-none" @keyup.esc="close" @keyup="filter" v-model="searchText" type="text" placeholder="Search">
      </slot>
      <span class="w-auto flex justify-end items-center text-grey p-2">
          <SvgIcons name="search"  />
      </span>
    </div>
  </div>
</template>

