import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import unocss from 'unocss/vite'
import { presetUno, presetIcons } from 'unocss'
// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default defineConfig({
  plugins: [
    react(),
    unocss({
      presets: [presetUno(), presetIcons()],
      theme: {
        colors: {
          background: '#f9fafb',
          text: '#0f172a'
        }
      }
    })
  ]
})
