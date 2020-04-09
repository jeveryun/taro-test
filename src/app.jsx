import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
// import todoStore from './store/todo'
import configStore from './store'

import Index from './pages/index2'

import './app.scss'
import './assets/fonts/iconfont.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// const store = {
//   todoStore,
// }

const store = configStore()

class App extends Component {
  componentDidMount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidCatchError () { }

  config = {
    pages: [
      "pages/home/index",
      "pages/index2/index"
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundColor: '#FAFBFC'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: "./assets/tab_home.png",
          selectedIconPath: "./assets/tab_home_f.png"
        },
        {
          pagePath: "pages/index2/index",
          text: "测试",
          iconPath: "./assets/tab_me.png",
          selectedIconPath: "./assets/tab_me_f.png"
        }
      ],
      color: "#a6a6a6",
      selectedColor: "#78a4fa",
      backgroundColor: "#ffffff",
      borderStyle: "black"
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
