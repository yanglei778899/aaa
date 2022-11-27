<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      pageName="department"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="department"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageModal } from '@/hooks/use-page-modal'
import { usePageSearch } from '@/hooks/use-page-search'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
// 处理modal的hook

// 1.查询和重置处理
const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

// 3.调用hook获取公共变量和函数
const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
  usePageModal()

// modal配置信息
const store = useStore()
const modalConfigRef = computed(() => {
  const parentIdItem = modalConfig.formItems?.find(
    (item) => item.field === 'parentId'
  )
  parentIdItem!.options = store.state.entireDepartments.map((item) => {
    return { title: item.name, value: item.id }
  })
  return modalConfig
})
</script>

<style scoped lang="less"></style>
