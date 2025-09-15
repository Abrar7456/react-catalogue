import { useContext } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

// Skeleton loader
const CardSkeleton = () => (
  <div className="w-56 h-60 rounded-xl bg-gradient-to-br from-green-700 to-green-900 animate-pulse shadow-xl" />
);

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (!context.items) {
      return Array.from({ length: 12 }).map((_, index) => (
        <CardSkeleton key={index} />
      ));
    }

    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map((item) => (
        <div key={item.id} className="transform transition hover:scale-105">
          <Card data={item} />
        </div>
      ));
    }

    return (
      <div className="col-span-4 text-center py-4 text-gray-200 bg-black/40 rounded-lg">
        No products found matching your search
      </div>
    );
  };

  return (
    <Layout>
      {/* Dark sporty grass-like background */}

      {/* Title */}
      <div className="flex items-center justify-center relative w-80 mb-6 mx-auto">
        <h1 className="font-extrabold text-2xl text-white drop-shadow-md tracking-wide">
          Featured Products
        </h1>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name or article no..."
        className="rounded-full border border-green-600 w-80 p-3 mb-6 focus:outline-none mx-auto block shadow-md focus:ring-4 focus:ring-green-400 bg-green-950/80 text-white placeholder-gray-300"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />

      {/* Product grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-lg mx-auto">
        {renderView()}
      </div>

      {/* Product detail popup */}
      <ProductDetail />
    </Layout>
  );
}

export default Home;
