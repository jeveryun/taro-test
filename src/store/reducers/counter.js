import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { ADD, MINUS } from '../constants/counter'

export default createReducer(fromJS({
  num: 0
}), {
  [ADD]: state => {
    const conuterState = state.toJS()
    return state.merge({
      num: conuterState.num + 1
    })
  },
  [MINUS]: state => {
    const conuterState = state.toJS()
    return state.merge({
      num: conuterState.num - 1
    })
  }
})