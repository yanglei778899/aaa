<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleFoldClick">
      <el-icon v-if="isFold"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </i>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue'

import UserInfo from './user-info.vue'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
// 面包屑的数据: [{name: , path: }]
const store = useStore()
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})

const isFold = ref(false)
// const emit = defineEmits<{ (e: 'foldChange', value: boolean:void) }>()
const emit = defineEmits<{
  (e: 'foldChange', value: boolean): void
}>()
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
