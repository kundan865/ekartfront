import { X } from "lucide-react";

const ImageUpload = ({ productData, setProductData }) => {

    const handleChange = (e) => {

        const files = Array.from(e.target.files);

        const imageUrls = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setProductData((prev) => ({
            ...prev,
            images: [...prev.images, ...imageUrls]
        }));

    };

    const removeImage = (index) => {
        setProductData((prev) => {
            const upadteImages = prev.images.filter((img,i) => i != index);
            return { ...prev, images: upadteImages }
        })
    }

    return (
        <div>
            <input type="file" multiple onChange={handleChange} />

            <div className="flex gap-2 mt-4 flex-wrap">
                {productData.images.map((img, index) => (
                    <div className="flex" key={index}>
                        <img
                            key={index}
                            src={img.preview}
                            alt="preview"
                            className="w-24 h-24 object-cover rounded"
                        />
                        <p><X onClick={() => removeImage(index)} size={14} className="cursor-pointer" /></p>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default ImageUpload;