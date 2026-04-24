import { CheckCircle } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = () => {
    const navigate =useNavigate();
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
            <div className='bg-white rounded-2xl shadow-lg p-18 max-w-md w-full text-center'>
                <div className='flex justify-center'>
                    <CheckCircle className='h-20 w-20 text-green-500' />
                </div>

                <h1 className='text-2xl font-bold mt-5 text-gray-500'>Payment Successfull </h1>

                <p className='text-gray-600 mt-2'>Thank you for Your purchase! your order has been placed...</p>

                <div className='mt-6 flex flex-col gap-3'>
                    <button onClick={()=>navigate("/products")}
                    className='w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-700 transition'
                        >
                            Continue Shopping
                    </button>

                    <button onClick={()=>navigate("/")}
                    className='w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-700 transition'
                        >
                            Veiw Orders
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
