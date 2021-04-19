import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/layout/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProductPage from './pages/products/ProductPage'
import CartPage from './pages/cart/CartPage'
import ProfilePage from './pages/profile/ProfilePage'
import UserListPage from './pages/user/UserListPage'
import UserEditPage from './pages/user/UserEditPage'
import ProductListPage from './pages/products/ProductListPage'
import ProductEditPage from './pages/products/ProductEditPage'
import CategoryListPage from './pages/categories/CategoryListPage'
import CategoryEditPage from './pages/categories/CategoryEditPage'
import SubcategoryListPage from './pages/subcategories/SubcategoryListPage'
import SubcategoryEditPage from './pages/subcategories/SubcategoryEditPage'
import OrderPage from './pages/orders/OrderPage'
import OrderListPage from './pages/orders/OrderListPage'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomePage} exact />
          <Route path='/search/:keyword' component={HomePage} exact />
          <Route path='/page/:pageNumber' component={HomePage} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomePage}
            exact
          />
          <Route path='/category/:categoryId' component={HomePage} exact />
          <Route path='/login' component={LoginPage} exact />
          <Route path='/register' component={RegisterPage} exact />
          <Route path='/product/:id' component={ProductPage} exact />
          <Route path='/cart/:id?' component={CartPage} exact />
          <Route path='/profile' component={ProfilePage} exact />
          <Route path='/admin/userlist' component={UserListPage} />
          <Route path='/admin/user/:id/edit' component={UserEditPage} />
          <Route
            path='/admin/productlist'
            component={ProductListPage}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListPage}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditPage} />
          <Route 
            path='/admin/product/create' 
            render={
              (props) => <ProductEditPage {...props} isCreate={true}/>
            } 
          />
           <Route
            path='/admin/categorylist'
            component={CategoryListPage}
            exact
          />
           <Route
            path='/admin/subcategorylist'
            component={SubcategoryListPage}
            exact
          />
          <Route path='/admin/category/:id/edit' component={CategoryEditPage} />
          <Route 
            path='/admin/category/create' 
            render={
              (props) => <CategoryEditPage {...props} isCreate={true}/>
            } 
          />
          <Route path='/admin/subcategory/:id/edit' component={SubcategoryEditPage} />
          <Route 
            path='/admin/subcategory/create' 
            render={
              (props) => <SubcategoryEditPage {...props} isCreate={true}/>
            } 
          />
          <Route path='/order/:id' component={OrderPage} />
          <Route path='/admin/orderlist' component={OrderListPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
