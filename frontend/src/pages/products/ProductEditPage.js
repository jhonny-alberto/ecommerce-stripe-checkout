import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct, createProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET, PRODUCT_CREATE_RESET } from '../../constants/productConstants'


const ProductEditPage = ({ match, history, isCreate }) => {
  const productId = !isCreate && match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubcategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [tax, setTax] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector((state) => state.productUpdate)
  const productCreate = useSelector((state) => state.productCreate)
  const { categories, loading: isCategoryLoading } = useSelector((state) => state.categoryList)
  const { subcategories, loading: isSubcategoryLoading } = useSelector((state) => state.subcategoryList)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const getSubcategoryName = useCallback((product) => {
    if(!product.subCategory) return ''
    const subcategory = subcategories.filter(subcategory => subcategory._id == product.subCategory)
    return subcategory[0] && subcategory[0].name
  }, [subcategories])

  const filteredSubcategories = React.useMemo(() => {
    return subcategories.filter(subcategory => subcategory.category._id == category)
  }, [category, subcategories])

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

  useEffect(() => {
    // dispatch(listCategories())
    // dispatch(listSubcategories())
    if(isCreate) {
      if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET })
        history.push('/admin/productlist')
      }
    } else {
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET })
        history.push('/admin/productlist')
      } else {
        if (!product.name || product._id !== productId) {
          dispatch(listProductDetails(productId))
        } else {
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setCategory(product.category.name)
          setCountInStock(product.countInStock)
          setTax(product.priceWithTax)
          setDescription(product.description)
          setSubcategory(getSubcategoryName(product))
        }
      }
    }
  }, [dispatch, history, productId, product, successUpdate, successCreate, isCreate, getSubcategoryName])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(isCreate) {
      dispatch(
        createProduct({
          name,
          price,
          image,
          category,
          subCategory,
          description,
          countInStock,
          priceWithTax: tax
        })
      )
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          subCategory,
          description,
          countInStock,
          priceWithTax: tax
        })
      )
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>{isCreate ? 'Create ' : 'Edit '} a Product</h1>
        {(loadingUpdate || loadingCreate) && <Loader />}
        {(errorUpdate || errorCreate) && <Message variant='danger'>{isCreate ? errorCreate : errorUpdate}</Message>}
        {loading && isCategoryLoading && isSubcategoryLoading ? (
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

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {/* <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId='tax'>
              <Form.Label>Tax</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Tax'
                value={tax}
                onChange={(e) => setTax(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group> */}
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
            {category && <Form.Group controlId='category'>
              <Form.Label>Model</Form.Label>
              <Form.Control
                as='select'
                placeholder='Enter Model'
                value={subCategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option></option>
                {
                  filteredSubcategories.map(subcategory => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))
                }
              </Form.Control>
            </Form.Group>}

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                row={8}
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

export default ProductEditPage
