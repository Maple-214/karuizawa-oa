/*
 * @Description:表格数据接口
 * @Autor: scy😊
 * @Date: 2021-01-12 11:31:47
 * @LastEditors: scy😊
 * @LastEditTime: 2021-01-23 17:15:26
 */
import https from '@/utils/https'
import { RootObject } from '@/model/rootObject'
import { ContentType, Method } from 'axios-mapper'
import { ArticleModel } from '@/model/articleModel'
import { ArticleList } from '@/model/articleList'

export const defaultArticleModel: ArticleModel = {
  id: 0,
  "preview_image": "",
  "name": "",
  "desc": "日当たりのよいお庭と吹き抜けリビングが開放的！大きな収納と使いやすい水回りの家事ラク動線の家！",
  "station": "西軽井沢",
  "price": "8,680",
  "floor_plan": "3LDK",
  "construction_area": "130.00",
  "Land_area": "450.89",
  "transportation": "しなの鉄道線「信濃追分」駅 車約4分（約1.7km）",
  "House_structure": "木造 2階建",
  "detail_desc": "吹き抜けリビングが開放的な３ＬＤＫ築浅戸建！",
  indoor_map_desc: [
    {
      "src": "https://royal-h.es-img.jp/sale/img/2105565966390000016789/0000000002105565966390000016789_13.jpg?iid=100341619&size=290x210",
      "desc": "ＬＤＫは約25畳。明るく居心地の良い空間。"
    },
    {
      "src": "https://royal-h.es-img.jp/sale/img/2105565966390000016789/0000000002105565966390000016789_13.jpg?iid=100341619&size=290x210",
      "desc": "ＬＤＫは約25畳。明るく居心地の良い空間。"
    },
    {
      "src": "https://royal-h.es-img.jp/sale/img/2105565966390000016789/0000000002105565966390000016789_13.jpg?iid=100341619&size=290x210",
      "desc": "ＬＤＫは約25畳。明るく居心地の良い空間。"
    },
    {
      "src": "https://royal-h.es-img.jp/sale/img/2105565966390000016789/0000000002105565966390000016789_13.jpg?iid=100341619&size=290x210",
      "desc": "ＬＤＫは約25畳。明るく居心地の良い空間。"
    },
    {
      "src": "https://royal-h.es-img.jp/sale/img/2105565966390000016789/0000000002105565966390000016789_13.jpg?iid=100341619&size=290x210",
      "desc": "ＬＤＫは約25畳。明るく居心地の良い空間。"
    },
    {
      "src": "https://royal-h.es-img.jp/sale/img/2105565966390000016789/0000000002105565966390000016789_13.jpg?iid=100341619&size=290x210",
      "desc": "ＬＤＫは約25畳。明るく居心地の良い空間。"
    },
    {
      "src": "https://royal-h.es-img.jp/sale/img/2105565966390000016789/0000000002105565966390000016789_13.jpg?iid=100341619&size=290x210",
      "desc": "ＬＤＫは約25畳。明るく居心地の良い空間。"
    },
    {
      "src": "https://royal-h.es-img.jp/sale/img/2105565966390000016789/0000000002105565966390000016789_13.jpg?iid=100341619&size=290x210",
      "desc": "ＬＤＫは約25畳。明るく居心地の良い空間。"
    }
  ],
  "location": "長野県北佐久郡軽井沢町長倉",
  "private_road": "無",
  "setback": "不要",
  "building_coverage_ratio": "60%",
  "floor_area_ratio": "200%",
  "facility": "給湯",
  "other_equipment": "電気：中部電力　ガス：個別プロパンガス　水道：公営水道　汚水・雑排水：公共下水　給湯：灯油",
  "current_situation": "空",
  "mode_of_transaction": "媒介",
  "delivery_conditions": "相談",
  "delivery_time": "相談",
  "time": "令和3年12月",
  "land_rights": "所有権",
  "remarks": "受益者負担金有（600円/㎡）　F2-67",
  "other_expenses": "参考固都税額（令和4年度） : 163,894円/年",
  "city_planning_area_division": "非線引き区域",
  "landmark": "宅地",
  "land_readjustment": "無",
  "ticity_planning_roadme": " ",
  "use_area": "第一種住居地域",
  "terrain": "平坦",
  "contact_situation": "一方",
  "main_approach": "公道、東、幅員：7m、接道長さ：19.6m、舗装あり",
  "legal_restrictions": "景観法",
  "parking": "有(敷地内)",
  "update": "2023年05月27日",
  "category": "类别",
  "swiper_number": "1",
  "fav": false,
  "regional_district_block": "高度地区",
  structure_layers: '',
}

export const getArticles = (params: any) => {
  return https().request<RootObject<ArticleList<ArticleModel>>>('hourse/hourses', Method.GET, params, ContentType.json)
}

export const getArticle = (params: any) => {
  return https().request<RootObject<ArticleModel>>('article/articleInfo', Method.GET, params, ContentType.form)
}

export const createArticle = (data: any) => {
  return https().request<RootObject<ArticleModel>>('article/createArticle', Method.POST, data, ContentType.json)
}

export const updateArticle = (params: any) => {
  return https().request<RootObject<ArticleModel>>('article/updateArticle', Method.POST, params, ContentType.json)
}

export const deleteArticle = (id: number) => {
  return https().request<RootObject<ArticleModel>>(`articles/${id}`, Method.POST, undefined, ContentType.json)
}

export interface Pageviews {
  pageviews: any
}

export const getPageviews = (params: any) => {
  return https().request<RootObject<Pageviews>>('pageviews', Method.GET, params, ContentType.json)
}
