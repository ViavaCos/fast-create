// hello模块路由
export default [
  {
    path: '/hello',
    meta: {
      title: 'hello'
    },
    component: () => import('@/views/hello/index'),
  }
]
