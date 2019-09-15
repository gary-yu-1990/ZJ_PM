import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/Main'
import ProjectReport from '@/page/ProjectReport'
import ProjectManager from '@/page/ProjectManager'
import ProjectBaseData from '@/page/ProjectBaseData'
import MyTask from '@/page/MyTask'
import KnowledgeBase from '@/page/KnowledgeBase'
import SystemSet from '@/page/SystemSet'
import PersonInfo from '@/page/SystemSetPages/PersonInfo'
import BaseSet from '@/page/SystemSetPages/BaseSet'

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
    },
    {
      path: '/ProjectBaseData',
      name: 'ProjectBaseData',
      component: ProjectBaseData,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ProjectReport',
      name: 'ProjectReport',
      component: ProjectReport,
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
      path: '/SystemSet',
      name: 'SystemSet',
      component: SystemSet,
      children: [{
        path: '/SystemSetPages/PersonInfo',
        name: 'PersonInfo',
        component: PersonInfo,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/SystemSetPages/BaseSet',
        name: 'BaseSet',
        component: BaseSet,
        meta: {
          keepAlive: true
        }
      }],
      meta: {
        keepAlive: true
      }
    }
    ]
  }]
})
