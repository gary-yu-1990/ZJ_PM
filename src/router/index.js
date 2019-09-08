import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/Main'
import Report from '@/page/Report'
import ProjectManager from '@/page/ProjectManager'
import MyTask from '@/page/MyTask'
import KnowledgeBase from '@/page/KnowledgeBase'
import BaseInfo from '@/page/BaseInfo'
import PersonInfo from '@/page/BaseInfoPages/PersonInfo'
import BaseSet from '@/page/BaseInfoPages/BaseSet'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: '/MyTask',
      name: 'MyTask',
      component: MyTask,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/ProjectManager',
      name: 'ProjectManager',
      component: ProjectManager,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/Report',
      name: 'Report',
      component: Report,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/KnowledgeBase',
      name: 'KnowledgeBase',
      component: KnowledgeBase,
      meta: {
        keepAlive: true
      }
    }, {
      path: '/BaseInfo',
      name: 'BaseInfo',
      component: BaseInfo,
      children: [{
        path: '/BaseInfo/PersonInfo',
        name: 'PersonInfo',
        component: PersonInfo,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/BaseInfo/BaseSet',
        name: 'BaseSet',
        component: BaseSet,
        meta: {
          keepAlive: true
        }
      }],
      meta: {
        keepAlive: true
      }
    }]
  }]
})
