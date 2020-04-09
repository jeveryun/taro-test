import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Navigator, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import URL from '../../constants/urls'

import './index.scss'

export default class HorizonList extends Component {
  static defaultProps = {
    isBook: true,
    data: [],
    sidSpace: 24,
  }
  static porpTypes = {
    isBook: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
    sidSpace: PropTypes.number,
  }

  static options = {
    addGlobalClass: true,
  }

  componentWillMount() {}
  render() {
    const { isBook, data, sidSpace } = this.props
    const url = isBook ? URL.BOOK_DETAIL : URL.BOOK_LIST_DETAIL

    let imgWidth, imgHeight
    imgWidth = (750 - 24 * 2 - sidSpace * 2) / 3
    imgHeight = (imgWidth * 300) / 218

    return (
      <ScrollView className='my-horizon-list-container' scrollX>
        <View className='my-horizon-list'>
          {data.map(item => {
            return (
              <Navigator
                key={item.id}
                url={`${url}?id=${item.id}`}
                className='my-horizon-list-item'
                hoverClass='None'
                style={{ width: Taro.pxTransform(imgWidth) }}
              >
                <Image
                  className={isBook ? 'my-horizon-list-item__book' : 'my-horizon-list-item__booklist'}
                  style={{
                    width: Taro.pxTransform(imgWidth),
                    height: isBook ? Taro.pxTransform(imgHeight) : Taro.pxTransform(imgWidth),
                  }}
                  src={item.image}
                  mode='aspectFill'
                ></Image>
                <View className='my-horizon-list-item__title'>{item.title}</View>
                {isBook && <View className='my-horizon-list-item__author'>{item.author}</View>}
              </Navigator>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}
