// src/Pages/Admin/DeleteItemPage.jsx
import { useContext, useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // adjust path
import { ShoppingCartContext } from "../../Context";
import Layout from "../../Components/Layout";

const DeleteItem = () => {
  const { deleteItem, isAdmin } = useContext(ShoppingCartContext);

  const [articleNo, setArticleNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 text-red-500 font-semibold">
          ❌ You are not authorized to access this page
        </div>
      </Layout>
    );
  }

  const handleDelete = async () => {
    if (!articleNo) {
      setMessage("⚠️ Please enter an article number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // 1. Find item by article_no
      const { data: item, error } = await supabase
        .from("items")
        .select("id")
        .eq("article_no", articleNo)
        .single();

      if (error || !item) {
        throw new Error("Item not found");
      }

      // 2. Delete by ID (using context function)
      const success = await deleteItem(item.id);
      if (success) {
        setMessage(`✅ Item with article_no "${articleNo}" deleted successfully.`);
        setArticleNo("");
      } else {
        setMessage("❌ Failed to delete item.");
      }
    } catch (err) {
      console.error(err.message);
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
          <h1 className="text-xl font-bold mb-4 text-center">
            Delete Item by Article No
          </h1>

          <input
            type="text"
            value={articleNo}
            onChange={(e) => setArticleNo(e.target.value)}
            placeholder="Enter article number (e.g., SMZ-1)"
            className="w-full px-4 py-2 border rounded-md mb-4"
          />

          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Item"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-medium">{message}</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DeleteItem;