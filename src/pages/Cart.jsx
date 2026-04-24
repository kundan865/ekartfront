import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '@/redux/features/cartThunks';
import { ShoppingCart, Trash, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state?.cart?.cart);


  const subTotal = cart?.totalPrice;
  const shipping = subTotal > 299 ? 10 : 0;
  const tax = subTotal * 0.05;
  const totalAmount = subTotal + shipping + tax;

  const handleTrashItem = async ({ productId, userId }) => {
    const response = await dispatch(removeFromCart({ userId: userId, productId: productId }))

    if (response.meta.requestStatus === "rejected") {
      const error = response.payload;
      toast.error(error)
    } else {
      toast.success("trashed item to cart successfully...")
    }

  }

  const handleIncreaseQuantity = async ({ productId, userId }) => {
    const response = await dispatch(increaseQuantity({ userId: userId, productId: productId }))
    if (response.meta.requestStatus === "rejected") {
      const error = response.payload;
      toast.error(error)
    } else {
      toast.success("increased item to cart successfully...")
    }
  }

  const handleDecreaseQuantity = async ({ productId, userId }) => {
    const response = await dispatch(decreaseQuantity({ userId: userId, productId: productId }))
    if (response.meta.requestStatus === "rejected") {
      const error = response?.payload;
      console.log("eror " + error)
      toast.error(error)
    } else {
      toast.success("decreased item to cart successfully...")
    }
  }


  return (
    <div className='pt-20 bg-gray-50 min-h-screen px-3 sm:px-5 lg:px-8'>
      {cart?.items?.length > 0 ? (
        <div className='max-w-7xl mx-auto'>

          <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-5'>
            Shopping Cart
          </h1>

          <div className='flex flex-col lg:flex-row gap-6'>

            <div className='flex flex-col gap-4 flex-1'>

              {cart?.items?.map((item, index) => (
                <Card key={index} className="p-3 sm:p-4">
                  <div className='flex flex-col sm:flex-row gap-4 sm:items-center justify-between'>

                    {/* Product Info */}
                    <div className='flex gap-4 items-center w-full'>
                      <img
                        src={item.image}
                        alt={item.productName}
                        className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded'
                      />

                      <div className='flex-1'>
                        <h1 className='font-semibold text-sm sm:text-base line-clamp-2'>
                          {item.productName}
                        </h1>
                        <p className='text-gray-600 mt-1'>
                          ₹ {item.price}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3 justify-between sm:justify-center'>
                      <div className='flex items-center gap-2'>
                        <Button
                          onClick={() =>
                            handleDecreaseQuantity({ userId: cart?.userId, productId: item?.productId })}

                          size="sm" variant='outline'>-</Button>
                        <span>{item.quantity}</span>
                        <Button
                          onClick={() =>
                            handleIncreaseQuantity({ userId: cart?.userId, productId: item?.productId })}
                          size="sm" variant='outline'>+</Button>
                      </div>

                      <p className='font-medium'>
                        ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>

                      <Trash2 onClick={() =>
                        handleTrashItem({ userId: cart?.userId, productId: item?.productId })}
                        className='w-5 h-5 text-red-500 cursor-pointer' />
                    </div>

                  </div>
                </Card>
              ))}

            </div>

            <div className='w-full lg:w-87.5 lg:sticky lg:top-24 h-fit'>

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                  <div className='flex justify-between'>
                    <span>Subtotal ({cart?.items?.length})</span>
                    <span>₹ {(cart?.totalPrice || 0).toLocaleString("en-IN")}</span>
                  </div>

                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>

                  <div className='flex justify-between'>
                    <span>Tax</span>
                    <span>₹{tax?.toFixed(2)}</span>
                  </div>

                  <hr />

                  <div className='flex justify-between font-bold text-lg'>
                    <span>Total</span>
                    <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <div className='space-y-3 pt-4'>

                    <div className='flex gap-2'>
                      <Input placeholder="Coupon code" />
                      <Button variant='outline'>Apply</Button>
                    </div>

                    <Button onClick={() => navigate("/address")} className="w-full bg-pink-700">
                      PLACE ORDER
                    </Button>

                    <Link to="/products">
                      <Button variant='outline' className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>

                  </div>

                </CardContent>
              </Card>

            </div>

          </div>

        </div>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-[60vh]p-6 text-center'>
          <div className='bg-pink-100 p-6 rounded-full'>
            <ShoppingCart className='w-16 h-16 text-pink-400' />
          </div>
          <h2 className='mt-6 text-2xl font-bold text-gray-800'>Your Cart is Empty...</h2>
          <p className='text-gray-600 mt-2'>Looks like you have not added anything to your cart yet</p>

          <Link to="/products">
            <Button className="mt-6 bg-pink-600 text-white py-3 px-6 hover:bg-pink-800 cursour-pointer">

              Continue Shopping</Button>
          </Link>

        </div>
      )}
    </div>
  )
}

export default Cart
