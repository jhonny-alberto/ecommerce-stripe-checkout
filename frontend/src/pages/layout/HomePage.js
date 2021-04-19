import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form } from 'react-bootstrap'
import Product from '../../components/Product'
import Message from '../../components/Message.js'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate.js'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listProducts } from '../../actions/productActions'

const HomePage = ({ match }) => {
  const keyword = match.params.keyword
  const categoryId = match.params.categoryId || ''
  const pageNumber = match.params.pageNumber || 1
  const [generation, setGeneration] = useState('')
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { categories } = useSelector((state) => state.categoryList)
  const { subcategories } = useSelector((state) => state.subcategoryList)

  const categoryName = useMemo(() => {
    const category = categories.filter((category) => category._id === categoryId)
    return category[0] && category[0].name
  }, [categoryId, categories])
  const { loading, error, products, page, pages } = productList

  const filteredProducts = React.useMemo(() => {
    if(generation == '') return products
    return products.filter(product => product.subCategory == generation)
  }, [products, generation])

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, categoryId))
  }, [dispatch, keyword, pageNumber, categoryId])

  const handleGeneration = (e) => {
    setGeneration(e.target.value)
  }

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel categoryId={categoryId}/>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>{categoryName ? categoryName: 'All'} Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {categoryId ? (
              <>
                <Col md={3}>
                  <h5>Generation</h5>
                  <Form.Group onChange={handleGeneration}>
                    {subcategories.map((subcategory, index) => {
                      if(subcategory.category._id == categoryId) {
                        return (
                          <Form.Check 
                            custom
                            type="radio"
                            name="generation"
                            value={subcategory._id}
                            label={subcategory.name}
                            id={`generation${subcategory._id}`}
                            key={`generation${subcategory._id}`}
                          />
                        )                      
                      }
                    })}
                    <Form.Check 
                      custom
                      type="radio"
                      name="generation"
                      label="ALL"
                      id="generationAll"
                      value=""
                    />
                  </Form.Group>
                </Col>
                <Col md={9}>
                  <Row>
                    {filteredProducts.map((product) => (
                      <Col key={product._id} sm={12} md={6} xl={4}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </>
            ) : (
              <>
                {filteredProducts.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </>
            )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomePage
