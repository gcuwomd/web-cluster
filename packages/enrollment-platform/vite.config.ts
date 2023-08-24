import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import { presetUno, presetIcons } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unocss({ presets: [presetUno(), presetIcons()] }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
   
  ],
  resolve:{
    dedupe:[
      'vue'
    ]
  },
  server:{
    proxy:{
      '/api':{//发送请求的地址都改为'/api'
        target:"http://43.139.117.216:9821",//相当于baseUrl
        changeOrigin:true,
        rewrite(path){
          return path.replace(/^\/api/,'')
        }
      }
    }
  }
})
