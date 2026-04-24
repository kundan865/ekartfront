import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/redux/features/productThunks";

const AddProduct = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);

    const { adding } = useSelector((state) => state?.products);
    

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        images: []
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

        if (productData.images.length === 0) {
            toast.error("Please select at least one image");
            return;
        }
        const data = new FormData();

        data.append("name", productData.name);
        data.append("description", productData.description);
        data.append("price", Number(productData.price));
        data.append("category", productData.category);
        data.append("brand", productData.brand);

        productData.images.forEach((image) => {
            data.append("files", image.file);
        });

        try {
            const respoonse=await dispatch(addProduct({ userId: user.id, data:data })).unwrap();

            toast.success(respoonse);

            // Reset form
            setProductData({
                name: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                images: []
            });

        } catch (err) {
            toast.error(err||
                err?.error ||
                err?.message ||
                "Upload failed"
            );
        }
    };


    return (
        <div className="bg-gray-100 flex items-center justify-center w-full p-4">

            <div className="bg-white shadow-xl rounded-2xl p-5 w-full ">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Add Product
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
                            adding ? <span className="flex gap-1 items-center justify-center"><Loader2 className="animate-spin" /></span> : "Add Product"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;

