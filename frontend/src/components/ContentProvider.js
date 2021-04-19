import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../actions/cartActions'
import { listCategories } from '../actions/categoryActions'
import { listSubcategories } from '../actions/subcategoryAction'

const ContentProvider = ({ children }) => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCart())
    dispatch(listCategories())
    dispatch(listSubcategories())
  }, [dispatch])
  return (
    <div>
      {children}
    </div>
  )
}

export default ContentProvider