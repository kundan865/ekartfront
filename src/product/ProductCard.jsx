import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { addToCart } from '@/redux/features/cartThunks';
import { ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"

const ProductCard = ({ product = {}, loading }) => {

  const { images = [], name = "", price = 0 } = product;

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {

    if (!user) {
      toast.error('Please login to add items to cart!')
      navigate('/login');
      return;
    }

    try {
      setAdding(true);
      const data = await dispatch(addToCart({ productId: product?.id, userId: user?.id })).unwrap();
      if (data) {
        toast.success("Item added to cart!");
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to add to cart.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className='shadow-md hover:shadow-xl transition-all duration-300 rounded-xl 
      overflow-hidden flex flex-col'>

      {/* Image */}
      <div className='w-full aspect-square overflow-hidden'>
        {
          loading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <img
              onClick={() => navigate(`/products/${product?.id}`)}
              src={images[0] || "/default-image.png"}
              alt={name}
              className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
            />
          )
        }
      </div>

      {/* Content */}
      {
        loading ? (
          <div className='p-3 space-y-2'>
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-full h-8" />
          </div>
        ) : (
          <div className='p-3 flex flex-col flex-grow justify-between'>

            <div>
              <h1 className='font-semibold text-sm sm:text-base md:text-lg line-clamp-2'>
                {name}
              </h1>

              <h2 className='text-green-600 font-bold text-base sm:text-lg md:text-xl mt-1'>
                ₹{price?.toFixed(2)}
              </h2>
            </div>

            <Button
              onClick={handleAddToCart}
              className="bg-pink-500 mt-3 w-full flex items-center justify-center gap-2 text-sm sm:text-base"
              disabled={adding}
            >
              <ShoppingCart size={18} />
              {adding ? 'Adding...' : 'Add to Cart'}
            </Button>

          </div>
        )
      }

    </div>
  );
};

export default ProductCard;