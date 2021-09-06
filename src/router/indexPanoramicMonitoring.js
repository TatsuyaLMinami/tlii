module.exports =   {
  path: "/panoramicMonitoring",
  name: "全景监测管理",
  children: [
    {
      path: "/panoramicMonitoring/deviceOnlineMonitoring",
      name: "设备在线监测",
      children: [
        {
          path: "/panoramicMonitoring/deviceOnlineMonitoring/center",
          name: "在线监测中心",
          label:"在线监测中心",
          component: () =>
            import(
              /* webpackChunkName: "center" */

              "@/pages/panoramicMonitoring/deviceOnlineMonitoring/center.vue"
            )
        },
        {
          path: "/panoramicMonitoring/deviceOnlineMonitoring/alarm",
          name: "在线监测告警管理",
          label:"在线监测告警管理",
          component: () =>
            import(
              /* webpackChunkName: "alarm" */

              "@/pages/panoramicMonitoring/deviceOnlineMonitoring/alarm.vue"
            )
        },
        {
          path: "/panoramicMonitoring/deviceOnlineMonitoring/query",
          name: "在线监测查询统计",
          label:"在线监测查询统计",
          component: () =>
            import(
              /* webpackChunkName: "query" */

              "@/pages/panoramicMonitoring/deviceOnlineMonitoring/query.vue"
            )
        },
        {
          path: "/panoramicMonitoring/deviceOnlineMonitoring/account",
          name: "在线监测台帐管理",
          label:"在线监测台帐管理",
          component: () =>
            import(
              /* webpackChunkName: "account" */

              "@/pages/panoramicMonitoring/deviceOnlineMonitoring/account.vue"
            )
        },
        {
          path: "/panoramicMonitoring/deviceOnlineMonitoring/alarmRule",
          name: "在线监测告警规则管理",
          label:"在线监测告警规则管理",
          component: () =>
            import(
              /* webpackChunkName: "alarmRule" */

              "@/pages/panoramicMonitoring/deviceOnlineMonitoring/alarmRule.vue"
            )
        }
      ]
    },
    {
      path: "/panoramicMonitoring/gridDisaster",
      name: "电网灾害分布全景展示",
      label:"电网灾害分布全景展示",
      component: () =>
        import(
          /* webpackChunkName: "visualChannelMonitoring" */

          "@/pages/panoramicMonitoring/gridDisaster.vue"
        )
    },
    {
      path: "/panoramicMonitoring/visualChannelMonitoring",
      name: "通道可视化监测",
      label:"通道可视化监测",
      component: () =>
        import(
          /* webpackChunkName: "visualChannelMonitoring" */

          "@/pages/panoramicMonitoring/visualChannelMonitoring.vue"
        )
    },
    {
      path: "/panoramicMonitoring/videoSurveillance",
      name: "视频监控",
      label:"视频监控",
      component: () =>
        import(
          /* webpackChunkName: "videoSurveillance" */

          "@/pages/panoramicMonitoring/videoSurveillance.vue"
        )
    }
  ]
};
