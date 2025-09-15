// src/Pages/Admin/ManageItemsPage.jsx
import { useState } from "react";
import Layout from "../../Components/Layout";
import AddItem from "../AddItem";
import DeleteItem from "../DeleteItem";

const ManageItems = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <Layout>
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg overflow-hidden">
        {/* Sidebar */}
        <div className="bg-white/80 backdrop-blur-md md:w-64 w-full p-6 border-r border-gray-200">
          <h2 className="text-xl font-bold mb-6 text-center md:text-left text-green-800">
            ⚙️ Manage Items
          </h2>
          <div className="flex md:flex-col gap-3 justify-center">
            <button
              onClick={() => setActiveTab("add")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all w-full md:w-auto ${
                activeTab === "add"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-green-700 border border-green-300 hover:bg-green-100"
              }`}
            >
              ➕ Add Item
            </button>
            <button
              onClick={() => setActiveTab("delete")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all w-full md:w-auto ${
                activeTab === "delete"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-white text-red-700 border border-red-300 hover:bg-red-100"
              }`}
            >
              🗑️ Delete Item
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-white/70 backdrop-blur-md">
          <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
            {activeTab === "add" && <AddItem />}
            {activeTab === "delete" && <DeleteItem />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageItems;
