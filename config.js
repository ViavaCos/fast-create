const path = require('path')
const resolve = file => path.resolve(__dirname, './test', file)

// 视图文件默认内容
const vueFile = module => (`
<template>
  <div class="${module}"></div>
</template>

<script>
  export default {
    name: '${module}',
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
`)
// 路由文件默认内容
const routerFile = module => (`// ${module}模块路由
export default [
  {
    path: '/${module}',
    meta: {
      title: '${module}'
    },
    component: () => import('@/views/${module}/index'),
  }
]
`)
// 接口文件默认内容
const apiFile = module => (`// ${module}相关接口
const baseUrl = ''

export default {
  
}
`)

module.exports = [
  { 
    type: 'view',
    generate: (fileName, generateFile) => {
      const dirPath = resolve('views/' + fileName)
      const vuePath = path.join(dirPath, '/index.vue')
      generateFile(vuePath, vueFile(fileName), dirPath)
    }
  },
  {
    type: 'router',
    generate: (fileName, generateFile) => {
      const dirPath = resolve('routers/')
      const routerPath = path.join(dirPath, `${fileName}.js`)
      generateFile(routerPath, routerFile(fileName), dirPath)
    }
  },
  {
    type: 'api',
    generate: (fileName, generateFile) => {
      const dirPath = resolve('api/')
      const apiPath = path.join(dirPath, `${fileName}.js`)
      generateFile(apiPath, apiFile(fileName), dirPath)
    }
  }
]