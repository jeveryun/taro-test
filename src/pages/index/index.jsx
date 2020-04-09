import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtButton, AtInput, AtList, AtListItem } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'

// @inject('todoStore')
// @observer
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: ''
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: 'Todolist'
  }

  handleInput = val => {
    this.setState({
      val
    })
  }
  handleClick = () => {
    this.props.todoStore.addTodo(this.state.val)
    this.setState({
      val: ''
    })
    // this.setState({
    //   todos: [...this.state.todos, this.state.val],
    // })
  }

  handleChange = index => {
    this.props.todoStore.removeTodo(index)
  }

  goto = () => {
    Taro.navigateTo({
      url: '/pages/index2/index?sd=1'
    })
  }
  render () {
    const { todos } = this.props.todoStore
    return (
      <View className='index'>
        <Text>Todo List</Text>
        <View className='at-icon at-icon-bullet-list'></View>
        <AtInput value={this.state.val} onChange={this.handleInput}></AtInput>
        {/* <AtButton type='primary' onClick={this.handleClick}>
          123
        </AtButton> */}
        <AtList>
          {todos.map((item, index) => (
            <AtListItem
              key={item}
              title={index + ':' + item}
              isSwitch
              onSwitchChange={() => this.handleChange(index)}
            ></AtListItem>
          ))}
        </AtList>
      </View>
    )
  }
}
