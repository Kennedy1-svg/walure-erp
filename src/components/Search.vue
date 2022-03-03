<script setup lang="ts">
import SvgIcons from './SvgIcons.vue';
import { ref } from 'vue';

const searchText:any = ref('')

const filterSearch:any = () => {
  const search: any = searchText.value.toLowerCase();
  const studentList:any = document.getElementById('students');
  const rows:any = studentList.getElementsByTagName('tr')

  for (let i:number = 0; i < rows.length; i++) {
    const firstCol:any = rows[i].getElementsByTagName('td')[0];
    const secondCol:any = rows[i].getElementsByTagName('td')[1];
    const thirdCol:any = rows[i].getElementsByTagName('td')[2];
    const fourthCol:any = rows[i].getElementsByTagName('td')[3];

    if (firstCol){
      const lang:any = firstCol.innerText;
      const slang:any = secondCol.innerText;
      const tlang:any = thirdCol.innerText;
      const flang:any = fourthCol.innerText;
      rows[i].style.display = ((lang.toLowerCase().indexOf(search) > -1) || (slang.toLowerCase().indexOf(search) > -1) || (tlang.toLowerCase().indexOf(search) > -1) || (flang.toLowerCase().indexOf(search) > -1)) ? '' : 'none';
    }
}
</script>

<template>
  <div class="flex items-center">
    <div class="bg-white shadow px-4 p-2 flex mr-4 rounded-md">
      <slot name="input">
        <input class="rounded text-sm p-1 focus:outline-none" @keyup.esc="close" type="text" placeholder="Search">
      </slot>
      <span class="w-auto flex justify-end items-center text-grey p-2">
          <SvgIcons name="search"  />
      </span>
    </div>
  </div>
</template>

