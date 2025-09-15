import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import "./styles.css";
import ProductCarousel from "../ProductCrousel";

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    context.setCartProducts([...context.cartProducts, context.productToShow]);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-40 ${
          context.isProductDetailOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => context.closeProductDetail()}
      />

      {/* Product Detail Panel */}
      <aside
        className={`product-detail flex flex-col fixed right-0 z-50
          border-l border-green-700/40 shadow-2xl
          bg-gradient-to-b from-green-950 to-green-800 text-white
          transform transition-transform duration-300 ease-in-out
          w-full sm:w-[420px] h-[calc(100vh-68px)] top-[68px]
          ${
            context.isProductDetailOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-green-700/40">
          <h2 className="font-semibold text-lg tracking-wide">
            Product Detail
          </h2>
          <XMarkIcon
            className="h-6 w-6 text-green-300 hover:text-green-100 cursor-pointer transition"
            onClick={() => context.closeProductDetail()}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-900/40">
          {/* Image Carousel */}
          <figure className="px-6 py-4">
            <ProductCarousel images={context.productToShow.image_urls || []} />
          </figure>

          {/* Details */}
          <div className="flex flex-col px-6 space-y-2">
            <span className="text-green-300 font-bold text-2xl">
              ${context.productToShow.price}
            </span>
            <span className="font-medium text-lg text-green-100">
              {context.productToShow.title}
            </span>
            <span className="font-light text-sm text-green-200 leading-relaxed">
              {context.productToShow.description}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 mb-6">
          <button
            className="w-full py-3 rounded-lg 
              bg-gradient-to-r from-green-600 to-green-500
              hover:from-green-500 hover:to-green-400
              text-black font-semibold shadow-lg transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProductDetail;
