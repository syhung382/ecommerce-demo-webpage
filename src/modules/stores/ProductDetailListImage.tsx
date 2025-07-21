import { useState } from "react";
import type { ProductImage } from "../../utils/responseUtils";
import ModalViewImageTemp from "../../components/modals/ModalViewImageTemp";

const listImage: ProductImage[] = [
  {
    id: "1",
    imageId: "1",
    imageUrl: "/images/products/product.png",
    createdAt: "1",
    createdBy: 1,
    deleteFlag: false,
  },
  {
    id: "2",
    imageId: "2",
    imageUrl: "/images/products/product.png",
    createdAt: "2",
    createdBy: 1,
    deleteFlag: false,
  },
  {
    id: "3",
    imageId: "3",
    imageUrl: "/images/products/product.png",
    createdAt: "3",
    createdBy: 1,
    deleteFlag: false,
  },
  {
    id: "4",
    imageId: "4",
    imageUrl: "/images/products/product.png",
    createdAt: "4",
    createdBy: 1,
    deleteFlag: false,
  },
  {
    id: "5",
    imageId: "5",
    imageUrl: "/images/products/product.png",
    createdAt: "5",
    createdBy: 1,
    deleteFlag: false,
  },
  {
    id: "6",
    imageId: "6",
    imageUrl: "/images/products/product.png",
    createdAt: "6",
    createdBy: 1,
    deleteFlag: false,
  },
  {
    id: "7",
    imageId: "7",
    imageUrl: "/images/products/product.png",
    createdAt: "7",
    createdBy: 1,
    deleteFlag: false,
  },
];

const ProductDetailListImage = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleSetImageIndex = (value: number | null) => {
    if (value === null) {
      setCurrentIndex(null);
    } else {
      setCurrentIndex(value);
    }
  };

  const maxVisible = 5;
  const extraCount = listImage.length - (maxVisible - 1); // 4 hiển thị rõ, ảnh thứ 5 sẽ là +n
  const visibleImages =
    listImage.length > maxVisible
      ? listImage.slice(0, maxVisible - 1) // lấy 4 ảnh đầu
      : listImage;

  return (
    <>
      {listImage.length > 5 ? (
        <>
          {visibleImages.map((img, index) => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 object-cover rounded-md border border-gray-300 hover:border-blue-500 cursor-pointer"
              onClick={() => handleSetImageIndex(index)}
            />
          ))}

          {listImage.length > maxVisible && (
            <div
              onClick={() => handleSetImageIndex(maxVisible - 1)}
              className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center text-gray-700 font-semibold cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-gray-300 bg-opacity-30 rounded-md" />
              <span className="z-10 text-white text-sm font-medium">
                +{extraCount}
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          {listImage.map((_, index) => (
            <img
              key={index}
              src="/images/products/product.png"
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 object-cover rounded-md border border-gray-300 hover:border-blue-500 cursor-pointer"
              onClick={() => handleSetImageIndex(index)}
            />
          ))}
        </>
      )}

      {currentIndex !== null && (
        <ModalViewImageTemp
          onClose={() => handleSetImageIndex(null)}
          currentIndex={currentIndex}
          list={listImage || []}
          onNext={() => handleSetImageIndex(currentIndex + 1)}
          onPrev={() => handleSetImageIndex(currentIndex - 1)}
        />
      )}
    </>
  );
};

export default ProductDetailListImage;
