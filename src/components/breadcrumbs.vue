<script lang="ts">
export default {
  name: "breadcrumbs",
};
</script>

<script setup lang="ts">
import { ref, computed, toRefs, onMounted } from 'vue';
import SvgIcons from './SvgIcons.vue';
import { useRouter } from 'vue-router';

const route = useRouter();

const props:any = defineProps({
  start: Object,
  end: Object
});

const { start, end } = toRefs(props);

</script>

<template>
  <div class="main">
    <!-- <div v-for="(item, index) in props.crumbbox" :key="index" class="flex">
      <span class="flex">
        <router-link :to="item.path">
          <span>{{ item.name }}</span>
        </router-link>
      </span>
    </div> -->
    <div class="flex gap-4 items-center">
      <router-link class="text-primary" :to="start.path">
        <span>{{ start.name }}</span>
      </router-link>
      <SvgIcons name="chevron-right" />
      <router-link :to="end.path">
        <span>{{ end.name }}</span>
      </router-link>
    </div>
  </div>
</template>
