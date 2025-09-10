// src/Pages/Admin/AddItemPage.jsx
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import Layout from "../../Components/Layout";

const AddItem = () => {
  const { addItem, isAdmin } = useContext(ShoppingCartContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(""); // ✅ NEW
  const [imageFiles, setImageFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 text-red-500 font-semibold">
          ❌ You are not authorized to access this page
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !category) {
      alert("Please fill all fields");
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
    <Layout>
      <div className="flex justify-center items-center py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
        >
          <h2 className="text-xl font-bold text-center">Add New Product</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImageFiles([...e.target.files])}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Item"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddItem;
