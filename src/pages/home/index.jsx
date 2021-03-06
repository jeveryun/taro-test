import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { getNewBooks, getHotBooks, getRecommendBooks } from '@store/home/action'
import Panel from '../../components/panel'
import HorizonList from '../../components/horizon-list'
import FakeSearchBar from '../../components/fake-search-bar'
import URL from '../../constants/urls'

import './index.scss'

@connect(
  ({ home }) => ({
    newBooks: home.newBooks,
    hotBooks: home.hotBooks,
    recommendBooks: home.recommendBooks,
  }),
  {
    dispatchGetNewBooks: getNewBooks,
    dispatchGetHotBooks: getHotBooks,
    dispatchGetRecommendBooks: getRecommendBooks,
  }
)
export default class Home extends Component {
  static propTypes = {
    newBooks: PropTypes.arrayOf(PropTypes.object),
    hotBooks: PropTypes.arrayOf(PropTypes.object),
    recommendBooks: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatchGetNewBooks()
    this.props.dispatchGetHotBooks()
    this.props.dispatchGetRecommendBooks()
  }

  onClickSearchBar = () => {
    Taro.navigateTo({ url: URL.SEARCH })
  }

  config = {
    navigationBarTitleText: '首页',
  }
  render() {
    const { newBooks, hotBooks, recommendBooks } = this.props
    return (
      <View>
        <FakeSearchBar onClick={this.onClickSearchBar}></FakeSearchBar>
        <Panel url={`${URL.BOOK_LIST}?type=new`} title='新书速递' className='panel--first'>
          <HorizonList data={newBooks} />
        </Panel>
        <Panel url={`${URL.BOOK_LIST}?type=hot`} title='近期热门' className='margin-top-lg'>
          <HorizonList data={hotBooks} />
        </Panel>
        <Panel url={`${URL.BOOK_LIST}?type=recommend`} title='为你推荐' className='margin-top-lg'>
          <HorizonList data={recommendBooks} />
        </Panel>
      </View>
    )
  }
}
