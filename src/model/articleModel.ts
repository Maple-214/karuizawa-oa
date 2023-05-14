/*
 * @Description:
 * @Autor: scy😊
 * @Date: 2021-01-20 11:46:27
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-21 17:33:29
 */
export interface ArticleModel {
  // ID
  id: Number,
  // 'プレビュー'
  preview_image: String,
  // '名前'
  name: String,
  // '説明'
  desc: String,
  // '駅'
  station: String,
  // '価格'
  price: String,
  // '間取り'
  floor_plan: String,
  // '建物面積'
  construction_area: String,
  // '土地面積'
  Land_area: String,
  // 地域地区街区
  regional_district_block: String,
  // '交通'
  transportation: String,
  // '構造・階数'
  House_structure: String,
  // '詳細ページの説明'
  detail_desc: String,
  // '内部の図面と説明'
  indoor_map_desc: any[],
  // '所在地'
  location: String,
  // '结构/层数'
  structure_layers: String,
  // '私道負担面積'
  private_road: String,
  // 'セットバック'
  setback: String,
  // '建ぺい率'
  building_coverage_ratio: String,
  // '容積率'
  floor_area_ratio: String,
  // '設備'
  facility: String,
  // 'その他設備'
  other_equipment: String,
  // '現況'
  current_situation: String,
  // '取引態様'
  mode_of_transaction: String,
  // '引渡条件'
  delivery_conditions: String,
  // '引渡時期'
  delivery_time: String,
  // '築年月'
  time: String,
  // '土地権利'
  land_rights: String,
  // '備考'
  remarks: String,
  // 'その他費用'
  other_expenses: String,
  // '都市計画区域区分'
  city_planning_area_division: String,
  // '地目'
  landmark: String,
  // '区画整理'
  land_readjustment: String,
  // '都市計画道路'
  ticity_planning_roadme: String,
  // '用途地域'
  use_area: String,
  // '地勢'
  terrain: String,
  // '接道状況'
  contact_situation: String,
  // '主な接道'
  main_approach: String,
  // '法令制限'
  legal_restrictions: String,
  // '駐車場'
  parking: String,
  // '次回更新予定日'
  update: String,
  // '类别'
  category: String,
  // '轮播区域'
  swiper_number: String,
  // 是否添加到喜欢
  fav: boolean,
}
