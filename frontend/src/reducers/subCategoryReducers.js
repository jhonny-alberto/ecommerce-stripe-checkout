import {
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS,
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_DETAILS_REQUEST,
  SUBCATEGORY_DETAILS_SUCCESS,
  SUBCATEGORY_DETAILS_FAIL,
  SUBCATEGORY_CREATE_REQUEST,
  SUBCATEGORY_CREATE_SUCCESS,
  SUBCATEGORY_CREATE_FAIL,
  SUBCATEGORY_UPDATE_REQUEST,
  SUBCATEGORY_UPDATE_SUCCESS,
  SUBCATEGORY_UPDATE_FAIL,
  SUBCATEGORY_DELETE_REQUEST,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
  SUBCATEGORY_UPDATE_RESET,
  SUBCATEGORY_CREATE_RESET
}
from '../constants/subcategoryConstants'

export const subcategoryListReducer = (state = { subcategories: [] }, action) => {
  switch(action.type) {
    case SUBCATEGORY_LIST_REQUEST:
      return { loading: true, subcategories: [] }
    case SUBCATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        subcategories: action.payload.subCategories,
      }
    case SUBCATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const subcategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_CREATE_REQUEST:
      return { loading: true }
    case SUBCATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, subcategory: action.payload }
    case SUBCATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SUBCATEGORY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const subcategoryUpdateReducer = (state = { subcategory: {} }, action) => {
  switch (action.type) {
    case SUBCATEGORY_UPDATE_REQUEST:
      return { loading: true }
    case SUBCATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, subcategory: action.payload }
    case SUBCATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SUBCATEGORY_UPDATE_RESET:
      return { subcategory: {} }
    default:
      return state
  }
}

export const subcategoryDetailsReducer = (
  state = { subcategory: { } },
  action
) => {
  switch (action.type) {
    case SUBCATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SUBCATEGORY_DETAILS_SUCCESS:
      return { loading: false, subcategory: action.payload }
    case SUBCATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const subcategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_DELETE_REQUEST:
      return { loading: true }
    case SUBCATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case SUBCATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}