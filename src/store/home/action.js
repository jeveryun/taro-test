import * as HOME from "./action-type"
import API from "../../service/api"

// 不感兴趣
export const deifavorBookById = (id, bookType) => {
  return {
    type: HOME.DISFAVOR,
    id,
    bookType
  }
}

// 新书上架
export const getNewBooks = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    let result = await API.get("/books/new")
    console.log(result)
    dispatch({
      type: HOME.GET_NEW_BOOK,
      books: result
    })
  }
}

// 热门图书
export const getHotBooks = () => {
  return async dispatch => {
    let result = await API.get("/books/hot")
    dispatch({
      type: HOME.GET_HOT_BOOK,
      books: result
    })
  }
}

// 推荐图书
export const getRecommendBooks = () => {
  return async dispatch => {
    let result = await API.get("/books/recommend")
    dispatch({
      type: HOME.GET_RECOMMEND_BOOK,
      books: result
    })
  }
}