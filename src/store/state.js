export default {
    ProjectID: '',
    userInfo: {},
    route: '',
    // theme: theme || 'dark',
    // logged: !!userInfo, // 登录状态

    // organizationList: getStore('organizationList', true), // 能查看的组织列表
    // currentOrganization: getStore('currentOrganization', true), // 当前组织
    // system: getStore('system', true), // 系统配置
    // windowLoading: false, // 窗口loading
    // pageLoading: false, // 页面加载loading
    // socketAction: '',
    // boundClient: false // 是否绑定client

    ProjectStatusOptions: [{
            label: "未启动",
            value: "unstart"
        },
        {
            label: "进行中",
            value: "process"
        },
        {
            label: "暂停",
            value: "pasuse"
        },
        {
            label: "完结",
            value: "finish"
        },
    ],
    MAJOR_ClASSOptions: [{
            label: "学硕",
            value: "xs"
        },
        {
            label: "专硕",
            value: "zs"
        },
    ], //专业类型

    sexOptions: [{
        label: "男",
        value: "men"
    }, {
        label: "女",
        value: "women"
    }],
    STATUSOptions: [{
        label: "在职",
        value: "zz"
    }, {
        label: "离职",
        value: "lz"
    }],
    UserStatusOptions: [{
        label: "禁用",
        value: "jy"
    }, {
        label: "启用",
        value: "qy"
    }]
}