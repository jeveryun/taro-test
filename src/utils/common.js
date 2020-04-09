import Taro from '@tarojs/taro'

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : "0" + n
}

// 获取当前页url
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}