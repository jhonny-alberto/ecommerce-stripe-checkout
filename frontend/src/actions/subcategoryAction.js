import axios from 'axios';
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
  SUBCATEGORY_DELETE_FAIL
}
from '../constants/subcategoryConstants'
import { logout } from './userActions'

export const listSubcategories = (category) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_LIST_REQUEST })

    const { data } = await axios.post(`/api/models`, {category})
    dispatch({
      type: SUBCATEGORY_LIST_SUCCESS,
      payload: data,
    })
  } catch(error) {
    dispatch({
      type: SUBCATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSubcategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORY_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/models/${id}`)

    dispatch({
      type: SUBCATEGORY_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSubcategory = (Subcategory) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBCATEGORY_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/models/create`,
      Subcategory,
      config
    )

    dispatch({
      type: SUBCATEGORY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SUBCATEGORY_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateSubcategory = (subcategory) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBCATEGORY_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/models/${subcategory._id}`,
      subcategory,
      config
    )

    dispatch({
      type: SUBCATEGORY_UPDATE_SUCCESS,
      payload: data,
    })
    // dispatch({ type: SUBCATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SUBCATEGORY_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteSubcategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBCATEGORY_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/models/${id}`, config)

    dispatch({
      type: SUBCATEGORY_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SUBCATEGORY_DELETE_FAIL,
      payload: message,
    })
  }
}