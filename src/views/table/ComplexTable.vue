<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="t('table.title')" style="width: 200px" class="filter-item"
        @keyup.enter="handleFilter" />

      <el-select v-model="listQuery.type" :placeholder="t('table.type')" clearable class="filter-item"
        style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.displayName + '(' + item.key + ')'"
          :value="item.key" />
      </el-select>

      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ t("table.search") }}
      </el-button>

      <el-button class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ t("table.add") }}
      </el-button>

      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
        @click="handleDownload">
        {{ t("table.export") }}
      </el-button>

      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left: 15px" @change="tableKey = tableKey + 1">
        {{ t("table.reviewer") }}
      </el-checkbox>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%"
      @sort-change="sortChange">
      <el-table-column :label="t('table.id')" prop="id" sortable="custom" align="center" width="220"
        :class-name="getSortClass('id')">
        <template #default="{ row }">
          <span>{{ row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.preview_image')" width="180px" align="center">
        <template #default="{ row }">
          <img height="120" :src="row.preview_image" alt="">
        </template>
      </el-table-column>
      <el-table-column :label="t('table.swiper_number')" width="80px" align="center">
        <template #default="{ row }">
          <span>{{ row.swiper_number }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.name')" min-width="150px" align="center">
        <template #default="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.desc')" width="180px" align="center">
        <template #default="{ row }">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" :label="t('table.reviewer')" width="110px" align="center">
        <template #default="{ row }">
          <span style="color: red">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.station')" align="center" width="105px">
        <template #default="{ row }">
          <svg-icon v-for="n in +row.importance" :key="n" name="star" class="iconfont iconxing" />
          <span>{{ row.station }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.price')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.price }}</span>

        </template>
      </el-table-column>
      <el-table-column :label="t('table.floor_plan')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.floor_plan }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.construction_area')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.construction_area }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.transportation')" align="center" width="150">
        <template #default="{ row }">
          <span>{{ row.transportation }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.House_structure')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.House_structure }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.detail_desc')" align="center" width="150">
        <template #default="{ row }">
          <span>{{ row.detail_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.indoor_map_desc')" align="center" width="1150">
        <template #default="{ row }">
          <div class="table-img-container">
            <div class="table-img-box" v-for="item in row.indoor_map_desc" :key="item">
              <img class="table-img" :src="item.src" :alt="item.desc" srcset="">
              <span class="table-desc">{{ item.desc }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.location')" align="center" width="150">
        <template #default="{ row }">
          <span>{{ row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.regional_district_block')" align="center" width="150">
        <template #default="{ row }">
          <span>{{ row.regional_district_block }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.private_road')" align="center" width="150">
        <template #default="{ row }">
          <span>{{ row.private_road }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.setback')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.setback }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.building_coverage_ratio')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.building_coverage_ratio }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.floor_area_ratio')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.floor_area_ratio }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.facility')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.facility }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.other_equipment')" align="center" width="150">
        <template #default="{ row }">
          <span>{{ row.other_equipment }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.current_situation')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.current_situation }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.mode_of_transaction')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.mode_of_transaction }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.delivery_conditions')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.delivery_conditions }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.delivery_time')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.delivery_time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.time')" align="center" width="110">
        <template #default="{ row }">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.land_rights')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.land_rights }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.remarks')" align="center" width="150">
        <template #default="{ row }">
          <span>{{ row.remarks }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.other_expenses')" align="center" width="170">
        <template #default="{ row }">
          <span>{{ row.other_expenses }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.city_planning_area_division')" align="center" width="110">
        <template #default="{ row }">
          <span>{{ row.city_planning_area_division }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.landmark')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.landmark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.land_readjustment')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.land_readjustment }}</span>

        </template>
      </el-table-column>
      <el-table-column :label="t('table.ticity_planning_roadme')" align="center" width="95">
        <template #default="{ row }">
          <span>{{ row.ticity_planning_roadme }}</span>

        </template>
      </el-table-column>
      <el-table-column :label="t('table.use_area')" align="center" width="110">
        <template #default="{ row }">
          <span>{{ row.use_area }}</span>

        </template>
      </el-table-column>
      <el-table-column :label="t('table.terrain')" class-name="status-col" width="100">
        <template #default="{ row }">
          <span>{{ row.terrain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.main_approach')" align="center" width="230" class-name="fixed-width">
        <template #default="{ row, $index }">
          <span>{{ row.main_approach }}</span>

        </template>
      </el-table-column>
      <el-table-column :label="t('table.legal_restrictions')" align="center" width="95" class-name="fixed-width">
        <template #default="{ row, $index }">
          <span>{{ row.legal_restrictions }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('table.parking')" align="center" width="95" class-name="fixed-width">
        <template #default="{ row, $index }">
          <span>{{ row.parking }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('table.update')" align="center" width="130" class-name="fixed-width">
        <template #default="{ row, $index }">
          <span>{{ row.update }}</span>

        </template>
      </el-table-column>

      <el-table-column :label="t('table.label')" align="center" width="130" class-name="fixed-width">
        <template #default="{ row, $index }">
          <!-- <span>{{ row.label }}</span> -->

        </template>
      </el-table-column>

      <el-table-column :label="t('table.status')" class-name="status-col" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="t('table.actions')" align="center" width="320" class-name="fixed-width">
        <template #default="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ t("table.edit") }}
          </el-button>
          <el-button v-if="row.status !== 'published'" size="mini" type="success"
            @click="handleModifyStatus(row, 'published')">
            {{ t("table.publish") }}
          </el-button>
          <el-button v-if="row.status !== 'draft'" size="mini" @click="handleModifyStatus(row, 'draft')">
            {{ t("table.draft") }}
          </el-button>
          <el-button v-if="row.status !== 'deleted'" size="mini" type="danger" @click="handleDelete(row, $index)">
            {{ t("table.delete") }}
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination :total="total" v-show="total > 0" v-model:page="listQuery.page" v-model:limit="listQuery.limit"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
      :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" />


    <!-- 弹窗 -->

    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="tempHourseModel" label-position="left" label-width="100px">

        <el-form-item :label="t('table.swiper_number')" prop="swiper_number">
          <el-select v-model="tempHourseModel.swiper_number" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.displayName" :value="item.key" />
          </el-select>
        </el-form-item>

        <el-form-item v-for="item in EleItemArr" :key="item" :label="t(`table.${item.key}`)" :prop="item.key">
          <el-input v-model="tempHourseModel[item.key]" />
        </el-form-item>
        

        <el-form-item :label="t('table.preview_image')">
          <Upload :handlerUploadOne="handlerUploadOne" :filist="tempHourseModel.filelist" :multiple="false" limit="1" />
        </el-form-item>

        <div class="form-pic-desc-container">
          <h3>{{ t('table.indoor_map_desc') }}</h3>
          <el-form-item :label="t('table.pic')">
            <Upload :handlerUploadMany="handlerUploadMany" :filist="tempHourseModel.indoor_map_desc" :multiple="true" limit="40" />
          </el-form-item>

          <el-form-item :label="t('table.pic_desc')" prop="pic_desc">
            <el-input v-model="tempHourseModel.pic_desc" />
            <el-link disabled="true" :underline="false" tag="span"  type="warning">{{ t('table.pic_desc_tips') }}</el-link>
          </el-form-item>
        </div>

        
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ t("table.cancel") }}
        </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          {{ t("table.confirm") }}
        </el-button>
      </div>
    </el-dialog>


    <el-dialog v-model:visible="dialogPageviewsVisible" title="Reading statistics">
      <el-table :data="pageviewsData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pageviews" label="Pageviews" />
      </el-table>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogPageviewsVisible = false">{{
          t("table.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  nextTick,
  onMounted,
  unref
} from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
import {
  getArticles,
  getPageviews,
  createArticle,
  updateArticle,
  defaultHourseModel
} from '@/apis/articles'
import { HourseModel } from '@/model/hourseModel'

import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import { useI18n } from 'vue-i18n'
import { objectToArray } from '../../utils/formdata'
import Upload from './dynamic-table/components/Upload.vue'
export default defineComponent({
  components: {
    Upload
  },
  setup() {
    const { t } = useI18n()
    const calendarTypeOptions = [
      { key: '1', displayName: '1' },
      { key: '2', displayName: '2' },
      { key: '3', displayName: '3' },
      { key: '4', displayName: '4' },
      { key: '5', displayName: '5' },
      { key: '6', displayName: '6' },
      { key: '7', displayName: '7' },
    ]
    const calendarTypeKeyValue = calendarTypeOptions.reduce(
      (acc: { [key: string]: string }, cur) => {
        acc[cur.key] = cur.displayName
        return acc
      },
      {}
    ) as { [key: string]: string }
    const dataForm = ref(ElForm)
    const dataMap = reactive(
      {
        tableKey: 0,
        list: Array<HourseModel>(),
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        EleItemArr: objectToArray(defaultHourseModel),
        calendarTypeOptions: calendarTypeOptions,
        sortOptions: [
          { label: 'ID Ascending', key: '+id' },
          { label: 'ID Descending', key: '-id' }
        ],

        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: t('table.edit'),
          create: t('table.create')
        },

        dialogPageviewsVisible: false,
        pageviewsData: [],
        rules: {
          swiper_number: [{ required: true, message: 'swiper_number is required', trigger: 'change' }],
          name: [{ required: true, message: 'title is required', trigger: 'blur' }],
          pic_desc: [{ required: true, message: 'pic_desc is required', trigger: 'blur' }],

        },
        downloadLoading: false,
        tempHourseModel: defaultHourseModel,

        handleCurrentChange(page?: any) {
          dataMap.getList(page)
        },
        

        handlerUploadOne(file: {filename:'',url:''}) {
          const _Arr = cloneDeep(dataMap.tempHourseModel.filelist).splice(1)
          _Arr.push({filename: file.filename, url: file.url})
          dataMap.tempHourseModel.filelist = _Arr
          console.log({ss: dataMap.tempHourseModel.filelist});
          
        },
        handlerUploadMany(file: {filename:'',url:''}) {
          dataMap.tempHourseModel.indoor_map_desc.push(file)
          console.log({sw: dataMap.tempHourseModel.indoor_map_desc});
          
        },
        handleSizeChange(val: any) {
          dataMap.getList(null, null, val)
        },

        async getList(page?: any, total?: any, limit?: any) {
          if (page) {
            dataMap.listQuery.page = page
          }
          if (limit) {
            dataMap.listQuery.limit = limit
          }
          console.log(total)
          dataMap.listLoading = true
          // @ts-ignore
          const data = await getArticles(dataMap.listQuery)
          dataMap.list = data?.data ?? []
          console.log({ list: data });

          dataMap.total = (data?.data as any).length

          // Just to simulate the time of the request
          setTimeout(() => {
            dataMap.listLoading = false
          }, 0.5 * 1000)
        },

        handleFilter() {
          dataMap.listQuery.page = 1
          dataMap.getList()
        },

        handleModifyStatus(row: any, status: string) {
          ElMessage.success({
            message: '操作成功',
            type: 'success'
          })
          row.status = status
        },

        sortChange(data: any) {
          const { prop, order } = data
          if (prop === 'id') {
            dataMap.sortByID(order)
          }
        },

        sortByID(order: string) {
          if (order === 'ascending') {
            dataMap.listQuery.sort = '+id'
          } else {
            dataMap.listQuery.sort = '-id'
          }
          dataMap.handleFilter()
        },

        getSortClass(key: string) {
          const sort = dataMap.listQuery.sort
          return sort === `+${key}` ? 'ascending' : 'descending'
        },

        resetTempHourseModel() {
          dataMap.tempHourseModel = cloneDeep(defaultHourseModel)
        },

        resetEleItemArr() {
          const excludesArr = ['id','filelist','preview_image','label','indoor_map_desc','','','','','','','','','','',]
          dataMap.EleItemArr = cloneDeep(objectToArray(defaultHourseModel)).filter(i => !excludesArr.includes(i.key))
        },

        handleCreate() {
          dataMap.resetTempHourseModel()
          // console.log({sss:cloneDeep(objectToArray(defaultHourseModel))});
          dataMap.resetEleItemArr()
          dataMap.dialogStatus = 'create'
          dataMap.dialogFormVisible = true
          nextTick(() => {
            (dataForm.value as typeof ElForm).clearValidate()
          })
        },

        createData() {
          const form = unref(dataForm)
          form.validate(async (valid: any) => {
            if (valid) {
              const HourseModel = dataMap.tempHourseModel
              HourseModel.id = Math.round(Math.random() * 100) + 1024 // mock a id
              const addData = await createArticle(HourseModel)

              if (addData?.data.id) {
                alert(addData.data.id)
                console.log(addData)
                dataMap.list.unshift(addData.data)
              }

              dataMap.dialogFormVisible = false
              ElMessage.success({
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        },

        handleUpdate(row: any) {
          dataMap.tempHourseModel = Object.assign({}, row)
          dataMap.dialogStatus = 'update'
          dataMap.dialogFormVisible = true
          nextTick(() => {
            (dataForm.value as typeof ElForm).clearValidate()
          })
        },

        updateData() {
          const form = unref(dataForm)
          form.validate(async (valid: any) => {
            if (valid) {
              const tempData = Object.assign({}, dataMap.tempHourseModel)
              console.log(tempData)
              const data = await updateArticle(tempData)

              console.log(data, '-----------------')
              if (data) {
                const index = dataMap.list.findIndex(
                  (v: { id: any }) => v.id === data.data.id
                )
                dataMap.list.splice(index, 1, data.data)
              }

              dataMap.dialogFormVisible = false
              ElMessage.success({
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        },

        handleDelete(row: any, index: number) {
          ElMessage.success({
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          dataMap.list.splice(index, 1)
        },

        async handleGetPageviews(pageviews: string) {
          const data = await getPageviews({ pageviews })
          dataMap.pageviewsData = data?.data.pageviews
          dataMap.dialogPageviewsVisible = true
        },

        handleDownload() {
          dataMap.downloadLoading = true
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = [
            'timestamp',
            'title',
            'type',
            'importance',
            'status'
          ]
          const data = formatJson(filterVal, dataMap.list)
          exportJson2Excel(tHeader, data, 'table-list')
          dataMap.downloadLoading = false
        },

        typeFilter: (type: string) => {
          return calendarTypeKeyValue[type]
        }
      });

    onMounted(() => {
      console.log(typeof ElForm)
      dataMap.getList(null, null, 20)
    })

    return { t, ...toRefs(dataMap), dataForm }
  }
})
</script>
<style scoped>
.table-img-container {
  display: flex;
  flex-wrap: wrap;
}

.table-img-box {
  width: calc(15%);
  display: flex;
  flex-direction: column;
}

.table-img-box .table-desc {
  display: block;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-img-box .table-img {
  height: 100px;
  /* width: 100px; */
  margin-right: 15px;
}
.form-pic-desc-container {
  padding: 10px;
  border: 1px solid skyblue;
  margin-bottom: 20px;
}
.form-pic-desc-container h3 {
  text-align: center;
}
</style>