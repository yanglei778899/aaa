<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chat">
    <hy-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HyEditor from '@/base-ui/editor'

const htmlString = ref<string>('coderwhy')
</script>

<style scoped></style>
