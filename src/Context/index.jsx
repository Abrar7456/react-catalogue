// src/Context/index.jsx
import { createContext, useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  // Cart State
  const [count, setCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [order, setOrder] = useState([]);

  // UI State
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const [productToShow, setProductToShow] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Products State
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState(null);
  const [searchByCategory, setSearchByCategory] = useState(null);
  const [searchByArticle, setSearchByArticle] = useState(null);

  // User State
  const [account, setAccount] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // UI Actions
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // ------------------------------
  // Auth (Supabase)
  // ------------------------------
  const handleSignIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      setAccount(data.user);
      setIsUserAuthenticated(true);

      // TODO: Replace with role-based admin check from DB
      if (data.user.email === "bmsaeed@gmail.com") {
        setIsAdmin(true);
      }

      return true;
    } catch (e) {
      console.error("Login failed:", e.message);
      return false;
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsUserAuthenticated(false);
    setIsAdmin(false);
    setAccount(null);
    setCartProducts([]);
    setCount(0);
    closeProductDetail();
    closeCheckoutSideMenu();
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAccount(session.user);
        setIsUserAuthenticated(true);

        // TODO: Replace with role/flag from Supabase DB
        if (session.user.email === "bmsaeed@gmail.com") {
          setIsAdmin(true);
        }
      } else {
        setAccount(null);
        setIsUserAuthenticated(false);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ------------------------------
  // Items (Supabase Table)
  // ------------------------------
  const fetchItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Items fetch error:", error.message);
      setItems([]);
    } else {
      setItems(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async ({
    title,
    description,
    category,
    price,
    imageFiles,
  }) => {
    if (!isAdmin) {
      alert("Not authorized");
      return false;
    }

    try {
      const { data: lastItem, error: fetchError } = await supabase
        .from("items")
        .select("article_no")
        .order("id", { ascending: false })
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // Ignore "no rows" error
        throw fetchError;
      }

      let newNumber = 1;
      if (lastItem?.article_no) {
        const parts = lastItem.article_no.split("-");
        const lastNum = parseInt(parts[1], 10);
        newNumber = lastNum + 1;
      }

      const articleNo = `SMZ-${newNumber}`;

      let imageUrls = [];

      if (imageFiles && imageFiles.length > 0) {
        for (const file of imageFiles) {
          const filePath = `items/${Date.now()}-${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from("item-images")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage
            .from("item-images")
            .getPublicUrl(filePath);

          imageUrls.push(data.publicUrl);
        }
      }

      const { error } = await supabase.from("items").insert([
        {
          title,
          description,
          category,
          price,
          image_urls: imageUrls,
          article_no: articleNo,
        },
      ]);

      if (error) throw error;

      await fetchItems(); // refresh items
      return true;
    } catch (e) {
      console.error("Failed to add item:", e.message);
      return false;
    }
  };

  // ✅ Admin delete item
  const deleteItem = async (id) => {
    if (!isAdmin) {
      alert("Not authorized");
      return false;
    }

    try {
      // 1. Get the item to delete (including image_urls)
      const { data: item, error: fetchError } = await supabase
        .from("items")
        .select("image_urls")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;

      // 2. If item has images, delete them from storage
      if (item?.image_urls && item.image_urls.length > 0) {
        // Convert public URLs -> storage paths
        const filePaths = item.image_urls.map((url) => {
          const parts = url.split("/item-images/");
          return parts[1]; // everything after the bucket name
        });

        const { error: storageError } = await supabase.storage
          .from("item-images")
          .remove(filePaths);

        if (storageError) throw storageError;
      }

      // 3. Delete item row from DB
      const { error: dbError } = await supabase
        .from("items")
        .delete()
        .eq("id", id);
      if (dbError) throw dbError;

      await fetchItems(); // refresh UI
      return true;
    } catch (e) {
      console.error("Failed to delete item:", e.message);
      return false;
    }
  };

  // ------------------------------
  // Filters
  // ------------------------------
  const filteredItemsByTitleOrArticle = useMemo(() => {
    if (!searchByTitle || !items) return items;
    return items.filter((item) => {
      const titleMatch = (item.title || "")
        .toLowerCase()
        .includes(searchByTitle.toLowerCase());

      const articleMatch = (item.article_no || "")
        .toLowerCase()
        .includes(searchByTitle.toLowerCase());

      return titleMatch || articleMatch;
    });
  }, [items, searchByTitle]);

  const filteredItemsByCategory = useMemo(() => {
    if (!searchByCategory || !items) return filteredItemsByTitleOrArticle;
    return filteredItemsByTitleOrArticle?.filter((item) =>
      (item.category || "")
        .toLowerCase()
        .includes(searchByCategory.toLowerCase())
    );
  }, [filteredItemsByTitleOrArticle, searchByCategory]);

  useEffect(() => {
    setFilteredItems(filteredItemsByCategory);
  }, [filteredItemsByCategory]);

  // ------------------------------
  // Cart
  // ------------------------------
  const addToCart = (product) => {
    setCartProducts((prev) => [...prev, product]);
    setCount((prev) => prev + 1);
    openCheckoutSideMenu();
  };

  const removeFromCart = (id) => {
    setCartProducts((prev) => prev.filter((p) => p.id !== id));
    setCount((prev) => prev - 1);
  };

  const contextValue = {
    // Cart
    count,
    setCount,
    cartProducts,
    setCartProducts,
    addToCart,
    removeFromCart,
    order,
    setOrder,

    // UI
    isProductDetailOpen,
    openProductDetail,
    closeProductDetail,
    isCheckoutSideMenuOpen,
    openCheckoutSideMenu,
    closeCheckoutSideMenu,
    productToShow,
    setProductToShow,
    isLoading,

    // Products
    items,
    filteredItems,
    searchByTitle,
    setSearchByTitle,
    searchByCategory,
    setSearchByCategory,

    // User
    account,
    isUserAuthenticated,
    isAdmin,
    handleSignIn,
    handleSignOut,

    // Admin actions
    addItem,
    deleteItem,
    refreshItems: fetchItems,
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
