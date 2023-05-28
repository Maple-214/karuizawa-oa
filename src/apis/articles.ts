/*
 * @Description:表格数据 接口
 */
import https from '@/utils/https'
import { RootObject } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'
import { HourseModel } from '@/model/hourseModel'
import { ArticleList } from '@/model/articleList'

export const defaultHourseModel = {
  house_structure_picture: { url: '', filename: '' },
  house_structure_picture_filelist: [{ filename: '', url: '' }],
  filelist: [{ filename: '', url: '' }],
  preview_image: { url: '', filename: '' },
  name: "",
  desc: "",
  station: "",
  price: "",
  construction_area: "",
  Land_area: "",
  transportation: "",
  House_structure: "",
  detail_desc: "",
  indoor_map_desc: [{ src: "", desc: "", filename: '' }],
  location: "",
  private_road: "",
  setback: "",
  building_coverage_ratio: "",
  floor_area_ratio: "",
  facility: "",
  other_equipment: "",
  current_situation: "",
  mode_of_transaction: "",
  delivery_conditions: "",
  delivery_time: "",
  time: "",
  land_rights: "",
  remarks: "",
  other_expenses: "",
  city_planning_area_division: "",
  landmark: "",
  land_readjustment: "",
  ticity_planning_roadme: " ",
  use_area: "",
  terrain: "",
  contact_situation: "",
  main_approach: "",
  legal_restrictions: "",
  parking: "",
  update: "",
  pic_type: "",
  regional_district_block: "",
  tag: [],
  pic_desc: '',
  new_hourse: null,
  youtube_src: '',
  seller_talk: '',
  charge_talk: ''
}

export const getArticles = (params: any) => {
  return https().request<RootObject<ArticleList<HourseModel>>>('hourse/hourses', Method.GET, params, ContentType.json)
}

export const getArticle = (params: any) => {
  return https().request<RootObject<HourseModel>>('artupdateArticleicle/articleInfo', Method.GET, params, ContentType.form)
}

export const createArticle = (data: any) => {
  return https().request<RootObject<HourseModel>>('hourse/createArticle', Method.POST, data, ContentType.json)
}

export const updateArticle = (params: any) => {
  return https().request<RootObject<HourseModel>>('hourse/updateArticle', Method.POST, params, ContentType.json)
}

export const deleteArticle = (params: any) => {
  return https().request<RootObject<HourseModel>>(`hourse/delete`, Method.POST, params, ContentType.json)
}

export interface Pageviews {
  pageviews: any
}

export const getPageviews = (params: any) => {
  return https().request<RootObject<Pageviews>>('pageviews', Method.GET, params, ContentType.json)
}
