module.exports =  {
  path: "/system",
  name: "系统管理",
  children: [
    {
      path: "/system/person",
      name: "用户管理",
      label:"用户管理",
      component: () =>
        import(
          /* webpackChunkName: "person" */
          "@/pages/system/person.vue"
        )
    },
    {
      path: "/system/role",
      name: "角色管理",
      label:"角色管理",
      component: () =>
        import(
          /* webpackChunkName: "role" */
          "@/pages/system/role.vue"
        )
    },
    {
      path: "/system/menuSys",
      name: "菜单管理",
      label:"菜单管理",
      component: () =>
        import(
          /* webpackChunkName: "menu" */
          "@/pages/system/menuSys.vue"
        )
    },
    {
      path: "/system/message",
      name: "消息管理",
      label:"消息管理",
      component: () =>
        import(
          /* webpackChunkName: "message" */
          "@/pages/system/message.vue"
        )
    },
    {
      path: "/system/log",
      name: "日志管理",
      label:"日志管理",
      children: [
        {
          path: "/system/log/loginLog",
          name: "登录日志",
          label:"登录日志",
          component: () =>
            import(
              /* webpackChunkName: "loginLog" */
              "@/pages/system/log/loginLog.vue"
            )
        },
        {
          path: "/system/log/log",
          name: "系统/业务日志",
          label:"系统/业务日志",
          component: () =>
            import(
              /* webpackChunkName: "log" */
              "@/pages/system/log/log.vue"
            )
        }
      ]
    },
    {
      path: "/system/organization",
      name: "组织机构管理",
      label:"组织机构管理",
      component: () =>
        import(
          /* webpackChunkName: "organization" */
          "@/pages/system/organization.vue"
        )
    },
    {
      path: "/system/standardizedKnowledge",
      name: "标准化知识管理",
      label:"标准化知识管理",
      component: () =>
        import(
          /* webpackChunkName: "standardizedKnowledge" */
          "@/pages/system/standardizedKnowledge.vue"
        )
    }
  ]
};
