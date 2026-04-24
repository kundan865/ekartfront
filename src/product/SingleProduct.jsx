import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/features/cartThunks';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart } from 'lucide-react';
import { toast } from "sonner";

const SingleProduct = () => {

    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const products = useSelector((state) => state.products.products);

    const product = products.find((product) => productId === String(product.id));

    const [adding, setAdding] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const handleAddToCart = async () => {
        if (!user) {
            toast.error("Please login first!");
            navigate("/login");
            return;
        }

        try {
            setAdding(true);
            const data=await dispatch(addToCart({ productId: product.id, userId: user.id })).unwrap();
            if(data){
                setAdding(false)
            }
            toast.success("Added to cart!");
        } catch (err) {
            toast.error(err?.message || "Error adding to cart");
        } finally {
            setAdding(false);
        }
    };


    if (!product) return <p className="text-center mt-10">Product not found</p>;

    const { images = [], name, price, description } = product;


    return (
        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

            <div>
                 {/*  main image */}
                <div className="w-full h-60.5 sm:h-75 md:h-100 lg:h-112 overflow-hidden rounded-xl border">
                    <img
                        src={images[activeImage] || "/default-image.png"}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                {/* suggested image */}
                <div className="flex gap-2 mt-3 overflow-x-auto">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setActiveImage(i)}
                            className={`w-14 h-14 sm:w-16 sm:h-16 object-cover rounded cursor-pointer border ${activeImage === i ? "border-pink-500" : ""}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">

                {/* Title */}
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-snug">
                    {name}
                </h1>

                {/* Price */}
                <p className="text-green-600 text-lg sm:text-xl md:text-2xl font-semibold">
                    ₹{price?.toFixed(2)}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base">
                    {description || "No description available"}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-2">

                    <Button
                        onClick={handleAddToCart}
                        disabled={adding}
                        className="bg-pink-500 w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        {adding ? "Adding..." : "Add to Cart"}
                    </Button>

                    <Button
                        className="bg-black text-white w-full sm:w-auto"
                    >
                        Buy Now
                    </Button>

                </div>

            </div>
        </div>
    )
}

export default SingleProduct
