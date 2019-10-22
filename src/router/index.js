import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/Main'
import Login from '@/page/Login'

// 基础数据
import BasicData from '@/page/BasicData'
import PersonDept from '@/page/BaseDataPages/PersonDept/PersonDeptPage'
import PersonInfo from '@/page/BaseDataPages/PersonInfo/PersonInfoPage'
import Team from '@/page/BaseDataPages/Team/TeamPage'
import Template from '@/page/BaseDataPages/Template/TemplatePage'
import TemplateClass from '@/page/BaseDataPages/TemplateClass/TemplateClassPage'

// 系统设置
import SystemSet from '@/page/SystemSet'
import AccountInfo from '@/page/SystemSetPages/AccountInfo'
import RoleSet from '@/page/SystemSetPages/RoleSet'

// 任务管理
import TaskManager from '@/page/TaskManager'
// 项目管理

import ProjectInfo from '@/page/ProjectManagerPages/ProjectInfo'
import ProjectWBS from '@/page/ProjectManagerPages/ProjectWBS'
import ProjectTask from '@/page/ProjectManagerPages/ProjectTask'
import ProjectDash from '@/page/ProjectManagerPages/ProjectDash'

// 开发工具

import developSet from '@/page/developSet'

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
    path: '/Main',
    name: 'Main',
    component: Main,
    children: [{
      path: '/ProjectManagerPages/ProjectInfo',
      name: 'ProjectInfo',
      component: ProjectInfo,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ProjectManagerPages/ProjectDash',
      name: 'ProjectDash',
      component: ProjectDash,
      meta: {
        keepAlive: true
      },
      children: [{
        path: '/ProjectManagerPages/ProjectWBS',
        name: 'ProjectWBS',
        component: ProjectWBS,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/ProjectManagerPages/ProjectTask',
        name: 'ProjectTask',
        component: ProjectTask,
        meta: {
          keepAlive: true
        }
      }
      ]
    },
    {
      path: '/TaskManager',
      name: 'TaskManager',
      component: TaskManager,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/BasicData',
      name: 'BasicData',
      component: BasicData,
      meta: {
        keepAlive: true
      },
      children: [{
        path: '/BaseDataPages/PersonDept/PersonDeptPage',
        name: 'PersonDept',
        component: PersonDept,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/BaseDataPages/PersonInfo/PersonInfoPage',
        name: 'PersonInfo',
        component: PersonInfo,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/BaseDataPages/Team/TeamPage',
        name: 'Team',
        component: Team,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/BaseDataPages/Template/TemplatePage',
        name: 'Template',
        component: Template,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/BaseDataPages/TemplateClass/TemplateClassPage',
        name: 'TemplateClass',
        component: TemplateClass,
        meta: {
          keepAlive: true
        }
      }
      ]
    },
    {
      path: '/SystemSet',
      name: 'SystemSet',
      component: SystemSet,
      meta: {
        keepAlive: true
      },
      children: [{
        path: '/SystemSetPages/AccountInfo',
        name: 'AccountInfo',
        component: AccountInfo,
        meta: {
          keepAlive: true
        }
      }, {
        path: '/SystemSetPages/RoleSet',
        name: 'RoleSet',
        component: RoleSet,
        meta: {
          keepAlive: true
        }
      }]
    },
    {
      path: '/developSet',
      name: 'developSet',
      component: developSet,
      meta: {
        keepAlive: true
      }
    }
    ]
  }
  ]
})
