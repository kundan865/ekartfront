import { deleteProduct, fetchProducts } from '@/redux/features/productThunks';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    const handleDelete = async (productId) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (!confirmDelete) return;

        try {
            setDeleting(true);
            const data = await dispatch(deleteProduct({ productId: productId }))
            if (data) {
                dispatch(fetchProducts())
                toast.success("product deleted successfully..!");
            }
        } catch (error) {
            toast.error(error?.message || 'Failed to delete product.');
        } finally {
            setDeleting(false);
        }
    };
    return (
        <div className="border p-3 rounded-xl shadow hover:shadow-md transition">
            {/* Image */}
            <div className="h-40 w-full overflow-hidden rounded-lg">
                <img
                    onClick={() => navigate(`/products/${product?.id}`)}
                    src={product.images?.[0] || "/default-image.png"}
                    alt={product.name}
                    className="h-full w-full object-cover hover:scale-105 transition"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 mt-3 gap-1">
                <h2 className="font-semibold line-clamp-2 text-sm md:text-base">
                    {product.name}
                </h2>

                <p className="font-medium text-green-600">
                    ₹ {product.price}
                </p>

                <p className="text-xs text-gray-500">
                    {product.category}
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
                <button
                    onClick={() => navigate(`/dashboard/edit-product/${product.id}`)}
                    className="flex-1 bg-yellow-500 text-white py-1 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                >
                    {
                        deleting ? "Deleting..." : "Delete"
                    }
                </button>
            </div>

        </div>
    )
}

export default AdminProductCard
