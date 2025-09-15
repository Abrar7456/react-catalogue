import { useContext } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const Card = ({ data }) => {
  const context = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    context.closeProductDetail();
  };

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.some((product) => product.id === id);

    return isInCart ? (
      <div className="absolute top-0 right-0 flex justify-center items-center bg-green-600 w-7 h-7 rounded-full m-2 shadow-lg shadow-green-500/40">
        <CheckIcon className="h-4 w-4 text-white" />
      </div>
    ) : (
      <div
        className="absolute top-0 right-0 flex justify-center items-center bg-gray-200/90 w-7 h-7 rounded-full m-2 hover:bg-green-500 hover:shadow-lg hover:shadow-green-400/40 transition"
        onClick={(event) => addProductsToCart(event, data)}
      >
        <PlusIcon className="h-4 w-4 text-black group-hover:text-white" />
      </div>
    );
  };

  return (
    <div
      className="bg-gradient-to-br from-green-700/80 via-green-600/70 to-green-900/80 
                 backdrop-blur-md border border-green-700/40 
                 cursor-pointer w-full max-w-[280px] mx-auto h-64 rounded-2xl 
                 hover:scale-105 transition-transform hover:shadow-2xl 
                 hover:shadow-green-600/30"
      onClick={() => showProduct(data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-black/50 rounded-full text-white text-xs m-2 px-3 py-0.5 shadow-sm">
          {data.category || "Uncategorized"}
        </span>
        <img
          className="w-full h-full object-cover rounded-t-2xl"
          src={
            data.image_urls?.[1] ||
            "https://via.placeholder.com/200?text=No+Image"
          }
          alt={data.title || "No title"}
        />
        {renderIcon(data.id)}
      </figure>
      <p className="flex justify-between px-3 items-center text-gray-100">
        <span className="text-sm truncate font-semibold">
          {data.title || "Untitled"}
        </span>
        <span className="text-lg font-semibold text-green-300">
          {data.article_no || "N/A"}
        </span>
      </p>
    </div>
  );
};

export default Card;
