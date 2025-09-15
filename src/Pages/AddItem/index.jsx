import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../Context";

const AddItem = () => {
  const { addItem, isAdmin } = useContext(ShoppingCartContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageFiles, setImageFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    "GK Gloves",
    "GK Shirts",
    "GK Pants",
    "GK Padded Pants",
    "Soccer Balls",
    "Uniform Jersey",
    "Uniform Shorts",
    "Uniform Socks",
    "Bags",
    "Caps",
    "Bottles",
  ];

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center text-red-600 font-semibold bg-red-50 border border-red-200 px-6 py-6 rounded-lg shadow-sm w-full">
        ❌ You are not authorized to access this page
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !category) {
      alert("⚠️ Please fill all fields");
      return;
    }

    setLoading(true);
    const success = await addItem({
      title,
      description,
      category,
      price,
      imageFiles,
    });
    setLoading(false);

    if (success) {
      alert("✅ Item added successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImageFiles(null);
    } else {
      alert("❌ Failed to add item.");
    }
  };

  return (
    <div className="flex justify-center items-start w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-green-700">
          ➕ Add New Product
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-green-500 text-black"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-green-500 text-black"
        />

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-green-500 ${
            category ? "text-black" : "text-gray-400"
          }`}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-green-500 text-black"
        />

        {/* Images */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImageFiles([...e.target.files])}
          className="w-full text-sm text-gray-600"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full font-semibold transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
