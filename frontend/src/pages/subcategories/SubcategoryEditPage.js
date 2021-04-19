import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'

import { createSubcategory, updateSubcategory } from '../../actions/subcategoryAction'
import { SUBCATEGORY_UPDATE_RESET, SUBCATEGORY_CREATE_RESET } from '../../constants/subcategoryConstants'

const SubcategoryEditPage = ({ match, history, isCreate }) => {
  const subcategoryId = !isCreate && match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  
  const subcategoryUpdate = useSelector((state) => state.subcategoryUpdate)
  const subcategoryCreate = useSelector((state) => state.subcategoryCreate)
  // const subcategoryDetails = useSelector((state) => state.subcategoryDetails)
  const [category, setCategory] = useState('')
  const { categories, loading: isCategoryLoading } = useSelector((state) => state.categoryList)
  // const { loading, error, subcategory } = subcategoryDetails
  const { loading, subcategories, error } = useSelector((state) => state.subcategoryList)
  const selectedSubcategory = React.useMemo(() => {
    return subcategories.filter(subcategory => subcategory._id == subcategoryId)[0]
  }, [subcategories, subcategoryId])

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = subcategoryUpdate

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = subcategoryCreate

  useEffect(() => {
    if(isCreate) {
      if (successCreate) {
        dispatch({ type: SUBCATEGORY_CREATE_RESET })
        history.push('/admin/subcategorylist')
      }
    } else {
      if (successUpdate) {
        dispatch({ type: SUBCATEGORY_UPDATE_RESET })
        history.push('/admin/subcategorylist')
      } else {
        setName(selectedSubcategory.name)
        setDescription(selectedSubcategory.description)
      }
    }
  }, 
  [
    dispatch,
    history,
    successUpdate,
    successCreate,
    isCreate,
    subcategoryId,
    selectedSubcategory
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    if(isCreate) {
      dispatch(
        createSubcategory({
          name,
          description,
          category
        })
      )
    } else {
      dispatch(
        updateSubcategory({
          _id: subcategoryId,
          name,
          category,
          description,
        })
      )
    }
  }

  return (
    <>
      <Link to='/admin/subcategorylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>{isCreate ? 'Create ' : 'Edit '} a Model</h1>
        {(loadingUpdate || loadingCreate) && <Loader />}
        {(errorUpdate || errorCreate) && <Message variant='danger'>{isCreate ? errorCreate : errorUpdate}</Message>}
        {loading && isCategoryLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as='select'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>
                {
                  categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                }
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              {isCreate ? 'Create' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default SubcategoryEditPage
