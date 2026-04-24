import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductCard from "./AdminProductCard";
import { fetchProducts } from "@/redux/features/productThunks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AdminProduct = () => {

    const { products, fetching } = useSelector((state) => state?.products);
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("");


    // filter products
    const finalProducts = products?.filter(p => {

        const matchesSearch =

            (p.name || "").toLowerCase().includes(search.toLowerCase().trim()) ||

            (p.category || "").toLowerCase().includes(search.toLowerCase().trim()) ||

            (p.brand || "").toLowerCase().includes(search.toLowerCase().trim()) ||

            (p.description || "").toLowerCase().includes(search.toLowerCase().trim()) ||

            (p.price?.toString() || "").includes(search.toLowerCase().trim());

        return matchesSearch;

    })?.sort((a, b) => {

        if (sortOrder === "lowToHigh") {
            return a?.price - b?.price;
        }

        if (sortOrder === "highToLow") {
            return b?.price - a?.price;
        }
        return 0;
    });

    useEffect(() => {
        const loadProducts = async () => {
            try {
                await dispatch(fetchProducts()).unwrap();
            } catch (error) {
                toast.error(error?.message || error || error?.error || "Something error...");
            }
        };

        loadProducts();

    }, [dispatch]);

    return (
        <div className="p-4 md:p-6">

            <div className="pb-4 flex justify-between">
                <div>
                    <input type="text" placeholder="search here..." className="border p-2 rounded-lg" onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div>
                    <select
                        className="p-2 rounded-lg"
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="noFilter">No Filter</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                </div>
            </div>

            {/* 🔹 Product List */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

                {
                    fetching ? <h1 className="flex justify-center items-center"><Loader2 /></h1> :

                        finalProducts?.length === 0 ? (
                            <p className="text-center col-span-full text-gray-500">
                                No products found
                            </p>
                        ) : (
                            finalProducts?.map((product) => (
                                <AdminProductCard product={product} key={product.id} />
                            ))
                        )

                }

            </div>
        </div>
    );
};

export default AdminProduct;