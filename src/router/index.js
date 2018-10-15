import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import dragDemo from '@/view/dragDemo'
import vueSlicksortPractice from '@/view/vueSlicksortPractice'
import testDemo from '@/view/testDemo'
import canBack from '@/view/canBack'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: {
    //     path: '/index'
    //   }
    // },
    {
      path: '/',
      component: App
    },
    {
      path: '/dragDemo',
      name: 'dragDemo',
      component: dragDemo
    },
    {
      path: '/canBack',
      name: 'canBack',
      component: canBack
    },
    {
      path: '/vueSlicksortPractice',
      name: 'vueSlicksortPractice',
      component: vueSlicksortPractice
    },
    {
      path: '/testDemo',
      name: 'testDemo',
      component: testDemo
    }
  ]
})
