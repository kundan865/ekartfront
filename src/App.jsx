import './App.css'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import Products from './product/Products'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Dashboard from './admin/Dashboard'
import { Toaster } from "@/components/ui/sonner"
import AdminSales from './admin/AdminSales'
import AdminProduct from './admin/AdminProduct'
import AddProduct from './admin/AddProduct'
import AdminOrders from './admin/AdminOrders'
import ShowUserOrders from './admin/ShowUserOrders'
import AdminUsers from './admin/AdminUsers'
import UserInfo from './admin/UserInfo'
import ProtectedRoute from './components/ProtectedRoute'
import SingleProduct from './product/SingleProduct'
import EditProduct from './admin/EditProduct'
import EditUser from './admin/EditUser'
import AddreshForm from './pages/AddreshForm'
import OrderSuccess from './pages/OrderSuccess'
import UserOrdersDetail from './pages/UserOrdersDetail'
import AdminOrderDetails from './pages/AdminOrderSetails'

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Home /></>
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword />
  },
  {
    path: "/products",
    element: <><Navbar /><Products /><Footer /></>
  },
  {
    path: "/products/:productId",
    element: <><Navbar /><div className='pt-20'><SingleProduct /></div><Footer /></>
  },
  {
    path: "/profile/:userId",
    element: <ProtectedRoute><Navbar /><Profile /><Footer /></ProtectedRoute>
  },
  {
    path: "/cart",
    element: <ProtectedRoute><Navbar /><Cart /></ProtectedRoute>
  },
  {
    path: "/hero",
    element: <><Hero /></>
  },
  {
    path: "/address",
    element: <ProtectedRoute><AddreshForm /></ProtectedRoute>,
  },
  {
    path: "/order-success",
    element: <ProtectedRoute><OrderSuccess /></ProtectedRoute>,
  },
  {
    path: "/user-order-details/:orderId",
    element: <ProtectedRoute><UserOrdersDetail /></ProtectedRoute>,
  },
  {
    path: "/admin-order-details/:orderId",
    element: <ProtectedRoute><AdminOrderDetails /></ProtectedRoute>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute adminOnly={true}><Navbar /><Dashboard /></ProtectedRoute>,
    children: [
      {
        index: true,  
        element: <Navigate to="sales" replace />,
      },
      {
        path: "sales",
        element: <AdminSales />,
      },
      {
        path: "products",
        element: <AdminProduct />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "edit-product/:productId",
        element: <EditProduct />,
      },
      {
        path: "edit-user/:userId",
        element: <EditUser />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "users/orders/:userId",
        element: <ShowUserOrders />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "users/:userId",
        element: <UserInfo />,
      }
    ]
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App