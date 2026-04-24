import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clearCart } from '@/redux/features/cartThunks';
import { addAddress, allAddress, createOrder, deleteAddress, verifyPayment } from '@/redux/features/userThunks';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddreshForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  })

  const { addresses, selectedAddress, user } = useSelector((state) => state?.user);
  const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true);
  const [addressId,setAddressId] =useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {

    if (formData.fullName === "" || formData.phone === "" || formData.email === "" ||
      formData.address === "" || formData.city === "" || formData.state === "" ||
      formData.zip === "" || formData.country === ""
    ) {
      toast.error("All fields are required...");
      return;
    }

    try {
      const response = await dispatch(addAddress({ userId: user?.id, addressData: formData })).unwrap();
      setShowForm(false);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      });

      try {
        dispatch(allAddress(userId));
      } catch (error) {
        toast.error(error);
      }

      toast.success(response);

    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await dispatch(deleteAddress(addressId)).unwrap();
      try {
        dispatch(allAddress(userId));
      } catch (error) {
        toast.error(error);
      }

      toast.success(response);
    } catch (error) {
      toast.error(error);
    }
  }

  const cart = useSelector((state) => state?.cart?.cart);

  const userId = cart?.userId;


  const subTotal = cart?.totalPrice || 0;
  const shipping = subTotal > 299 ? 10 : 0;
  const tax = subTotal * 0.05;
  const totalAmount = subTotal + shipping + tax;


  const handlePayment = async () => {

    if(addressId==="" || addressId===null){
      toast.error("please select address first");
      return;
    }

    const orderData = {
      items: cart?.items?.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      currency: "INR",
      shipping: shipping,
      addressId:addressId,
    };

    try {
      const order = await dispatch(createOrder({ userId: userId, orderData: orderData })).unwrap();

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Ekart",
        description: "Order Payment",
        order_id: order.orderId,

        handler: async function (response) {

          const verifyData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          };

          try {
            await dispatch(verifyPayment(verifyData)).unwrap();

            try {
              await dispatch(clearCart(userId));

            } catch (error) {
              toast.error(
                typeof error === "string"
                  ? error
                  : error?.message || "clear cart failed"
              );
            }
            localStorage.removeItem("persist:Ekart");

            toast.success("Payment verified successfully ");
            navigate("/order-success");

          } catch (error) {
            toast.error(
              typeof error === "string"
                ? error
                : error?.message || "Payment verification failed"
            );
          }
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled ❌");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Order creation failed"
      );
    }
  };


  return (
    <div className='max-w-7xl mx-auto grid sm:p-5 md:p-8 lg:p-10'>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto'>

        <div className='space-y-4 p-6 bg-white'>
          {
            showForm ? (
              <>
                <div>
                  <Label>Full Name:</Label>
                  <Input type="text"
                    name='fullName'
                    required
                    placeholder='Enter name here...'
                    value={formData.fullName}
                    onChange={handleChange} />
                </div>

                <div>
                  <Label>Phone Number:</Label>
                  <Input type="tel"
                    name='phone'
                    required
                    placeholder='+91 8757168276'
                    value={formData.phone}
                    onChange={handleChange} />
                </div>

                <div>
                  <Label>Email:</Label>
                  <Input type="email"
                    name='email'
                    required
                    placeholder='Enter email here.'
                    value={formData.email}
                    onChange={handleChange} />
                </div>

                <div>
                  <Label>Address:</Label>
                  <Input type="text"
                    name='address'
                    required
                    placeholder='Enter addresss here...'
                    value={formData.address}
                    onChange={handleChange} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label>City:</Label>
                    <Input type="text"
                      name='city'
                      required
                      placeholder='Enter city here...'
                      value={formData.city}
                      onChange={handleChange} />
                  </div>

                  <div>
                    <Label>State:</Label>
                    <Input type="text"
                      name='state'
                      required
                      placeholder='Enter state here...'
                      value={formData.state}
                      onChange={handleChange} />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label>Zipcode:</Label>
                    <Input type="text"
                      name='zip'
                      required
                      placeholder='Enter zipcode..'
                      value={formData.zip}
                      onChange={handleChange} />
                  </div>

                  <div>
                    <Label>Country:</Label>
                    <Input type="text"
                      name='country'
                      required
                      placeholder='Enter country...'
                      value={formData.country}
                      onChange={handleChange} />
                  </div>
                </div>
                <Button onClick={() => handleSave()} className="w-full">Continue & Save</Button>
              </>
            ) : (
              <div className='space-y-4'>
                <h2 className='text-lg font-semibold'>Saved Addresses</h2>
                {
                  addresses?.length === 0 ?
                    <p className="text-gray-500">No address added</p> :
                    addresses?.map((add, index) => {
                      return <div key={index}
                        onClick={() => setAddressId(add?.id)}
                        className={`border p-4 rounded-md cursor-pointer relative ${addressId === add?.id ? "border-pink-500 bg-pink-50 " : "border-gray-300"}`}>
                        <p className='font-medium'>{add.fullName}</p>
                        <p>{add.phone}</p>
                        <p>{add.email}</p>
                        <p>{add.address}, {add.city}, {add.state}, {add.zip}, {add.country}</p>
                        <p
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(add?.id);
                          }}
                          className='absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer'
                        >
                          Delete
                        </p>
                      </div>
                    })
                }

                <Button className={"w-full"} onClick={() => setShowForm(true)}>+ Add New Address</Button>

                <Button disabled={addressId === null}
                  onClick={() => handlePayment()}
                  className={"w-full bg-pink-600"}>
                  Proceed To Checkout
                </Button>
              </div>
            )
          }
        </div>

        <div className='w-full lg:sticky h-fit p-4'>

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
                <ul>
                  <li>free shipping on orders over 299</li>
                  <li>10 days return policy</li>
                </ul>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default AddreshForm
