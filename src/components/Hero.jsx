import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

const Hero = () => {

    const navigate=useNavigate();
    return (
        <section className=" md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">

                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div className="text-center md:text-left">

                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4">
                            Latest Electronics <br className="hidden md:block" />
                            at Best Prices
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6">
                            Discover cutting-edge technology with unpredictable deals on
                            smartphones, laptops and more.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button onClick={() => navigate('/products')}
                            className="border border-white text-white hover:bg-white
                             hover:text-blue-600 cursor-pointer">
                                Shop Now
                            </Button>

                            <Button className="border border-white text-white hover:bg-white
                             hover:text-blue-600 cursor-pointer">
                                View Deals
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3659/3659899.png"
                            alt="electronics"
                            className="w-64 sm:w-80 md:w-full max-w-md"
                        />
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Hero