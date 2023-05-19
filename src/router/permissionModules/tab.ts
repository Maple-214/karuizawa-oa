/*
 * @Description:分栏相关
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const tabRouter: Array<RouteRecordRaw> = [
  {
    path: '/tab',
    component: Layout,
    meta:{
      hidden: true
    },
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "tab" */ '@/views/tab/Index.vue'),
        name: 'Tab',
        meta: {
          title: 'tab',
          icon: '#icontab'
        }
      }
    ]
  }
]

export default tabRouter
