import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtActivityIndicator } from 'taro-ui'
import SearchBar from '../../components/search-bar'
import NetworkError from '../../components/network-error'
import BookCard from '../../components/book-card'

import API from '../../service/api'
import { isISBN } from '../../utils/validator'
import URL from '../../constants/urls'

import './index.scss'

export default class Search extends Component {
  config = {
    navigationBarTitleText: '搜索',
  }

  constructor(props) {
    super(props)
    let history = Taro.getStorageSync('history')
    this.state = {
      history: history || [],
      value: '',
      isSearching: false,
      isError: false,
      searchResult: [],
    }
  }

  onChange = value => {
    this.setState({ value })
  }

  onConfirm = ({ target: { value } }) => {
    this.onSearch(value)
  }

  onClickTag = ({ name }) => {
    this.onSearch(name)
  }

  onSearch = async value => {
    this.addHistory(value)
    this.setState({
      value,
      isSearching: true,
      isError: false,
      searchResult: [],
    })

    try {
      let result = await API.get(`/books?keyword=${value}`)
      this.setState({
        isSearching: false,
        isError: false,
        searchResult: result,
      })
    } catch (e) {
      this.setState({
        isSearching: false,
        isError: true,
        searchResult: [],
      })
    }
  }

  onReSearch = () => {
    this.onSearch(this.state.value)
  }

  onScan = () => {
    Taro.scanCode({ scanType: ['barCode'] })
      .then(res => {
        if (!isISBN(res.result)) {
          return Taro.showModal({
            title: '扫描内容不合法',
            content: '请扫描图书的ISBN条形码',
            showCancel: false,
          })
        } else {
          Taro.navigateTo({
            url: `${URL.BOOK_DETAIL}?isbn=${res.result}`,
          })
        }
      })
      .catch(e => {
        console.log('扫码失败！', e)
      })
  }

  onDeleteHistory = () => {
    Taro.showModal({
      content: '确定要删除全部历史记录吗？',
    }).then(res => {
      if (res.comfirm) {
        Taro.removeStorage({ key: 'history' })
        this.setState({ history: [] })
      }
    })
  }

  addHistory = value => {
    value = value.trim()
    let history = this.state.history.filter(v => v != value)
    history.unshift(value)

    if (history.length > 10) {
      history = history.splice(0, 10)
    }
    this.setState({ history })
    Taro.setStorage({
      key: 'history',
      data: history,
    })
  }

  render() {
    const { history, value, isSearching, isError, searchResult } = this.state
    const showScan = !isSearching && !isError && !(searchResult && searchResult.length)
    const showHistory = !isSearching && !isError && !(searchResult && searchResult.length) && history.length
    const showResult = !isSearching && !isError && searchResult && searchResult.length

    return (
      <View className='container'>
        <SearchBar focus fixed value={value} onChange={this.onChange} onConfirm={this.onConfirm} onScan={this.onScan} />
        {showScan && (
          <View className='scan-row at-row at-row__align--center' onClick={this.onScan}>
            <View className='at-col'>扫描图书条形码</View>
            <Text className='scan-row__arrow at-icon at-icon-chevron-right at-col' />
          </View>
        )}
        {showHistory && (
          <View className='history-container'>
            <View className='at-row at-row__align--center'>
              <View className='history-title at-col'>搜索历史</View>
              <View className='history-delete at-col' onClick={this.onDeleteHistory}>
                <View className='at-icon at-icon-trash' />
                {/* 清除 */}
              </View>
            </View>
            {history.map(item => {
              return (
                <AtTag className='history-item' key={item} name={item} onClick={this.onClickTag}>
                  {item}
                </AtTag>
              )
            })}
          </View>
        )}
        {isSearching && <AtActivityIndicator mode='center' content='加载中...' />}
        {isError && <NetworkError onClick={this.onReSearch} />}
        {showResult && (
          <View>
            {searchResult.map(item => (
              <BookCard data={item} key={item.id} />
            ))}
          </View>
        )}
      </View>
    )
  }
}
