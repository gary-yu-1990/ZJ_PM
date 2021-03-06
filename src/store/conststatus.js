export const conststatus = {
  ProjectID: '',
  userInfo: {},
  route: '',
  ProjectStatusOptions: [{
    label: '未启动',
    value: 'unstart'
  },
  {
    label: '进行中',
    value: 'process'
  },
  {
    label: '暂停',
    value: 'pasuse'
  },
  {
    label: '完结',
    value: 'finish'
  }
  ],
  MAJOR_ClASSOptions: [{
    label: '学硕',
    value: 'xs'
  },
  {
    label: '专硕',
    value: 'zs'
  }
  ], // 专业类型

  sexOptions: [{
    label: '男',
    value: 'men'
  }, {
    label: '女',
    value: 'women'
  },
  {
    label: '其他',
    value: 'other'
  }
  ],
  STATUSOptions: [{
    label: '在职',
    value: 'zz'
  }, {
    label: '离职',
    value: 'lz'
  }],
  UserStatusOptions: [{
    label: '禁用',
    value: 'jy'
  }, {
    label: '启用',
    value: 'qy'
  }],
  OBS_TypeOptions: [{
    label: '部门',
    value: 'dept'
  }, {
    label: '团队',
    value: 'group'
  },
  {
    label: '角色',
    value: 'role'
  },
  {
    label: '成员',
    value: 'person'
  }
  ],
  WBSStatusOptions: [{
    label: '已建立',
    value: 'create'
  }, {
    label: '已投放',
    value: 'released'
  },
  {
    label: '已完成',
    value: 'done'
  }
  ],

  TaskStatusOptions: [{
    label: '待获取',
    value: 'dhc'
  }, {
    label: '待确认',
    value: 'dcr'
  }, {
    label: '已确认',
    value: 'ycr'
  },
  {
    label: '已完成',
    value: 'done'
  }
  ]
}
