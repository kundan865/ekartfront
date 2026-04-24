import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "@/redux/features/productThunks";
import { useParams } from "react-router-dom";

const EditProduct = () => {

    const dispatch = useDispatch();
    const { productId } = useParams();

    const { products, updating } = useSelector((state) => state?.products);

    const product = products.find((product) => product.id === productId);

    const user = useSelector((state) => state.user.user);

    const [productData, setProductData] = useState({
        name: product?.name,
        description: product?.description,
        price: product?.price,
        category: product?.category,
        brand: product?.brand,
        images: product?.images
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.id) {
            toast.error("User not logged in");
            return;
        }

        const formData = new FormData();

        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", Number(productData.price));
        formData.append("category", productData.category);
        formData.append("brand", productData.brand);

        productData.images.forEach((image) => {
            formData.append("files", image.file);
        });

        try {
            const updatedProduct = await dispatch(updateProduct({ productId:productId ,formData:formData})).unwrap();
            
            toast.success("Product updatadated successfully");

            // Reset form
            setProductData({
                name: updatedProduct?.name,
                description: updatedProduct?.description,
                price: updatedProduct?.price,
                category: updatedProduct?.category,
                brand: updatedProduct?.brand,
                images: updatedProduct?.images
            });

        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                err?.message ||
                "Update failed..."
            );
        }
    };


    return (
        <div className="bg-gray-100 flex items-center justify-center w-full p-4">

            <div className="bg-white shadow-xl rounded-2xl p-5 w-full ">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Edit Product
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">

                    <input
                        name="name"
                        value={productData.name}
                        placeholder="product name:"
                        onChange={handleChange}
                        className="border p-2 rounded-lg md:col-span-2"
                        required
                    />

                    <input
                        name="brand"
                        value={productData.brand}
                        placeholder="product brand"
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        required
                    />

                    <input
                        name="price"
                        value={productData.price}
                        type="number"
                        placeholder="product price"
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        required
                    />

                    <input
                        name="category"
                        value={productData.category}
                        placeholder="product category"
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                        required
                    />

                    <textarea
                        value={productData.description}
                        name="description"
                        placeholder="description"
                        onChange={handleChange}
                        className="border p-2 rounded-lg md:col-span-2"
                        required
                    />

                    <div className="md:col-span-2">
                        <ImageUpload productData={productData} setProductData={setProductData} />
                    </div>


                    <button
                        // disabled={loading}
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded-lg md:col-span-2 hover:bg-blue-700 transition"
                    >
                        {
                            updating ? <span className="flex gap-1 items-center justify-center"><Loader2 className="animate-spin" /></span> : "Update.."
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;

