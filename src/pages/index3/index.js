import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Index extends Component {


  componentWillMount () {

  }

  componentDidMount () {
    console.log(this.$router.params)
  }
  config = {
    navigationBarTitleText: '首页2'
  }
  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  handleX = () => {
    console.log('sdsd')
  }

  render () {
    return (
      <View className='index2'>
        <Text onClick={this.handleX}>2</Text>
      </View>
    )
  }
}

