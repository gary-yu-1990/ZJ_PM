import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/Main'

import ProjectManager from '@/page/ProjectManager'
import ProjectReport from '@/page/ProjectReport'
import ProjectBaseData from '@/page/ProjectBaseData'
import KnowledgeBase from '@/page/KnowledgeBase'
import SystemSet from '@/page/SystemSet'
import PersonInfo from '@/page/SystemSetPages/PersonInfo'
import BaseSet from '@/page/SystemSetPages/BaseSet'
import TaskManager from '@/page/TaskManager'
import TeamManager from '@/page/TeamManager'
import MemberInfo from '@/page/TeamPages/MemberInfo'
import TeamInfo from '@/page/TeamPages/TeamInfo'
import Login from '@/page/Login'
import BasicSet from '@/page/BasicSet'
import PasswordSet from '@/page/SystemSetPages/PasswordSet'
import TotalSet from '@/page/SystemSetPages/TotalSet'
import PersonalSet from '@/page/SystemSetPages/PersonalSet'
import Base from '@/page/SystemSetPages/Base'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '#',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [{
      path: '/ProjectManager',
      name: 'ProjectManager',
      component: ProjectManager,
      meta: {
        keepAlive: true
      }
    },{
      path: '/ProjectReport',
      name: 'ProjectReport',
      component: ProjectReport,
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
      path: '/TaskManager',
      name: 'TaskManager',
      component: TaskManager,
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
      path: '/TeamManager',
      name: 'TeamManager',
      component: TeamManager,
      children: [{
        path: '/TeamPages/MemberInfo',
        name: 'MemberInfo',
        component: MemberInfo,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/TeamPages/TeamInfo',
        name: 'TeamInfo',
        component: TeamInfo,
        meta: {
          keepAlive: true
        }
      }],
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
      }, {
        path: '/SystemSetPages/PasswordSet',
        name: 'PasswordSet',
        component: PasswordSet,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/SystemSetPages/TotalSet',
        name: 'TotalSet',
        component: TotalSet,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/Pages/BasicSet',
        name: 'BasicSet',
        component: BasicSet,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/SystemSetPages/PersonalSet',
        name: 'PersonalSet',
        component: PersonalSet,
        meta: {
          keepAlive: true
        },
        children: [{
          path: '/SystemSetPages/Base',
          name: 'Base',
          component: Base,
          meta: {
            keepAlive: true
          }
        }]
      }],
      meta: {
        keepAlive: true
      }
    }
    ]
  }]
})
