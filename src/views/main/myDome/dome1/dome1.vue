<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dome1">
    <h2>dome1</h2>
    <el-upload
      class="upload-demo"
      action=""
      :on-change="handleChange"
      :on-remove="handleRemove"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      :auto-upload="false"
    >
      <el-button type="primary">上传xlsx文件</el-button>
    </el-upload>

    <el-table
      :data="
        objData.excelAllData.slice(
          (pageNumber - 1) * pageSize,
          pageNumber * pageSize - 1
        )
      "
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        :prop="el.prop"
        :label="el.label"
        width="180"
        v-for="el in objData.tableHeader"
        :key="el.prop"
      />
    </el-table>
    <el-pagination
      v-model:currentPage="pageNumber"
      :page-size="pageSize"
      layout="sizes, total, prev, pager, next"
      :total="totalNumber"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import * as xlsx from 'xlsx'
import { defineComponent, ref, reactive } from 'vue'
import { readFile } from '@/utils/excelToJson.js'

export default defineComponent({
  setup() {
    const fileTemp = ref('000')

    const pageNumber = ref(1)
    const pageSize = ref(10)
    const totalNumber = ref(650)

    const character = reactive({
      name: {
        text: '姓名',
        type: 'string'
      },
      phone: {
        text: '手机号',
        type: 'string'
      },
      no: {
        text: '身份证号',
        type: 'string'
      },
      head: {
        text: '头像',
        type: 'string'
      }
    })

    let objData = reactive({
      excelAllData: [],
      tableHeader: [],
      selectionData: []
    })

    const handleChange = async (file, fileList) => {
      let fileData = file.raw
      if (!fileData) return

      // 读取file中的数据
      // 转为二进制文件
      let data = await readFile(fileData)
      // 转为json格式
      let workbook = xlsx.read(data, { type: 'binary' })
      let worksheet = workbook.Sheets[workbook.SheetNames[0]]
      data = xlsx.utils.sheet_to_json(worksheet)
      console.log(data, 3333)

      // 设置表头
      objData.tableHeader = []
      objData.excelAllData = []
      for (const key in character) {
        objData.tableHeader.push({ prop: key, label: character[key].text })
      }

      // 把读取出来的数据变为最后可以传递给服务器的数据 [{name:"xxx", phone:"123"}]
      let arr = []
      data.forEach((item) => {
        let obj = {}
        for (const key in character) {
          let v = character[key]
          let { text, type } = v
          console.log(item[text], 'item[text]')
          let value = item[text] || ''
          if (type === 'string') {
            value = String(value)
          } else {
            console.log(454)
          }
          obj[key] = value
        }
        arr.push(obj)
      })
      objData.excelAllData.push(...arr)
      totalNumber.value = objData.excelAllData.length
      console.log(objData.excelAllData, 2222222)
    }

    const handleSizeChange = (v) => {
      pageSize.value = v
    }
    const handleCurrentChange = (v) => {
      console.log(v)
      pageNumber.value = v
    }
    const handleSelectionChange = (v) => {
      console.log(v)
    }
    const handleRemove = (file, fileList) => {
      // this.fileTemp = null
    }
    const handleClick = () => {
      fileTemp.value = '789485485'
      // this.fileTemp = null
    }
    return {
      fileTemp,
      objData,
      pageNumber,
      pageSize,
      totalNumber,
      handleChange,
      handleRemove,
      handleClick,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.dome1 {
  height: 100%;
  padding: 10px;
  text-align: left;
  width: 100%;
}
</style>
