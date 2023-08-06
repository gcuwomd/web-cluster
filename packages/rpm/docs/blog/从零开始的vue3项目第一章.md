# 前言

本文将记录角色权限管理系统的前端开发全过程

角色权限管理系统用于对站点、成员、角色、权限四个板块的管理，通过本系统来控制四者之间的关系配合统一登录平台从而实现部门成员对于部门内部站点的访问

## 技术栈

- 语言：typescript
- 脚手架：vite
- 前端框架：Vue3
- 组件库：Element Plus
- 网络请求库：Alova
- css
  - unocss
  - 预处理器：sass
- 前端路由：vue-router
- 代码规范：eslint
- 图标：iconify
- 包管理工具：pnpm

## 项目搭建

1. 使用 pnpm 创建 vite项目
```bash
pnpm create vite
# 输入项目名：rpm
# 选择框架： Vue
# 选择变体： Typescript
```

2. 安装依赖
```bash
pnpm add alova element-plus vue-router
pnpm add -D unocss @iconify/json sass
```
3. 配置 eslint
```bash
pnpm eslint --init
# 选择 To check syntax, find problems, and enforce code style
# 选择 JavaScript modules (import/export)
# 选择 Vue.js
# 你的项目是否使用 Typescript？ 选 yes
# 选择 Browser
# 选择 Use a popular style guide
# 选择 Standard： https://.....
# 选择 JavaScript
# 选择现在安装他们 yes
# 选择使用 pnpm 安装
```

4. 配置 unocss  

在 `vite.config.ts` 中加入 unocss 插件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// unocss 插件
import unocss from "unocss/vite"
// 预设
import { presetUno, presetIcons } from "unocss"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), unocss({ presets: ([presetUno(), presetIcons()]) })],
})

```
在 `main.ts` 中引入 `uno.css`

```ts
import { createApp } from 'vue'
import 'uno.css'
import App from './App.vue'

createApp(App).mount('#app')
```

5. 创建目录

在 `src` 目录下创建以下目录
- `views` 用于放置页面
- `api` 网络请求相关功能目录
- `types` typescript 类型文件目录
- `router` 前端路由相关目录
- `assets/scss` scss 文件目录

6. 删除部分预设文件以及代码

- 删除 `src/style.css`
- 删除 `main.ts` 中对 `style.css` 的引用
- 删除 `src/components/HelloWorld.vue`
- 删除 `App.vue` 中对 `HelloWorld.vue` 的引用
- 删除 `App.vue` 中的 style 样式
- 删除 `App.vue` 中 `div` 内的代码

到这里，我们就完成了项目的基本搭建以及基本必要依赖安装等准备工作

---
2023.8.5