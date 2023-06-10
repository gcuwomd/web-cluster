import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { presetUno, presetIcons, presetAttributify, transformerAttributifyJsx } from 'unocss'
import unocss from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unocss({
      presets: [presetUno(), presetIcons(), presetAttributify()],
      transformers: [transformerAttributifyJsx()],
      theme: {
        extend: {
          screens: {
            md: '768px',
            lg: '976px',
            xl: '1280px',
          },
          flexGrow:{
            2: '2'
          }
        },
        color: {
          bg: '#f2f3f5'
        }
      },
    })
  ]
})
