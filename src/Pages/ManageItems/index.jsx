// src/Pages/Admin/ManageItemsPage.jsx
import { useState } from "react";
import Layout from "../../Components/Layout";
import AddItem from "../AddItem";
import DeleteItem from "../DeleteItem";

const ManageItems = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="bg-gray-100 w-full md:w-64 p-4 border-r">
          <h2 className="text-lg font-bold mb-4 text-center md:text-left">
            Manage Items
          </h2>
          <div className="flex md:flex-col gap-2 justify-center">
            <button
              onClick={() => setActiveTab("add")}
              className={`px-4 py-2 rounded-md text-sm font-medium w-full md:w-auto ${
                activeTab === "add"
                  ? "bg-black text-white"
                  : "bg-white border hover:bg-gray-200"
              }`}
            >
              ➕ Add Item
            </button>
            <button
              onClick={() => setActiveTab("delete")}
              className={`px-4 py-2 rounded-md text-sm font-medium w-full md:w-auto ${
                activeTab === "delete"
                  ? "bg-red-600 text-white"
                  : "bg-white border hover:bg-gray-200"
              }`}
            >
              🗑️ Delete Item
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 bg-gray-50">
          {activeTab === "add" && <AddItem />}
          {activeTab === "delete" && <DeleteItem />}
        </div>
      </div>
    </Layout>
  );
};

export default ManageItems;
