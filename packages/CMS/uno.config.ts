import { defineConfig, transformerDirectives, transformerAttributifyJsx } from 'unocss'

const unoConfig =  defineConfig({
  transformers: [transformerDirectives(), transformerAttributifyJsx()]
})

