import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listSubcategories, deleteSubcategory } from '../../actions/subcategoryAction'

const SubcategoryListPage = ({ history }) => {

  const dispatch = useDispatch()
  const { loading, subcategories, error } = useSelector((state) => state.subcategoryList)
  const subcategoryDelete = useSelector((state) => state.subcategoryDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = subcategoryDelete

  const subcategoryCreate = useSelector((state) => state.subcategoryCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = subcategoryCreate

  useEffect(() => {
    dispatch(listSubcategories())
  }, [dispatch, successDelete, successCreate])

  const createSubcategoryHandler = () => {
    history.push(`/admin/subcategory/create`)
  }
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
        dispatch(deleteSubcategory(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Models</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createSubcategoryHandler}>
            <i className='fas fa-plus'></i> Create A Model
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Brand </th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subcategories && subcategories.map((subcategory) => (
                <tr key={subcategory._id}>
                  <td>{subcategory._id}</td>
                  <td>{subcategory.name}</td>
                  <td>{subcategory.category.name}</td>
                  <td>{subcategory.description}</td>
                  <td>
                    <LinkContainer to={`/admin/subcategory/${subcategory._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(subcategory._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default SubcategoryListPage
