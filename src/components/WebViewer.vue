<script lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import WebViewer from '@pdftron/webviewer'

export default {
  name: 'WebViewer',
}
</script>

<script setup lang="ts">

const viewer:any = ref(null)

const input:any = document.getElementById('resume_upload');

const props = defineProps({
    initialDoc: String
})

const { initialDoc } = toRefs(props)

onMounted(() => {
    const path = `http://localhost:3000/webviewer`;
    // const path = `${process.env.BASE_URL}webviewer`;
    WebViewer({path, initialDoc: props.initialDoc}, viewer.value)
    .then(instance => {
        // const { Feature } = instance.UI
        // instance.UI.enableFeatures([Feature.FilePicker])
        input.addEventListener('change', () => {
            const file = input.files[0];
            instance.UI.loadDocument(file, { filename: file.name})
        });

        const { documentViewer } = instance.Core;
        documentViewer.addEventListener('documentLoaded', () => {
            // instance.UI.print();
            instance.UI.annotationPopup.getItems();
        })
    })
})

</script>

<template>
    <div id="webviewer" ref="viewer" class="h-[800px]"></div>
</template>