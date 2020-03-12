import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: ['吃饭', '睡觉', '学习'],
      val: '',
    }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: 'Todolist',
  }

  handleInput = e => {
    this.setState({
      val: e.target.value,
    })
  }
  handleClick = () => {
    this.setState({
      todos: [...this.state.todos, this.state.val],
    })
  }
  render() {
    return (
      <View className="index">
        <Text>Todo List</Text>
        <Input value={this.state.val} onChange={this.handleInput}></Input>
        <Button onClick={this.handleClick}>add</Button>
        {this.state.todos.map((item, index) => (
          <View key={index}>
            <Text>
              {index + 1} : {item}
            </Text>
          </View>
        ))}
      </View>
    )
  }
}
