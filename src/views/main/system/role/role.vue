<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      ref="pageModalRef"
      pageName="role"
      :modalConfig="modalConfig"
    >
      <el-tree
        class="menu-tree"
        :check-strictly="false"
        ref="elTreeRef"
        :data="roleMenus"
        show-checkbox
        node-key="id"
        @check="handleMenuCheckChange"
        :props="{ label: 'name', children: 'children' }"
      >
      </el-tree>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import { getMenuChecks } from '@/utils/map-menus'

import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageModal } from '@/hooks/use-page-modal'
import { usePageSearch } from '@/hooks/use-page-search'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

// 1.查询和重置处理
const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

// ElTree的处理逻辑
const elTreeRef = ref<InstanceType<typeof ElTree>>()
// 点击edit的回显回调
const editCallback = (item: any) => {
  nextTick(() => {
    const checks = getMenuChecks(item.menuList)
    console.log(item.menuList, 46548)

    elTreeRef.value?.setCheckedKeys(checks, true)
  })
}

// pageModal的额外参数menuList
const otherInfo = ref({})
const handleMenuCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  console.log(menuList)
  otherInfo.value = { menuList }
}

// 角色选择菜单数据
const store = useStore()
const roleMenus = computed(() => store.state.entireMenus)

// pageModal的hook
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  undefined,
  editCallback
)
</script>

<style scoped lang="less"></style>
