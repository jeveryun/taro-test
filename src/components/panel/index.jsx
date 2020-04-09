import Taro, { Component } from '@tarojs/taro'
import { View, Text, Navigator } from '@tarojs/components'
import PropTypes from 'prop-types'

import './index.scss'

export default class Panel extends Component {
  static options = {
    addGlobalCalss: true,
  }

  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    url: '',
    title: '',
  }

  componentWillMount() {}
  render() {
    const rootCls = `my-panel ${this.props.className}`
    const { title, children } = this.props
    return (
      <View className={rootCls}>
        <Navigator url={this.props.url} hoverClass='None'>
          <View class='my-panel-header at-row at-row__align--center'>
            <View className='at-col'>{title}</View>
            <Text className='my-panel-hader__arrow at-icon at-icon-chevron-right at-col'></Text>
          </View>
        </Navigator>
        <View className='my-panel-body'>{children}</View>
      </View>
    )
  }
}
