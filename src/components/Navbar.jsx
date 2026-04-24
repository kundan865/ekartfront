import { ShoppingCart, Menu, X, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import api from '@/connect/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAddersses, setUser, setUserOrders } from '@/redux/features/userSlice';
import { setCart } from '@/redux/features/cartSlice';
import { toast } from 'sonner';
import { logout } from '@/redux/features/userThunks';
import { setAdminOrder, setAdminSales, setAllUsers } from '@/redux/features/adminSlice';
import { setProducts } from '@/redux/features/productSlice';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logouting, user } = useSelector((state) => state?.user);

  const isAdmin = user?.roles?.some(role => role === "ROLE_ADMIN");

  const items = useSelector((state) => state?.cart?.cart?.items);

  const cartItemCount = items ? items.length : 0;

  const handleShoppingCart = () => {
    if (user) {
      navigate("/cart")
    } else {
      navigate("/login")
    }
  }


  const handleLogout = async () => {

    try {
      const response = await dispatch(logout()).unwrap();
      dispatch(setUser(null));
      dispatch(setCart(null));
      dispatch(setAllUsers(null));
      dispatch(setProducts(null));
      dispatch(setAddersses(null));
      dispatch(setAdminOrder(null));
      dispatch(setAdminSales(null));
      dispatch(setUserOrders(null));
      localStorage.clear();
      navigate("/");
      toast.success(response);
    } catch (error) {
      toast.error(error || error?.error || error?.message || "something went wrong");
    }
  }


  const handleProfile = () => {
    isProfile ? setIsProfile(false) : setIsProfile(true);
    if (isProfile) {
      navigate(`/profile/${user.id}`)
    } else {
      navigate("/")
    }
  }

  return (
    <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-3 px-4'>

        {/* logo */}
        <h1 className='font-bold text-xl'>E-Kart</h1>

        {/* Desktop Menu */}
        <nav className='hidden md:flex gap-10 items-center'>
          <ul className='flex gap-7 items-center text-lg font-semibold'>
            {
              isAdmin && <Link to="/dashboard"><li>Dashboard</li></Link>
            }
            <Link to="/"><li>Home</li></Link>
            <Link to="/products"><li>Products</li></Link>
            {user && (
              <div
                onClick={handleProfile}
                className='flex justify-center items-center cursor-pointer 
               h-10 w-10 rounded-full bg-blue-500 overflow-hidden'
              >
                {user.profilePic ? (
                  <img
                    src={`${user.profilePic}`}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold">
                    {user.firstName?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>
            )}
          </ul>

          <Link onClick={() => handleShoppingCart()} className='relative'>
            <ShoppingCart varient="outline" />
            <span className='bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2 text-sm'>
              {cartItemCount}
            </span>
          </Link>
          {
            user ? <Button
              onClick={handleLogout}
              className="bg-red-500">Logout</Button> :
              <Button onClick={() => navigate("/login")}
                className={"bg-green-500"}>Login</Button>
          }
        </nav>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center gap-4'>
          {user && (
            <div
              onClick={handleProfile}
              className='flex justify-center items-center cursor-pointer 
               h-10 w-10 rounded-full bg-blue-500 overflow-hidden'
            >
              {user?.profilePic ? (
                <img
                  src={`${user?.profilePic}`}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-white font-bold">
                  {user.firstName?.charAt(0) || "U"}
                </span>
              )}
            </div>
          )}

          <Link to="/cart" className='relative'>
            <ShoppingCart />
            <span className='bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2 text-sm'>{cartItemCount}</span>
          </Link>

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-pink-50 border-t border-pink-200 px-4 py-4'>
          <ul className='flex flex-col gap-4 text-lg font-semibold'>
            <Link to="/" onClick={() => setIsOpen(false)}><li>Home</li></Link>
            <Link to="/products" onClick={() => setIsOpen(false)}><li>Products</li></Link>
            {
              isAdmin && <Link to="/dashboard"><li>Admin</li></Link>
            }
            {
              user ? <Button onClick={() => handleLogout()}
                className="bg-red-500">
                {
                  logouting ? <Loader2 /> : "logut"
                }
              </Button> :
                <Button onClick={() => navigate("/login")}
                  className={"bg-green-500"}>Login</Button>
            }
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;