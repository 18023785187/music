const path = require('path');
const {
  override,
  addWebpackAlias,
  addLessLoader
} = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src'),
    "pages": "@/pages",
    "common": "@/common",
    "components": "@/components",
    "assets": "@/assets",
    "network": "@/network",
    "utils": "@/utils",
    "store": "@/store"
  }),
  addLessLoader({
    javascriptEnabled: true,
    localIdentName: '[local]--[hash:base64:5]',
    modules: true
  })
)